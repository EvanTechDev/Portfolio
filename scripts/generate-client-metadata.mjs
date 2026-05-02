import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_BASE_URL is required to generate client-metadata.json');
}

const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
const isLocalhost = normalizedBaseUrl.includes('localhost') || normalizedBaseUrl.includes('127.0.0.1');
const redirectUrl = isLocalhost ? 'http://127.0.0.1:3000' : `${normalizedBaseUrl}/blog`;
const clientId = isLocalhost ? 'http://localhost?redirect_uri=http://127.0.0.1:3000' : `${normalizedBaseUrl}/client-metadata.json`;
const outputPath = resolve(process.cwd(), 'public', 'client-metadata.json');

const metadata = {
  client_id: clientId,
  application_type: 'web',
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  scope: 'atproto transition:generic',
  redirect_uris: [redirectUrl],
  token_endpoint_auth_method: 'none',
  dpop_bound_access_tokens: true,
};

await mkdir(resolve(process.cwd(), 'public'), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
console.log(`Generated ${outputPath}`);
