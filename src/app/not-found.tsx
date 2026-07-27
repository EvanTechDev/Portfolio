import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground">It's not our fault, it's your fault</p>
      <Link 
        href="/"
        className="underline underline-offset-4 hover:text-primary"
      >
        Return Home
      </Link>
    </div>
  )
} 
