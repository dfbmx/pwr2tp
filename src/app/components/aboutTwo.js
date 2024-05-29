import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import {FiCheckCircle, GiBrainstorm, GiPowerGenerator, GiTakeMyMoney, GiTechnoHeart, MdKeyboardArrowRight} from '../assets/icons/vander'
const ToggleButton = dynamic(() => import('./toggleButton'));

export default function AboutTwo(){
    return(
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div className="relative order-1 md:order-2">
                        <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 pe-6 pt-6 lg:ms-8">
                            <Image src="/images/features/2.png" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="ltr:rounded-tr-lg rtl:rounded-tl-lg" alt=""/>
                        </div>
                    </div>

                    <div className="order-2 md:order-1">
                        <h4 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Crafted for the bold, available for the <span className="bg-gradient-to-br from-green-400 to-fuchsia-600 text-transparent bg-clip-text hover-gradient-amber-6">READY.</span></h4>
                        <p className="text-slate-400">Attendees: Open doors, no holds barred, everyone is welcome no matter their level of knowledge.</p>
                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><GiBrainstorm className="text-amber-500 h-5 w-5 me-2"/> Curious Minds</li>
                            <li className="mb-2 flex items-center"><GiTakeMyMoney className="text-amber-500 h-5 w-5 me-2"/> Investors</li>
                            <li className="mb-2 flex items-center"><GiTechnoHeart className="text-amber-500 h-5 w-5 me-2"/>Tech Junkies</li>
                            <li className="mb-2 flex items-center"><GiPowerGenerator className="text-amber-500 h-5 w-5 me-2"/>Creators</li>
                        </ul>

                        <div className="font-sans mt-4">
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
