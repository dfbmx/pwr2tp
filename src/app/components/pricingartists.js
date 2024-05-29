import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FiCheckCircle, AiOutlineClose } from '../assets/icons/vander';

export default function Pricing() {
    const [selectedCrypto, setSelectedCrypto] = useState('MXN');
    const [selectedCryptoBusiness, setSelectedCryptoBusiness] = useState('MXN');
    const [selectedCryptoDiamond, setSelectedCryptoDiamond] = useState('MXN'); 
    const [ethPrice, setEthPrice] = useState(0);
    const [btcPrice, setBtcPrice] = useState(0);
    const usdcPrice = 50;
    const mxnPrice = 500;
    const [businessPriceMXN, setBusinessPriceMXN] = useState(3500);
    const businessPriceUSDC = 150;
    const [diamondPriceMXN, setDiamondPriceMXN] = useState(35000); 
    const diamondPriceUSDC = 3500;
    const [selectedCategory, setSelectedCategory] = useState('Artists');
  
    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd')
        .then(response => {
          setEthPrice(response.data.ethereum.usd);
          setBtcPrice(response.data.bitcoin.usd);
        })
        .catch(error => {
          console.error('Error fetching prices:', error);
        });
    }, []);
  
    return (
      <>
        <div className="max-w-3xl mx-auto  mt-6 gap-6">
          

    

                <div className="relative overflow-hidden rounded-md shadow bg-black bg-opacity-50 dark:shadow-gray-800">
        <div className="p-6">
          <h5 className="text-2xl leading-normal font-semibold">Artists</h5>
          <p className="text-white mt-2">For those who dare to build the glory and prove they are number one</p>
          <div className="flex mt-4">
            <span className="text-lg font-semibold">Ξ</span>
            <span className="text-5xl font-semibold mb-0 ms-1">
              {selectedCategory === 'Artists' || selectedCategory === 'Artist' ? '0.001' : selectedCategory === 'Traders' ? '0.005' : '0.025'}
            </span>
            <span className="text-lg font-semibold ms-2">
              / {selectedCategory === 'Artists' || selectedCategory === 'Artist' ? (0.001 * ethPrice).toFixed(2) : selectedCategory === 'Traders' ? (0.005 * ethPrice).toFixed(2) : (0.025 * ethPrice).toFixed(2)} USDC
              / {selectedCategory === 'Artists' || selectedCategory === 'Artist' ? (0.001 * ethPrice / btcPrice).toFixed(6) : selectedCategory === 'Traders' ? (0.005 * ethPrice / btcPrice).toFixed(6) : (0.025 * ethPrice / btcPrice).toFixed(6)} ₿
              / {selectedCategory === 'Artists' || selectedCategory === 'Artist' ? (0.001 * ethPrice * 20).toFixed(2) : selectedCategory === 'Traders' ? (0.005 * ethPrice * 20).toFixed(2) : (0.025 * ethPrice * 20).toFixed(2)} MXN
            </span>
          </div>
         

          <div className="mt-6 flex items-center">
            <button
              className={`py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded ${selectedCategory === 'Artists' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
              onClick={() => setSelectedCategory('Artists')}
            >
              Artists
            </button>
            <Link href={`/signup`}>
            <button className="py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded">Register</button>
          </Link>
          <Link href={`/studentsignup`}>
            <button className="py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded">Student</button>
          </Link>
      
    </div>
  </div>

  <div className="p-6 bg-black bg-opacity-70 rounded-xl">
    <ul className="list-none text-slate-400">
    <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>

<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">2-Day Expo Floor Access</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">PWR2TP Social Profile & Gifts</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">On-Site Quests & Rewards</span>
</li>
<li className="flex items-center mt-2">
<FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">All Access to Side Events</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Selected Conferences</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Special Kit With Professional Tools</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">OnChain POAP Collectible</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Special Area To Build </span>
</li>

<li className="flex items-center mt-2">
<FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">
  Contest Participation to win +100K USD in Prizes</span>
</li>
                        </ul>
                    </div>
                </div>           
            </div>           
        </>    )
}