'use client';
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiHelpCircle, FiBookmark, FiSettings, FiHexagon } from '../assets/icons/vander';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { gsap } from 'gsap';

const NavLight = dynamic(() => import('../components/navlight'));
const Footer = dynamic(() => import('../components/footer'));

export default function Helpcenter() {
    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const [activeIndex, setActiveIndex] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const aboutData = useMemo(() => [
        {
            icon: FiHelpCircle,
            title: 'FAQs',
            desc: 'Basic info, how it works, pricing, and more',
        },
        {
            icon: FiBookmark,
            title: 'Guides / Support',
            desc: 'Coming Soon',
        },
    ], []);

    const accordianData = useMemo(() => [
        {
            id: 1,
            title: 'What is Power 2 The People?',
            desc: 'Power 2 The People (PWR2TP) is an event that includes hackathons, trading tournaments, art contests, expos, and speaker sessions.',
        },
        {
            id: 2,
            title: 'How can I register for the event?',
            desc: 'You can register for the event through our website by following the registration process outlined in the guides section.',
        },
        {
            id: 3,
            title: 'What activities are available at the event?',
            desc: 'The event includes hackathons, trading tournaments, art contests, expos, and speaker sessions.',
        },
        {
            id: 4,
            title: 'How do I participate in the hackathon?',
            desc: 'To participate in the hackathon, you need to register for the event and follow the guidelines provided in the support section.',
        },
        {
            id: 5,
            title: 'What is the total bounty pool for the event?',
            desc: 'The total bounty pool for the event is $110,000 USD, distributed across various hackathon categories.',
        },
        {
            id: 6,
            title: 'What are the different hackathon categories?',
            desc: 'The hackathon categories include SyntehIQ (AI Hackathon), Anon Empire (Web3 Hackathon), LifeCode (Biohacking Hackathon), and Automate (Robotics Hackathon).',
        },
        {
            id: 7,
            title: 'What is the duration of the event?',
            desc: 'The event is a 48-hour marathon of innovation, designed to challenge, inspire, and elevate participants.',
        },
        {
            id: 8,
            title: 'How are winners selected?',
            desc: 'Winners are selected based on innovation and creativity, execution, and presentation. Detailed project documentation, a functional prototype, and a compelling video pitch are required for judging.',
        },
        {
            id: 9,
            title: 'What support is available during the event?',
            desc: 'Participants have access to industry luminaries for mentorship, a treasure trove of tools, APIs, and data from our partners.',
        },
        {
            id: 10,
            title: 'How can I contact support?',
            desc: 'For support, you can reach us at contacto@dfb.mx.',
        },
        {
            id: 11,
            title: 'What are the event dates?',
            desc: 'The event will take place 7-8, September, 2024, in Mexico City.'
        },
        {
            id: 12,
            title: 'Where is the event located?',
            desc: 'The event is located in Mexico City, at the World Trade Center venue.'
        },
        {
            id: 13,
            title: 'Is there an age limit for participants?',
            desc: 'Participants must be at least 18 years old to register for the event.'
        },
        {
            id: 14,
            title: 'Are there any accommodation packages available?',
            desc: 'Yes, we offer accommodation packages that can be booked through our website.'
        },
        {
            id: 15,
            title: 'What are the prizes for the hackathon?',
            desc: 'The hackathon offers a total prize pool of $110,000 USD, distributed across various categories.'
        },
        {
            id: 16,
            title: 'How are the prizes distributed?',
            desc: 'Prizes are awarded to the top teams in each category, based on the judging criteria.'
        },
        {
            id: 17,
            title: 'Can international participants join the event?',
            desc: 'Yes, the event is open to participants from all around the world.'
        },
        {
            id: 18,
            title: 'What is the registration fee?',
            desc: 'The registration fee varies depending on the selected package and accommodation.'
        },
        {
            id: 19,
            title: 'Are meals provided during the event?',
            desc: 'Yes, meals and refreshments are provided to all registered participants.'
        },
        {
            id: 20,
            title: 'What are the judging criteria for the hackathon?',
            desc: 'Judging criteria include innovation and creativity, execution, and presentation.'
        },
        {
            id: 21,
            title: 'Can I register as an individual or a team?',
            desc: 'You can register as an individual or as part of a team. Team sizes can vary.'
        },
        {
            id: 22,
            title: 'Are there any pre-event workshops?',
            desc: 'Yes, there will be several workshops held before the main event. Details will be announced on our website.'
        },
        {
            id: 23,
            title: 'How do I get updates about the event?',
            desc: 'You can subscribe to our newsletter or follow us on social media for the latest updates.'
        },
        {
            id: 24,
            title: 'What safety measures are in place for the event?',
            desc: 'We have comprehensive safety measures in place, including health screenings and sanitation stations.'
        },
        {
            id: 25,
            title: 'Can I volunteer at the event?',
            desc: 'Yes, we welcome volunteers. You can apply through our website.'
        },
        {
            id: 26,
            title: 'What are the benefits of participating in the hackathon?',
            desc: 'Participants gain exposure, mentorship, networking opportunities, and the chance to win prizes.'
        },
        {
            id: 27,
            title: 'Is there a mentorship program during the event?',
            desc: 'Yes, participants will have access to industry experts for guidance and mentorship.'
        },
        {
            id: 28,
            title: 'What is the schedule for the event?',
            desc: 'The detailed schedule will be posted on our website closer to the event date.'
        },
        {
            id: 29,
            title: 'Are there any networking opportunities?',
            desc: 'Yes, the event includes multiple networking sessions with industry leaders and fellow participants.'
        },
        {
            id: 30,
            title: 'What should I bring to the event?',
            desc: 'Participants should bring their own laptops, chargers, and any other necessary equipment.'
        },
        {
            id: 31,
            title: 'How do I submit my project?',
            desc: 'Projects can be submitted through our online portal by the end of the hackathon.'
        },
        {
            id: 32,
            title: 'What is the format of the speaker sessions?',
            desc: 'Speaker sessions include keynote speeches, panels, and Q&A sessions with industry experts.'
        },
        {
            id: 33,
            title: 'How can I prepare for the hackathon?',
            desc: 'We recommend reviewing the resources and guidelines provided on our website and attending pre-event workshops.'
        },
        {
            id: 34,
            title: 'What tools and APIs are available for participants?',
            desc: 'Participants will have access to a variety of tools, APIs, and data from our partners.'
        },
        {
            id: 35,
            title: 'How do I join the trading tournament?',
            desc: 'Details on joining the trading tournament will be provided in the guides section of our website.'
        },
        {
            id: 36,
            title: 'What are the rules for the art contest?',
            desc: 'The rules and guidelines for the art contest will be available on our website.'
        },
        {
            id: 37,
            title: 'Can I showcase my project at the expo?',
            desc: 'Yes, selected projects will have the opportunity to be showcased at the expo.'
        },
        {
            id: 38,
            title: 'Are there any travel grants available?',
            desc: 'We offer limited travel grants for participants who require financial assistance.'
        },
        {
            id: 39,
            title: 'What is the refund policy for registration fees?',
            desc: 'Our refund policy is detailed on the registration page of our website.'
        },
        {
            id: 40,
            title: 'How can I stay connected after the event?',
            desc: 'Participants can stay connected through our community platform and future events.'
        },
        {
            id: 41,
            title: 'Who are the sponsors of the event?',
            desc: 'The event is sponsored by leading companies in the tech and innovation sectors. A full list is available on our website.'
        },
        {
            id: 42,
            title: 'How can I become a sponsor?',
            desc: 'Organizations interested in sponsoring the event can contact us through the sponsorship page on our website.'
        }
    ], []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredData([]);
        } else {
            setFilteredData(accordianData.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
        }
    }, [searchQuery, accordianData]);

    const handleAccordionClick = (id) => {
        setActiveIndex(activeIndex === id ? -1 : id);
    };

    useEffect(() => {
        gsap.to('.accordion-content', {
            height: 'auto',
            duration: 0.3,
            ease: 'power1.inOut',
            stagger: 0.1
        });
    }, [activeIndex]);

    return (
        <>
            <NavLight />
            <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: "url('/images/bg/bg-pages.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-6">
                        <div>
                            <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">Hello! <br /> How can we help you?</h5>
                        </div>

                        <div className="text-center subcribe-form mt-4 pt-2">
                            <form className="relative mx-auto max-w-xl">
                                <input 
                                    type="text" 
                                    id="help" 
                                    name="name" 
                                    className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-slate-900 dark:text-white rounded-md bg-white opacity-70 dark:bg-slate-900 border border-gray-100 dark:border-gray-700" 
                                    placeholder="Search your questions or topic..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="button" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white rounded-md">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 my-0 gap-6">
                        {
                            aboutData.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div className="text-center px-6 mt-6" key={index}>
                                        <Icon className="text-5xl mb-4 text-amber-400" />
                                        <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                                        <p className="text-slate-400">{item.desc}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-6 text-center">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Get Started</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">Artificial intelligence makes it fast easy to create content for your blog, social media, website, and more!</p>
                    </div>

                    <div className="lg:flex justify-center mt-6">
                        <div className="lg:w-2/3">
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4" key={index}>
                                        <h2 className="text-base font-semibold">
                                            <button type="button" onClick={() => handleAccordionClick(item.id)} className={`${activeIndex === item.id ? "bg-gray-50 dark:bg-slate-800 text-amber-400" : ""} flex justify-between items-center p-5 w-full font-medium text-start`}>
                                                <span>{item.title}</span>
                                                <MdKeyboardArrowDown className={`${activeIndex === item.id ? "rotate-180" : ""} w-4 h-4 shrink-0`} />
                                            </button>
                                        </h2>
                                        <div className={`accordion-content ${activeIndex === item.id ? "" : "hidden"}`}>
                                            <div className="p-5">
                                                <p className="text-slate-400 dark:text-gray-400">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                accordianData.map((item, index) => (
                                    <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4" key={index}>
                                        <h2 className="text-base font-semibold">
                                            <button type="button" onClick={() => handleAccordionClick(item.id)} className={`${activeIndex === item.id ? "bg-gray-50 dark:bg-slate-800 text-amber-400" : ""} flex justify-between items-center p-5 w-full font-medium text-start`}>
                                                <span>{item.title}</span>
                                                <MdKeyboardArrowDown className={`${activeIndex === item.id ? "rotate-180" : ""} w-4 h-4 shrink-0`} />
                                            </button>
                                        </h2>
                                        <div className={`accordion-content ${activeIndex === item.id ? "" : "hidden"}`}>
                                            <div className="p-5">
                                                <p className="text-slate-400 dark:text-gray-400">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
