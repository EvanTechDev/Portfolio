import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CliButton } from "@/components/cli-button";

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      {/* Background blur layer */}
      <div className="fixed bottom-0 inset-x-0 h-16 w-full pointer-events-none bg-gradient-to-t from-background/40 via-background/25 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:from-black/30 dark:via-black/20"></div>
      
      {/* Glass dock */}
      <Dock className="z-50 relative mx-auto flex min-h-full h-full items-center px-1 
        bg-white/15 dark:bg-black/20 
        backdrop-blur-xl backdrop-saturate-150 
        rounded-2xl 
        border border-white/20 dark:border-white/10
        [background:linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))]
        dark:[background:linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.15))]
        [box-shadow:0_4px_15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_0_1px_rgba(0,0,0,0.1)]
        dark:[box-shadow:0_4px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05),0_0_0_1px_rgba(0,0,0,0.2)]
        transform-gpu
        transition-all duration-300 ease-out
        hover:bg-white/25 hover:border-white/30 hover:[box-shadow:0_8px_20px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.15),0_0_0_1px_rgba(0,0,0,0.1)]
        dark:hover:bg-black/30 dark:hover:border-white/15 dark:hover:[box-shadow:0_8px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.07),0_0_0_1px_rgba(0,0,0,0.2)]
        before:absolute before:inset-0 before:pointer-events-none before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:dark:from-white/5
        after:absolute after:inset-0 after:pointer-events-none after:rounded-2xl after:bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent_70%)] after:dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.08),transparent_70%)]">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "relative size-12 transition-colors hover:bg-white/20 dark:hover:bg-white/10"
                  )}
                >
                  <item.icon className="size-4" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <DockIcon>
          <CliButton />
        </DockIcon>
        <Separator orientation="vertical" className="h-full opacity-10 mx-1" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
