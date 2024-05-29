"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Web3 from "web3";

// Dynamic imports for better performance
const NavLight = dynamic(() => import('../components/navbar'));
const Footer = dynamic(() => import('../components/footer'));

// Base chain details
const BASE_CHAIN_ID = '0x14a34'; // Base Sepolia chain ID
const BASE_CHAIN_PARAMS = {
  chainId: BASE_CHAIN_ID,
  chainName: 'Base Sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://base-sepolia-rpc.publicnode.com'] // Replace with actual RPC URL
};

// Smart contract details
const CONTRACT_ADDRESS = "0x32bDdf6D9aB4f97cC1C560C9A2b7b9bf676cB5Cf";
const CONTRACT_ABI = [
  {"inputs":[{"internalType":"string","name":"_termsBase64","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"Signed","type":"event"},
  {"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getSignature","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getSigners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasSigned","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"signTerms","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"signers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"termsBase64","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"stateMutability":"payable","type":"receive"}
];

export default function Privacy() {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [signers, setSigners] = useState([]);
  const [showSigners, setShowSigners] = useState(false);
  const [signCheckMessage, setSignCheckMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  const checkIfSigned = useCallback(async () => {
    if (account && typeof window.ethereum !== 'undefined') {
      try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const signed = await contract.methods.hasSigned(account).call();
        setHasSigned(signed);
        setSignCheckMessage(signed ? 'You have signed the terms.' : 'You have not signed the terms.');
      } catch (error) {
        console.error("Error checking signature: ", error);
        setSignCheckMessage('Error checking signature.');
      }
    }
  }, [account]);

  const fetchSigners = useCallback(async () => {
    if (account && typeof window.ethereum !== 'undefined') {
      try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const signersList = await contract.methods.getSigners().call();
        setSigners(signersList);
        setShowSigners(true);
      } catch (error) {
        console.error("Error fetching signers: ", error);
      }
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      checkIfSigned();
      fetchSigners();
    }
  }, [account, checkIfSigned, fetchSigners]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        await switchToBaseChain();
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please install a MetaMask wallet to use this feature.");
    }
  };

  const switchToBaseChain = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_CHAIN_PARAMS],
          });
        } catch (addError) {
          console.error("Error adding Base Sepolia chain: ", addError);
        }
      } else {
        console.error("Error switching to Base Sepolia chain: ", switchError);
      }
    }
  };

  const signTerms = async () => {
    if (account && typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        await contract.methods.signTerms().send({ from: account });
        setHasSigned(true);
        fetchSigners();
        console.log("Terms signed");
      } catch (error) {
        console.error("Error signing terms: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <NavLight />
      <section className="relative md:pt-44 pt-32 pb-8 bg-gradient-to-b from-amber-400/20 dark:from-amber-400/40 to-transparent">
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-6">
            <div>
              <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold mb-0">Privacy Policy</h5>
            </div>
            <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
              <li className="inline-block capitalize font-medium duration-500 ease-in-out hover:text-amber-400"><Link href="/">Home</Link></li>
              <li className="inline-block text-base mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
              <li className="inline-block capitalize font-medium duration-500 ease-in-out text-amber-400" aria-current="page">Privacy</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                <h5 className="text-xl font-semibold mb-4">Overview :</h5>
                <p className="text-slate-400">
                  Power 2 The People (PWR2TP) is committed to protecting your privacy. This Privacy Policy outlines how we handle your personal information during the event, which includes hackathons, trading tournaments, art contests, expos, and speaker sessions.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Information Collection and Use :</h5>
                <p className="text-slate-400">
                  We collect personal information that you voluntarily provide when you register for the event, participate in activities, or communicate with us. This includes your name, contact details, and any other information you choose to provide.
                </p>
                <ul className="list-none text-slate-400 mt-3">
                  <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Facilitate event registration and participation</li>
                  <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Provide event-related updates and information</li>
                  <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Ensure compliance with event rules and regulations</li>
                  <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Enhance event experience and improve future events</li>
                  <li className="flex mt-2"><i className="mdi mdi-arrow-right text-amber-400 text-lg align-middle me-2"></i>Facilitate networking and collaboration among participants</li>
                </ul>

                <h5 className="text-xl font-semibold mb-4 mt-8">Information Sharing and Disclosure :</h5>
                <p className="text-slate-400">
                  We do not share your personal information with third parties except as necessary to run the event, comply with the law, or protect our rights. Your information may be shared with event partners and sponsors for the purposes of providing event services.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Security :</h5>
                <p className="text-slate-400">
                  We implement appropriate technical and organizational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Data Retention :</h5>
                <p className="text-slate-400">
                  Your personal information will be retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Your Rights :</h5>
                <p className="text-slate-400">
                  You have the right to access, correct, or delete your personal information. If you have any concerns about your data or this privacy policy, please contact us at contacto@dfb.mx.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Consent to Recordings :</h5>
                <p className="text-slate-400">
                  By participating in PWR2TP events, you consent to the recording of your image, voice, and participation. These recordings may be used for promotional purposes, including but not limited to social media, websites, and future event marketing.
                </p>

                <h5 className="text-xl font-semibold mb-4 mt-8">Changes to This Privacy Policy :</h5>
                <p className="text-slate-400">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on our website. Your continued participation in the event constitutes your acceptance of the new privacy policy.
                </p>

                <div className="mt-8">
                  {!account ? (
                    <button onClick={connectWallet} className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">
                      {isLoading ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                  ) : (
                    <button onClick={signTerms} className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">
                      {isLoading ? 'Signing...' : 'Sign to Accept'}
                    </button>
                  )}
                  {hasSigned && (
                    <div className="mt-4 text-green-500">
                      Signature recorded! You can now proceed.
                      <Link href="https://members.pwr2tp.mx" className="ml-4 py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-green-400 hover:bg-green-500 border-green-400 hover:border-green-500 text-white rounded-md">Continue to Profile Creation</Link>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <button onClick={checkIfSigned} className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-blue-400 hover:bg-blue-500 border-blue-400 hover:border-blue-500 text-white rounded-md">
                    Check If Signed
                  </button>
                  {signCheckMessage && (
                    <div className="mt-4 text-blue-500">
                      {signCheckMessage}
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <button onClick={fetchSigners} className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-purple-400 hover:bg-purple-500 border-purple-400 hover:border-purple-500 text-white rounded-md">
                    Fetch Signers
                  </button>
                  {showSigners && (
                    <div className="mt-4">
                      <h5 className="text-xl font-semibold mb-4">Signers List :</h5>
                      <ul className="list-disc text-slate-400 ml-5">
                        {signers.map((signer, index) => (
                          <li key={index}>{signer}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
