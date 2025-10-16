import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import OurApproach from "@/components/OurApproach";
// import ValuedPartnerships from "@/components/ValuedPartnerships";
import StartConversation from "@/components/StartConversation";

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
