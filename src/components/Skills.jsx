import { useState, useEffect, useRef } from 'react';
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
  Trophy,
  Award,
  TrendingUp,
  Grid3X3,
  X,
  Info,
  Sparkles,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import SkillsKeyboard from './SkillsKeyboard';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef(null);

  // Enhanced skills data with more properties
  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-500',
      icon: Palette,
      description: 'Creating beautiful and responsive user interfaces',
      category: 'frontend',
      skills: [
        {
          name: 'HTML5',
          level: 95,
          years: 2,
          projects: 20, 
          icon: Code, 
          color: '#E34F26', 
          description: 'Semantic markup and modern web standards',
          tags: ['Semantic', 'Web Standards', 'Accessibility'],
          trend: 'stable'
        },
        {
          name: 'CSS3',
          level: 92,
          years: 2,
          projects: 20, 
          icon: Palette, 
          color: '#1572B6', 
          description: 'Advanced styling, animations and responsive design',
          tags: ['Flexbox', 'Grid', 'Animations', 'Responsive'],
          trend: 'up'
        },
        {
          name: 'JavaScript',
          level: 88,
          years: 2,
          projects: 17, 
          icon: Zap, 
          color: '#F7DF1E', 
          description: 'Modern ES6+ features and DOM manipulation',
          tags: ['ES6+', 'Async/Await', 'DOM', 'APIs'],
          trend: 'up'
        },
        {
          name: 'React.js',
          level: 85,
          years: 2,
          projects: 15, 
          icon: Layers, 
          color: '#61DAFB', 
          description: 'Component-based architecture and hooks',
          tags: ['Hooks', 'Components', 'JSX', 'Virtual DOM'],
          trend: 'up'
        },
        {
          name: 'Tailwind CSS',
          level: 90,
          years: 2,
          projects: 13, 
          icon: Wrench, 
          color: '#06B6D4', 
          description: 'Utility-first CSS framework for rapid development',
          tags: ['Utility-First', 'Responsive', 'Components'],
          trend: 'up'
        },
        {
          name: 'Bootstrap',
          level: 88,
          years: 2,
          projects: 11, 
          icon: Grid3X3, 
          color: '#7952B3', 
          description: 'Responsive component library and grid system',
          tags: ['Components', 'Grid', 'Responsive'],
          trend: 'stable'
        }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500',
      icon: Database,
      description: 'Building robust server-side applications',
      category: 'backend',
      skills: [
        {
          name: 'PHP',
          level: 82,
          years: 2,
          projects: 13, 
          icon: Code, 
          color: '#777BB4', 
          description: 'Server-side scripting and web development',
          tags: ['Server-Side', 'Web Development', 'OOP'],
          trend: 'stable'
        },
        {
          name: 'Node.js',
          level: 78,
          years: 2,
          projects: 11, 
          icon: Cpu, 
          color: '#339933', 
          description: 'JavaScript runtime for server-side development',
          tags: ['Runtime', 'Event-Driven', 'Non-blocking'],
          trend: 'up'
        },
        {
          name: 'Express.js',
          level: 76,
          years: 2,
          projects: 11, 
          icon: Globe, 
          color: '#000000', 
          description: 'Fast and minimalist web framework for Node.js',
          tags: ['Framework', 'REST API', 'Middleware'],
          trend: 'up'
        }
      ]
    },
    database: {
      name: 'Database & Tools',
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-violet-500',
      icon: HardDrive,
      description: 'Data management and development tools',
      category: 'database',
      skills: [
        {
          name: 'MySQL',
          level: 80,
          years: 2,
          projects: 13, 
          icon: Database, 
          color: '#4479A1', 
          description: 'Relational database management and optimization',
          tags: ['Relational', 'SQL', 'Optimization'],
          trend: 'stable'
        },
        {
          name: 'MongoDB',
          level: 72,
          years: 2,
          projects: 9, 
          icon: Layers, 
          color: '#47A248', 
          description: 'NoSQL document database for flexible data storage',
          tags: ['NoSQL', 'Document', 'Flexible'],
          trend: 'up'
        },
        {
          name: 'Git & GitHub',
          level: 90,
          years: 2,
          projects: 20, 
          icon: Code, 
          color: '#F05032', 
          description: 'Version control and collaborative development',
          tags: ['Version Control', 'Collaboration', 'DevOps'],
          trend: 'stable'
        },
        {
          name: 'VS Code',
          level: 95,
          years: 2,
          projects: 20, 
          icon: Monitor, 
          color: '#007ACC', 
          description: 'Advanced IDE usage with extensions and debugging',
          tags: ['IDE', 'Extensions', 'Debugging'],
          trend: 'stable'
        }
      ]
    },
    programming: {
      name: 'Programming Languages',
      color: '#F59E0B',
      gradient: 'from-orange-500 to-amber-500',
      icon: Brain,
      description: 'Core programming languages and paradigms',
      category: 'programming',
      skills: [
        {
          name: 'Python',
          level: 75,
          years: 2,
          projects: 10, 
          icon: Brain, 
          color: '#3776AB', 
          description: 'Versatile programming language for various applications',
          tags: ['Versatile', 'Data Science', 'Automation'],
          trend: 'up'
        },
        {
          name: 'Machine Learning',
          level: 68,
          years: 2,
          projects: 8, 
          icon: Star, 
          color: '#FF6B6B', 
          description: 'AI and data science fundamentals',
          tags: ['AI', 'Data Science', 'Algorithms'],
          trend: 'up'
        }
      ]
    }
  };

  // Get all skills in a flat array
  const allSkills = Object.values(skillsData).flatMap(category => 
    category.skills.map(skill => ({...skill, category: category.category, categoryName: category.name}))
  );

  // Filter skills based on active filter
  const filteredSkills = activeFilter === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeFilter);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { 
      y: -10, 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: [0, 0.05, 0.1], rootMargin: '-20px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback timer to ensure visibility if observer fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '📊';
    }
  };

  const SkillCard = ({ skill, index }) => {
    const isHovered = hoveredCard === `${skill.category}-${skill.name}`;
    
    return (
      <div
        className={`group relative bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/20 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
        style={{ 
          animationDelay: `${index * 100}ms`,
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
        }}
        onMouseEnter={() => setHoveredCard(`${skill.category}-${skill.name}`)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => setSelectedSkill(skill)}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl h-full w-full"></div>
        </div>

        {/* Card Content */}
        <div className="relative p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <skill.icon size={24} style={{ color: skill.color }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {skill.categoryName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold" style={{ color: skill.color }}>
                {skill.level}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {getTrendIcon(skill.trend)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
              <span>Proficiency</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 group-hover:animate-pulse"
                style={{
                  width: isVisible ? `${skill.level}%` : '0%',
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {skill.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {skill.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
            {skill.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-full">
                +{skill.tags.length - 3}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{skill.years}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Year{skill.years !== 1 ? 's' : ''}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{skill.projects}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my expertise across different technologies and see the depth of my experience
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {['all', ...Object.keys(skillsData)].map((filter) => {
            const isActive = activeFilter === filter;
            const category = filter === 'all' ? null : skillsData[filter];
            
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {filter === 'all' ? 'All Skills' : category?.name}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {filteredSkills.map((skill, index) => (
            <SkillCard key={`${skill.category}-${skill.name}`} skill={skill} index={index} />
          ))}
        </div>

        {/* Selected Skill Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full border border-gray-200 dark:border-gray-700 shadow-2xl animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${selectedSkill.color}20` }}
                  >
                    <selectedSkill.icon size={32} style={{ color: selectedSkill.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedSkill.categoryName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
                >
                  <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{selectedSkill.description}</p>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSkill.level}%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Proficiency</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <Award className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSkill.years}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Year{selectedSkill.years !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSkill.projects}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Projects</div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies & Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Skills Keyboard */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <SkillsKeyboard />
        </div>

        {/* Stats Summary */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {allSkills.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length)}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Avg. Proficiency</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {allSkills.reduce((acc, skill) => acc + skill.projects, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Projects</div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {Object.keys(skillsData).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-none {
          display: block;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
          overflow: visible;
        }
      `}</style>
    </section>
  );
};

export default Skills;
