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
    const [selectedCategory, setSelectedCategory] = useState('Hackers');

  
    const handleCryptoChangeBusiness = (crypto) => {
        setSelectedCryptoBusiness(crypto);
        if (crypto === 'ETH') {
          setBusinessPriceMXN(businessPriceMXN * 1.1);
        } else if (crypto === 'BTC') {
          setBusinessPriceMXN(businessPriceMXN * 0.9);
        } else {
          setBusinessPriceMXN(3500);
        }
    };
      
    const handleCryptoChangeDiamond = (crypto) => {
        setSelectedCryptoDiamond(crypto);
        if (crypto === 'ETH') {
          setDiamondPriceMXN(diamondPriceMXN * 1.1);
        } else if (crypto === 'BTC') {
          setDiamondPriceMXN(diamondPriceMXN * 0.9);
        } else {
          setDiamondPriceMXN(35000);
        }
      };
  
    const handleCryptoChange = (crypto) => {
      setSelectedCrypto(crypto);
    };
  
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
        <div className="grid lg:grid-cols-4 bg-black bg-opacity-30  md:grid-cols-2 grid-cols-1 mt-6 gap-6">
          <div className="relative  overflow-hidden rounded-md shadow bg-black bg-opacity-70">
            <div className="p-6">
              <h5 className="text-2xl leading-normal font-semibold">Only Expo</h5>
              <p className="text-slate-400 mt-2">For anyone to dare explore the new frontiers of evolution and get the power in their hands</p>
              <div className="flex mt-4">
              <span className="text-lg font-semibold">
                {selectedCrypto === 'ETH' ? 'Ξ' :
                  selectedCrypto === 'BTC' ? '₿' :
                    selectedCrypto === 'USDC' || selectedCrypto === 'MXN' ? '$' : ''}
              </span>
                <span className="text-5xl font-semibold mb-0 ms-1">
                  {selectedCrypto === 'ETH' ? (ethPrice ? (usdcPrice / ethPrice).toFixed(4) : 'Loading...') :
                    selectedCrypto === 'BTC' ? (btcPrice ? (usdcPrice / btcPrice).toFixed(6) : 'Loading...') :
                      selectedCrypto === 'USDC' ? usdcPrice : mxnPrice}
                </span>
              </div>
              <p className="text-slate-400 uppercase text-xs">
                {selectedCrypto === 'ETH' ? 'ETH' :
                  selectedCrypto === 'BTC' ? 'BTC' :
                    selectedCrypto === 'USDC' ? 'USDC' : 'MXN'}
              </p>
  
              <div className="mt-6 flex items-center">
                <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white">Buy Now</Link>
  
                <div className="ml-4">
                  <button
                    className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCrypto === 'MXN' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                    onClick={() => handleCryptoChange('MXN')}
                  >
                    MXN
                  </button>
                  <button
                    className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCrypto === 'ETH' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                    onClick={() => handleCryptoChange('ETH')}
                  >
                    ETH
                  </button>
                  <button
                    className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCrypto === 'BTC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                    onClick={() => handleCryptoChange('BTC')}
                  >
                    BTC
                  </button>
                  <button
                    className={`py-1 px-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCrypto === 'USDC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                    onClick={() => handleCryptoChange('USDC')}
                  >
                    USDC
                  </button>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-3">Credit, Debit, Cash and Crypto Accepted <br />Special price if paid on crypto**</p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800">
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
              <li className="flex items-center mt-2 text-slate-400">
                <AiOutlineClose className="h-[18px] w-[18px] me-2" />
                <span>Access to side events (can be purchased separately)</span>
              </li>
              <li className="flex items-center mt-2 text-slate-400">
                <AiOutlineClose className="h-[18px] w-[18px] me-2" />
                <span>Industry Conferences</span>
              </li>
              <li className="flex items-center mt-2 text-slate-400">
                <AiOutlineClose className="h-[18px] w-[18px] me-2" />
                <span>Contest Participation</span>
                <span className="text-slate-500 text-sm ms-1">(Hackathon, Art, Trade Arena)</span>
              </li>

                        </ul>
                    </div>
                </div>

                
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
  <div className="p-6">
    <h5 className="text-2xl leading-normal font-semibold">Business</h5>
    <p className="text-slate-400 mt-2">For the industry professionals that look to accelerate, expand and improve their journey on all areas possible</p>
    <div className="flex mt-4">
      <span className="text-lg font-semibold">
        {selectedCryptoBusiness === 'ETH' ? 'Ξ' :
          selectedCryptoBusiness === 'BTC' ? '₿' :
            selectedCryptoBusiness === 'USDC' || selectedCryptoBusiness === 'MXN' ? '$' : ''}
      </span>
      <span className="text-5xl font-semibold mb-0 ms-1">
        {selectedCryptoBusiness === 'ETH' ? (ethPrice ? (150 / ethPrice).toFixed(4) : 'Loading...') :
          selectedCryptoBusiness === 'BTC' ? (btcPrice ? (150 / btcPrice).toFixed(6) : 'Loading...') :
            selectedCryptoBusiness === 'USDC' ? (150) : businessPriceMXN}
      </span>
    </div>
    <p className="text-slate-400 uppercase text-xs">
      {selectedCryptoBusiness === 'ETH' ? 'ETH' :
        selectedCryptoBusiness === 'BTC' ? 'BTC' :
          selectedCryptoBusiness === 'USDC' ? 'USDC' : 'MXN'}
    </p>

    <div className="mt-6 flex items-center">
      <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white">Buy Now</Link>

      <div className="ml-4">
        <button
          className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'MXN' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeBusiness('MXN')}
        >
          MXN
        </button>
        <button
          className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'ETH' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeBusiness('ETH')}
        >
          ETH
        </button>
        <button
          className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'BTC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeBusiness('BTC')}
        >
          BTC
        </button>
        <button
          className={`py-1 px-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'USDC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeBusiness('USDC')}
        >
          USDC
        </button>
      </div>
    </div>

    <p className="text-slate-400 text-sm mt-3">Credit, Debit, Cash and Crypto Accepted <br />Special price if paid on crypto**</p>
  </div>

  <div className="p-6 bg-gray-50 dark:bg-slate-800">
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
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Access to 2 Side Events</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Industry Conferences</span>
</li>


<li className="flex items-center mt-2 text-slate-400">
  <AiOutlineClose className="h-[18px] w-[18px] me-2" />
  <span>Contest Participation</span>
  <span className="text-slate-500 text-sm ms-1">(Hackathon, Art, Trade Arena)</span>
</li>

                        </ul>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
  <div className="p-6">
    <h5 className="text-2xl leading-normal font-semibold">Diamond</h5>
    <p className="text-slate-400 mt-2">Made for the titans with unlimited access, swim with the sharks and hunt with the whales</p>
    <div className="flex mt-4">
      <span className="text-lg font-semibold">
        {selectedCryptoDiamond === 'ETH' ? 'Ξ' :
          selectedCryptoDiamond === 'BTC' ? '₿' :
            selectedCryptoDiamond === 'USDC' || selectedCryptoDiamond === 'MXN' ? '$' : ''}
      </span>
      <span className="text-5xl font-semibold mb-0 ms-1">
        {selectedCryptoDiamond === 'ETH' ? (ethPrice ? (diamondPriceUSDC / ethPrice).toFixed(4) : 'Loading...') :
          selectedCryptoDiamond === 'BTC' ? (btcPrice ? (diamondPriceUSDC / btcPrice).toFixed(6) : 'Loading...') :
            selectedCryptoDiamond === 'USDC' ? (diamondPriceUSDC) : diamondPriceMXN}
      </span>
    </div>
    <p className="text-slate-400 uppercase text-xs">
      {selectedCryptoDiamond === 'ETH' ? 'ETH' :
        selectedCryptoDiamond === 'BTC' ? 'BTC' :
          selectedCryptoDiamond === 'USDC' ? 'USDC' : 'MXN'}
    </p>

    <div className="mt-6 flex items-center">
      <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white">Buy Now</Link>

      <div className="ml-4">
        <button
          className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoDiamond === 'MXN' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeDiamond('MXN')}
        >
          MXN
        </button>
        <button
          className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoDiamond === 'ETH' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeDiamond('ETH')}
        >
          ETH
        </button>
        <button
          className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoDiamond === 'BTC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeDiamond('BTC')}
        >
          BTC
        </button>
        <button
          className={`py-1 px-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoDiamond === 'USDC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
          onClick={() => handleCryptoChangeDiamond('USDC')}
        >
          USDC
        </button>
      </div>
    </div>

    <p className="text-slate-400 text-sm mt-3">Credit, Debit, Cash and Crypto Accepted <br />Special price if paid on crypto**</p>
  </div>

  <div className="p-6 bg-gray-50 dark:bg-slate-800">
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
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Industry Conferences</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">VIP Opening and Closing Event for Industry Leaders</span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">VIP Private Room for Business Meetings </span>
</li>
<li className="flex items-center mt-2">
  <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">Exclusive Secret After Event </span>
</li>

<li className="flex items-center mt-2">
<FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
  <span className="text-slate-900 dark:text-white me-1 font-semibold">
  Contest Participation as Jury (Hackathon, Art, Trade Arena)</span>
</li>

                        </ul>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
        <div className="p-6">
          <h5 className="text-2xl leading-normal font-semibold">Hackers, Artist, Trading Arena, and AiTrading</h5>
          <p className="text-slate-400 mt-2">For those who dare to get the glory and prove they are number one</p>
          <div className="flex mt-4">
            <span className="text-lg font-semibold">Ξ</span>
            <span className="text-5xl font-semibold mb-0 ms-1">
              {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? '0.001' : selectedCategory === 'Traders' ? '0.005' : '0.025'}
            </span>
            <span className="text-lg font-semibold ms-2">
              / {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? (0.001 * ethPrice).toFixed(2) : selectedCategory === 'Traders' ? (0.005 * ethPrice).toFixed(2) : (0.025 * ethPrice).toFixed(2)} USDC
              / {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? (0.001 * ethPrice / btcPrice).toFixed(6) : selectedCategory === 'Traders' ? (0.005 * ethPrice / btcPrice).toFixed(6) : (0.025 * ethPrice / btcPrice).toFixed(6)} ₿
              / {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? (0.001 * ethPrice * 20).toFixed(2) : selectedCategory === 'Traders' ? (0.005 * ethPrice * 20).toFixed(2) : (0.025 * ethPrice * 20).toFixed(2)} MXN
            </span>
          </div>
          <Link href={`/${selectedCategory.toLowerCase()}info`}>
            <button className="py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded">More Info</button>
          </Link>

          <div className="mt-6 flex items-center">
            <button
              className={`py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded ${selectedCategory === 'Hackers' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
              onClick={() => setSelectedCategory('Hackers')}
            >
              Hackers
            </button>
            <button
              className={`py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded ${selectedCategory === 'Artist' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
              onClick={() => setSelectedCategory('Artist')}
            >
              Artist
            </button>
            <button
              className={`py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded ${selectedCategory === 'Traders' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
              onClick={() => setSelectedCategory('Traders')}
            >
              Traders
            </button>
            <button
              className={`py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded ${selectedCategory === 'AiTrading' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
              onClick={() => setSelectedCategory('AiTrading')}
            >
              AiTrading
            </button>
      
    </div>
  </div>

  <div className="p-6 bg-gray-50 dark:bg-slate-800">
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
            

            
        </>
    )
}