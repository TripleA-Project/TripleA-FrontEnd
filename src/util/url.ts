interface URLConfig {
  protocol?: 'http' | 'https';
  port?: number;
}

function siteBaseURL({ protocol = 'http', port = 3000 }: URLConfig = {}) {
  if (process.env?.NEXT_PUBLIC_SERVER) return process.env.NEXT_PUBLIC_SERVER;
  if (process.env?.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  if (process.env?.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return `${protocol}://localhost:${port}`;
}

export function getURL(path = '', URLConfig: URLConfig = {}) {
  const baseURL = siteBaseURL(URLConfig);

  return new URL(path, baseURL).toString();
}
