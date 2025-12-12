import { Metadata } from 'next';
import { DATA } from '@/data/resume';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const canonicalUrl = `${DATA.url}/blog/${params.slug}`;
  
  return {
    metadataBase: new URL(DATA.url),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
