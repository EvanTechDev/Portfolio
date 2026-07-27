import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

type BlogPost = {
  metadata: Metadata;
  slug: string;
  source: string;
};

type WhiteWindBlogRecord = {
  $type?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  visibility?: string;
};

type ListRecordsResponse = {
  records?: Array<{
    uri?: string;
    value?: WhiteWindBlogRecord;
  }>;
};

function getEnv(name: "BSKY_PDS" | "BSKY_HANDLE") {
  return process.env[name];
}

function normalizePdsUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function getSlugFromAtUri(uri: string) {
  const parts = uri.split("/");
  return parts[parts.length - 1] ?? uri;
}

function toSummary(markdown: string, maxLength = 180) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}...`;
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

let postsCache: Promise<BlogPost[]> | null = null;

async function fetchBlogPostsFromWhiteWind() {
  const rawPds = getEnv("BSKY_PDS");
  const handle = getEnv("BSKY_HANDLE");

  if (!rawPds || !handle) {
    return [];
  }

  const pds = normalizePdsUrl(rawPds);

  const listRecordsUrl = new URL(`${pds}/xrpc/com.atproto.repo.listRecords`);
  listRecordsUrl.searchParams.set("repo", handle);
  listRecordsUrl.searchParams.set("collection", "com.whtwnd.blog.entry");
  listRecordsUrl.searchParams.set("limit", "100");

  const response = await fetch(listRecordsUrl.toString(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch WhiteWind blog records: ${response.status}`);
  }

  const data = (await response.json()) as ListRecordsResponse;
  const records = data.records ?? [];

  const mappedPosts = await Promise.all(
    records
      .filter((record) => {
        const value = record.value;
        return (
          value?.$type === "com.whtwnd.blog.entry" &&
          value.visibility === "public" &&
          typeof value.title === "string" &&
          typeof value.content === "string" &&
          typeof value.createdAt === "string" &&
          typeof record.uri === "string"
        );
      })
      .map(async (record) => {
        const value = record.value as Required<
          Pick<WhiteWindBlogRecord, "$type" | "title" | "content" | "createdAt" | "visibility">
        >;
        const slug = getSlugFromAtUri(record.uri as string);

        return {
          slug,
          metadata: {
            title: value.title,
            publishedAt: value.createdAt,
            summary: toSummary(value.content),
          },
          source: await markdownToHTML(value.content),
        };
      })
  );

  return mappedPosts;
}

export async function getBlogPosts() {
  if (!postsCache) {
    postsCache = fetchBlogPostsFromWhiteWind();
  }

  return postsCache;
}

export async function getPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
