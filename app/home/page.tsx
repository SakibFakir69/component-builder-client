import Hero5 from "@/components/landing/HeroPage";
import React from "react";
import PricingSection from "../priceing/page";
import Testimonial from "@/components/landing/Testimonial";
import TeamMember3 from "@/components/landing/OurTeam";
import FaqPage from "@/components/faq/page";
import PricingSection2 from "@/components/landing/Pricing";

function HomePage() {
  return (
    <div>
      <Hero5 />
      <PricingSection2/>
      
      <Testimonial />
      <TeamMember3 />
      <FaqPage />
    </div>
  );
}

export default HomePage;
