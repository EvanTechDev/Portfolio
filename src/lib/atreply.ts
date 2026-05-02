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
};

const DEFAULT_COLLECTION = 'app.atreply.comment';
const DEFAULT_INDEXER_URL = 'https://constellation.microcosm.blue';
const DEFAULT_SOURCE = 'app.atreply.comment:subject';

export class AtReplyClient {
  private readonly collection: string;
  private readonly indexerUrl: string;

  constructor(options: AtReplyClientOptions = {}) {
    this.collection = options.collection ?? DEFAULT_COLLECTION;
    this.indexerUrl = options.indexerUrl ?? DEFAULT_INDEXER_URL;
  }

  async listComments(subject: string): Promise<AtReplyComment[]> {
    const url = new URL('/xrpc/blue.microcosm.links.getBacklinks', this.indexerUrl);
    url.searchParams.set('subject', subject);
    url.searchParams.set('source', DEFAULT_SOURCE);
    url.searchParams.set('limit', '100');
    const response = await fetch(url.toString(), { cache: 'no-store', headers: { Accept: 'application/json' } });
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
      headers: { Authorization: `Bearer ${session.accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repo: session.did,
        collection: this.collection,
        record: { $type: this.collection, text: input.text, subject: input.subject, parentUri: input.parentUri, createdAt: new Date().toISOString() },
      }),
    });
    if (!response.ok) throw new Error(`Failed to create comment: ${response.status}`);
    return response.json();
  }
}
