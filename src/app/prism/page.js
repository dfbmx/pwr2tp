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
const Pricing = dynamic(() => import('../components/pricingartists'));
const ArtNews = dynamic(() => import('../components/artnews'));
const ArtContest = dynamic(() => import('../components/artcontest'));
const Cloud = dynamic(() => import('../components/cloud'));
const ArtRules = dynamic(() => import('../components/artrules'));

import { FaFileContract, GiTeamIdea, GiStairsGoal, FaTools, GiTribunalJury, FaAward, RiLightbulbFlashFill, RiTeamFill } from '../assets/icons/vander';

export default function Services() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const casesData = [
        {
            icon: FaFileContract,
            image: '/images/blog/artists.jpg',
            title: 'Sign-Up',
            desc: 'A unique artist pass, mintable for 0.001 ETH, serves as the entry ticket, if you are a student you do not need to pay for mint fees, just upload your institution ID or put the name of your institution to get the discount.'
        },
        {
            icon: GiTeamIdea,
            image: '/images/blog/2.jpg',
            title: 'Team Formation',
            desc: 'Join a team or build solo, you can join among pre-formed groups or post a message for spontaneous alliances.'
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
          image: '/images/blog/submit.jpg',
          title: 'Eligibility',
          desc: 'Open globally to artists and groups over 18, or under 18 with guardian consent signed on-chain.'
      },
      {
          icon: RiLightbulbFlashFill,
          image: '/images/blog/criteria.jpg',
          title: 'Submission Criteria',
          desc: 'Include a detailed description of the artwork\'s concept, tools used, and its relevance. Submissions must utilize generative art methods and meet the deadline, Touchdesigner, Hydra, Processing, etc. are welcome along with traditional art methods or unravel new hybrid ones'
      },
      {
          icon: RiLightbulbFlashFill,
          image: '/images/blog/guidelines.jpg',
          title: 'Content and Creativity Guidelines',
          desc: 'Art must respect all humans, avoid politics, religion, sensitive or violent topics, and be family-friendly if erotic. Balance AI with creative processes to enhance artistry, use of Mid Journey, Dall-e, RunwayML are ok to use but go beyond a simple prompt.'
      },
      {
          icon: RiLightbulbFlashFill,
          image: '/images/blog/copyright.jpg',
          title: 'No Copyright Violation',
          desc: 'Submissions must be original and created for the contest. Ensure all components are legally obtained and respect intellectual property rights, past works, remixes, modifications, alterations, derivatives and/or look-a-likes of published works are stricly forbbiden even tho the copyright holder express consent to use them, be creative and start from scratch is funnier that way.'
      },
      {
          icon: RiLightbulbFlashFill,
          image: '/images/blog/integrations.jpg',
          title: 'Integrations',
          desc: 'Dynamic or interactive pieces should be compatible with web technologies like HTML5 and WebGL to enhance accessibility. Artists are encouraged to document and share their creative journey, including code snippets and videos of behind the scenes/tests.'
    },
      {
          icon: RiLightbulbFlashFill,
          image: '/images/blog/judges.jpg',
          title: 'Selection Process',
          desc: 'Judges will evaluate entries based on artistic and technical merit, innovative use of technology, and adherence to the theme. Additionally, a community prize will be awarded to the artwork that is minted the most by attendees on event grounds, ensuring active participation and fairness in the selection process.'
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
        <NavLight />
        <Cloud />
        <section className="relative md:py-24 py-16">
          <div className="container relative md:mt-24 mt-16">
            <div className="grid  grid-cols-1 pb-6 text-center">
            <h3 className="mb-4  md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Prism Art Contest</h3> <p className="text-white rounded-xl  bg-black bg-opacity-50">Explore the captivating fusion of math and art in our prism contest. Create stunning algorithmic artworks embodying acceleration. Top prize: $10,000.</p>
            </div>
            <Slider ref={sliderRef} {...settings}>
              {casesData.map((item, index) => {
                const Icon = item.icon;
                return (
                    (<div className="relative blur-xl hover:blur-none p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
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
  <div className="my-4 rounded-xl  bg-black bg-opacity-50 text-center">
  <h5>Contest Guidelines</h5>
</div>
<ArtRules />
<ArtContest />
<Pricing />

          </div>
          <ArtNews />
          <AboutThree />
         
        </section>
        <Footer />
    </>);
}