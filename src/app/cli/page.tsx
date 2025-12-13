'use client';

import { CliInterface } from "@/components/cli-interface";
import { useRouter } from "next/navigation";

export default function CliPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      <CliInterface 
        onGuiCommand={() => router.push('/')} 
      />
    </div>
  );
} 
