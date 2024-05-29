'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function RuleSection() {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const rules = useMemo(() => ({
    Lunar: [
      {
        title: 'Lunar Category Overview',
        text: 'Master the precision of predicting and capitalizing on future market movements within centralized exchanges. Thousands of USD in prizes. This contest is only for participants aged 18 and above.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all traders with verified accounts. Participants can form teams of up to three members to collaborate on strategy and execution.',
      },
      {
        title: 'Trading Pairs',
        text: 'Participants must trade specified pairs on centralized exchanges. A list of eligible trading pairs will be provided before the contest.',
      },
      {
        title: 'Prediction Accuracy',
        text: 'Traders must predict future market movements with high accuracy. Predictions will be evaluated based on their accuracy and profitability.',
      },
      {
        title: 'Market Analysis',
        text: 'Detailed market analysis reports must be submitted, showcasing the strategies and tools used for market prediction.',
      },
      {
        title: 'Risk Management',
        text: 'Demonstrate robust risk management practices. Strategies that minimize risk while maximizing returns will be highly valued.',
      },
      {
        title: 'Transparency and Reporting',
        text: 'Teams must provide detailed reports of their trading strategies and outcomes. Transparency is key for fair assessment.',
      },
      {
        title: 'Event Grounds',
        text: 'The contest takes place during the "Lunar Summit," offering a dynamic and engaging environment for participants.',
      },
      {
        title: 'Real-Time Leaderboard',
        text: 'A real-time leaderboard will display the top performers, adding an element of excitement and competition.',
      },
      {
        title: 'Final Judging',
        text: 'Winners will be selected based on overall performance, innovation, and adherence to contest rules. Judges will consider both profitability and strategy.',
      },
      {
        title: 'Prize Delivery',
        text: 'Following the ceremony, cryptocurrency prizes are transferred directly to the winners\' digital wallets. This process is transparent, secure, and ensures that winners can access their funds without delay. The transfer of prizes is conducted transparently, with confirmations and acknowledgments shared with the winners.',
      },
      {
        title: 'Post-Ceremony Program',
        text: 'Winners share their profound stories and strategies in "Power 2 The People: Trade Arena Magazine" and partner platforms, gaining significant recognition. The ceremony and program offer deep opportunities for winners, participants, and partners to foster connections that extend beyond the contest.',
      }
    ],
    Solar: [
      {
        title: 'Solar Category Overview',
        text: 'Master the art of spot trading on crypto using centralized platforms, where immediate market movements can dictate success. Thousands of USD in prizes. This contest is only for participants aged 18 and above.',
      },
      {
        title: 'Eligibility and Registration',
        text: 'Open to all traders with verified accounts. Participants can form teams of up to three members to collaborate on strategy and execution.',
      },
      {
        title: 'Spot Trading Pairs',
        text: 'Participants must trade specified pairs on centralized exchanges. A list of eligible trading pairs will be provided before the contest.',
      },
      {
        title: 'Trading Execution',
        text: 'Traders must execute spot trades with high efficiency and accuracy. Execution speed and accuracy will be evaluated.',
      },
      {
        title: 'Market Analysis',
        text: 'Detailed market analysis reports must be submitted, showcasing the strategies and tools used for spot trading.',
      },
      {
        title: 'Risk Management',
        text: 'Demonstrate robust risk management practices. Strategies that minimize risk while maximizing returns will be highly valued.',
      },
      {
        title: 'Transparency and Reporting',
        text: 'Teams must provide detailed reports of their trading strategies and outcomes. Transparency is key for fair assessment.',
      },
      {
        title: 'Event Grounds',
        text: 'The contest takes place during the "Solar Summit," offering a dynamic and engaging environment for participants.',
      },
      {
        title: 'Real-Time Leaderboard',
        text: 'A real-time leaderboard will display the top performers, adding an element of excitement and competition.',
      },
      {
        title: 'Final Judging',
        text: 'Winners will be selected based on overall performance, innovation, and adherence to contest rules. Judges will consider both profitability and strategy.',
      },
      {
        title: 'Prize Delivery',
        text: 'Following the ceremony, cryptocurrency prizes are transferred directly to the winners\' digital wallets. This process is transparent, secure, and ensures that winners can access their funds without delay. The transfer of prizes is conducted transparently, with confirmations and acknowledgments shared with the winners.',
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
        <Image src="/images/blog/tradepass.jpg" alt="Background Image" className="opacity-30" fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 p-6 flex items-center justify-center flex-col">
        <h3 id="myText4" className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-white">
          Rules
        </h3>
        {!selectedCategory ? (
          <div className="flex flex-wrap justify-center gap-4">
            <button className="hover-gradient-amber-4 text-white font-bold px-4 py-2 rounded" onClick={() => setSelectedCategory('Lunar')}>
              Lunar Rules
            </button>
            <button className="hover-gradient-amber-4 font-bold text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('Solar')}>
              Solar Rules
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
