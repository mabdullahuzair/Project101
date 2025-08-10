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
  Zap,
  TrendingUp
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
        { name: 'Bootstrap', level: 90, description: 'CSS framework' },
        { name: 'Tailwind CSS', level: 85, description: 'Utility framework' }
      ],
      tools: ['VS Code', 'Chrome DevTools', 'Figma', 'Sass'],
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
        { name: 'PHP', level: 82, description: 'Server scripting' },
        { name: 'Node.js', level: 85, description: 'JavaScript runtime' },
        { name: 'Express.js', level: 80, description: 'Web framework' },
        { name: 'RESTful APIs', level: 85, description: 'API development' }
      ],
      tools: ['Postman', 'Docker', 'AWS', 'PM2'],
      experience: '2+ years',
      projects: 12
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
        { name: 'C++', level: 70, description: 'System programming' },
        { name: 'C', level: 68, description: 'Low-level programming' }
      ],
      tools: ['VS Code', 'IntelliJ IDEA', 'PyCharm', 'Code::Blocks'],
      experience: '2+ years',
      projects: 25
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
        { name: 'MongoDB', level: 75, description: 'NoSQL database' }
      ],
      tools: ['phpMyAdmin', 'MongoDB Compass', 'MySQL Workbench'],
      experience: '2+ years',
      projects: 16
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
        { name: 'IntelliJ IDEA', level: 80, description: 'IDE' }
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
        { name: 'Agile Methodology', level: 80, description: 'Project methodology' },
        { name: 'Version Control', level: 90, description: 'Git workflow' },
        { name: 'Debugging & Testing', level: 85, description: 'Quality assurance' },
        { name: 'Responsive Design', level: 88, description: 'Mobile-first approach' }
      ],
      tools: ['Git', 'Jira', 'GitHub Actions', 'Chrome DevTools'],
      experience: '2+ years',
      projects: 20
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      icon: Brain,
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-500',
      description: 'AI & data science',
      skills: [
        { name: 'Python ML', level: 68, description: 'Machine learning with Python' },
        { name: 'Data Analysis', level: 65, description: 'Data processing' }
      ],
      tools: ['Python', 'Jupyter', 'pandas', 'scikit-learn'],
      experience: '1+ years',
      projects: 5
    },
    {
      id: 'other',
      title: 'SEO & Optimization',
      icon: TrendingUp,
      color: '#059669',
      gradient: 'from-emerald-500 to-green-500',
      description: 'Web optimization',
      skills: [
        { name: 'SEO Optimization', level: 85, description: 'Search engine optimization' },
        { name: 'Web Performance', level: 80, description: 'Site optimization' }
      ],
      tools: ['Google Analytics', 'PageSpeed Insights', 'SEMrush'],
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
        className={`group relative h-64 cursor-pointer transition-all duration-700 ${
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
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Face */}
          <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.gradient} rounded-xl shadow-xl border border-white/20 overflow-hidden`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-8 translate-y-8"></div>
            </div>

            <div className="p-4 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                  style={{ backgroundColor: `${category.color}30` }}
                >
                  <IconComponent size={24} className="text-white" />
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-medium">Click to flip</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
              <p className="text-white/90 text-xs mb-4">{category.description}</p>

              {/* Skills List */}
              <div className="space-y-2 flex-grow">
                {category.skills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-white text-xs font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-white/20 rounded-full h-1">
                        <div
                          className="h-1 bg-white rounded-full transition-all duration-1000"
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
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex justify-between text-white/90 text-xs">
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
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.gradient} rounded-xl shadow-xl border border-white/20 overflow-hidden`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full transform translate-x-8 translate-y-8"></div>
            </div>

            <div className="p-4 h-full flex flex-col relative z-10">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-3">
                <IconComponent size={24} className="text-white" />
                <div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-white/80 text-xs">Detailed Information</p>
                </div>
              </div>

              {/* All Skills */}
              <div className="mb-4">
                <h4 className="text-white font-semibold text-sm mb-2">Skills:</h4>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <span className="text-white text-xs">{skill.name}</span>
                        <p className="text-white/70 text-xs">{skill.description}</p>
                      </div>
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

              {/* Experience Details */}
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{category.projects}</div>
                    <div className="text-white/80 text-xs">Projects</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{category.experience}</div>
                    <div className="text-white/80 text-xs">Experience</div>
                  </div>
                </div>
              </div>

              {/* Click indicator */}
              <div className="text-center mt-2">
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
      {/* Grid of Cards - 3 columns on larger screens */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Instructions */}
      <div className={`mt-8 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
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
    </div>
  );
};

export default GridSkillCards;
