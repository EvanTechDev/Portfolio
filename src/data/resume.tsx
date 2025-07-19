import { Icons } from "@/components/icons";
import { Description } from "@radix-ui/react-dialog";
import { url } from "inspector";
import { HomeIcon, NotebookIcon, ThumbsDown, VideoIcon, FolderIcon } from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "Evan Huang",
  initials: "Evan",
  url: "https://github.com/EvanTechDev/",
  location: "China",
  locationLink: "",
  description:
    "A Frontend Developer. Let's connect!",
  summary:
    "Hello My name is Evan, I'm an engineer specializing in web development, mastering React, Next.js, TypeScript. I'm currently focus on front-end development.❤️  As for the future development direction, I look forward to continuous learning and growth.🌱",
  avatarUrl: "/Evan.jpg",
  skills: [
    "React.js",
    "Next.js",
    "Typescript",
    "JavaScript",
    "TailwindCSS",
    "Node.js",
    "Git",
    "PostgreSQL",
    "Python"
  ],
  videos: [
    {
      title: "Track Your Coding time for free",
      description: "Learn how to track your code time with complete analytics and insights.",
      thumbnail: "/video1.avif",
      url: "https://youtu.be/tBatfQjWxCg?si=sy2vZbCHoIYNME-3",
      date: "2024-05-15"
    },
    {
      title: "Fix multi-cursor in VS Code",
      description: "Simple trick to fix multi-cursor in VS Code.",
      thumbnail: "/video2.avif",
      url: "https://youtu.be/E9h7M6ZK_tA?si=ykzV7ARU4VMnbBRo",
      date: "2024-07-01"
    },
    {
     title: "Twitter(X)'s monetization (Hindi)",
     description: "Is the policy broken? Let's find out.",
     thumbnail: "/video3.avif",
     url: "https://youtu.be/Z3h1jt6jKLY?si=blL4l4FNco9WW9FT",
     date: "2024-11-04"
    },
    {
      title:"How to fix any kind of ban in twitter (Hindi)",
      description: "Learn how to fix any kind of ban in twitter.",
      thumbnail: "/video4.avif",
      url:"https://youtu.be/P7JRFrcXlQU",
      date: "2024-12-24"
    },
    {
      title:"Microsoft's new shocking move (Hindi)",
      description: "GitHub Copilot is now free for everyone, let's see what's the catch.",
      thumbnail: "/video5.avif",
      url:"https://www.youtube.com/watch?v=uIJOUe8T3_I",
      date: "2024-12-19"
    },
    {
      title:"How to run DeepSeek R1 model locally (Hindi)",
      description:"Learn how to run DeepSeek R1 model locally, in easy steps",
      thumbnail: "/video6.avif",
      url:"https://youtu.be/BgB2pW6QgVg",
      date: "2025-01-29"
    },
    {
      title:"How to do zoom in and out video recording in Windows for free. (Hindi)",
      description:"Learn how to do zoom in and out video recording in Windows for free.",
      thumbnail: "/video7.avif",
      url:"https://youtu.be/WziGdEiT9fE",
      date: "2025-03-16"
    }
    
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
  ],
  contact: {
    email: "evan.huang000@proton.me",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/EvanTechDev",
        icon: Icons.github,
        navbar: true,
      },
      Threads: {
        name: "Threads",
        url: "https://threads.net/@evan.tech",
        icon: Icons.threads,
        navbar: true,
      },
      Bluesky: {
        name: "Bluesky",
        url: "https://bsky.app/profile/e.xyehr.cn",
        icon: Icons.bluesky,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/EvanTechDev",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://youtube.com/@EvanTechDev",
        icon: Icons.youtube,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/evan.dev",
        icon: Icons.instagram,
        navbar: true,
      },
      Telegram: {
        name: "Telegram",
        url: "https://evantechdev.t.me",
        icon: Icons.telegram,
        navbar: true,
      },
      Signal: {
        name: "Signal",
        url: "https://signal.me/#eu/LPSp6Cqhc0hdrV50dcwPhoG1fyvOTQklMmjVnZEr-KVasz3wPiRPYZZ1eyjM5BwZ",
        icon: Icons.signal,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto: evan.huang000@proton.me",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Tech-Art Studio",
      href: "https://xyehr.cn",
      badges: [],
      location: "China",
      title: "Founder | Developer | Marketing",
      logoUrl: "/R_20240629_124936_0000.png",
      start: "June 2024",
      end: "Present",
      description:
        "Founded a community-driven web development studio focused on delivering high-quality websites and custom digital solutions. Open to participation from developers of all skill levels, the studio embraces collaboration throughout the development process, from project ideation and planning to design implementation and deployment.",
    },
  ],
  education: [
    {
      school: "Trident Academy Of Technology",
      href: "https://tat.ac.in/",
      degree: "B.Tech in Computer Science and Information Technology",
      logoUrl: "/buildspace.webp",
      start: "2020",
      end: "2024",
    },
    {
      school: "Netaji Subhas Memorial City College",
      href: "https://www.nsmcity.ac.in/index.asp",
      degree: "Higher Secondary",
      logoUrl: "/waterloo.webp",
      start: "2019",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "One Calendar",
      href: "https://calendar.xyehr.cn",
      dates: "September 2024 - Now",
      active: true,
      description:
        "One Calendar is a calendar web app that uses React + Vercel/blob for storage. It has rich features: address book, notes, bookmarks, to-do lists and analysis features! 📅",
      technologies: [
        "Next.js",
        "React",
        "TailwindCSS",
        "TypeScript",
        "shadcnUI",
      ],
      links: [
        {
          type: "Website",
          href: "https://calendar.xyehr.cn",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EvanTechDev/One-Calendar",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Banner.jpg",
      video: "",
    },
    {
      title: "Mail",
      href: "https://mail.xyehr.cn/",
      dates: "January 2025 - March 2025",
      active: true,
      description:
        "This is a resend email sending web application built with NextJS, Password protected.",
      technologies: [
        "React.js",
        "Resend",
        "shadcnUI",
        "Next.js",
        "Typescript",
      ],
      links: [
        {
          type: "Website",
          href: "https://mail.xyehr.cn/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/EvanTechDev/Mail",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "Mail.jpg",
      video: "",
    },
    ],
  hackathons: [
    {
      title: "Next.js Global Hackathon",
      dates: "April 7, 2025",
      location: "",
      description:
        "first global Next.js hackathon",
      image:
        "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/8q/17eb732e-b863-423f-9b5a-03a8170f258e.jpg",
      mlh: "https://next-hackathon-2025.vercel.app/",
      links: [],
    },
  ],
} as const;
