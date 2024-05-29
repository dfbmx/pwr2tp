"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(() => import('../components/navbar'));
const Footer = dynamic(() => import('../components/footer'));

import { MdKeyboardArrowDown } from "../assets/icons/vander";

export default function Terms() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  const [activeIndex, setActiveIndex] = useState(1);

  const accordianData = [
    {
      id: 1,
      title: 'Event Overview',
      desc: 'Power 2 The People is an avant-garde event focused on the intersection of technology, finance, and art. It aims to push the boundaries of innovation, empowerment, and societal advancement with a total bounty pool of thousands of USD in prizes.'
    },
    {
      id: 2,
      title: 'Participation and Eligibility',
      desc: 'Open to everyone passionate about technology, finance, and art. Minors require guardian consent. Participants can compete individually or in teams of up to five members.'
    },
    {
      id: 3,
      title: 'Hackathon Rules',
      desc: 'Participants have 48 hours to ideate, develop, and prototype their solutions. Submissions must include detailed project documentation, a functional prototype, and a compelling video pitch.'
    },
    {
      id: 4,
      title: 'Judging Criteria',
      desc: 'Projects will be judged on Innovation and Creativity, Execution, and Presentation. Access to industry luminaries and resources provided by our partners.'
    },
    {
      id: 5,
      title: 'Prizes and Awards',
      desc: 'Total bounty pool of thousands of USD in prizes. Specific prizes for SyntehIQ, Anon Empire, LifeCode, and Automate to be announced.'
    },
    {
      id: 6,
      title: 'Submission Guidelines',
      desc: 'Submissions must include a comprehensive description of the project, the technology used, and its relevance to the theme of acceleration. All entries must be original works created specifically for the event.'
    },
    {
      id: 7,
      title: 'Compliance and Ethics',
      desc: 'Participants must adhere to ethical standards and comply with relevant laws and regulations. Any form of manipulation or exploitation is strictly prohibited.'
    },
  ];

  const challengeAreas = [
    {
      title: 'Hackathons',
      desc: [
        { id: 1, title: 'SyntehIQ (AI Hackathon)', desc: 'A crucible for AI innovations focusing on predictive analytics, machine learning, and intelligent automation, offering thousands of USD in prizes for projects that drive societal advancement.' },
        { id: 2, title: 'Anon Empire (Web3 Hackathon)', desc: 'With thousands of USD in prizes at stake, this challenge seeks decentralized applications that fortify user sovereignty, privacy, and community-led growth, leveraging blockchain transformative power.' },
        { id: 3, title: 'LifeCode (Biohacking Hackathon)', desc: 'A frontier for biohackers, offering thousands of USD in prizes to those who can revolutionize genetics, wearable technology, or new health paradigms to enhance human capabilities and longevity.' },
        { id: 4, title: 'Automate (Robotics Hackathon)', desc: 'This arena, with a bounty of thousands of USD in prizes, calls for robotics innovations that present novel solutions for industry, healthcare, or personal use, boosting efficiency and human-machine synergy.' },
      ]
    },
    {
      title: 'Trading Tournament',
      desc: [
        { id: 1, title: 'Overview', desc: 'Participants compete in a trading tournament focusing on maximizing profits through strategic trades and risk management.' },
        { id: 2, title: 'Eligibility', desc: 'Open to traders of all levels. Participants can compete individually or in teams.' },
        { id: 3, title: 'Rules', desc: 'Strict rules on trading practices, transparency, and ethics. Participants must adhere to fair play guidelines.' },
        { id: 4, title: 'Prizes', desc: 'Significant cash prizes for top performers based on profitability, strategy, and risk management.' },
      ]
    },
    {
      title: 'Art Contests',
      desc: [
        { id: 1, title: 'Fractal (Generative Art)', desc: 'Invites artists to harness the power of algorithms, code, and digital processes to create artworks that breathe life into the theme of acceleration.' },
        { id: 2, title: 'Prism (Curated Art)', desc: 'Seeks artists who can conceptualize and produce works that thoughtfully interpret the theme of acceleration of the society, with a strong emphasis on the integration of technology and artistic innovation.' },
      ]
    }
  ];

  return (
    <>
      <NavLight />
      <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-6">
            <div>
              <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Terms of Services</h5>
            </div>
            <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
              <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out hover:text-amber-400">
                <Link href="/">Home</Link>
              </li>
              <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="mdi mdi-chevron-right"></i>
              </li>
              <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-amber-400" aria-current="page">Terms</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                <h5 className="text-xl font-semibold mb-4">Introduction :</h5>
                <p className="text-slate-400">Power 2 The People is designed to harness the collective genius of developers, traders, artists, and visionaries, fostering a future where technology serves as a catalyst for global progress and inclusive growth.</p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Event Overview :</h5>
                <p className="text-slate-400">Accelerate is not merely a hackathon, it is a crucible where the future of AI, Web3, biohacking, and robotics is forged. With a bounty pool of thousands of USD in prizes and a 48-hour timeline, this challenge stands as a beacon for disruptors, innovators, and visionaries keen on molding the future.</p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Challenge Areas :</h5>
                <ul className="list-none text-slate-400 mt-3">
                  {challengeAreas.map((area, idx) => (
                    <li className="flex mt-2" key={idx}>
                      <i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>{area.title}
                    </li>
                  ))}
                </ul>

                <h5 className="text-xl font-semibold mb-4 mt-8">Registration Process :</h5>
                <p className="text-slate-400">Participants need to sign up through an intuitive online registration process. The unique hacker pass, mintable for 0.001 ETH, serves as the entry ticket, emphasizing the event blockchain-centric ethos.</p>

                <h5 className="text-xl font-semibold mt-8">Rules :</h5>

                <div className="mt-6">
                  {accordianData.map((item, index) => (
                    <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4" key={index}>
                      <h2 className="text-base font-semibold">
                        <button
                          type="button"
                          onClick={() => setActiveIndex(item.id)}
                          className={`${activeIndex === item.id ? "bg-gray-50 dark:bg-slate-800 text-amber-400" : ""} flex justify-between items-center p-5 w-full font-medium text-start`}
                        >
                          <span>{item.title}</span>
                          <MdKeyboardArrowDown className={`${activeIndex === item.id ? "rotate-180" : ""} w-4 h-4 shrink-0`} />
                        </button>
                      </h2>
                      <div className={activeIndex === item.id ? "" : "hidden"}>
                        <div className="p-5">
                          <p className="text-slate-400 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href="/privacy" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">Accept</Link>
                  <Link href="/" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-amber-400 text-amber-400 hover:text-white rounded-md ms-2">Decline</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
