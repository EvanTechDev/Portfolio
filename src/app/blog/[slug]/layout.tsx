import { Metadata } from 'next';
import { DATA } from '@/data/resume';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const canonicalUrl = `${DATA.url}/blog/${params.slug}`;

  return {
    metadataBase: new URL(DATA.url),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <>{children}</>;
}
