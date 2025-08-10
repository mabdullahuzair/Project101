import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, Code, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import TerminalBot from './TerminalBot.jsx';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Disable mouse tracking on mobile for better performance
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      return;
    }

    // Optimized mouse tracking with throttling for desktop only
    let animationFrame;
    const handleMouseMove = (e) => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        const rect = document.getElementById('hero')?.getBoundingClientRect();
        if (rect) {
          setMousePosition({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.5, // Very reduced intensity for slow movement
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.5
          });
        }
        animationFrame = null;
      });
    };

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTerminal = () => {
    setIsTerminalOpen(true);
  };


  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32 lg:pt-20">
      {/* Special Hero Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Enhanced Aurora Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-purple-500/10 to-blue-500/5 animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-cyan-400/15 to-purple-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

        {/* Glowing Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      {/* Hero Specific Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced Hero Particles */}
        {[...Array(window.innerWidth > 768 ? 15 : 6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-5 animate-pulse"
            style={{
              left: `${(Math.random() * 100).toFixed(1)}%`,
              top: `${(Math.random() * 100).toFixed(1)}%`,
              animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
              animationDuration: `${(8 + Math.random() * 4).toFixed(2)}s`,
              transform: window.innerWidth > 768 ? `translate(${(mousePosition.x || 0) * (3 + i * 0.5)}px, ${(mousePosition.y || 0) * (3 + i * 0.5)}px)` : 'none',
              transition: window.innerWidth > 768 ? 'transform 2.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
          />
        ))}

        {/* Large Hero Shapes */}
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-5 animate-pulse"
          style={{
            transform: `translate(${(mousePosition.x || 0) * 15}px, ${(mousePosition.y || 0) * 15}px) rotate(${(mousePosition.x || 0) * 5}deg)`,
            transition: 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)',
            animationDuration: '12s'
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-5 animate-bounce"
          style={{
            transform: `translate(${(mousePosition.x || 0) * -12}px, ${(mousePosition.y || 0) * -12}px) rotate(${(mousePosition.x || 0) * -6}deg)`,
            transition: 'transform 2.8s cubic-bezier(0.23, 1, 0.32, 1)',
            animationDuration: '10s'
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-5 animate-pulse"
          style={{
            animationDelay: '1s',
            animationDuration: '15s',
            transform: `translate(${(mousePosition.x || 0) * 8}px, ${(mousePosition.y || 0) * 8}px) scale(${1 + (mousePosition.x || 0) * 0.05})`,
            transition: 'transform 3.2s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />

        {/* Hero Geometric Shapes */}
        <div
          className="absolute top-1/4 left-1/3 w-8 h-8 border-2 border-purple-300 opacity-10 animate-spin"
          style={{
            animationDuration: '40s',
            transform: `translate(${(mousePosition.x || 0) * 6}px, ${(mousePosition.y || 0) * 6}px) rotate(${(mousePosition.x || 0) * 15}deg)`,
            transition: 'transform 2.5s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-blue-300 opacity-10 animate-bounce"
          style={{
            animationDelay: '0.5s',
            animationDuration: '8s',
            transform: `translate(${(mousePosition.x || 0) * -7}px, ${(mousePosition.y || 0) * -7}px) rotate(${(mousePosition.x || 0) * -10}deg)`,
            transition: 'transform 2.8s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        />

        {/* Hero Floating Rings */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`hero-ring-${i}`}
            className="absolute border-1 border-purple-300 rounded-full opacity-5 animate-spin"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
              animationDuration: `${30 + i * 10}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              transform: `translate(${(mousePosition.x || 0) * (2 + i * 1)}px, ${(mousePosition.y || 0) * (2 + i * 1)}px) rotate(${(mousePosition.x || 0) * (4 + i * 2)}deg)`,
              transition: 'transform 3.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />
        ))}

        {/* Hero Code Elements */}
        <div
          className="absolute top-1/3 right-1/3 text-2xl opacity-5 animate-pulse"
          style={{
            transform: `translate(${(mousePosition.x || 0) * 4}px, ${(mousePosition.y || 0) * 4}px) rotate(${(mousePosition.x || 0) * 2}deg)`,
            transition: 'transform 2.5s cubic-bezier(0.23, 1, 0.32, 1)',
            animationDuration: '12s'
          }}
        >
          <Code className="text-purple-500" />
        </div>
        <div
          className="absolute bottom-1/4 right-1/2 text-xl opacity-5 animate-bounce"
          style={{
            animationDelay: '1s',
            animationDuration: '14s',
            transform: `translate(${(mousePosition.x || 0) * -6}px, ${(mousePosition.y || 0) * -6}px) rotate(${(mousePosition.x || 0) * -3}deg)`,
            transition: 'transform 2.8s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <Database className="text-blue-500" />
        </div>
        <div
          className="absolute top-2/3 left-1/2 text-xl opacity-5 animate-pulse"
          style={{
            animationDelay: '2s',
            animationDuration: '18s',
            transform: `translate(${(mousePosition.x || 0) * 7}px, ${(mousePosition.y || 0) * 7}px) rotate(${(mousePosition.x || 0) * 4}deg)`,
            transition: 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <Globe className="text-green-500" />
        </div>

        {/* Hero 3D Elements */}
        <div
          className="absolute top-16 right-16 transform-3d"
          style={{
            transform: `translate(${(mousePosition.x || 0) * 10}px, ${(mousePosition.y || 0) * 10}px) rotateX(${(mousePosition.y || 0) * 8}deg) rotateY(${(mousePosition.x || 0) * 8}deg)`,
            transition: 'transform 2.5s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 opacity-5 transform rotate-45 animate-pulse" />
        </div>
        <div
          className="absolute bottom-16 left-16 transform-3d"
          style={{
            transform: `translate(${(mousePosition.x || 0) * -12}px, ${(mousePosition.y || 0) * -12}px) rotateX(${(mousePosition.y || 0) * -9}deg) rotateY(${(mousePosition.x || 0) * -9}deg)`,
            transition: 'transform 3.2s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-cyan-500 opacity-5 rounded-lg animate-bounce" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight px-4 cursor-default transform transition-all duration-500"
              style={{
                fontFamily: "'Playfair Display', 'Crimson Text', 'Cormorant Garamond', serif",
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
          >
            <span className="inline-block transform transition-all duration-300 text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text"
                  style={{
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    WebkitTextStroke: '1px rgba(147, 51, 234, 0.3)',
                  }}>
              Muhammad Abdullah
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 mb-8 sm:mb-10 max-w-4xl mx-auto px-4 font-medium">
            <span className="block">Software Engineering Student</span>
            <span className="block mt-2 text-purple-700 dark:text-purple-300 font-bold">& Full-Stack Developer</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-14 px-4">
            <Button
              onClick={() => scrollToSection('#projects')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
            >
              View Projects
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12 px-4">
            <a 
              href="https://github.com/mabdullahuzair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
            >
              <Github size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
            </a>
            <a 
              href="https://www.linkedin.com/in/abdullah-uzair-2a18b9278/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-300" />
            </a>
            <a 
              href="mailto:abdullahuzair860@gmail.com"
              className="group bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
            >
              <Mail size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors duration-300" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown size={32} className="text-gray-400 mx-auto" />
          </div>

          {/* Small Terminal Window in Hero */}
          <div className="mt-8 sm:mt-12 max-w-sm sm:max-w-md mx-auto px-4">
            <div 
              className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={openTerminal}
            >
              {/* Terminal Header */}
              <div className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-gray-300">terminal</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTerminal();
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-mono"
                >
                  Open Full Terminal
                </button>
              </div>
              
              {/* Terminal Content */}
              <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm">
                <div className="text-green-400 mb-1 sm:mb-2">$ whoami</div>
                <div className="text-gray-300 mb-2 sm:mb-3">muhammad-abdullah-uzair</div>
                <div className="text-green-400 mb-1 sm:mb-2">$ cat about.txt</div>
                <div className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">Software Engineering Student<br/>Full-Stack Developer<br/>Passionate about creating innovative solutions</div>
                <div className="text-green-400 mb-1 sm:mb-2">$ ls skills/</div>
                <div className="text-blue-400 mb-2 sm:mb-3 text-xs sm:text-sm">react.js  node.js  python  mongodb  mysql</div>
                <div className="text-green-400 flex items-center">
                  $ <span className="ml-2 animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Bot */}
      <TerminalBot isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />
    </section>
  );
};

export default Hero;
