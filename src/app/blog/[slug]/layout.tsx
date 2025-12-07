import { Metadata } from "next";
import { DATA } from "@/data/resume";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalUrl = `${DATA.url}/blog/${slug}`;
  return {
    metadataBase: new URL(DATA.url),
    alternates: { canonical: canonicalUrl },
  };
}

export default async function BlogLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ slug: string }> 
}) {
  await params;
  return <>{children}</>;
}
