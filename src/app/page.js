'use client'
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";


const Navbar = dynamic(()=>import('./components/navbar'))
const Footer = dynamic(() => import('./components/footer'))
const BrandLogo = dynamic(()=>import('./components/brandLogo'))
const AboutThree = dynamic(()=>import('./components/aboutThree'))
const AiFeatures = dynamic(()=>import('./components/aiFeatures'))
const AboutOne = dynamic(()=>import('./components/aboutOne'))
const AboutTwo = dynamic(()=>import('./components/aboutTwo'))
const Pricing = dynamic(()=>import('./components/pricing'))
const Blogs = dynamic(() => import('./components/blogs'))
const Features = dynamic(()=>import('./components/features'))
const ThreeBg = dynamic(() => import('./three/page'), {
    ssr: false,});
    


export default function IndexThree() {
  const containerRef = useRef(null);

  useEffect(() => {
  
    // Set dark mode as default
    const darkModeButton = document.querySelector('.dark-mode-btn');
    if (darkModeButton) {
      darkModeButton.click();
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="relative md:py-48 py-36 items-center mt-[74px] md:rounded-3xl overflow-hidden">
        <div className="absolute top-0 start-0 w-full h-full z-10" ref={containerRef}>
          <ThreeBg containerRef={containerRef} />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
      </section>
      <section className="pt-6">
        <BrandLogo/>
      </section>

      <section className="relative md:pb-24 pb-16">
        <AboutThree/>
        <Features classlist ="container relative md:mt-24 mt-16"/>
        <AboutOne />
        <AboutTwo/>
        <AiFeatures/>
        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Tickets</h3> 
          <p className="text-slate-400 max-w-xl mx-auto">Choose from our range of ticket options designed to suit your needs and budget. Do not miss out on this transformative experience.</p> 
          </div>
          <Pricing/>
   
        </div>
        <Blogs/>
      </section>
      <Footer/>
    </>
  )
}
