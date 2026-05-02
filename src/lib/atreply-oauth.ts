"use client";

import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import type { AtReplySession } from './atreply';

function toSession(raw: any): AtReplySession | null {
  if (!raw) return null;
  return {
    did: raw.did,
    handle: raw.handle,
    accessToken: raw.accessJwt ?? raw.accessToken,
    pdsUrl: raw.pdsUrl ?? raw.aud ?? 'https://bsky.social',
  };
}

async function createOAuthClient() {
  const response = await fetch('/client-metadata.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to load client metadata');
  const clientMetadata = await response.json();
  return new (BrowserOAuthClient as any)({
    clientMetadata,
    handleResolver: 'https://public.api.bsky.app',
  });
}

export async function restoreOAuthSession() {
  try {
    const client = await createOAuthClient();
    const hasOauthParams = window.location.search.includes('code=') || window.location.search.includes('iss=');
    if (hasOauthParams) {
      const result = await client.callback?.(window.location.href);
      window.history.replaceState({}, document.title, window.location.pathname);
      return toSession(result?.session ?? result);
    }
    return toSession(await client.restore?.());
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function beginOAuthSignIn(handle: string) {
  const client = await createOAuthClient();
  const url = await client.authorize?.(handle, { scope: 'atproto transition:generic' });
  if (!url) throw new Error('Unable to start OAuth flow.');
  window.location.href = url;
}
