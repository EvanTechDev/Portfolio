
export function CartSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded w-1/4" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <div className="aspect-video bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
