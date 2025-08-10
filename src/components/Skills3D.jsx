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
  TrendingUp,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Award,
  Target,
  Calendar,
  Users,
  Briefcase,
  ExternalLink
} from 'lucide-react';

const Skills3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardRotation, setKeyboardRotation] = useState({ x: -15, y: 5, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState({ x: -15, y: 5, z: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [clickedKey, setClickedKey] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const sectionRef = useRef(null);
  const keyboardRef = useRef(null);
  const autoRotateRef = useRef(null);

  // Skills mapped to keyboard keys with categories
  const skillCategories = {
    mernStack: {
      title: 'MERN Stack',
      icon: Layers,
      color: 'from-green-500 to-emerald-600',
      description: 'Full-stack JavaScript development with MongoDB, Express.js, React.js, and Node.js',
      level: 85,
      experience: '2 years',
      projects: 12,
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      keyboardKeys: ['M', 'E', 'R', 'N'],
      details: {
        strengths: ['Component-based architecture', 'RESTful APIs', 'Database design', 'Real-time applications'],
        recentProjects: ['MacroMate AI App', 'E-commerce Platform', 'Social Media Dashboard'],
        learning: 'Advanced React patterns and Node.js optimization'
      }
    },
    frontend: {
      title: 'Frontend Technologies',
      icon: Palette,
      color: 'from-blue-500 to-cyan-600',
      description: 'Modern frontend development with HTML5, CSS3, JavaScript, and frameworks',
      level: 92,
      experience: '2 years',
      projects: 20,
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
      keyboardKeys: ['H', 'C', 'J', 'T', 'B'],
      details: {
        strengths: ['Responsive design', 'CSS animations', 'Modern JavaScript', 'Component libraries'],
        recentProjects: ['Portfolio websites', 'Landing pages', 'Interactive UIs'],
        learning: 'Advanced CSS Grid and Flexbox patterns'
      }
    },
    backend: {
      title: 'Backend Development',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      description: 'Server-side development with PHP, Python, and database management',
      level: 78,
      experience: '2 years',
      projects: 14,
      technologies: ['PHP', 'Python', 'MySQL', 'RESTful APIs'],
      keyboardKeys: ['P', 'Y', 'Q', 'A'],
      details: {
        strengths: ['Database design', 'API development', 'Server optimization', 'Security implementation'],
        recentProjects: ['CMS systems', 'API backends', 'Database migrations'],
        learning: 'Advanced Python frameworks and microservices'
      }
    },
    tools: {
      title: 'Development Tools',
      icon: Wrench,
      color: 'from-orange-500 to-red-600',
      description: 'Essential development tools and workflow optimization',
      level: 90,
      experience: '2 years',
      projects: 25,
      technologies: ['Git & GitHub', 'VS Code', 'Terminal', 'NPM/Yarn'],
      keyboardKeys: ['G', 'V', 'L', 'U'],
      details: {
        strengths: ['Version control', 'Code debugging', 'Command line', 'Package management'],
        recentProjects: ['CI/CD pipelines', 'Code reviews', 'Project setup'],
        learning: 'Docker containerization and deployment automation'
      }
    },
    emerging: {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-pink-500 to-rose-600',
      description: 'Artificial Intelligence and Machine Learning technologies',
      level: 68,
      experience: '1 year',
      projects: 6,
      technologies: ['Machine Learning', 'AI Development', 'Python Libraries'],
      keyboardKeys: ['I', 'Z', 'X'],
      details: {
        strengths: ['Data analysis', 'ML algorithms', 'AI integration', 'Python libraries'],
        recentProjects: ['MacroMate AI features', 'Recommendation systems', 'Data visualization'],
        learning: 'Deep learning frameworks and neural networks'
      }
    }
  };

  // Create keyboard layout mapping skills to keys
  const createSkillKeyboardLayout = () => {
    const qwertyRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    // Map skills to keys
    const skillKeyMap = {};
    Object.entries(skillCategories).forEach(([categoryKey, category]) => {
      category.keyboardKeys.forEach((key, index) => {
        skillKeyMap[key] = {
          category: categoryKey,
          skill: category.technologies[index] || category.title,
          categoryData: category,
          skillIndex: index
        };
      });
    });

    return qwertyRows.map(row => 
      row.map(key => ({
        key,
        skillData: skillKeyMap[key],
        isActive: !!skillKeyMap[key]
      }))
    );
  };

  const keyboardLayout = createSkillKeyboardLayout();

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

  // Keyboard drag rotation
  const handleMouseDown = (e) => {
    if (!keyboardRef.current?.contains(e.target)) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
    setLastRotation(keyboardRotation);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setKeyboardRotation({
      x: Math.max(-90, Math.min(90, lastRotation.x - deltaY * 0.5)),
      y: lastRotation.y + deltaX * 0.5,
      z: lastRotation.z
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (!keyboardRef.current?.contains(e.target)) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX,
      y: touch.clientY
    });
    setLastRotation(keyboardRotation);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches[0]) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    setKeyboardRotation({
      x: Math.max(-90, Math.min(90, lastRotation.x - deltaY * 0.5)),
      y: lastRotation.y + deltaX * 0.5,
      z: lastRotation.z
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart, lastRotation]);

  // Auto rotation
  useEffect(() => {
    if (isAutoRotating && !isDragging) {
      autoRotateRef.current = setInterval(() => {
        setKeyboardRotation(prev => ({
          ...prev,
          y: prev.y + 1
        }));
      }, 50);
    } else {
      clearInterval(autoRotateRef.current);
    }

    return () => clearInterval(autoRotateRef.current);
  }, [isAutoRotating, isDragging]);

  const playKeySound = () => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleKeyClick = (keyData) => {
    if (!keyData.isActive) return;
    
    setClickedKey(keyData.key);
    setTimeout(() => setClickedKey(null), 150);
    
    if (keyData.skillData) {
      setSelectedSkill({
        ...keyData.skillData,
        key: keyData.key
      });
      setTimeout(() => setSelectedSkill(null), 3000);
    }
    
    playKeySound();
  };

  const resetRotation = () => {
    setKeyboardRotation({ x: -15, y: 5, z: 0 });
  };

  const SkillCard = ({ categoryKey, category }) => {
    const IconComponent = category.icon;
    const isFlipped = flippedCard === categoryKey;
    
    return (
      <div className="relative w-full max-w-sm mx-auto">
        <div
          className={`group relative h-80 perspective-1000 cursor-pointer transition-all duration-500 ${
            isFlipped ? 'z-10' : ''
          }`}
          onClick={() => setFlippedCard(isFlipped ? null : categoryKey)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Face */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.color} rounded-2xl shadow-2xl backface-hidden border border-white/20 overflow-hidden`}>
              {/* Header */}
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{category.description}</p>
              </div>

              {/* Stats */}
              <div className="px-6 mb-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/80 text-sm">Proficiency</span>
                    <span className="text-white font-bold">{category.level}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="h-2 bg-white rounded-full transition-all duration-1000"
                      style={{ width: isVisible ? `${category.level}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="px-6 mb-4">
                <div className="text-white/80 text-sm mb-2">Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-center text-white/80">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Briefcase size={14} />
                      <span className="text-sm">{category.projects} projects</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span className="text-sm">{category.experience}</span>
                    </div>
                  </div>
                  <div className="text-white/60 text-xs">Click to explore</div>
                </div>
              </div>

              {/* Keyboard Keys Indicator */}
              <div className="absolute top-4 right-4">
                <div className="flex space-x-1">
                  {category.keyboardKeys.slice(0, 3).map(key => (
                    <div key={key} className="w-6 h-6 bg-white/20 rounded text-xs font-bold flex items-center justify-center text-white">
                      {key}
                    </div>
                  ))}
                  {category.keyboardKeys.length > 3 && (
                    <div className="w-6 h-6 bg-white/20 rounded text-xs font-bold flex items-center justify-center text-white">
                      +{category.keyboardKeys.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Back Face */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${category.color} rounded-2xl shadow-2xl backface-hidden rotate-y-180 border border-white/20 overflow-hidden`}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{category.title} Details</h3>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <IconComponent size={20} className="text-white" />
                  </div>
                </div>

                {/* Strengths */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Star className="mr-2" size={16} />
                    Key Strengths
                  </h4>
                  <div className="space-y-1">
                    {category.details.strengths.map((strength, index) => (
                      <div key={index} className="text-white/90 text-sm flex items-center">
                        <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Target className="mr-2" size={16} />
                    Recent Projects
                  </h4>
                  <div className="space-y-1">
                    {category.details.recentProjects.map((project, index) => (
                      <div key={index} className="text-white/90 text-sm flex items-center">
                        <span className="w-1 h-1 bg-white rounded-full mr-2"></span>
                        {project}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Currently Learning */}
                <div className="mt-auto">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <TrendingUp className="mr-2" size={16} />
                    Currently Learning
                  </h4>
                  <div className="text-white/90 text-sm bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    {category.details.learning}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KeyboardKey = ({ keyData, isPressed }) => {
    const { key, skillData, isActive } = keyData;
    
    return (
      <div
        className={`relative w-8 h-8 md:w-10 md:h-10 m-0.5 rounded-lg cursor-pointer transition-all duration-200 transform ${
          isPressed ? 'scale-95 translate-y-1 shadow-inner' : 'hover:scale-105 shadow-lg'
        } ${
          isActive 
            ? `bg-gradient-to-br ${skillData.categoryData.color} text-white shadow-lg border-2 border-white/30`
            : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-400/30'
        }`}
        onClick={() => handleKeyClick(keyData)}
        title={isActive ? `${skillData.skill} (${skillData.categoryData.title})` : key}
        style={{
          boxShadow: isPressed 
            ? 'inset 0 2px 4px rgba(0,0,0,0.3)' 
            : '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-white/10" />
        <div className="relative w-full h-full flex items-center justify-center">
          <span className={`text-xs md:text-sm font-bold ${isActive ? 'text-white' : ''}`}>
            {key}
          </span>
        </div>
        
        {/* Skill indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white" />
        )}
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 relative overflow-hidden min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Interactive Skills Keyboard
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Drag the keyboard to explore in 3D • Each key represents my technical skills
          </p>
        </div>

        {/* Controls */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`p-2 rounded-lg transition-colors ${
                  isAutoRotating ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                title="Auto Rotate"
              >
                {isAutoRotating ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                onClick={resetRotation}
                className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Reset Rotation"
              >
                <RotateCcw size={16} />
              </button>

              <div className="text-sm text-gray-600 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-4">
                Drag to rotate • Click keys to explore
              </div>
            </div>
          </div>
        </div>

        {/* 3D Draggable Keyboard */}
        <div className={`flex justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div
            ref={keyboardRef}
            className={`relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              transform: `perspective(1200px) rotateX(${keyboardRotation.x}deg) rotateY(${keyboardRotation.y}deg) rotateZ(${keyboardRotation.z}deg)`,
              transformStyle: 'preserve-3d'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Keyboard Base */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-4 md:p-6 shadow-2xl border border-gray-600 relative">
              <div className="space-y-1 md:space-y-2">
                {keyboardLayout.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center"
                    style={{
                      marginLeft: rowIndex === 1 ? '15px' : rowIndex === 2 ? '30px' : '0'
                    }}
                  >
                    {row.map((keyData) => (
                      <KeyboardKey
                        key={keyData.key}
                        keyData={keyData}
                        isPressed={clickedKey === keyData.key}
                      />
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Keyboard branding */}
              <div className="text-center mt-3">
                <div className="text-xs text-gray-400 font-mono">SKILLBOARD INTERACTIVE</div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-1" />
              </div>
            </div>
            
            {/* 3D depth effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-2xl -z-10"
              style={{ 
                transform: 'translateZ(-10px)',
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
        </div>

        {/* Selected Skill Display */}
        {selectedSkill && (
          <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-bounce max-w-sm">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${selectedSkill.categoryData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-sm">{selectedSkill.key}</span>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-gray-900 dark:text-white">{selectedSkill.skill}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{selectedSkill.categoryData.title}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Level: {selectedSkill.categoryData.level}% • {selectedSkill.categoryData.experience}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vertical Skill Cards */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Skill Categories
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([categoryKey, category], index) => (
              <div
                key={categoryKey}
                style={{ animationDelay: `${index * 200}ms` }}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <SkillCard categoryKey={categoryKey} category={category} />
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className={`mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">How to Interact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">🖱️</div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Drag Keyboard</strong><br />
                Mouse or touch to rotate in 3D
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⌨️</div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Click Keys</strong><br />
                Each key represents a skill
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🃏</div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Flip Cards</strong><br />
                Click cards to see details
              </div>
            </div>
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
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-10px,0);
          }
          70% {
            transform: translate3d(0,-5px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Skills3D;
