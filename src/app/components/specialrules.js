'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function RuleSection() {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const rules = useMemo(() => ({
    Mecha: [
      {
        title: 'Mecha Category Overview',
        text: 'The "Mecha" category heralds a new era of competition within "Trade Arena," inviting participants to leverage the power of artificial intelligence and algorithmic strategies. Contestants will develop and deploy AI trading bots in a simulated environment, showcasing the potential of automated systems to outperform human traders through analytical precision and speed. Thousands of USD in prizes.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all, from seasoned traders to enthusiastic beginners. Participants can compete as solo traders or in teams of up to five members, fostering both individual brilliance and collaborative strategy.',
      },
      {
        title: 'Live P&L Display',
        text: 'An innovative feature that showcases profits and losses in real-time on the event grounds, adding an engaging and transparent element to the contest.',
      },
      {
        title: 'Exclusive Event Grounds',
        text: 'The contest unfolds exclusively during the "Accelerate" event, ensuring an immersive competition atmosphere filled with innovation and excitement.',
      },
      {
        title: 'Judging Criteria: Profitability',
        text: 'The primary measure of success, rewarding the highest earners in each arena.',
      },
      {
        title: 'Judging Criteria: Strategy and Innovation',
        text: 'Acknowledges creative and effective use of trading strategies and tools.',
      },
      {
        title: 'Judging Criteria: Risk Management',
        text: 'Evaluates participants\' ability to balance ambitious trades with prudent risk strategies.',
      },
      {
        title: 'Data Sources',
        text: 'All trading bots must use publicly available and legally permissible data sources. Bots found using private or proprietary data without authorization will be disqualified.',
      },
      {
        title: 'Fair Play',
        text: 'Bots must operate independently without human intervention during the competition. Manual overrides or adjustments during active trading periods are strictly prohibited.',
      },
      {
        title: 'Transparency',
        text: 'Participants must submit a detailed report of their algorithm\'s strategy and operation principles before the competition begins. This ensures transparency and fair assessment.',
      },
      {
        title: 'Ethical Considerations',
        text: 'Algorithms must adhere to ethical trading practices. Exploitative strategies that manipulate market conditions or violate exchange regulations will lead to immediate disqualification.',
      },
      {
        title: 'Technical Stability',
        text: 'Bots should be tested thoroughly to ensure they can handle real-time data feeds and execute trades without technical failures. Unstable or unreliable bots will be disqualified.',
      },
      {
        title: 'Post-Ceremony Program',
        text: 'Winners share their profound stories and strategies in "Power 2 The People: Trade Arena Magazine" and partner platforms, gaining significant recognition. The ceremony and program offer deep opportunities for winners, participants, and partners to foster connections that extend beyond the contest.',
      },
    ],
    Nova: [
      {
        title: 'Nova Category Overview',
        text: 'Navigate the fluid landscape of decentralized exchanges and leverage cutting-edge strategies like flash loans and automated market makers execution in multi-chain environments. The only rule is no bots. Thousands of USD in prizes.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all traders. Participants can compete individually or in teams of up to five members.',
      },
      {
        title: 'Live P&L Display',
        text: 'Real-time display of profits and losses to enhance transparency and engagement.',
      },
      {
        title: 'Exclusive Event Grounds',
        text: 'The contest takes place exclusively during the "Accelerate" event, ensuring a focused and immersive competition environment.',
      },
      {
        title: 'Judging Criteria: Profitability',
        text: 'The primary measure of success, with rewards for the highest earners.',
      },
      {
        title: 'Judging Criteria: Strategy and Innovation',
        text: 'Recognition for creative and effective trading strategies.',
      },
      {
        title: 'Judging Criteria: Risk Management',
        text: 'Assessment of participants\' ability to manage risk effectively.',
      },
      {
        title: 'Compliance',
        text: 'All trading activities must comply with relevant laws and regulations.',
      },
      {
        title: 'Ethical Trading',
        text: 'Traders must adhere to ethical standards, avoiding manipulative or exploitative practices.',
      },
      {
        title: 'Data Integrity',
        text: 'Trades must be based on accurate and verifiable data sources.',
      },
      {
        title: 'Transparency',
        text: 'Participants must provide a detailed report of their trading strategies and decision-making processes.',
      },
      {
        title: 'No Bots',
        text: 'Manual trading only; the use of bots is strictly prohibited.',
      },
      {
        title: 'Post-Ceremony Program',
        text: 'Winners share their profound stories and strategies in "Power 2 The People: Trade Arena Magazine" and partner platforms, gaining significant recognition. The ceremony and program offer deep opportunities for winners, participants, and partners to foster connections that extend beyond the contest.',
      },
    ]
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
        <Image src="/images/blog/specialrules.png" alt="Background Image" className="opacity-30" fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 p-6 flex items-center justify-center flex-col">
        <h3 id="myText4" className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-white">
          Rules
        </h3>
        {!selectedCategory ? (
          <div className="flex flex-wrap justify-center gap-4">
            <button className="hover-gradient-amber-4 text-white font-bold px-4 py-2 rounded" onClick={() => setSelectedCategory('Mecha')}>
              Mecha Rules
            </button>
            <button className="hover-gradient-amber-4 font-bold text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('Nova')}>
              Nova Rules
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
