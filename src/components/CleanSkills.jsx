import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Cpu,
  HardDrive,
  Terminal,
  Code,
  Database,
  Globe,
  Palette,
  Layers,
  Zap,
  Wrench,
  Brain,
  Star,
  TrendingUp,
  Sparkles,
  Award,
  Calendar,
  Users,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import Keyboard3D from './Keyboard3D';
import FlippingSkillCards from './FlippingSkillCards';

const CleanSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [flippedCard, setFlippedCard] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const sectionRef = useRef(null);

  // Sample skills data for 3D keyboard (will be passed from FlippingSkillCards)
  const sampleSkills = [
    { name: 'HTML5', level: 95, key: 'H', color: '#E34F26' },
    { name: 'CSS3', level: 90, key: 'C', color: '#1572B6' },
    { name: 'JavaScript', level: 88, key: 'J', color: '#F7DF1E' },
    { name: 'React.js', level: 85, key: 'R', color: '#61DAFB' },
    { name: 'Node.js', level: 85, key: 'N', color: '#339933' },
    { name: 'MongoDB', level: 75, key: 'M', color: '#47A248' },
    { name: 'Python', level: 75, key: 'Y', color: '#3776AB' },
    { name: 'Git & GitHub', level: 90, key: 'G', color: '#F05032' },
    { name: 'VS Code', level: 95, key: 'V', color: '#007ACC' },
    { name: 'Tailwind CSS', level: 92, key: 'T', color: '#06B6D4' },
    { name: 'Bootstrap', level: 88, key: 'B', color: '#7952B3' },
    { name: 'Express.js', level: 80, key: 'E', color: '#000000' },
    { name: 'PHP', level: 82, key: 'P', color: '#777BB4' },
    { name: 'MySQL', level: 80, key: 'Q', color: '#4479A1' },
    { name: 'Postman', level: 85, key: 'O', color: '#FF6C37' },
    { name: 'RESTful APIs', level: 82, key: 'A', color: '#25D366' },
    { name: 'Machine Learning', level: 68, key: 'I', color: '#FF6B6B' },
    { name: 'SEO Optimization', level: 75, key: 'S', color: '#4285F4' }
  ];

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

  // Auto-typing effect
  useEffect(() => {
    if (!isVisible) return;

    const skills = sampleSkills.map(skill => skill.name);
    let currentIndex = 0;
    let currentChar = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentSkill = skills[currentIndex];

      if (isDeleting) {
        setTypedText(currentSkill.substring(0, currentChar - 1));
        currentChar--;

        if (currentChar === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % skills.length;
        }
      } else {
        setTypedText(currentSkill.substring(0, currentChar + 1));
        currentChar++;

        if (currentChar === currentSkill.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
          return;
        }
      }
    };

    const interval = setInterval(typeWriter, isDeleting ? 50 : 100);
    return () => clearInterval(interval);
  }, [isVisible, sampleSkills]);


  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my expertise through interactive skill cards and virtual keyboard
          </p>

          {/* Typing Animation */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 max-w-md mx-auto">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Currently highlighting:</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 min-h-8">
              {typedText}<span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        {/* 3D Interactive Keyboard */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            3D Interactive Skills Keyboard
          </h3>
          <div className="max-w-6xl mx-auto">
            <Keyboard3D
              skills={sampleSkills}
              onSkillClick={(skill) => setFlippedCard(flippedCard === skill.key ? null : skill.key)}
            />
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Drag to rotate • Click colored keys to explore skills • {sampleSkills.length} skills mapped
            </div>
          </div>
        </div>

        {/* Flipping Skill Cards */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Skill Cards - Click to Flip!
          </h3>
          <FlippingSkillCards />
        </div>

        {/* Stats Summary */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {sampleSkills.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {Math.round(sampleSkills.reduce((acc, skill) => acc + skill.level, 0) / sampleSkills.length)}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Avg. Proficiency</div>
          </div>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              250+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Projects</div>
          </div>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              4
            </div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default CleanSkills;
