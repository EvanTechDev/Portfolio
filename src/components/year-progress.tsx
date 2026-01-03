"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function YearProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    const totalMs = endOfYear.getTime() - startOfYear.getTime();
    const passedMs = now.getTime() - startOfYear.getTime();

    const value = Math.floor((passedMs / totalMs) * 100);
    setPercent(value);
  }, []);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>{new Date().getFullYear()} 年已过去</span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
