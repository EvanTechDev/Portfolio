import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
  const reqOrigin = new URL(request.url).origin;
  const baseUrl = envBase || reqOrigin;

  const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
  const redirectUrl = isLocalhost ? 'http://127.0.0.1:3000' : `${baseUrl}/blog`;
  const clientId = isLocalhost
    ? 'http://localhost?redirect_uri=http://127.0.0.1:3000'
    : `${baseUrl}/client-metadata.json`;

  return NextResponse.json({
    client_id: clientId,
    application_type: 'web',
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    scope: 'atproto transition:generic',
    redirect_uris: [redirectUrl],
    token_endpoint_auth_method: 'none',
    dpop_bound_access_tokens: true,
  });
}
