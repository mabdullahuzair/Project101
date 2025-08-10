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
  Layers,
  Globe,
  Shield,
  Smartphone,
  Cloud,
  Cpu,
  HardDrive,
  Terminal,
  Users,
  Zap
} from 'lucide-react';

const GridSkillCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // 8 skill categories as requested
  const skillCategories = [
    {
      id: 'mern',
      title: 'MERN Stack',
      icon: Layers,
      color: '#61DAFB',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Full-stack JavaScript development',
      skills: [
        { name: 'MongoDB', level: 75, description: 'NoSQL database' },
        { name: 'Express.js', level: 80, description: 'Web framework' },
        { name: 'React.js', level: 90, description: 'Frontend library' },
        { name: 'Node.js', level: 85, description: 'Runtime environment' }
      ],
      tools: ['VS Code', 'Postman', 'MongoDB Compass', 'Git'],
      experience: '2+ years',
      projects: 15
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Palette,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-purple-500',
      description: 'Modern UI/UX development',
      skills: [
        { name: 'HTML5', level: 95, description: 'Semantic markup' },
        { name: 'CSS3', level: 92, description: 'Styling & animations' },
        { name: 'JavaScript', level: 88, description: 'Interactive functionality' },
        { name: 'React', level: 85, description: 'Component library' },
        { name: 'Tailwind', level: 90, description: 'Utility framework' },
        { name: 'Bootstrap', level: 85, description: 'CSS framework' }
      ],
      tools: ['Figma', 'Adobe XD', 'Chrome DevTools', 'Sass'],
      experience: '2+ years',
      projects: 20
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Server-side architecture',
      skills: [
        { name: 'Node.js', level: 85, description: 'JavaScript runtime' },
        { name: 'Express', level: 80, description: 'Web framework' },
        { name: 'PHP', level: 82, description: 'Server scripting' },
        { name: 'Python', level: 75, description: 'Backend language' }
      ],
      tools: ['Docker', 'AWS', 'Nginx', 'PM2'],
      experience: '2+ years',
      projects: 12
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-violet-500',
      description: 'Data management systems',
      skills: [
        { name: 'MySQL', level: 80, description: 'Relational database' },
        { name: 'MongoDB', level: 75, description: 'NoSQL database' },
        { name: 'PostgreSQL', level: 70, description: 'Advanced RDBMS' },
        { name: 'Redis', level: 65, description: 'In-memory store' }
      ],
      tools: ['phpMyAdmin', 'MongoDB Compass', 'TablePlus', 'DBeaver'],
      experience: '2+ years',
      projects: 16
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: FileCode,
      color: '#F59E0B',
      gradient: 'from-orange-500 to-amber-500',
      description: 'Core programming skills',
      skills: [
        { name: 'JavaScript', level: 88, description: 'Primary language' },
        { name: 'Python', level: 75, description: 'Scripting & ML' },
        { name: 'PHP', level: 82, description: 'Web development' },
        { name: 'TypeScript', level: 78, description: 'Typed JavaScript' },
        { name: 'C++', level: 70, description: 'System programming' }
      ],
      tools: ['VS Code', 'PyCharm', 'IntelliJ', 'Sublime Text'],
      experience: '2+ years',
      projects: 25
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      icon: Wrench,
      color: '#EF4444',
      gradient: 'from-red-500 to-pink-500',
      description: 'Development ecosystem',
      skills: [
        { name: 'Git & GitHub', level: 90, description: 'Version control' },
        { name: 'VS Code', level: 95, description: 'Code editor' },
        { name: 'Postman', level: 85, description: 'API testing' },
        { name: 'Docker', level: 75, description: 'Containerization' },
        { name: 'AWS', level: 70, description: 'Cloud services' }
      ],
      tools: ['Terminal', 'Figma', 'Slack', 'Notion'],
      experience: '2+ years',
      projects: 30
    },
    {
      id: 'practices',
      title: 'Development Practices',
      icon: GitBranch,
      color: '#06B6D4',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Best practices & methodologies',
      skills: [
        { name: 'Agile/Scrum', level: 80, description: 'Project methodology' },
        { name: 'Test-Driven Dev', level: 75, description: 'Testing approach' },
        { name: 'Code Review', level: 85, description: 'Quality assurance' },
        { name: 'CI/CD', level: 70, description: 'Deployment pipeline' },
        { name: 'Documentation', level: 88, description: 'Technical writing' }
      ],
      tools: ['Jest', 'GitHub Actions', 'Jira', 'Confluence'],
      experience: '2+ years',
      projects: 20
    },
    {
      id: 'other',
      title: 'Other Skills',
      icon: Brain,
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-500',
      description: 'Additional capabilities',
      skills: [
        { name: 'Machine Learning', level: 68, description: 'AI & data science' },
        { name: 'SEO Optimization', level: 75, description: 'Search optimization' },
        { name: 'UI/UX Design', level: 80, description: 'User experience' },
        { name: 'Mobile Dev', level: 70, description: 'React Native' }
      ],
      tools: ['TensorFlow', 'Google Analytics', 'Figma', 'Expo'],
      experience: '1+ years',
      projects: 10
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
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleMouseMove = (e, cardId) => {
    if (draggedCard === cardId) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseDown = (cardId) => {
    setDraggedCard(cardId);
  };

  const handleMouseUp = () => {
    setDraggedCard(null);
  };

  const SkillCard = ({ category, index }) => {
    const isFlipped = flippedCards.has(category.id);
    const isHovered = hoveredCard === category.id;
    const isDragged = draggedCard === category.id;
    const IconComponent = category.icon;

    return (
      <div
        className={`group relative h-96 cursor-pointer transition-all duration-700 transform-gpu ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${isDragged ? 'scale-110 z-50' : 'hover:scale-105'}`}
        style={{
          animationDelay: `${index * 100}ms`,
          perspective: '1000px',
          transform: isDragged 
            ? `scale(1.1) rotate(${(mousePosition.x % 10) - 5}deg)` 
            : isHovered 
            ? `rotate(${Math.sin(Date.now() * 0.001) * 2}deg)` 
            : 'rotate(0deg)'
        }}
        onClick={() => handleCardClick(category.id)}
        onMouseDown={() => handleMouseDown(category.id)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e, category.id)}
        onMouseEnter={() => setHoveredCard(category.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.gradient} rounded-2xl shadow-xl backface-hidden border border-white/20 overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
            </div>

            <div className="p-6 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div 
                  className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                  style={{ backgroundColor: `${category.color}30` }}
                >
                  <IconComponent size={28} className="text-white" />
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-medium">Click for details</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">{category.title}</h3>
              <p className="text-white/90 text-sm mb-6">{category.description}</p>

              {/* Skills List */}
              <div className="space-y-3 flex-grow">
                {category.skills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-white/20 rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-white rounded-full transition-all duration-1000"
                          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
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
                <div className="flex justify-between text-white/90 text-sm">
                  <div>
                    <div className="font-bold">{category.projects}</div>
                    <div className="text-xs opacity-80">Projects</div>
                  </div>
                  <div>
                    <div className="font-bold">{category.experience}</div>
                    <div className="text-xs opacity-80">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.gradient} rounded-2xl shadow-xl backface-hidden rotate-y-180 border border-white/20 overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 translate-y-12"></div>
            </div>

            <div className="p-6 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <IconComponent size={32} className="text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="text-white/80 text-sm">Detailed Information</p>
                </div>
              </div>

              {/* All Skills */}
              <div className="mb-6">
                <h4 className="text-white font-semibold text-sm mb-3">All Skills:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <span className="text-white text-sm">{skill.name}</span>
                        <p className="text-white/70 text-xs">{skill.description}</p>
                      </div>
                      <span className="text-white font-bold text-sm">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-6">
                <h4 className="text-white font-semibold text-sm mb-3">Tools & Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Details */}
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-white font-bold text-lg">{category.projects}</div>
                    <div className="text-white/80 text-xs">Total Projects</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-white font-bold text-lg">{category.experience}</div>
                    <div className="text-white/80 text-xs">Experience</div>
                  </div>
                </div>
              </div>

              {/* Click indicator */}
              <div className="text-center mt-4">
                <div className="text-white/60 text-xs">Click to flip back</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="py-8">
      {/* Grid of Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Instructions */}
      <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          Click cards to flip • Drag to tilt • Hover for animations
        </p>
        <div className="flex justify-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
          <span>8 Categories</span>
          <span>•</span>
          <span>{skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} Skills</span>
          <span>•</span>
          <span>{skillCategories.reduce((acc, cat) => acc + cat.projects, 0)}+ Projects</span>
        </div>
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

export default GridSkillCards;
