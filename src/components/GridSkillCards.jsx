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

      {/* CSS Styles */}
      <style jsx>{`
        .grid-skills-container {
          width: 100%;
          padding: 2rem 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }

        .skills-grid.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-card-container {
          perspective: 1000px;
          height: 280px;
        }

        .skill-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-in-out;
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 0.6s ease-out forwards;
        }

        .skill-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-card.flipped {
          transform: rotateY(180deg);
        }

        .skill-card:hover {
          transform: scale(1.02);
        }

        .skill-card.flipped:hover {
          transform: rotateY(180deg) scale(1.02);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .card-front {
          transform: rotateY(0deg);
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card-content {
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .icon-container {
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .flip-indicator {
          text-align: right;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
        }

        .skills-list {
          flex-grow: 1;
          space-y: 0.75rem;
        }

        .skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .skill-name {
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .skill-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-track {
          width: 3rem;
          height: 0.25rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: white;
          border-radius: 9999px;
          transition: width 1s ease-out;
        }

        .skill-percentage {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .more-skills {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          text-align: center;
          margin-top: 0.5rem;
        }

        .card-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-weight: bold;
          color: white;
          font-size: 1rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .back-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .back-title {
          font-size: 1.125rem;
          font-weight: bold;
          color: white;
        }

        .back-subtitle {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .all-skills {
          margin-bottom: 1rem;
        }

        .section-title {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .skills-detailed {
          max-height: 5rem;
          overflow-y: auto;
        }

        .skill-detailed {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .skill-name-detailed {
          color: white;
          font-size: 0.75rem;
        }

        .skill-level-detailed {
          color: white;
          font-weight: bold;
          font-size: 0.75rem;
        }

        .tools-section {
          margin-bottom: 1rem;
        }

        .tools-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .tool-tag {
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 0.75rem;
          border-radius: 9999px;
          backdrop-filter: blur(10px);
        }

        .experience-section {
          margin-top: auto;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .experience-item {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.75rem;
          text-align: center;
        }

        .experience-value {
          color: white;
          font-weight: bold;
          font-size: 0.875rem;
        }

        .experience-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.75rem;
        }

        .flip-back-indicator {
          text-align: center;
          margin-top: 0.5rem;
        }

        .instructions {
          text-align: center;
          margin-top: 2rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease-out 0.8s;
        }

        .instructions.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .instruction-text {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .stats-summary {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-muted-more);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .skill-card-container {
            height: 260px;
          }
          
          .card-content {
            padding: 1.25rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default GridSkillCards;
