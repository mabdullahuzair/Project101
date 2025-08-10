import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Keyboard, Layers, Play, Pause, RotateCw, Eye, EyeOff, Monitor } from 'lucide-react';
import Interactive3DKeyboard from './Interactive3DKeyboard';
import Skills3DCards from './Skills3DCards';

const ModernSkills = () => {
  const [activeView, setActiveView] = useState('keyboard');
  const [isVisible, setIsVisible] = useState(false);
  const [autoSwitch, setAutoSwitch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const sectionRef = useRef(null);
  const switchRef = useRef(null);

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        setShowMobileWarning(true);
        setTimeout(() => setShowMobileWarning(false), 5000);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

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
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Auto-switch between views
  useEffect(() => {
    if (autoSwitch) {
      switchRef.current = setInterval(() => {
        setActiveView(prev => prev === 'keyboard' ? 'cards' : 'keyboard');
      }, 10000); // Switch every 10 seconds
    } else {
      clearInterval(switchRef.current);
    }

    return () => clearInterval(switchRef.current);
  }, [autoSwitch]);

  const views = [
    {
      id: 'keyboard',
      name: 'Interactive Keyboard',
      icon: Keyboard,
      description: 'Type to explore skills with 3D keyboard'
    },
    {
      id: 'cards',
      name: '3D Skill Cards',
      icon: Layers,
      description: 'Browse categorized skills in 3D space'
    }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Mobile Performance Warning */}
      {showMobileWarning && isMobile && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-orange-500 text-white p-4 rounded-xl shadow-2xl animate-bounce">
          <div className="flex items-center space-x-3">
            <Monitor className="flex-shrink-0" size={24} />
            <div>
              <div className="font-bold">Mobile Device Detected</div>
              <div className="text-sm opacity-90">3D features may run slower on mobile devices. For best experience, use a desktop computer.</div>
            </div>
            <button
              onClick={() => setShowMobileWarning(false)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header with controls */}
      <div className={`relative z-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Interactive Skills Experience
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Explore my technical expertise through immersive 3D interfaces
            </p>
          </div>

          {/* View Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            {/* View Switcher */}
            <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-gray-700">
              {views.map((view) => {
                const IconComponent = view.icon;
                const isActive = activeView === view.id;
                
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {/* Active background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl"></div>
                    )}
                    
                    {/* Hover background */}
                    <div className={`absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${isActive ? 'hidden' : ''}`}></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center space-x-2">
                      <IconComponent size={20} />
                      <span className="hidden sm:inline">{view.name}</span>
                      <span className="sm:hidden">{view.icon === Keyboard ? 'KB' : '3D'}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Additional Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAutoSwitch(!autoSwitch)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  autoSwitch
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                } backdrop-blur-md border border-gray-200 dark:border-gray-700`}
                title={autoSwitch ? 'Disable Auto-Switch' : 'Enable Auto-Switch'}
              >
                {autoSwitch ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                {views.find(v => v.id === activeView)?.description}
              </div>
            </div>
          </div>

          {/* View Indicator */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 text-white">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeView === 'keyboard' ? 'bg-green-400' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm">
                {activeView === 'keyboard' ? 'Keyboard Mode' : 'Cards Mode'}
              </span>
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeView === 'cards' ? 'bg-green-400' : 'bg-gray-400'
              }`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D View Container */}
      <div className="relative">
        {/* Transition overlay */}
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm z-10 transition-opacity duration-500 ${
          isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <RotateCw className="w-12 h-12 mx-auto mb-4 animate-spin" />
              <div className="text-xl font-bold">Loading 3D Experience...</div>
            </div>
          </div>
        </div>

        {/* Interactive 3D Keyboard */}
        <div className={`transition-all duration-700 ${
          activeView === 'keyboard' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
        }`}>
          {(activeView === 'keyboard' || autoSwitch) && <Interactive3DKeyboard />}
        </div>

        {/* 3D Skill Cards */}
        <div className={`transition-all duration-700 ${
          activeView === 'cards' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
        } ${activeView === 'keyboard' ? 'absolute inset-0' : ''}`}>
          {(activeView === 'cards' || autoSwitch) && <Skills3DCards />}
        </div>
      </div>

      {/* Bottom Information Panel */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-t from-black/80 to-transparent backdrop-blur-md p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">16+</div>
                <div className="text-sm text-gray-300">Technologies Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
                <div className="text-sm text-gray-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">2+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
            </div>
            
            {/* Usage Tips */}
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-400">
                {activeView === 'keyboard' ? (
                  <>
                    <Keyboard className="inline w-4 h-4 mr-2" />
                    Use your keyboard or click keys to explore skills • Colored keys represent different technologies
                  </>
                ) : (
                  <>
                    <Layers className="inline w-4 h-4 mr-2" />
                    Click cards to flip • Drag categories to reposition • Auto camera movement enabled
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="absolute top-20 left-4 z-20 bg-black/50 backdrop-blur-md rounded-lg p-2 text-white text-xs">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isVisible ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span>{isVisible ? '3D Ready' : 'Loading'}</span>
        </div>
      </div>
    </section>
  );
};

export default ModernSkills;
