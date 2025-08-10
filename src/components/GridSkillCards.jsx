import React, { useState, useEffect, useRef } from 'react';
import {
  Code,
  Palette,
  Database,
  Server,
  FileCode,
  Wrench,
  GitBranch,
  Brain,
  TrendingUp
} from 'lucide-react';

const GridSkillCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 8 skill categories from CV
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Palette,
      gradient: 'from-blue-500 to-purple-500',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 92 },
        { name: 'JavaScript', level: 88 },
        { name: 'React', level: 85 },
        { name: 'Bootstrap', level: 90 },
        { name: 'Tailwind CSS', level: 85 }
      ],
      tools: ['VS Code', 'Chrome DevTools', 'Figma'],
      experience: '1 year',
      projects: 5
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      gradient: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'PHP', level: 82 },
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'RESTful APIs', level: 85 }
      ],
      tools: ['Postman', 'Docker', 'AWS'],
      experience: '2+ years',
      projects: 12
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: FileCode,
      gradient: 'from-orange-500 to-amber-500',
      skills: [
        { name: 'JavaScript', level: 88 },
        { name: 'Python', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'C', level: 68 }
      ],
      tools: ['VS Code', 'IntelliJ IDEA', 'PyCharm'],
      experience: '2+ years',
      projects: 25
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      gradient: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 75 }
      ],
      tools: ['phpMyAdmin', 'MongoDB Compass'],
      experience: '2+ years',
      projects: 16
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      icon: Wrench,
      gradient: 'from-red-500 to-pink-500',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 85 },
        { name: 'IntelliJ IDEA', level: 80 }
      ],
      tools: ['Terminal', 'Figma', 'Slack'],
      experience: '2+ years',
      projects: 30
    },
    {
      id: 'practices',
      title: 'Development Practices',
      icon: GitBranch,
      gradient: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'Agile Methodology', level: 80 },
        { name: 'Version Control', level: 90 },
        { name: 'Debugging & Testing', level: 85 },
        { name: 'Responsive Design', level: 88 }
      ],
      tools: ['Git', 'GitHub Actions', 'Chrome DevTools'],
      experience: '2+ years',
      projects: 20
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      icon: Brain,
      gradient: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Python ML', level: 68 },
        { name: 'Data Analysis', level: 65 }
      ],
      tools: ['Python', 'Jupyter', 'pandas'],
      experience: '1+ years',
      projects: 5
    },
    {
      id: 'seo',
      title: 'SEO & Optimization',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-500',
      skills: [
        { name: 'SEO Optimization', level: 85 },
        { name: 'Web Performance', level: 80 }
      ],
      tools: ['Google Analytics', 'PageSpeed Insights'],
      experience: '2+ years',
      projects: 15
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (cardId) => {
    console.log('Card clicked:', cardId);
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
        console.log('Card flipped back:', cardId);
      } else {
        newSet.add(cardId);
        console.log('Card flipped:', cardId);
      }
      console.log('Flipped cards:', Array.from(newSet));
      return newSet;
    });
  };

  const SkillCard = ({ category, index }) => {
    const isFlipped = flippedCards.has(category.id);
    const IconComponent = category.icon;

    return (
      <div
        className="w-full h-64 cursor-pointer"
        style={{ 
          perspective: '1000px',
          animationDelay: `${index * 150}ms`
        }}
        onClick={() => handleCardClick(category.id)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 hover:scale-105"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            WebkitTransformStyle: 'preserve-3d',
            WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Face */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.gradient} rounded-xl shadow-xl border border-white/20 overflow-hidden`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="p-4 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <IconComponent size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <span className="text-white/80 text-xs">Click to flip</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">{category.title}</h3>

              {/* Skills List */}
              <div className="flex-grow space-y-3">
                {category.skills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-white/20 rounded-full h-1">
                        <div
                          className="h-1 bg-white rounded-full transition-all duration-1000"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(index * 150) + (idx * 100)}ms`
                          }}
                        />
                      </div>
                      <span className="text-white/80 text-xs font-medium">{skill.level}%</span>
                    </div>
                  </div>
                ))}
                {category.skills.length > 4 && (
                  <div className="text-white/70 text-xs text-center mt-2">
                    +{category.skills.length - 4} more skills
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between text-white/90 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-sm">{category.projects}</div>
                    <div className="opacity-80">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">{category.experience}</div>
                    <div className="opacity-80">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.gradient} rounded-xl shadow-xl border border-white/20 overflow-hidden`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="p-4 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-3">
                <IconComponent size={28} className="text-white" />
                <div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-white/80 text-xs">Detailed Information</p>
                </div>
              </div>

              {/* All Skills */}
              <div className="mb-4">
                <h4 className="text-white font-semibold text-sm mb-2">All Skills:</h4>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-white text-xs">{skill.name}</span>
                      <span className="text-white font-bold text-xs">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-4">
                <h4 className="text-white font-semibold text-sm mb-2">Tools:</h4>
                <div className="flex flex-wrap gap-1">
                  {category.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-white font-bold text-sm">{category.projects}</div>
                    <div className="text-white/80 text-xs">Projects</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-white font-bold text-sm">{category.experience}</div>
                    <div className="text-white/80 text-xs">Experience</div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-3">
                <span className="text-white/60 text-xs">Click to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full py-8">
      {/* Grid System */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Instructions */}
      <div className={`text-center mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          Click cards to flip and see detailed information
        </p>
        <div className="flex justify-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
          <span>8 Categories</span>
          <span>•</span>
          <span>{skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} Skills</span>
          <span>•</span>
          <span>{skillCategories.reduce((acc, cat) => acc + cat.projects, 0)}+ Projects</span>
        </div>
      </div>
    </div>
  );
};

export default GridSkillCards;
