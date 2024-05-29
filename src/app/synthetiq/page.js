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
const AINews = dynamic(() => import('../components/ainews'));
const Hackathons = dynamic(() => import('../components/hackathons'));
const HackathonRules = dynamic(() => import('../components/hackathonrules'));

import { FaFileContract, GiTeamIdea, GiStairsGoal, FaTools, GiTribunalJury, FaAward, RiLightbulbFlashFill, RiTeamFill } from '../assets/icons/vander';

export default function Services() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-arrow`}
                style={{ ...style, display: 'block', right: '10px' }}
                onClick={onClick}
            />
        );
    }

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-arrow`}
                style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
                onClick={onClick}
            />
        );
    }

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
            image: '/images/blog/13.jpg',
            title: 'AI and Machine Learning',
            desc: 'Develop algorithms that improve through experience. Tackle projects on neural networks, deep learning, or reinforcement learning.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/14.jpg',
            title: 'AI Ethics',
            desc: 'Address ethical issues in AI, from bias in machine learning models to decision-making in autonomous systems.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/15.jpg',
            title: 'Natural Language Processing',
            desc: 'Create solutions that process human language. Work on translation, sentiment analysis, or chatbot technologies.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/16.jpg',
            title: 'Computer Vision',
            desc: 'Harness the power of AI to interpret and understand the visual world. Work on projects involving image recognition or motion detection.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/17.jpg',
            title: 'AI in Healthcare',
            desc: 'Innovate in healthcare using AI to predict diseases, personalize treatments, or enhance diagnostic accuracy.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/18.jpg',
            title: 'AI for Robotics',
            desc: 'Develop intelligent robots that can learn from their environment and perform complex tasks autonomously.'
        },
        {
            icon: RiTeamFill,
            image: '/images/blog/12.jpg',
            title: 'Artificial Intelligence Community',
            desc: 'Join the vibrant community of AI hackers and contribute to the advancement of human potential.'
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
        adaptiveHeight: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (<>
        <NavLight />
        <section className="container mt-12 mb-12 mx-auto w-full max-w-screen-lg overflow-hidden">
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal hover-gradient-amber-5 text-2xl leading-normal font-semibold">SynthetIQ Artificial Intelligence Hackathon</h3>
                    <p className="text-white font-semibold max-w-xl mx-auto">Engage with cutting-edge AI technologies to innovate solutions in data analysis, machine learning, and automation that transform industries and enhance daily living.</p>
                </div>
                <Slider ref={sliderRef} {...settings}>
                    {casesData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div className="relative blur-xl hover:blur-none p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
                                <div className="relative overflow-hidden h-96 w-full">
                                    <Image src={item.image} alt={item.title} className="object-cover w-full h-full" layout="fill" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                                        <Icon className="h-12 w-12 text-white mb-4" />
                                        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-m text-white px-3 text-center">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
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
                        className="slider"
                    />
                </div>
                <div className="my-4 text-center">
                    <h5>Contest Guidelines</h5>
                </div>
                <HackathonRules />
                <Hackathons />
                <Pricing />
            </div>
            <AINews />
            <AboutThree />
        </section>
        <Footer />
    </>);
}
