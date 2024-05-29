'use client';
import React from 'react';
import Link from 'next/link';

const NavigationButtons = () => {
    return (
        <div className="container mx-auto my-8 text-center px-4">
            <h1 className="text-3xl font-bold mb-6">Check Out Other Arenas</h1>
            <div className="flex flex-wrap justify-center space-x-4">
                <Link href="/dexarena" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-purple-500 to-green-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">DexArena</span>
                    </button>
                </Link>
                <Link href="/fintecharena" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-green-500 to-purple-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">FinTechArena</span>
                    </button>
                </Link>
                <Link href="/specialarena" passHref>
                    <button className="relative group text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600">
                        <span className="absolute inset-0 rounded blur-lg bg-gradient-to-r from-green-500 to-yellow-500 opacity-75 group-hover:opacity-100 transition duration-300"></span>
                        <span className="relative z-10">SpecialArena</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NavigationButtons;
