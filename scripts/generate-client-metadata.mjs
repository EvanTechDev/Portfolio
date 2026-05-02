import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_BASE_URL is required to generate client-metadata.json');
}

const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
const outputPath = resolve(process.cwd(), 'public', 'client-metadata.json');

const metadata = {
  client_id: `${normalizedBaseUrl}/client-metadata.json`,
  application_type: 'web',
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  scope: 'atproto transition:generic',
  redirect_uris: [`${normalizedBaseUrl}/blog`],
  token_endpoint_auth_method: 'none',
  dpop_bound_access_tokens: true,
};

await mkdir(resolve(process.cwd(), 'public'), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
console.log(`Generated ${outputPath}`);
