


import Footer from '@/components/landing/Footer'
import Hero5 from '@/components/landing/HeroPage'
import MenuBar from '@/components/landing/Navbar'
import TeamMember3 from '@/components/landing/OurTeam'
import PricingSection from '@/components/landing/Pricing'
import Testimonial from '@/components/landing/Testimonial'
import React from 'react'


function page() {
  return (
    <div>
      <MenuBar/>
      <Hero5/>  
      <PricingSection/>
      <Testimonial/>
      <TeamMember3/>
      <Footer/>




    </div>
  )
}

export default page