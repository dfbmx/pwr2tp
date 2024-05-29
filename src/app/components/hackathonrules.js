'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function RuleSection() {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const rules = useMemo(() => ({
    SyntehIQ: [
      {
        title: 'SyntehIQ Overview',
        text: 'A crucible for AI innovations focusing on predictive analytics, machine learning, and intelligent automation, offering $25,000 for projects that drive societal advancement.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all participants passionate about AI. Participants can compete individually or in teams of up to five members.',
      },
      {
        title: 'Development and Submission',
        text: 'Participants have 48 hours to ideate, develop, and prototype their AI solutions. Submissions must include detailed project documentation, a functional prototype, and a compelling video pitch.',
      },
      {
        title: 'Judging Criteria: Innovation and Creativity',
        text: 'Breakthrough ideas and novel approaches in AI.',
      },
      {
        title: 'Judging Criteria: Execution',
        text: 'Seamless implementation and user experience of the AI solutions.',
      },
      {
        title: 'Judging Criteria: Presentation',
        text: 'The ability to articulate and sell the vision effectively.',
      },
      {
        title: 'Resources and Mentorship',
        text: 'Access to a cadre of industry luminaries and a treasure trove of tools, APIs, and data, courtesy of our partners, to fuel the innovation engine.',
      },
    ],
    LifeCode: [
      {
        title: 'LifeCode Overview',
        text: 'A frontier for biohackers, offering $15,000 to those who can revolutionize genetics, wearable technology, or new health paradigms to enhance human capabilities and longevity.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all biohackers and enthusiasts. Participants can compete individually or in teams of up to five members.',
      },
      {
        title: 'Development and Submission',
        text: 'Participants have 48 hours to ideate, develop, and prototype their biohacking solutions. Submissions must include detailed project documentation, a functional prototype, and a compelling video pitch.',
      },
      {
        title: 'Judging Criteria: Innovation and Creativity',
        text: 'Breakthrough ideas and novel approaches in biohacking.',
      },
      {
        title: 'Judging Criteria: Execution',
        text: 'Seamless implementation and user experience of the biohacking solutions.',
      },
      {
        title: 'Judging Criteria: Presentation',
        text: 'The ability to articulate and sell the vision effectively.',
      },
      {
        title: 'Resources and Mentorship',
        text: 'Access to a cadre of industry luminaries and a treasure trove of tools, APIs, and data, courtesy of our partners, to fuel the innovation engine.',
      },
    ],
    Automate: [
      {
        title: 'Automate Overview',
        text: 'This arena, with a bounty of $20,000, calls for robotics innovations that present novel solutions for industry, healthcare, or personal use, boosting efficiency and human-machine synergy.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all robotics enthusiasts and professionals. Participants can compete individually or in teams of up to five members.',
      },
      {
        title: 'Development and Submission',
        text: 'Participants have 48 hours to ideate, develop, and prototype their robotics solutions. Submissions must include detailed project documentation, a functional prototype, and a compelling video pitch.',
      },
      {
        title: 'Judging Criteria: Innovation and Creativity',
        text: 'Breakthrough ideas and novel approaches in robotics.',
      },
      {
        title: 'Judging Criteria: Execution',
        text: 'Seamless implementation and user experience of the robotics solutions.',
      },
      {
        title: 'Judging Criteria: Presentation',
        text: 'The ability to articulate and sell the vision effectively.',
      },
      {
        title: 'Resources and Mentorship',
        text: 'Access to a cadre of industry luminaries and a treasure trove of tools, APIs, and data, courtesy of our partners, to fuel the innovation engine.',
      }
    ],
  }), []);

  const showRule = useCallback((index) => {
    setCurrentRuleIndex(index);
    gsap.fromTo('.rule-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
  }, []);

  const hideRule = useCallback(() => {
    gsap.to('.rule-card', { opacity: 0, y: 50, duration: 0.5, onComplete: () => setCurrentRuleIndex(null) });
  }, []);

  const handleNext = useCallback(() => {
    if (currentRuleIndex !== null) {
      const nextIndex = (currentRuleIndex + 1) % rules[selectedCategory].length;
      showRule(nextIndex);
    }
  }, [currentRuleIndex, selectedCategory, showRule, rules]);

  const handlePrev = useCallback(() => {
    if (currentRuleIndex !== null) {
      const prevIndex = (currentRuleIndex - 1 + rules[selectedCategory].length) % rules[selectedCategory].length;
      showRule(prevIndex);
    }
  }, [currentRuleIndex, selectedCategory, showRule, rules]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const handleSwipe = (e) => {
      const direction = e.deltaX > 0 ? 'right' : 'left';
      if (direction === 'right') handleNext();
      if (direction === 'left') handlePrev();
    };

    window.addEventListener('swiped', handleSwipe);
    return () => window.removeEventListener('swiped', handleSwipe);
  }, [handleNext, handlePrev]);

  return (
    <section className="panel green mx-auto text-center relative h-auto py-12">
      <div className="absolute inset-0">
        <Image src="/images/blog/fintechfuture.png" alt="Background Image" className="opacity-30" fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 p-6 flex items-center justify-center flex-col">
        <h3 id="myText4" className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-white">
          Rules
        </h3>
        {!selectedCategory ? (
          <div className="flex flex-wrap justify-center gap-4">
            <button className="hover-gradient-amber-4 text-white font-bold px-4 py-2 rounded" onClick={() => setSelectedCategory('SyntehIQ')}>
              SyntehIQ Rules
            </button>
            <button className="hover-gradient-amber-4 font-bold text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('LifeCode')}>
              LifeCode Rules
            </button>
            <button className="hover-gradient-amber-4 font-bold text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('Automate')}>
              Automate Rules
            </button>
          </div>
        ) : (
          <>
            <button className="hover-gradient-amber-3 text-white font-bold px-4 py-2 rounded mb-4" onClick={() => setSelectedCategory(null)}>
              Back to Categories
            </button>
            <div className="flex flex-wrap justify-center gap-4">
              {rules[selectedCategory].map((rule, index) => (
                <button key={index} className="bg-green-500 hover-gradient-amber-6 border-green-500 bg-opacity-80 text-white px-4 py-2 rounded" onClick={() => showRule(index)}>
                  {rule.title}
                </button>
              ))}
            </div>
          </>
        )}
        {currentRuleIndex !== null && (
          <div className="rule-card absolute inset-0 bg-black bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h4 className="text-2xl font-bold mb-4">{rules[selectedCategory][currentRuleIndex].title}</h4>
            <p className="text-lg">{rules[selectedCategory][currentRuleIndex].text}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={hideRule}>Close</button>
            <div className="flex mt-4">
              <button className="px-4 py-2 bg-gray-500 text-white rounded mx-2" onClick={handlePrev}>Previous</button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded mx-2" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
