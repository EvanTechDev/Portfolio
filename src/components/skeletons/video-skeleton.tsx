export function VideoSkeleton() {
  return (
    <div className="space-y-4 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-muted rounded-lg" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-1/2" />
    </div>
  );
}
