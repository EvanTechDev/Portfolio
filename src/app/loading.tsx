import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-[100dvh] space-y-10 animate-pulse">
      <section className="mx-auto w-full max-w-2xl space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="size-28 rounded-full" />
        </div>
      </section>
      
      <section>
        <Skeleton className="h-8 w-24 mb-4" />
        <Skeleton className="h-32 w-full" />
      </section>
      
      <section>
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {Array(8).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </section>
      
      <section>
        <Skeleton className="h-8 w-24 mb-4" />
        <div className="flex flex-wrap gap-1">
          {Array(12).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </section>
    </div>
  )
}
