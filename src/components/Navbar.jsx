import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl' 
          : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              onClick={() => scrollToSection('#hero')}
              className="cursor-pointer flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                AU
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Abdullah Uzair</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
              </div>
            </div>

            {/* Desktop Navigation - Show on medium+ devices */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-1">
                <a
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{display: 'inline-block', minWidth: 'fit-content', whiteSpace: 'nowrap'}}
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{display: 'inline-block', minWidth: 'fit-content', whiteSpace: 'nowrap'}}
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#skills'); }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{display: 'inline-block', minWidth: 'fit-content', whiteSpace: 'nowrap'}}
                >
                  Skills
                </a>
                <a
                  href="#experience"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#experience'); }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{display: 'inline-block', minWidth: 'fit-content', whiteSpace: 'nowrap'}}
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{display: 'inline-block', minWidth: 'fit-content', whiteSpace: 'nowrap'}}
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  style={{display: 'inline-block', minWidth: 'fit-content', whiteSpace: 'nowrap'}}
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200"
              >
                {darkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-purple-600" />}
              </button>

              {/* Mobile menu button - only show on mobile */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 touch-manipulation"
                aria-label="Toggle mobile menu"
              >
                {isOpen ? (
                  <X size={18} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={18} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="px-4 py-6 space-y-2">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }} className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">About</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('#skills'); }} className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Skills</a>
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('#experience'); }} className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Experience</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }} className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Projects</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }} className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Contact</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
