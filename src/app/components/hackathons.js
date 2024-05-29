'use client';
import React from 'react';
import Link from 'next/link';

const Hackathons = () => {
    return (
        <div className="container mx-auto my-8 text-center px-4">
            <h1 className="text-3xl font-bold mb-6">Check Out Other Hackathons</h1>
            <div className="flex flex-wrap justify-center space-x-4">
                <Link href="/synthetiq" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-purple-500 to-green-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">Artificial Intelligence</span>
                    </button>
                </Link>
                <Link href="/lifecode" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-green-500 to-purple-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">Biohacking</span>
                    </button>
                </Link>
                <Link href="/anonempire" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-green-500 to-yellow-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">Web3</span>
                    </button>
                </Link>
                <Link href="/automate" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-yellow-500 to-green-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">Robotics</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Hackathons;
