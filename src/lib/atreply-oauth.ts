"use client";

import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import type { AtReplySession } from './atreply';

const SESSION_STORAGE_KEY = 'atreply_oauth_session';
const RETURN_TO_STORAGE_KEY = 'atreply_oauth_return_to';
export const ATREPLY_SESSION_EVENT = 'atreply:session-changed';

function toSession(raw: any): AtReplySession | null {
  if (!raw) return null;
  return {
    did: raw.did,
    handle: raw.handle,
    accessToken: raw.accessJwt ?? raw.accessToken,
    pdsUrl: raw.pdsUrl ?? raw.aud ?? 'https://bsky.social',
  };
}

function persistSession(session: AtReplySession | null) {
  if (typeof window === 'undefined') return;
  if (session) {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
  window.dispatchEvent(new CustomEvent(ATREPLY_SESSION_EVENT, { detail: session }));
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
    const hasOauthParams =
      window.location.search.includes('code=') ||
      window.location.search.includes('iss=') ||
      window.location.hash.includes('code=') ||
      window.location.hash.includes('iss=');
    if (hasOauthParams) {
      const result = await client.callback?.(window.location.href);
      const session = toSession(result?.session ?? result);
      persistSession(session);
      const returnTo = window.sessionStorage.getItem(RETURN_TO_STORAGE_KEY);
      window.sessionStorage.removeItem(RETURN_TO_STORAGE_KEY);
      window.history.replaceState({}, document.title, window.location.pathname);
      if (returnTo && returnTo !== window.location.pathname) {
        window.location.replace(returnTo);
      }
      return session;
    }
    const restored = toSession(await client.restore?.());
    if (restored) {
      persistSession(restored);
      return restored;
    }
    const localSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return localSession ? toSession(JSON.parse(localSession)) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function beginOAuthSignIn(handle: string) {
  const client = await createOAuthClient();
  const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.sessionStorage.setItem(RETURN_TO_STORAGE_KEY, returnTo || '/');
  const url = await client.authorize?.(handle, { scope: 'atproto transition:generic' });
  if (!url) throw new Error('Unable to start OAuth flow.');
  window.location.href = url;
}
