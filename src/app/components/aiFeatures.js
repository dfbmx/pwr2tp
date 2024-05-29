import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { IoIosSchool, GiInspiration, TbFriends, FaGamepad, GiSwordsPower, MdLocalGroceryStore } from "../assets/icons/vander";

const ToggleButton = dynamic(() => import('./toggleButton'));

export default function AiFeatures() {
  const featureData = [
    {
      icon: GiInspiration,
      title: 'Inspire',
      desc: 'Show how you reshaped the world. This is your fuel. Ignite the spark of change and let your impact be known.'
    },
    {
      icon: IoIosSchool,
      title: 'Educate',
      desc: 'Spread your wisdom for the fearless. No prerequisites, only potential. Empower others with knowledge and inspire greatness.'
    },
    {
      icon: GiSwordsPower,
      title: 'Empower',
      desc: 'Spotlighting the boldest ideas in the game. Here, dreams come true. Unleash the power of innovation and make your mark.'
    },
    {
      icon: FaGamepad,
      title: 'Playground',
      desc: 'For those who dare, to immerse and conquer. Challenge the status quo. Step into a realm of endless possibilities and thrive.'
    },
    {
      icon: TbFriends,
      title: 'Community',
      desc: 'Host a place for your community, create special activities and generate amazing memories. Foster connections and celebrate togetherness.'
    },
    {
      icon: MdLocalGroceryStore,
      title: 'Marketplace',
      desc: 'Buy, Sell, Trade RWA for tokens and vice versa, NFT gallery, merch, products. The corner shop of the event, one rule: ONLY CRYPTO.'
    },
  ];
  
  return (
    <>
      <div className="container relative md:mt-24 mt-16 hover-gradient-amber-7 text-white">
        <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Customized Realms</h3>
          <p className="text-slate-400 max-w-xl mx-auto">Immerse yourself in meticulously crafted realms designed to ignite your passion, expand your knowledge, and empower your journey. These transformative spaces serve as catalysts for unlocking your true potential and bringing groundbreaking ideas to life.</p>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6 ">
          {featureData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="group flex duration-500 xl:p-3 " key={index}>
                <div className="flex align-middle justify-center items-center w-14 h-14 mt-1 bg-green-400/5 group-hover:bg-amber-400 group-hover:text-white border-2 border-green-400/20 hover:border-green-600 text-green-400 rounded-lg text-2xl shadow-sm dark:shadow-gray-800 duration-500">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 ms-4">
                  <h4 className="mb-0 text-lg font-semibold hover:text-amber-400 ">{item.title}</h4>
                  <p className="text-slate-400 mt-2 hover:text-amber-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
          <ToggleButton />
        </div>
      </div>
    </>
  );
}
