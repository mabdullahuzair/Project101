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

const CleanSkills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [flippedCard, setFlippedCard] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const sectionRef = useRef(null);

  // Clean skills data
  const skillCategories = {
    mernStack: {
      title: 'MERN Stack',
      icon: Layers,
      color: 'from-green-500 to-emerald-600',
      description: 'Full-stack JavaScript development',
      skills: [
        { name: 'MongoDB', level: 75, key: 'M', description: 'NoSQL database for flexible data storage', projects: 8, years: 2 },
        { name: 'Express.js', level: 80, key: 'E', description: 'Fast, unopinionated web framework for Node.js', projects: 10, years: 2 },
        { name: 'React.js', level: 90, key: 'R', description: 'Component-based frontend library', projects: 15, years: 2 },
        { name: 'Node.js', level: 85, key: 'N', description: 'JavaScript runtime built on Chrome V8 engine', projects: 12, years: 2 }
      ]
    },
    frontend: {
      title: 'Frontend Development',
      icon: Palette,
      color: 'from-blue-500 to-cyan-600',
      description: 'Modern UI/UX development',
      skills: [
        { name: 'HTML5', level: 95, key: 'H', description: 'Semantic markup language for web content', projects: 20, years: 2 },
        { name: 'CSS3', level: 90, key: 'C', description: 'Styling language with animations and layouts', projects: 20, years: 2 },
        { name: 'JavaScript', level: 88, key: 'J', description: 'Dynamic programming language for web', projects: 18, years: 2 },
        { name: 'Tailwind CSS', level: 92, key: 'T', description: 'Utility-first CSS framework', projects: 15, years: 2 },
        { name: 'Bootstrap', level: 88, key: 'B', description: 'Popular CSS framework for responsive design', projects: 12, years: 2 },
        { name: 'Responsive Design', level: 85, key: 'D', description: 'Mobile-first responsive web design', projects: 18, years: 2 }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      description: 'Server-side technologies',
      skills: [
        { name: 'PHP', level: 82, key: 'P', description: 'Server-side scripting language', projects: 14, years: 2 },
        { name: 'MySQL', level: 80, key: 'Q', description: 'Popular relational database management system', projects: 16, years: 2 },
        { name: 'Python', level: 75, key: 'Y', description: 'High-level, interpreted programming language', projects: 10, years: 2 }
      ]
    },
    tools: {
      title: 'Development Tools',
      icon: Wrench,
      color: 'from-orange-500 to-red-600',
      description: 'Essential development tools',
      skills: [
        { name: 'Git & GitHub', level: 90, key: 'G', description: 'Distributed version control system', projects: 25, years: 2 },
        { name: 'VS Code', level: 95, key: 'V', description: 'Powerful code editor with extensions', projects: 25, years: 2 },
        { name: 'Postman', level: 85, key: 'O', description: 'API development and testing tool', projects: 15, years: 2 },
        { name: 'RESTful APIs', level: 82, key: 'A', description: 'Architectural style for web services', projects: 18, years: 2 }
      ]
    },
    emerging: {
      title: 'Emerging Technologies',
      icon: Brain,
      color: 'from-pink-500 to-rose-600',
      description: 'AI & Machine Learning',
      skills: [
        { name: 'Machine Learning', level: 68, key: 'I', description: 'AI algorithms and data analysis with Python', projects: 6, years: 1 },
        { name: 'SEO Optimization', level: 75, key: 'S', description: 'Search engine optimization techniques', projects: 12, years: 2 }
      ]
    }
  };

  // Get all skills in a flat array
  const allSkills = Object.values(skillCategories).flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.title,
      categoryColor: category.color
    }))
  );

  // Filter skills based on active category
  const displayedSkills = activeCategory === 'all' 
    ? allSkills 
    : skillCategories[activeCategory]?.skills.map(skill => ({
        ...skill,
        category: skillCategories[activeCategory].title,
        categoryColor: skillCategories[activeCategory].color
      })) || [];

  // Virtual keyboard layout
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // Create skill key mapping
  const skillKeyMap = {};
  allSkills.forEach(skill => {
    skillKeyMap[skill.key] = skill;
  });

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

    const skills = allSkills.map(skill => skill.name);
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
  }, [isVisible, allSkills]);

  const handleKeyClick = (key) => {
    if (skillKeyMap[key]) {
      setFlippedCard(flippedCard === key ? null : key);
    }
  };

  const handleCardClick = (skill) => {
    setFlippedCard(flippedCard === skill.key ? null : skill.key);
  };

  const SkillCard = ({ skill, index }) => {
    const isFlipped = flippedCard === skill.key;
    
    return (
      <div
        className={`group relative h-64 perspective-1000 cursor-pointer transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
        onClick={() => handleCardClick(skill)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${skill.categoryColor} rounded-2xl shadow-xl backface-hidden border border-white/20 overflow-hidden`}>
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg">{skill.key}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{skill.level}%</div>
                  <div className="text-white/80 text-xs">Proficiency</div>
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
              <p className="text-white/90 text-sm mb-4 flex-grow">{skill.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="h-2 bg-white rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-white/90 text-sm">
                <div className="flex items-center space-x-1">
                  <Briefcase size={14} />
                  <span>{skill.projects} projects</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{skill.years} years</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back Face */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${skill.categoryColor} rounded-2xl shadow-xl backface-hidden rotate-y-180 border border-white/20 overflow-hidden`}>
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
              <Award className="text-white mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
              <p className="text-white/90 text-sm mb-4">{skill.description}</p>
              
              <div className="space-y-3 w-full">
                <div className="flex justify-between items-center text-white">
                  <span>Experience:</span>
                  <span className="font-bold">{skill.years} years</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>Projects:</span>
                  <span className="font-bold">{skill.projects}</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>Proficiency:</span>
                  <span className="font-bold">{skill.level}%</span>
                </div>
              </div>
              
              <div className="mt-4 text-white/70 text-xs">
                Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
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

        {/* Virtual Keyboard */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Interactive Skills Keyboard
          </h3>
          <div className="bg-gray-800 rounded-2xl p-6 max-w-4xl mx-auto shadow-2xl">
            <div className="space-y-2">
              {keyboardLayout.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex justify-center gap-2"
                  style={{
                    marginLeft: rowIndex === 1 ? '20px' : rowIndex === 2 ? '40px' : '0'
                  }}
                >
                  {row.map((key) => {
                    const skill = skillKeyMap[key];
                    const isActive = !!skill;
                    const isFlipped = flippedCard === key;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeyClick(key)}
                        className={`w-12 h-12 rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105 ${
                          isActive
                            ? isFlipped
                              ? 'bg-yellow-500 text-black shadow-lg scale-105'
                              : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                        disabled={!isActive}
                        title={skill ? `${skill.name} (${skill.level}%)` : key}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <div className="text-sm text-gray-400">
                Click colored keys to explore skills • {allSkills.length} skills mapped
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
          >
            All Skills ({allSkills.length})
          </button>
          
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
              >
                <IconComponent size={16} />
                <span>{category.title}</span>
                <span className="text-xs opacity-80">({category.skills.length})</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {displayedSkills.map((skill, index) => (
            <SkillCard key={skill.key} skill={skill} index={index} />
          ))}
        </div>

        {/* Stats Summary */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {allSkills.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length)}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Avg. Proficiency</div>
          </div>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {allSkills.reduce((acc, skill) => acc + skill.projects, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Projects</div>
          </div>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {Object.keys(skillCategories).length}
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
