'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const NavLight = dynamic(() => import('../components/navlight'));
const Footer = dynamic(() => import('../components/footer'));
const AboutThree = dynamic(() => import('../components/aboutThree'));
const Pricing = dynamic(() => import('../components/pricinghackers'));
const RoboticNews = dynamic(() => import('../components/roboticnews'));
const Hackathons    = dynamic(() => import('../components/hackathons'));
const HackathonRules    = dynamic(() => import('../components/hackathonrules'));
const Sparks = dynamic(() => import('../components/sparks'));

import { FaFileContract, GiTeamIdea, GiStairsGoal, FaTools, GiTribunalJury, FaAward, RiLightbulbFlashFill, RiTeamFill } from '../assets/icons/vander';

export default function Services() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const casesData = [
        {
            icon: FaFileContract,
            image: '/images/blog/1.jpg',
            title: 'Sign-Up',
            desc: 'A unique hacker pass, mintable for 0.001 ETH, serves as the entry ticket, if you are a student you do not need to pay for mint fees, just upload your institution ID or put the name of your institution to get the discount.'
        },
        {
            icon: GiTeamIdea,
            image: '/images/blog/2.jpg',
            title: 'Team Formation',
            desc: 'Join a team or hack solo, you can join among pre-formed groups or post a message for spontaneous alliances.'
        },
        {
            icon: GiStairsGoal,
            image: '/images/blog/3.jpg',
            title: 'Challenge Selection',
            desc: 'Select your challenge arena or if you feel brave opt for cross-participation to build multi experiences.'
        },
        {
            icon: FaTools,
            image: '/images/blog/4.jpg',
            title: 'Development',
            desc: 'This is a speed competition against yourself, a 48-hour marathon to ideate, develop, and prototype innovative solutions.'
        },
        {
            icon: GiTribunalJury,
            image: '/images/blog/5.jpg',
            title: 'Submission & Judging',
            desc: 'Submit detailed project documentation and a video pitch, judged on innovation, execution, and , we value ideas and projects over aesthetics.'
        },
        {
            icon: FaAward,
            image: '/images/blog/6.jpg',
            title: 'Awards Ceremony',
            desc: 'The glory is yours in a live-streamed event celebrating the brightest ideas and crowning the rulers of innovation.'
        },
        {
                icon: RiLightbulbFlashFill,
                image: "/images/blog/25.jpg",
                title: "Robotic Process Automation",
                desc: "Develop and integrate robotic process automation solutions to streamline enterprise operations and enhance workflow efficiency."
            },
            {
                icon: RiLightbulbFlashFill,
                image: "/images/blog/26.jpg",
                "title": "Smart Home Automation",
                "desc": "Create innovative solutions to automate home environments, enhancing comfort, energy efficiency, and security."
            },
            {
                icon: RiLightbulbFlashFill,
                "image": "/images/blog/27.jpg",
                "title": "AI-Powered Analytics",
                "desc": "Harness the power of artificial intelligence to automate data analysis, uncovering actionable insights and predictive outcomes."
            },
            {
                icon: RiLightbulbFlashFill,
                "image": "/images/blog/28.jpg",
                "title": "Automated Healthcare Solutions",
                "desc": "Innovate in the field of healthcare with automation technologies that improve patient care and operational efficiency."
            },
            {
                icon: RiLightbulbFlashFill,
                "image": "/images/blog/29.jpg",
                "title": "Autonomous Vehicles",
                "desc": "Push the boundaries of transportation with automated vehicle technologies that enhance safety and navigation."
            },
            {
                icon: RiLightbulbFlashFill,
                "image": '/images/blog/30.jpg',
                "title": "Collaborative Robotics",
                "desc": "Explore collaborative robotics to automate complex tasks, focusing on human-robot interaction and co-working environments."
            },
        
        {
            icon: RiTeamFill,
            image: '/images/blog/12.jpg',
            title: 'Robotics Community',
            desc: 'Join the vibrant community of builders and contribute to the advancement of human potential.'
        }
    ];

    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () => setUpdateCount(updateCount + 1),
      beforeChange: (current, next) => setSlideIndex(next),
      adaptiveHeight: true
    };

    return (<>
    <Sparks />
        <NavLight />
        <section className="relative md:py-24 py-16">
          <div className="container relative md:mt-24 mt-16">
            <div className="grid grid-cols-1 pb-6 text-center">
              <h3 className="mb-4 md:text-3xl md:leading-normal hover-gradient-amber-5 text-2xl leading-normal font-semibold">Automate Robotics Hackathon</h3>
              <p className="text-white font-semibold max-w-xl mx-auto">Win the challenge developing innovative robotics projects and solutions that can be applied to real-world scenarios today.</p>
            </div>
            <Slider ref={sliderRef} {...settings}>
              {casesData.map((item, index) => {
                const Icon = item.icon;
                return (
                    (<div className="relative p-6 blur-xl hover:blur-none rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
                        <div className="relative overflow-hidden h-96">
                          <Image src={item.image} alt={item.title} className="opacity-80" fill style={{
                              objectFit: "cover"
                          }} />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                            <Icon className="h-12 w-12 text-white mb-4" />
                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-m text-white px-3 text-center">{item.desc}</p>
                          </div>
                        </div>
                    </div>)
                );
              })}
            </Slider>
   
  <div className="flex justify-center mt-4">
    <input
      type="range"
      min={0}
      max={casesData.length - 1}
      value={slideIndex}
      onChange={e => sliderRef.current.slickGoTo(parseInt(e.target.value, 10))}
      className="slider"/>
               
  </div>
  <div className="my-4 text-center">
  <h5>Contest Guidelines</h5>
</div>
<HackathonRules />
<Hackathons />
<Pricing />

          </div>
          <RoboticNews />
          <AboutThree />
         
        </section>
        <Footer />
    </>);
}