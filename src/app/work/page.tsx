import WorkClient from '@/components/WorkClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Work - Digital Architecture Projects",
  description: "Explore CTRL+BUILD's portfolio of digital architecture projects. From web design to development, see how we create structured, performant digital experiences.",
  keywords: [
    "portfolio",
    "web design projects",
    "web development projects",
    "digital architecture",
    "case studies",
    "iPower project",
    "electrical engineering website"
  ],
  openGraph: {
    title: "Our Work - Digital Architecture Projects | CTRL+BUILD",
    description: "Explore CTRL+BUILD's portfolio of digital architecture projects. From web design to development, see how we create structured, performant digital experiences.",
    url: "https://ctrlbuild.com/work",
    type: "website",
  },
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return <WorkClient />;
}