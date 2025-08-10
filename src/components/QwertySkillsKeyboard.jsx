import React, { useState, useEffect, useRef } from 'react';

const QwertySkillsKeyboard = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [keyboardRotation, setKeyboardRotation] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const keyboardRef = useRef(null);

  // Skills data mapped to keyboard keys - based on CV
  const skillMapping = {
    // Top row (numbers)
    '1': { name: 'HTML5', category: 'Frontend', level: 95, color: '#E34F26' },
    '2': { name: 'CSS3', category: 'Frontend', level: 92, color: '#1572B6' },
    '3': { name: 'JavaScript', category: 'Frontend', level: 88, color: '#F7DF1E' },
    '4': { name: 'React', category: 'Frontend', level: 85, color: '#61DAFB' },
    '5': { name: 'Bootstrap', category: 'Frontend', level: 90, color: '#7952B3' },
    '6': { name: 'Tailwind CSS', category: 'Frontend', level: 85, color: '#06B6D4' },
    '7': { name: 'PHP', category: 'Backend', level: 82, color: '#777BB4' },
    '8': { name: 'Node.js', category: 'Backend', level: 85, color: '#339933' },
    '9': { name: 'Python', category: 'Programming', level: 75, color: '#3776AB' },
    '0': { name: 'C++', category: 'Programming', level: 70, color: '#00599C' },

    // First row
    'Q': { name: 'MySQL', category: 'Database', level: 80, color: '#4479A1' },
    'W': { name: 'MongoDB', category: 'Database', level: 75, color: '#47A248' },
    'E': { name: 'Express.js', category: 'Backend', level: 80, color: '#000000' },
    'R': { name: 'RESTful APIs', category: 'Backend', level: 85, color: '#25D366' },
    'T': { name: 'Git & GitHub', category: 'Tools', level: 90, color: '#F05032' },
    'Y': { name: 'VS Code', category: 'Tools', level: 95, color: '#007ACC' },
    'U': { name: 'Postman', category: 'Tools', level: 85, color: '#FF6C37' },
    'I': { name: 'IntelliJ IDEA', category: 'Tools', level: 80, color: '#000000' },
    'O': { name: 'Machine Learning', category: 'ML', level: 68, color: '#FF6B6B' },
    'P': { name: 'SEO Optimization', category: 'Marketing', level: 85, color: '#4285F4' },

    // Second row
    'A': { name: 'Agile Methodology', category: 'Practices', level: 80, color: '#06B6D4' },
    'S': { name: 'Sublime Text', category: 'IDE', level: 85, color: '#FF9800' },
    'D': { name: 'Docker', category: 'DevOps', level: 75, color: '#2496ED' },
    'F': { name: 'Figma', category: 'Design', level: 80, color: '#F24E1E' },
    'G': { name: 'GitHub Actions', category: 'CI/CD', level: 70, color: '#2088FF' },
    'H': { name: 'Heroku', category: 'Cloud', level: 75, color: '#430098' },
    'J': { name: 'Jupyter', category: 'IDE', level: 70, color: '#F37626' },
    'K': { name: 'Kubernetes', category: 'DevOps', level: 65, color: '#326CE5' },
    'L': { name: 'Laravel', category: 'Framework', level: 80, color: '#FF2D20' },

    // Third row
    'Z': { name: 'Zsh Terminal', category: 'Tools', level: 85, color: '#89E051' },
    'X': { name: 'Xcode', category: 'IDE', level: 70, color: '#007ACC' },
    'C': { name: 'Chrome DevTools', category: 'Tools', level: 90, color: '#4285F4' },
    'V': { name: 'Vue.js', category: 'Frontend', level: 70, color: '#4FC08D' },
    'B': { name: 'Babel', category: 'Build Tool', level: 75, color: '#F9DC3E' },
    'N': { name: 'NPM', category: 'Package Manager', level: 90, color: '#CB3837' },
    'M': { name: 'Material-UI', category: 'UI Library', level: 80, color: '#0081CB' }
  };

  // Keyboard layout
  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
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

    if (keyboardRef.current) {
      observer.observe(keyboardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (skillMapping[key]) {
        setActiveKey(key);
        setActiveSkill(skillMapping[key]);
        
        // Add rotation effect
        setKeyboardRotation(prev => ({
          x: prev.x + (Math.random() - 0.5) * 6,
          y: prev.y + (Math.random() - 0.5) * 6
        }));
        
        // Reset after animation
        setTimeout(() => {
          setKeyboardRotation({ x: 0, y: 0 });
        }, 400);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toUpperCase();
      if (skillMapping[key]) {
        setTimeout(() => {
          setActiveKey(null);
        }, 150);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse drag handlers for 3D rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePosition.x;
    const deltaY = e.clientY - lastMousePosition.y;

    setKeyboardRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x + deltaY * 0.5)),
      y: Math.max(-45, Math.min(45, prev.y + deltaX * 0.5))
    }));

    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePosition]);

  const handleKeyClick = (key) => {
    if (skillMapping[key]) {
      setActiveKey(key);
      setActiveSkill(skillMapping[key]);
      
      // Add rotation effect
      setKeyboardRotation(prev => ({
        x: prev.x + (Math.random() - 0.5) * 6,
        y: prev.y + (Math.random() - 0.5) * 6
      }));
      
      // Reset after animation
      setTimeout(() => {
        setActiveKey(null);
        setKeyboardRotation({ x: 0, y: 0 });
      }, 500);
    }
  };

  const KeyButton = ({ keyValue, rowIndex, keyIndex }) => {
    const skill = skillMapping[keyValue];
    const isActive = activeKey === keyValue;
    const hasSkill = !!skill;

    return (
      <button
        onClick={() => handleKeyClick(keyValue)}
        className={`
          relative group transition-all duration-200 transform
          ${hasSkill ? 'hover:scale-105' : ''}
          ${isActive ? 'scale-110 animate-pulse' : ''}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        `}
        style={{
          animationDelay: `${(rowIndex * 100) + (keyIndex * 50)}ms`
        }}
      >
        <div
          className={`
            w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
            rounded-xl font-bold text-sm md:text-base
            flex items-center justify-center
            border-2 transition-all duration-200
            ${hasSkill 
              ? isActive 
                ? 'bg-gradient-to-br shadow-2xl transform translate-y-1 border-white scale-110' 
                : 'bg-gradient-to-br shadow-lg border-gray-600 hover:shadow-xl'
              : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
            }
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            backgroundColor: hasSkill ? (isActive ? skill.color : `${skill.color}80`) : undefined,
            color: hasSkill ? 'white' : undefined,
            boxShadow: hasSkill && isActive 
              ? `0 0 30px ${skill.color}60, 0 8px 25px rgba(0,0,0,0.3)` 
              : undefined
          }}
        >
          {keyValue}
          
          {/* Skill indicator dot */}
          {hasSkill && (
            <div 
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 transition-all duration-200 ${isActive ? 'animate-ping' : ''}`}
              style={{ backgroundColor: skill.color }}
            />
          )}
          
          {/* Active ring effect */}
          {isActive && (
            <div 
              className="absolute inset-0 rounded-xl animate-ping"
              style={{ 
                border: `2px solid ${skill.color}`,
                animation: 'ping 0.5s cubic-bezier(0, 0, 0.2, 1) 1'
              }}
            />
          )}
        </div>
      </button>
    );
  };

  return (
    <div 
      ref={keyboardRef}
      className={`w-full max-w-5xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Skills Keyboard v1.0
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-2">
          Clean & User-Friendly Layout
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs md:text-sm">
          Type on your keyboard, click keys, or drag to rotate 3D
        </p>
      </div>

      {/* Skill Display Box */}
      {activeSkill && (
        <div className="mb-8 flex justify-center">
          <div 
            className="bg-gradient-to-r text-white px-8 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 transform scale-105"
            style={{
              background: `linear-gradient(135deg, ${activeSkill.color}90, ${activeSkill.color})`
            }}
          >
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold mb-1">{activeSkill.name}</h4>
              <p className="text-sm opacity-90 mb-2">{activeSkill.category}</p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-sm">Proficiency:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${activeSkill.level}%` }}
                    />
                  </div>
                  <span className="font-bold text-sm">{activeSkill.level}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Draggable Keyboard */}
      <div 
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-700 transition-transform duration-300 cursor-grab active:cursor-grabbing"
        style={{
          transform: `perspective(1000px) rotateX(${keyboardRotation.x}deg) rotateY(${keyboardRotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="space-y-3 md:space-y-4">
          {keyboardLayout.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="flex justify-center gap-2 md:gap-3"
              style={{
                marginLeft: rowIndex === 2 ? '0.5rem' : rowIndex === 3 ? '2rem' : '0'
              }}
            >
              {row.map((key, keyIndex) => (
                <KeyButton 
                  key={key} 
                  keyValue={key} 
                  rowIndex={rowIndex} 
                  keyIndex={keyIndex}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Keyboard Info */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Frontend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Backend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Database</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Programming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span>Tools & IDEs</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-gray-500 text-xs">
            {Object.keys(skillMapping).length} skills mapped • Drag to rotate 3D • Click colored keys to explore
          </p>
        </div>
      </div>
    </div>
  );
};

export default QwertySkillsKeyboard;
