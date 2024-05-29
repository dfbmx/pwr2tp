"use client";
import React, { useState } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

const FormHome = dynamic(() => import('./formhome'));

export default function ToggleButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    gsap.to('.form-container', {
      height: isOpen ? 0 : 'auto',
      opacity: isOpen ? 0 : 1,
      duration: 0.5,
    });
  };

  return (
    <>
      <button onClick={toggleForm} className="bg-red-500 font-arcade hover:bg-green-600 hover:text-amber-400 font-medium duration-500 text-white font-bold py-2 px-4 rounded">
        Join Now <i className="mdi mdi-chevron-right text-[20px] align-middle"></i>
      </button>
      <div className="form-container" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        {isOpen && <FormHome />}
      </div>
    </>
  );
}
