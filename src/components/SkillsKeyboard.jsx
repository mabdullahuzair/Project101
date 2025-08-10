import { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Palette, 
  Zap, 
  Layers, 
  Wrench, 
  Grid3X3, 
  Database, 
  Cpu, 
  Globe, 
  Monitor, 
  Brain, 
  Star,
  Trophy,
  Award,
  TrendingUp,
  Terminal,
  Keyboard
} from 'lucide-react';

const SkillsKeyboard = () => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [clickedKey, setClickedKey] = useState(null);
  const sectionRef = useRef(null);

  // Skills data with keyboard mappings
  const skillsData = {
    'q': { 
      name: 'HTML5', 
      level: 95, 
      years: 1, 
      projects: 15, 
      icon: Code, 
      color: '#E34F26', 
      description: 'Semantic markup and modern web standards',
      category: 'Frontend'
    },
    'w': { 
      name: 'CSS3', 
      level: 92, 
      years: 1, 
      projects: 15, 
      icon: Palette, 
      color: '#1572B6', 
      description: 'Advanced styling, animations and responsive design',
      category: 'Frontend'
    },
    'e': { 
      name: 'JavaScript', 
      level: 88, 
      years: 1, 
      projects: 12, 
      icon: Zap, 
      color: '#F7DF1E', 
      description: 'Modern ES6+ features and DOM manipulation',
      category: 'Frontend'
    },
    'r': { 
      name: 'React.js', 
      level: 85, 
      years: 1, 
      projects: 10, 
      icon: Layers, 
      color: '#61DAFB', 
      description: 'Component-based architecture and hooks',
      category: 'Frontend'
    },
    't': { 
      name: 'Tailwind CSS', 
      level: 90, 
      years: 1, 
      projects: 8, 
      icon: Wrench, 
      color: '#06B6D4', 
      description: 'Utility-first CSS framework for rapid development',
      category: 'Frontend'
    },
    'y': { 
      name: 'Bootstrap', 
      level: 88, 
      years: 1, 
      projects: 6, 
      icon: Grid3X3, 
      color: '#7952B3', 
      description: 'Responsive component library and grid system',
      category: 'Frontend'
    },
    'a': { 
      name: 'PHP', 
      level: 82, 
      years: 1, 
      projects: 8, 
      icon: Code, 
      color: '#777BB4', 
      description: 'Server-side scripting and web development',
      category: 'Backend'
    },
    's': { 
      name: 'Node.js', 
      level: 78, 
      years: 1, 
      projects: 6, 
      icon: Cpu, 
      color: '#339933', 
      description: 'JavaScript runtime for server-side development',
      category: 'Backend'
    },
    'd': { 
      name: 'Express.js', 
      level: 76, 
      years: 1, 
      projects: 6, 
      icon: Globe, 
      color: '#000000', 
      description: 'Fast and minimalist web framework for Node.js',
      category: 'Backend'
    },
    'z': { 
      name: 'MySQL', 
      level: 80, 
      years: 1, 
      projects: 8, 
      icon: Database, 
      color: '#4479A1', 
      description: 'Relational database management and optimization',
      category: 'Database'
    },
    'x': { 
      name: 'MongoDB', 
      level: 72, 
      years: 1, 
      projects: 4, 
      icon: Layers, 
      color: '#47A248', 
      description: 'NoSQL document database for flexible data storage',
      category: 'Database'
    },
    'c': { 
      name: 'VS Code', 
      level: 95, 
      years: 1, 
      projects: 15, 
      icon: Monitor, 
      color: '#007ACC', 
      description: 'Advanced IDE usage with extensions and debugging',
      category: 'Tools'
    },
    'v': { 
      name: 'Git & GitHub', 
      level: 90, 
      years: 1, 
      projects: 15, 
      icon: Code, 
      color: '#F05032', 
      description: 'Version control and collaborative development',
      category: 'Tools'
    },
    'b': { 
      name: 'Python', 
      level: 75, 
      years: 1, 
      projects: 5, 
      icon: Brain, 
      color: '#3776AB', 
      description: 'Versatile programming language for various applications',
      category: 'Programming'
    },
    'n': { 
      name: 'Machine Learning', 
      level: 68, 
      years: 1, 
      projects: 3, 
      icon: Star, 
      color: '#FF6B6B', 
      description: 'AI and data science fundamentals',
      category: 'Programming'
    }
  };

  // Keyboard layout with proper QWERTY arrangement
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
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

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (skillsData[key]) {
        setPressedKeys(prev => new Set(prev).add(key));
        setSelectedSkill(skillsData[key]);
        setTypedText(prev => prev + key.toUpperCase());
        
        // Add ripple effect
        createRippleEffect(key);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const createRippleEffect = (key) => {
    const keyElement = document.querySelector(`[data-key="${key}"]`);
    if (keyElement) {
      keyElement.classList.add('ripple-effect');
      setTimeout(() => {
        keyElement.classList.remove('ripple-effect');
      }, 300);
    }
  };

  const handleKeyClick = (key) => {
    if (skillsData[key]) {
      setSelectedSkill(skillsData[key]);
      setTypedText(prev => prev + key.toUpperCase());
      setClickedKey(key);
      createRippleEffect(key);

      // Reset clicked state after animation
      setTimeout(() => {
        setClickedKey(null);
      }, 200);
    }
  };

  const getKeyStyle = (key) => {
    const skill = skillsData[key];
    const isPressed = pressedKeys.has(key);
    const isHovered = hoveredKey === key;
    
    let baseStyle = "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 transform cursor-pointer relative overflow-hidden border-2 ";
    
    if (skill) {
      // Skill key styling
      baseStyle += `
        bg-white dark:bg-gray-800 
        border-gray-300 dark:border-gray-600 
        hover:border-blue-400 dark:hover:border-blue-500
        text-gray-900 dark:text-white
        hover:scale-110 hover:shadow-lg
        ${isPressed ? 'scale-95 shadow-inner' : ''}
        ${isHovered ? 'z-10' : ''}
      `;
    } else {
      // Empty key styling
      baseStyle += `
        bg-gray-100 dark:bg-gray-700 
        border-gray-200 dark:border-gray-600 
        text-gray-400 dark:text-gray-500
        cursor-default
      `;
    }
    
    return baseStyle;
  };

  const KeyCard = ({ keyChar, skill }) => {
    const isFlipped = hoveredKey === keyChar;
    const isClicked = clickedKey === keyChar;
    const isPressed = pressedKeys.has(keyChar);

    return (
      <div
        className={`perspective-1000 ${skill ? 'cursor-pointer' : 'cursor-default'} ${
          isClicked ? 'animate-pulse' : ''
        }`}
        onMouseEnter={() => {
          if (skill) {
            // Only allow one card to flip at a time
            setHoveredKey(keyChar);
          }
        }}
        onMouseLeave={() => setHoveredKey(null)}
        onClick={() => handleKeyClick(keyChar)}
        data-key={keyChar}
      >
        <div className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all duration-600 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        } ${isClicked ? 'scale-95' : ''} ${isPressed ? 'scale-90' : ''}`}>
          
          {/* Front Side */}
          <div className={`absolute inset-0 backface-hidden rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 ${
            skill
              ? `bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 shadow-md hover:shadow-lg ${
                  isPressed ? 'border-blue-500 shadow-inner bg-blue-50 dark:bg-blue-900/30' : ''
                } ${isClicked ? 'border-purple-500 shadow-purple-500/30' : ''}`
              : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
          }`}>
            {skill ? (
              <>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {keyChar.toUpperCase()}
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded mt-1">
                  <div 
                    className="h-full rounded transition-all duration-500"
                    style={{ 
                      width: `${skill.level}%`, 
                      backgroundColor: skill.color 
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="text-lg font-bold text-gray-400 dark:text-gray-500">
                {keyChar.toUpperCase()}
              </div>
            )}
          </div>

          {/* Back Side */}
          {skill && (
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg border-2 border-blue-400 dark:border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-1 flex flex-col items-center justify-center">
              <skill.icon 
                size={16} 
                style={{ color: skill.color }} 
                className="mb-1" 
              />
              <div 
                className="text-xs font-bold text-center leading-tight"
                style={{ color: skill.color }}
              >
                {skill.name.split(' ')[0]}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 text-center">
                {skill.level}%
              </div>
            </div>
          )}

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="ripple-overlay"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="py-12">
      {/* Header */}
      <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex items-center justify-center mb-4">
          <Terminal className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Interactive Skills Keyboard
          </h3>
          <Keyboard className="w-8 h-8 text-purple-500 ml-3" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Type on your keyboard or click the keys to explore my technical skills. Hover to see detailed information.
        </p>
      </div>

      {/* Typed Text Display */}
      {typedText && (
        <div className="text-center mb-6">
          <div className="inline-block bg-black/80 backdrop-blur-md rounded-lg px-4 py-2 border border-green-400/30">
            <div className="text-green-400 font-mono text-sm mb-1">TYPED:</div>
            <div className="text-white font-mono text-lg">
              {typedText}
              <span className="animate-pulse">|</span>
            </div>
            <button
              onClick={() => setTypedText('')}
              className="text-gray-400 hover:text-white text-xs mt-2"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 3D Keyboard */}
      <div className={`flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
          <div className="space-y-2">
            {keyboardLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-2">
                {row.map((key) => (
                  <KeyCard key={key} keyChar={key} skill={skillsData[key]} />
                ))}
              </div>
            ))}
          </div>
          
          {/* Keyboard Status */}
          <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              Skills Active
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
              {Object.keys(skillsData).length} Keys Mapped
            </div>
          </div>
        </div>
      </div>

      {/* Selected Skill Details */}
      {selectedSkill && (
        <div className={`mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                  style={{ backgroundColor: `${selectedSkill.color}20` }}
                >
                  <selectedSkill.icon size={24} style={{ color: selectedSkill.color }} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedSkill.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedSkill.description}</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSkill.level}%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Proficiency</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <Award className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSkill.years}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Year{selectedSkill.years !== 1 ? 's' : ''}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSkill.projects}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Projects</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for 3D effects and animations */}
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

        .ripple-effect .ripple-overlay::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.6));
          transform: translate(-50%, -50%);
          animation: enhanced-ripple 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }

        @keyframes enhanced-ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          50% {
            width: 120%;
            height: 120%;
            opacity: 0.8;
          }
          100% {
            width: 150%;
            height: 150%;
            opacity: 0;
          }
        }

        /* Glow effect for hovered keys */
        .perspective-1000:hover {
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
        }

        /* Pulse animation for clicked keys */
        @keyframes key-click {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }

        /* Smooth color transitions */
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default SkillsKeyboard;
