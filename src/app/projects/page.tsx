import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";
import { DATA } from "@/data/resume";
import { ProjectSkeleton } from "@/components/skeletons/project-skeleton";
import { BorderBeam } from "@/components/magicui/border-beam";

export const metadata = {
  title: "Projects",
  description: "Check out my latest projects and experiments.",
};

const BLUR_FADE_DELAY = 0.04;

const ProjectCard = dynamic(() => import("@/components/project-card").then(mod => mod.ProjectCard), {
  loading: () => <ProjectSkeleton />
});

export default function ProjectsPage() {
  return (
    <section>
      <div 
      className="relative min-h-screen bg-background"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23595959' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    >
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">projects</h1>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {DATA.projects.map((project, id) => (
          <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
            <div className="relative overflow-hidden rounded-xl">
              <BorderBeam
                duration={4}
                size={300}
                reverse
                className="from-transparent via-purple-500 to-transparent"
              />
              <ProjectCard {...project} />
            </div>
          </BlurFade>
        ))}
      </div>
      </div>
    </section>
  );
}
