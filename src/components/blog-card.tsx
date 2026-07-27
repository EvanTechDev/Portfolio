import Link from "next/link";
import { formatDateYMD } from "@/lib/utils";

interface BlogPost {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="space-y-1">
        <h2 className="text-lg group-hover:text-blue-500 transition-colors">
          {post.title}
        </h2>
        <time className="text-sm text-muted-foreground">
          {formatDateYMD(post.publishedAt)}
        </time>
      </article>
    </Link>
  );
}
