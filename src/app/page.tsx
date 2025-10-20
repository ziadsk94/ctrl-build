import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import OurApproach from "@/components/OurApproach";
// import ValuedPartnerships from "@/components/ValuedPartnerships";
import StartConversation from "@/components/StartConversation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development in Craiova, Romania | CTRL+BUILD",
  description:
    "CTRL+BUILD, a digital architecture and design studio in Craiova, Romania. High-performance web design, development and SEO.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Web Design & Development in Craiova, Romania | CTRL+BUILD",
    description:
      "CTRL+BUILD, a digital architecture and design studio in Craiova, Romania. High-performance web design, development and SEO.",
    url: "https://ctrlbuild.com/",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedWork />
      <OurApproach />
      {/* <ValuedPartnerships /> */}
      <StartConversation />
    </div>
  );
}
