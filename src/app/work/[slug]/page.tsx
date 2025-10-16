import CaseStudyClient from '@/components/CaseStudyClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === 'ipower') {
    return {
      title: "iPower Case Study - Electrical Engineering Website",
      description: "Explore how CTRL+BUILD created a comprehensive digital presence for iPower, Lebanon's electrical engineering solutions provider. Web design, development, and SEO optimization.",
      keywords: [
        "iPower case study",
        "electrical engineering website",
        "Lebanon web design",
        "electrical solutions website",
        "web development case study",
        "SEO optimization",
        "digital strategy",
        "professional website design"
      ],
      openGraph: {
        title: "iPower Case Study - Electrical Engineering Website | CTRL+BUILD",
        description: "Explore how CTRL+BUILD created a comprehensive digital presence for iPower, Lebanon's electrical engineering solutions provider.",
        url: "https://ctrlbuild.com/work/ipower",
        type: "article",
        images: [
          {
            url: "/assets/images/featured-2.png",
            width: 1200,
            height: 630,
            alt: "iPower Website - Electrical Engineering Solutions",
          },
        ],
      },
      alternates: {
        canonical: "/work/ipower",
      },
    };
  }

  return {
    title: "Project Case Study | CTRL+BUILD",
    description: "Explore CTRL+BUILD's project case studies and digital architecture solutions.",
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <CaseStudyClient params={resolvedParams} />;
}