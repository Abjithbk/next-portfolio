export type Skill = {
  name: string;
  level: number;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export type Experience = {
  title: string;
  period: string;
  detail: string;
};

export const profile = {
  firstName: "Abjith",
  lastName: "BK",
  fullName: "Abjith B K",
  title: "Full Stack Developer",
  location: "Kerala, India",
  email: "hello@example.com",
  intro:
    "I design and develop fast, scalable products with a strong focus on visual identity, delightful user interactions, and clean architecture.",
  about:
    "I am an aspiring Full Stack Developer passionate about building products that are beautiful, performant, and meaningful. My current focus is Next.js and TypeScript, while continuously leveling up backend design and cloud deployment skills.",
};

export const stats = [
  { value: "12+", label: "Projects Built" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2+", label: "Years Learning & Building" },
];

export const skills: Skill[] = [
  { name: "TypeScript", level: 90 },
  { name: "Next.js", level: 88 },
  { name: "React", level: 92 },
  { name: "Node.js", level: 80 },
  { name: "Tailwind CSS", level: 94 },
  { name: "MongoDB", level: 76 },
];

export const projects: Project[] = [
  {
    title: "Neon Cart Commerce",
    description:
      "A full-stack e-commerce platform with blazing-fast product search, secure checkout flow, and analytics dashboard.",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    href: "#",
  },
  {
    title: "FlowTask Workspace",
    description:
      "A collaborative task manager with drag-and-drop boards, team comments, and real-time notifications.",
    tags: ["React", "Socket.io", "Node", "PostgreSQL"],
    href: "#",
  },
  {
    title: "Visionary Portfolio CMS",
    description:
      "A customizable portfolio builder with glass-themed templates, markdown content blocks, and theme controls.",
    tags: ["Next.js", "MDX", "Framer Motion", "Vercel"],
    href: "#",
  },
];

export const experience: Experience[] = [
  {
    title: "Freelance Full Stack Developer",
    period: "2024 - Present",
    detail:
      "Building responsive web products, improving Lighthouse performance, and delivering production deployments.",
  },
  {
    title: "Computer Science Student",
    period: "B.Tech Ongoing",
    detail:
      "Focused on software engineering, DSA, and cloud-native development with modern JavaScript frameworks.",
  },
];
