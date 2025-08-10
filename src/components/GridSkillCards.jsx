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
  TrendingUp
} from 'lucide-react';

const GridSkillCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 8 skill categories from CV
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Palette,
      gradient: 'from-blue-500 to-purple-500',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 92 },
        { name: 'JavaScript', level: 88 },
        { name: 'React', level: 85 },
        { name: 'Bootstrap', level: 90 },
        { name: 'Tailwind CSS', level: 85 }
      ],
      tools: ['VS Code', 'Chrome DevTools', 'Figma'],
      experience: '2+ years',
      projects: 20
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      gradient: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'PHP', level: 82 },
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'RESTful APIs', level: 85 }
      ],
      tools: ['Postman', 'Docker', 'AWS'],
      experience: '2+ years',
      projects: 12
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: FileCode,
      gradient: 'from-orange-500 to-amber-500',
      skills: [
        { name: 'JavaScript', level: 88 },
        { name: 'Python', level: 75 },
        { name: 'C++', level: 70 },
        { name: 'C', level: 68 }
      ],
      tools: ['VS Code', 'IntelliJ IDEA', 'PyCharm'],
      experience: '2+ years',
      projects: 25
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      gradient: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 75 }
      ],
      tools: ['phpMyAdmin', 'MongoDB Compass'],
      experience: '2+ years',
      projects: 16
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      icon: Wrench,
      gradient: 'from-red-500 to-pink-500',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 85 },
        { name: 'IntelliJ IDEA', level: 80 }
      ],
      tools: ['Terminal', 'Figma', 'Slack'],
      experience: '2+ years',
      projects: 30
    },
    {
      id: 'practices',
      title: 'Development Practices',
      icon: GitBranch,
      gradient: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'Agile Methodology', level: 80 },
        { name: 'Version Control', level: 90 },
        { name: 'Debugging & Testing', level: 85 },
        { name: 'Responsive Design', level: 88 }
      ],
      tools: ['Git', 'GitHub Actions', 'Chrome DevTools'],
      experience: '2+ years',
      projects: 20
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      icon: Brain,
      gradient: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Python ML', level: 68 },
        { name: 'Data Analysis', level: 65 }
      ],
      tools: ['Python', 'Jupyter', 'pandas'],
      experience: '1+ years',
      projects: 5
    },
    {
      id: 'seo',
      title: 'SEO & Optimization',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-500',
      skills: [
        { name: 'SEO Optimization', level: 85 },
        { name: 'Web Performance', level: 80 }
      ],
      tools: ['Google Analytics', 'PageSpeed Insights'],
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

  const SkillCard = ({ category, index }) => {
    const isFlipped = flippedCards.has(category.id);
    const IconComponent = category.icon;

    return (
      <div className="skill-card-container">
        <div
          className={`skill-card ${isFlipped ? 'flipped' : ''} ${
            isVisible ? 'visible' : ''
          }`}
          onClick={() => handleCardClick(category.id)}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {/* Front Face */}
          <div className={`card-face card-front bg-gradient-to-br ${category.gradient}`}>
            <div className="card-content">
              {/* Header */}
              <div className="card-header">
                <div className="icon-container">
                  <IconComponent size={24} className="text-white" />
                </div>
                <div className="flip-indicator">
                  <span className="text-white/80 text-xs">Click to flip</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="card-title">{category.title}</h3>

              {/* Skills List */}
              <div className="skills-list">
                {category.skills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-progress">
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(index * 150) + (idx * 100)}ms`
                          }}
                        />
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                ))}
                {category.skills.length > 4 && (
                  <div className="more-skills">
                    +{category.skills.length - 4} more skills
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="card-stats">
                <div className="stat-item">
                  <div className="stat-value">{category.projects}</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{category.experience}</div>
                  <div className="stat-label">Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className={`card-face card-back bg-gradient-to-br ${category.gradient}`}>
            <div className="card-content">
              {/* Header */}
              <div className="back-header">
                <IconComponent size={28} className="text-white" />
                <div>
                  <h3 className="back-title">{category.title}</h3>
                  <p className="back-subtitle">Detailed Information</p>
                </div>
              </div>

              {/* All Skills */}
              <div className="all-skills">
                <h4 className="section-title">All Skills:</h4>
                <div className="skills-detailed">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="skill-detailed">
                      <span className="skill-name-detailed">{skill.name}</span>
                      <span className="skill-level-detailed">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="tools-section">
                <h4 className="section-title">Tools:</h4>
                <div className="tools-list">
                  {category.tools.map((tool, idx) => (
                    <span key={idx} className="tool-tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="experience-section">
                <div className="experience-grid">
                  <div className="experience-item">
                    <div className="experience-value">{category.projects}</div>
                    <div className="experience-label">Projects</div>
                  </div>
                  <div className="experience-item">
                    <div className="experience-value">{category.experience}</div>
                    <div className="experience-label">Experience</div>
                  </div>
                </div>
              </div>

              <div className="flip-back-indicator">
                <span className="text-white/60 text-xs">Click to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="grid-skills-container">
      {/* Grid System */}
      <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Instructions */}
      <div className={`instructions ${isVisible ? 'visible' : ''}`}>
        <p className="instruction-text">
          Click cards to flip and see detailed information
        </p>
        <div className="stats-summary">
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
