import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Code, User, Briefcase, Mail, Home, Award } from 'lucide-react';

const ModernNavbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-sm shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <div 
              onClick={() => scrollToSection('home')}
              className="cursor-pointer flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  AU
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Abdullah Uzair
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 lg:px-6 lg:py-3 rounded-xl font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {/* Active background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl shadow-lg"></div>
                    )}
                    
                    {/* Hover background */}
                    <div className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${isActive ? 'hidden' : ''}`}></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center space-x-2">
                      <IconComponent size={16} />
                      <span className="text-sm lg:text-base">{item.label}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
                <div className="relative">
                  {darkMode ? (
                    <Sun size={18} className="text-yellow-500 transform group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon size={18} className="text-blue-600 transform group-hover:rotate-12 transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-300 group overflow-hidden"
                aria-label="Toggle mobile menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
                <div className="relative">
                  <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-90 scale-110' : ''}`}>
                    {isOpen ? (
                      <X size={18} className="text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Menu size={18} className="text-gray-700 dark:text-gray-300" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : ''
                    }}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                    }`}>
                      <IconComponent size={18} />
                    </div>
                    <span className="text-base">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile footer */}
            <div className="px-4 pb-6 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Crafted with ❤️ by Abdullah Uzair
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default ModernNavbar;
