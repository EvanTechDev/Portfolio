import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";
import { DATA } from "@/data/resume";
import { VideoSkeleton } from "@/components/skeletons/video-skeleton";

export const metadata = {
  title: "Certificates",
  description: "Here are my certificates about technology.",
};

const BLUR_FADE_DELAY = 0.04;

const VideoCard = dynamic(() => import("@/components/video-card").then(mod => mod.VideoCard), {
  loading: () => <VideoSkeleton />
});

export default function VideosPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="videos">
    <div 
      className="relative min-h-screen bg-background"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23595959' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    >
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Certificates
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                My Certificates
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are my certificates about technology.
              </p>
            </div>
          </div>
        </BlurFade>
        
        <div className="grid gap-6 sm:grid-cols-2">
          {DATA.videos.map((video, idx) => (
            <BlurFade key={video.url} delay={BLUR_FADE_DELAY * (idx + 2)}>
              <VideoCard video={video} />
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
