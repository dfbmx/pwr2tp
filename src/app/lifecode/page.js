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
const BioNews = dynamic(() => import('../components/bionews'));
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
            image: '/images/blog/7.jpg',
            title: 'Genetic Engineering',
            desc: 'Develop innovative solutions in genetic engineering to enhance human capabilities and longevity.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/8.jpg',
            title: 'Wearable Technology',
            desc: 'Design cutting-edge wearable devices that integrate seamlessly with the human body and augment its functions.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/9.jpg',
            title: 'Health Paradigms',
            desc: 'Revolutionize health paradigms by exploring new approaches to wellness, disease prevention, and longevity.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/10.jpg',
            title: 'Biodata Analytics',
            desc: 'Leverage biodata analytics to gain insights into human health and develop personalized solutions.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/11.jpg',
            title: 'Regenerative Medicine',
            desc: 'Explore the potential of regenerative medicine to repair and regenerate damaged tissues and organs.'
        },
        {
            icon: RiTeamFill,
            image: '/images/blog/12.jpg',
            title: 'Biohacking Community',
            desc: 'Join the vibrant community of biohackers and contribute to the advancement of human potential.'
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
              <h3 className="mb-4 md:text-3xl md:leading-normal hover-gradient-amber-5 text-2xl leading-normal font-semibold">LifeCode Biohacking Hackathon</h3>
              <p className="text-white font-semibold max-w-xl mx-auto">Explore genetics, wearable technology, and new health paradigms to enhance human capabilities and longevity.</p>
            </div>
            <Slider ref={sliderRef} {...settings}>
              {casesData.map((item, index) => {
                const Icon = item.icon;
                return (
                    (<div className="relative blur-sm hover:blur-none p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
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
          <BioNews />
          <AboutThree />
         
        </section>
        <Footer />
    </>);
}