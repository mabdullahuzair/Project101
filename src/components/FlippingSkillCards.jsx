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

const FlippingSkillCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);

  // Enhanced skills data
  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Palette,
      color: 'from-blue-500 to-cyan-600',
      description: 'Creating beautiful and responsive user interfaces',
      skills: [
        { 
          name: 'HTML5', 
          level: 95, 
          key: 'H', 
          description: 'Semantic markup language for web content structure',
          detailedDescription: 'Expert in semantic HTML5, accessibility standards, SEO optimization, and modern web APIs. Experienced with forms, multimedia, and progressive web app features.',
          projects: 20, 
          years: 2,
          technologies: ['Semantic HTML', 'Web APIs', 'PWA', 'Accessibility', 'SEO'],
          icon: Code,
          color: '#E34F26'
        },
        { 
          name: 'CSS3', 
          level: 90, 
          key: 'C', 
          description: 'Advanced styling, animations and responsive design',
          detailedDescription: 'Advanced CSS3 with Flexbox, Grid, animations, and responsive design. Proficient in CSS-in-JS, preprocessors, and modern layout techniques.',
          projects: 20, 
          years: 2,
          technologies: ['Flexbox', 'Grid', 'Animations', 'Responsive Design', 'SASS'],
          icon: Palette,
          color: '#1572B6'
        },
        { 
          name: 'JavaScript', 
          level: 88, 
          key: 'J', 
          description: 'Modern ES6+ features and DOM manipulation',
          detailedDescription: 'Expert in modern JavaScript ES6+, async/await, promises, DOM manipulation, and browser APIs. Experienced with functional programming and design patterns.',
          projects: 18, 
          years: 2,
          technologies: ['ES6+', 'Async/Await', 'DOM APIs', 'Functional Programming', 'Design Patterns'],
          icon: Zap,
          color: '#F7DF1E'
        },
        { 
          name: 'React.js', 
          level: 85, 
          key: 'R', 
          description: 'Component-based architecture and hooks',
          detailedDescription: 'Advanced React development with hooks, context, state management, and performance optimization. Experienced with React ecosystem and best practices.',
          projects: 15, 
          years: 2,
          technologies: ['Hooks', 'Context API', 'Redux', 'Performance Optimization', 'Testing'],
          icon: Layers,
          color: '#61DAFB'
        },
        { 
          name: 'Tailwind CSS', 
          level: 92, 
          key: 'T', 
          description: 'Utility-first CSS framework for rapid development',
          detailedDescription: 'Expert in Tailwind CSS utility classes, custom components, responsive design, and theme customization. Experienced with JIT compilation and optimization.',
          projects: 15, 
          years: 2,
          technologies: ['Utility Classes', 'JIT', 'Custom Components', 'Responsive Design', 'Theme Customization'],
          icon: Wrench,
          color: '#06B6D4'
        },
        { 
          name: 'Bootstrap', 
          level: 88, 
          key: 'B', 
          description: 'Responsive component library and grid system',
          detailedDescription: 'Proficient in Bootstrap framework, custom themes, component customization, and responsive grid systems. Experienced with SCSS customization.',
          projects: 12, 
          years: 2,
          technologies: ['Grid System', 'Components', 'SCSS', 'Responsive Design', 'Custom Themes'],
          icon: Globe,
          color: '#7952B3'
        }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Database,
      color: 'from-green-500 to-emerald-600',
      description: 'Building robust server-side applications',
      skills: [
        { 
          name: 'Node.js', 
          level: 85, 
          key: 'N', 
          description: 'JavaScript runtime built on Chrome V8 engine',
          detailedDescription: 'Expert in Node.js server-side development, event-driven architecture, and npm ecosystem. Experienced with Express.js, API development, and microservices.',
          projects: 12, 
          years: 2,
          technologies: ['Express.js', 'REST APIs', 'Microservices', 'Event-Driven', 'NPM'],
          icon: Cpu,
          color: '#339933'
        },
        { 
          name: 'Express.js', 
          level: 80, 
          key: 'E', 
          description: 'Fast, unopinionated web framework for Node.js',
          detailedDescription: 'Advanced Express.js development with middleware, routing, authentication, and security best practices. Experienced with REST APIs and GraphQL.',
          projects: 10, 
          years: 2,
          technologies: ['Middleware', 'Routing', 'Authentication', 'Security', 'REST APIs'],
          icon: Globe,
          color: '#000000'
        },
        { 
          name: 'PHP', 
          level: 82, 
          key: 'P', 
          description: 'Server-side scripting language',
          detailedDescription: 'Proficient in PHP development with OOP principles, frameworks, and database integration. Experienced with Laravel and modern PHP practices.',
          projects: 14, 
          years: 2,
          technologies: ['OOP', 'Laravel', 'MVC', 'Database Integration', 'API Development'],
          icon: Code,
          color: '#777BB4'
        },
        { 
          name: 'Python', 
          level: 75, 
          key: 'Y', 
          description: 'High-level programming language',
          detailedDescription: 'Skilled in Python for web development, data analysis, and automation. Experienced with Django, Flask, and data science libraries.',
          projects: 10, 
          years: 2,
          technologies: ['Django', 'Flask', 'Data Analysis', 'Automation', 'Machine Learning'],
          icon: Brain,
          color: '#3776AB'
        }
      ]
    },
    database: {
      title: 'Database & Tools',
      icon: HardDrive,
      color: 'from-purple-500 to-violet-600',
      description: 'Data management and development tools',
      skills: [
        { 
          name: 'MongoDB', 
          level: 75, 
          key: 'M', 
          description: 'NoSQL database for flexible data storage',
          detailedDescription: 'Expert in MongoDB document database design, aggregation pipelines, indexing, and performance optimization. Experienced with Mongoose ODM.',
          projects: 8, 
          years: 2,
          technologies: ['Document DB', 'Aggregation', 'Indexing', 'Mongoose', 'Performance'],
          icon: Database,
          color: '#47A248'
        },
        { 
          name: 'MySQL', 
          level: 80, 
          key: 'Q', 
          description: 'Popular relational database management system',
          detailedDescription: 'Advanced MySQL database design, query optimization, stored procedures, and performance tuning. Experienced with complex joins and indexing.',
          projects: 16, 
          years: 2,
          technologies: ['SQL', 'Query Optimization', 'Stored Procedures', 'Indexing', 'Performance Tuning'],
          icon: Database,
          color: '#4479A1'
        },
        { 
          name: 'Git & GitHub', 
          level: 90, 
          key: 'G', 
          description: 'Distributed version control system',
          detailedDescription: 'Expert in Git workflow, branching strategies, code reviews, and collaborative development. Experienced with GitHub Actions and CI/CD.',
          projects: 25, 
          years: 2,
          technologies: ['Version Control', 'Branching', 'Code Reviews', 'CI/CD', 'GitHub Actions'],
          icon: Terminal,
          color: '#F05032'
        },
        { 
          name: 'VS Code', 
          level: 95, 
          key: 'V', 
          description: 'Powerful code editor with extensions',
          detailedDescription: 'Advanced VS Code usage with custom configurations, extensions, debugging, and productivity workflows. Expert in editor customization.',
          projects: 25, 
          years: 2,
          technologies: ['Extensions', 'Debugging', 'Custom Config', 'Productivity', 'Workflows'],
          icon: Monitor,
          color: '#007ACC'
        },
        { 
          name: 'Postman', 
          level: 85, 
          key: 'O', 
          description: 'API development and testing tool',
          detailedDescription: 'Proficient in API testing, documentation, automation, and collection management. Experienced with testing workflows and environments.',
          projects: 15, 
          years: 2,
          technologies: ['API Testing', 'Documentation', 'Automation', 'Collections', 'Environments'],
          icon: Globe,
          color: '#FF6C37'
        },
        { 
          name: 'RESTful APIs', 
          level: 82, 
          key: 'A', 
          description: 'Architectural style for web services',
          detailedDescription: 'Expert in RESTful API design, implementation, documentation, and best practices. Experienced with OpenAPI and API versioning.',
          projects: 18, 
          years: 2,
          technologies: ['REST', 'OpenAPI', 'API Design', 'Documentation', 'Versioning'],
          icon: ExternalLink,
          color: '#25D366'
        }
      ]
    },
    emerging: {
      title: 'Emerging Technologies',
      icon: Brain,
      color: 'from-pink-500 to-rose-600',
      description: 'AI & Machine Learning',
      skills: [
        { 
          name: 'Machine Learning', 
          level: 68, 
          key: 'I', 
          description: 'AI algorithms and data analysis with Python',
          detailedDescription: 'Developing machine learning models using Python, scikit-learn, and TensorFlow. Experienced with data preprocessing, model training, and evaluation.',
          projects: 6, 
          years: 1,
          technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Data Analysis', 'Model Training'],
          icon: Brain,
          color: '#FF6B6B'
        },
        { 
          name: 'SEO Optimization', 
          level: 75, 
          key: 'S', 
          description: 'Search engine optimization techniques',
          detailedDescription: 'Advanced SEO strategies including technical SEO, content optimization, performance optimization, and analytics. Experienced with Google tools.',
          projects: 12, 
          years: 2,
          technologies: ['Technical SEO', 'Content Optimization', 'Performance', 'Analytics', 'Google Tools'],
          icon: TrendingUp,
          color: '#4285F4'
        }
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

  const handleCardClick = (skillKey) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillKey)) {
        newSet.delete(skillKey);
      } else {
        newSet.add(skillKey);
      }
      return newSet;
    });
  };

  const SkillCard = ({ skill, index }) => {
    const isFlipped = flippedCards.has(skill.key);
    const IconComponent = skill.icon;
    
    return (
      <div
        className={`group relative h-80 cursor-pointer transition-all duration-500 transform-gpu ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } hover:scale-105`}
        style={{ 
          animationDelay: `${index * 100}ms`,
          perspective: '1000px'
        }}
        onClick={() => handleCardClick(skill.key)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${skill.categoryColor} rounded-2xl shadow-xl backface-hidden border border-white/20 overflow-hidden`}>
            <div className="p-6 h-full flex flex-col relative">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg">{skill.key}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{skill.level}%</div>
                  <div className="text-white/80 text-xs">Proficiency</div>
                </div>
              </div>

              {/* Icon and Skill Name */}
              <div className="flex items-center space-x-3 mb-4 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <IconComponent size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
              </div>

              {/* Description */}
              <p className="text-white/90 text-sm mb-6 flex-grow relative z-10">{skill.description}</p>

              {/* Progress Bar */}
              <div className="mb-4 relative z-10">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="h-2 bg-white rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-white/90 text-sm relative z-10">
                <div className="flex items-center space-x-1">
                  <Briefcase size={14} />
                  <span>{skill.projects} projects</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{skill.years} years</span>
                </div>
              </div>

              {/* Click indicator */}
              <div className="absolute bottom-4 right-4 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to flip
              </div>
            </div>
          </div>
          
          {/* Back Face */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${skill.categoryColor} rounded-2xl shadow-xl backface-hidden rotate-y-180 border border-white/20 overflow-hidden`}>
            <div className="p-6 h-full flex flex-col relative">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 translate-y-12"></div>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <IconComponent size={24} className="text-white" />
                  <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                </div>
                <Award className="text-white" size={24} />
              </div>
              
              {/* Detailed Description */}
              <p className="text-white/90 text-sm mb-6 flex-grow relative z-10">{skill.detailedDescription}</p>
              
              {/* Technologies */}
              <div className="mb-4 relative z-10">
                <h4 className="text-white font-semibold text-sm mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {skill.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {skill.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                      +{skill.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-center text-white text-sm">
                  <span>Experience:</span>
                  <span className="font-bold">{skill.years} years</span>
                </div>
                <div className="flex justify-between items-center text-white text-sm">
                  <span>Projects:</span>
                  <span className="font-bold">{skill.projects}</span>
                </div>
                <div className="flex justify-between items-center text-white text-sm">
                  <span>Proficiency:</span>
                  <span className="font-bold">{skill.level}%</span>
                </div>
              </div>
              
              {/* Click indicator */}
              <div className="absolute bottom-4 right-4 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="py-8">
      {/* Category Filter */}
      <div className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {displayedSkills.map((skill, index) => (
          <SkillCard key={skill.key} skill={skill} index={index} />
        ))}
      </div>

      {/* Instructions */}
      <div className={`mt-8 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Click on any card to flip and see detailed information
        </p>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
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
    </div>
  );
};

export default FlippingSkillCards;
