import { Icons } from "@/components/icons";
import { Description } from "@radix-ui/react-dialog";
import { url } from "inspector";
import { HomeIcon, NotebookIcon, ThumbsDown, VideoIcon, FolderIcon, Medal } from "lucide-react";
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
    "Hello, my name is Evan. I’m a former Frontend Developer currently focused on my studies 📚, but still passionate about coding 💻 and problem-solving.❤️ I have strong experience with React, Next.js, and TypeScript. Although I’m dedicating more time to learning at the moment, my love for technology and curiosity for solving problems remain strong. I look forward to applying what I’ve learned in future projects and continuing to grow. 🌱",
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
      title: "Gemini Certified Educator",
      description: "A Google Certified Gemini Educator can articulate and demonstrate foundational knowledge of generative AI concepts and the core features and capabilities of Gemini within the educational context.",
      thumbnail: "/GeminiCertifiedEducator.png",
      url: "https://edu.google.accredible.com/0bed7002-73fe-40d6-9cb1-8f0ac1ee744d?key=19947581a8703cffd220da32ad1e4a089e875b5327bb1d90fd279129cc1cfd24",
      date: "2025-09-14"
    },
    {
      title: "Next.js App Router Fundamentals",
      description: "Next.js course",
      thumbnail: "/VercelAppRouter.png",
      url: "",
      date: "2025-04-30"
    },
    {
     title: "Next.js Pages Router Fundamentals",
     description: "Next.js course",
     thumbnail: "/VercelPagesRoute.png",
     url: "",
     date: "2025-06-27"
    },
    {
      title:"React Foundations for Next.js",
      description: "Next.js course",
      thumbnail: "/VercelReactFoundations.png",
      url:"",
      date: "2025-06-08"
    },
    {
      title:"Next.js SEO Fundamentals",
      description: "Next.js course",
      thumbnail: "/VercelSEO.png",
      url:"",
      date: "2025-06-24"
    },    
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    { href: "/certificates", icon: Medal, label: "Certficates" }
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
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/evan.tech",
        icon: Icons.instagram,
        navbar: true,
      },
      Medium: {
        name: "Medium",
        url: "https://medium.com/@evan-h",
        icon: Icons.medium,
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
        name: "YouTube",
        url: "https://youtube.com/@EvanTechDev",
        icon: Icons.youtube,
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
