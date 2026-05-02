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

export type AtReplyOAuthProvider = {
  signIn: () => Promise<AtReplySession>;
  restoreSession?: () => Promise<AtReplySession | null>;
  signOut?: () => Promise<void>;
};

export type AtReplyClientOptions = {
  oauth: AtReplyOAuthProvider;
  indexerUrl?: string;
  collection?: string;
};

const DEFAULT_COLLECTION = 'app.atreply.comment';
const DEFAULT_INDEXER_URL = 'https://constellation.microcosm.blue';

export class AtReplyClient {
  private readonly oauth: AtReplyOAuthProvider;
  private readonly collection: string;
  private readonly indexerUrl: string;
  private session: AtReplySession | null = null;

  constructor(options: AtReplyClientOptions) {
    this.oauth = options.oauth;
    this.collection = options.collection ?? DEFAULT_COLLECTION;
    this.indexerUrl = options.indexerUrl ?? DEFAULT_INDEXER_URL;
  }

  async getSession() {
    if (this.session) return this.session;
    this.session = (await this.oauth.restoreSession?.()) ?? null;
    return this.session;
  }

  async signIn() {
    this.session = await this.oauth.signIn();
    return this.session;
  }

  async signOut() {
    await this.oauth.signOut?.();
    this.session = null;
  }

  async listComments(subject: string): Promise<AtReplyComment[]> {
    const url = new URL('/xrpc/app.atreply.searchComments', this.indexerUrl);
    url.searchParams.set('subject', subject);
    url.searchParams.set('collection', this.collection);

    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load comments: ${response.status}`);
    }

    const data = (await response.json()) as { comments?: AtReplyComment[] };
    return data.comments ?? [];
  }

  async createComment(input: { subject: string; text: string; parentUri?: string }) {
    const session = (await this.getSession()) ?? (await this.signIn());

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

    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.status}`);
    }

    return response.json();
  }
}

export function createLocalStorageOAuthProvider(storageKey = 'atreply_session'): AtReplyOAuthProvider {
  return {
    async signIn() {
      throw new Error('Provide a real atproto OAuth signIn() implementation in your app.');
    },
    async restoreSession() {
      if (typeof window === 'undefined') return null;
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return null;
      return JSON.parse(raw) as AtReplySession;
    },
    async signOut() {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(storageKey);
    },
  };
}
