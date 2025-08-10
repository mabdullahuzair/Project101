import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Keyboard,
  Grid3X3
} from 'lucide-react';
import QwertySkillsKeyboard from './QwertySkillsKeyboard';
import GridSkillCards from './GridSkillCards';

const CleanSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-20px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my expertise through interactive keyboard and skill cards
          </p>
        </div>

        {/* Section 1: QWERTY Skills Keyboard */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-center mb-8">
            <Keyboard className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Skills Section 1 – Rotating Skills Keyboard
            </h3>
          </div>
          <QwertySkillsKeyboard />
        </div>

        {/* Section 2: Grid Skill Cards */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-center mb-8">
            <Grid3X3 className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Skills Section 2 – Grid Skill Cards
            </h3>
          </div>
          <GridSkillCards />
        </div>

        {/* Summary Stats */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Skills Overview</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive experience with keyboard typing detection and draggable skill cards
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                45+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Technologies</div>
            </div>
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                83%
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Avg. Proficiency</div>
            </div>
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                148
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Total Projects</div>
            </div>
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                8
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Categories</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CleanSkills;
