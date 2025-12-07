"use client";

import dynamic from "next/dynamic";
import { GithubSkeleton } from "@/components/skeletons/github-skeleton";

const GithubContributions = dynamic(
  async () => {
    const mod = await import("@/components/github-calendar");
    return mod.GithubContributions;
  },
  {
    ssr: false,
    loading: () => <GithubSkeleton />,
  }
);

export default function GithubContributionsWrapper() {
  return <GithubContributions />;
}
