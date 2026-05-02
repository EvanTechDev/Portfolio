import { BrowserOAuthClient } from '@atproto/oauth-client-browser';

export type AtReplyComment = {
  uri: string;
  cid?: string;
  authorDid: string;
  authorHandle?: string;
  text: string;
  createdAt: string;
  parentUri?: string;
  subject: string;
};

export type AtReplySession = {
  did: string;
  handle?: string;
  accessToken: string;
  pdsUrl: string;
};

export type AtReplyClientOptions = {
  indexerUrl?: string;
  collection?: string;
  clientMetadataUrl?: string;
};

const DEFAULT_COLLECTION = 'app.atreply.comment';
const DEFAULT_INDEXER_URL = 'https://constellation.microcosm.blue';
const DEFAULT_SOURCE = 'app.atreply.comment:subject';

export class AtReplyClient {
  private readonly collection: string;
  private readonly indexerUrl: string;
  private readonly oauthClient: any;
  private readonly clientMetadataUrl: string;

  constructor(options: AtReplyClientOptions = {}) {
    this.collection = options.collection ?? DEFAULT_COLLECTION;
    this.indexerUrl = options.indexerUrl ?? DEFAULT_INDEXER_URL;
    this.clientMetadataUrl = options.clientMetadataUrl ?? `${window.location.origin}/client-metadata.json`;
    this.oauthClient = new (BrowserOAuthClient as any)({
      clientMetadata: { client_id: this.clientMetadataUrl },
    });
  }

  async restoreSession() {
    const session = await this.oauthClient.restore?.();
    return this.normalizeSession(session);
  }

  async handleOAuthCallbackIfNeeded() {
    if (typeof window === 'undefined') return null;
    const hasOauthParams = window.location.search.includes('code=') || window.location.search.includes('iss=');
    if (!hasOauthParams) return this.restoreSession();
    const result = await this.oauthClient.callback?.(window.location.href);
    window.history.replaceState({}, document.title, window.location.pathname);
    return this.normalizeSession(result?.session ?? result);
  }

  async beginSignIn(handle: string) {
    const url = await this.oauthClient.authorize?.(handle, {
      scope: 'atproto transition:generic',
    });
    if (!url) throw new Error('Unable to start OAuth flow.');
    window.location.href = url;
  }

  async signOut() {
    await this.oauthClient.logout?.();
  }

  async listComments(subject: string): Promise<AtReplyComment[]> {
    const url = new URL('/xrpc/blue.microcosm.links.getBacklinks', this.indexerUrl);
    url.searchParams.set('subject', subject);
    url.searchParams.set('source', DEFAULT_SOURCE);
    url.searchParams.set('limit', '100');

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'PortfolioAtReply/0.1 (@evan)',
      },
    });

    if (!response.ok) throw new Error(`Failed to load comments: ${response.status}`);
    const data = (await response.json()) as { links?: Array<{ uri: string; did: string; record: any }> };

    return (data.links ?? []).map((item) => ({
      uri: item.uri,
      authorDid: item.did,
      authorHandle: item.record?.authorHandle,
      text: item.record?.text ?? '',
      createdAt: item.record?.createdAt ?? new Date().toISOString(),
      parentUri: item.record?.parentUri,
      subject: item.record?.subject ?? subject,
    }));
  }

  async createComment(session: AtReplySession, input: { subject: string; text: string; parentUri?: string }) {
    const response = await fetch(`${session.pdsUrl}/xrpc/com.atproto.repo.createRecord`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        repo: session.did,
        collection: this.collection,
        record: {
          $type: this.collection,
          text: input.text,
          subject: input.subject,
          parentUri: input.parentUri,
          createdAt: new Date().toISOString(),
        },
      }),
    });
    if (!response.ok) throw new Error(`Failed to create comment: ${response.status}`);
    return response.json();
  }

  private normalizeSession(raw: any): AtReplySession | null {
    if (!raw) return null;
    return {
      did: raw.did,
      handle: raw.handle,
      accessToken: raw.accessJwt ?? raw.accessToken,
      pdsUrl: raw.pdsUrl ?? raw.aud ?? 'https://bsky.social',
    };
  }
}
