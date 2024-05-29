'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

export default function RuleSection() {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const rules = useMemo(() => ({
    Fractal: [
      {
        title: 'Fractal Category Overview',
        text: 'Fractal invites artists to harness the power of algorithms, code, and digital processes to create artworks that breathe life into the theme of acceleration. This category challenges participants to blend artistic vision with computational creativity, resulting in dynamic pieces that evolve and resonate with viewers. Prize: $10,000.',
      },
      {
        title: 'Eligibility',
        text: 'Open to artists and collaborative groups from anywhere in the world. Must be 18 years or older, or have guardian consent if under 18.',
      },
      {
        title: 'Submission Criteria',
        text: 'Artists must include a comprehensive description that highlights the conceptual underpinning of the piece, the technological tools and processes used, and its relevance to the theme of acceleration.',
      },
      {
        title: 'Generative Techniques',
        text: 'Must predominantly utilize generative art methods, where code and algorithms are essential to the creative process. This includes static images, dynamic animations, and interactive works.',
      },
      {
        title: 'Respectful Content',
        text: 'Artworks must not contain content that disparages or discriminates against any group, religion, or political stance. Must steer clear of sensitive or contentious topics.',
      },
      {
        title: 'Creativity over AI Dependency',
        text: 'Submissions should demonstrate a harmonious blend of AI with other creative processes or technologies. The goal is to ensure that the artwork reflects a multifaceted creative effort rather than reliance on AI-generated content alone.',
      },
      {
        title: 'No Copyright Violation',
        text: 'All entries must be the original work of the submitting artist, created specifically for the Vivid contest. Every element used in the artwork must be legally obtained or created by the artist.',
      },
      {
        title: 'Submission Deadline',
        text: 'All entries must be submitted by the specified deadline. Late submissions will not be considered for judging.',
      },
      {
        title: 'Post-Ceremony Program',
        text: 'Winners share their profound stories and strategies in Power 2 The People: Trade Arena Magazine and partner platforms, gaining significant recognition.',
      },
    ],
    Prism: [
      {
        title: 'Prism Category Overview',
        text: 'Prism seeks artists who can conceptualize and produce works that thoughtfully interpret the theme of acceleration of the society, with a strong emphasis on the integration of technology and artistic innovation. Prize: $10,000.',
      },
      {
        title: 'Eligibility',
        text: 'Open to artists and collaborative groups from anywhere in the world. Must be 18 years or older, or have guardian consent if under 18.',
      },
      {
        title: 'Submission Criteria',
        text: 'Artists must include a comprehensive description that highlights the conceptual underpinning of the piece, the technological tools and processes used, and its relevance to the theme of acceleration.',
      },
      {
        title: 'Art on Event Grounds',
        text: 'The Accelerate event grounds will serve as an immersive gallery for Vivid artworks, with designated spaces for interactive installations, digital displays, and physical pieces that embody the contest theme.',
      },
      {
        title: 'WTC Facade Display',
        text: 'Selected artworks from both Fractal and Prism will be showcased on the facade of the World Trade Center, transforming this iconic structure into a canvas of digital innovation and artistic brilliance.',
      },
      {
        title: 'Building as a Canvas',
        text: 'The event grounds themselves, including structures and installations, can be utilized as canvases for displaying art. This approach not only integrates art seamlessly into the event environment but also encourages artists to think outside traditional exhibition spaces.',
      },
      {
        title: 'Respectful Content',
        text: 'Artworks must not contain content that disparages or discriminates against any group, religion, or political stance. Must steer clear of sensitive or contentious topics.',
      },
      {
        title: 'No Copyright Violation',
        text: 'All entries must be the original work of the submitting artist, created specifically for the Vivid contest. Every element used in the artwork must be legally obtained or created by the artist.',
      },
      {
        title: 'Post-Ceremony Program',
        text: 'Winners share their profound stories and strategies in Power 2 The People: Trade Arena Magazine and partner platforms, gaining significant recognition.',
      },
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
  }, [currentRuleIndex, selectedCategory, rules, showRule]);

  const handlePrev = useCallback(() => {
    if (currentRuleIndex !== null) {
      const prevIndex = (currentRuleIndex - 1 + rules[selectedCategory].length) % rules[selectedCategory].length;
      showRule(prevIndex);
    }
  }, [currentRuleIndex, selectedCategory, rules, showRule]);

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
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 p-6 flex items-center justify-center flex-col">
        <h3 id="myText4" className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-white">
          Rules
        </h3>
        {!selectedCategory ? (
          <div className="flex flex-wrap justify-center gap-4">
            <button className="hover-gradient-amber-4 text-white font-bold px-4 py-2 rounded" onClick={() => setSelectedCategory('Fractal')}>
              Fractal Rules
            </button>
            <button className="hover-gradient-amber-4 font-bold text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('Prism')}>
              Prism Rules
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
