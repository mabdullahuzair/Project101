import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

// Skill categories data
const skillCategories = {
  mernStack: {
    title: 'MERN Stack',
    color: '#4CAF50',
    position: [-6, 2, 0],
    skills: [
      { name: 'MongoDB', level: 75, description: 'NoSQL database with flexible document storage', icon: '🍃' },
      { name: 'Express.js', level: 80, description: 'Fast, unopinionated web framework for Node.js', icon: '⚡' },
      { name: 'React.js', level: 90, description: 'Component-based frontend library', icon: '⚛️' },
      { name: 'Node.js', level: 85, description: 'JavaScript runtime built on Chrome V8 engine', icon: '🟢' }
    ]
  },
  frontend: {
    title: 'Front-End Development',
    color: '#2196F3',
    position: [-2, 2, 0],
    skills: [
      { name: 'HTML5', level: 95, description: 'Semantic markup language for web content', icon: '🌐' },
      { name: 'CSS3', level: 90, description: 'Styling language with animations and layouts', icon: '🎨' },
      { name: 'Bootstrap', level: 88, description: 'Popular CSS framework for responsive design', icon: '📱' },
      { name: 'Tailwind CSS', level: 92, description: 'Utility-first CSS framework', icon: '💨' },
      { name: 'JavaScript', level: 88, description: 'Dynamic programming language for web', icon: '📜' },
      { name: 'Responsive Design', level: 85, description: 'Mobile-first responsive web design', icon: '📐' }
    ]
  },
  backend: {
    title: 'Back-End Development',
    color: '#FF9800',
    position: [2, 2, 0],
    skills: [
      { name: 'PHP', level: 82, description: 'Server-side scripting language', icon: '🐘' },
      { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime', icon: '🟢' },
      { name: 'Express.js', level: 80, description: 'Minimal web application framework', icon: '⚡' }
    ]
  },
  databases: {
    title: 'Databases',
    color: '#9C27B0',
    position: [6, 2, 0],
    skills: [
      { name: 'MySQL', level: 80, description: 'Popular relational database management system', icon: '🐬' },
      { name: 'MongoDB', level: 75, description: 'Document-oriented NoSQL database', icon: '🍃' }
    ]
  },
  languages: {
    title: 'Programming Languages',
    color: '#F44336',
    position: [-4, -2, 0],
    skills: [
      { name: 'C', level: 70, description: 'Foundational systems programming language', icon: '🔧' },
      { name: 'C++', level: 75, description: 'Object-oriented extension of C language', icon: '⚙️' },
      { name: 'JavaScript', level: 88, description: 'Versatile programming language', icon: '📜' },
      { name: 'Python', level: 75, description: 'High-level, interpreted programming language', icon: '🐍' }
    ]
  },
  tools: {
    title: 'Tools & Practices',
    color: '#607D8B',
    position: [0, -2, 0],
    skills: [
      { name: 'Git', level: 90, description: 'Distributed version control system', icon: '📋' },
      { name: 'GitHub', level: 88, description: 'Web-based Git repository hosting', icon: '🐙' },
      { name: 'VS Code', level: 95, description: 'Powerful code editor with extensions', icon: '💻' },
      { name: 'Postman', level: 85, description: 'API development and testing tool', icon: '📮' },
      { name: 'RESTful APIs', level: 82, description: 'Architectural style for web services', icon: '🔗' },
      { name: 'Agile Methodology', level: 78, description: 'Iterative software development approach', icon: '🔄' },
      { name: 'Debugging & Testing', level: 80, description: 'Code quality and error resolution', icon: '🔍' }
    ]
  },
  other: {
    title: 'Other Skills',
    color: '#795548',
    position: [4, -2, 0],
    skills: [
      { name: 'Machine Learning', level: 68, description: 'AI algorithms and data analysis with Python', icon: '🤖' },
      { name: 'SEO & Optimization', level: 75, description: 'Search engine optimization techniques', icon: '📈' }
    ]
  }
};

// Individual Skill Card Component
function SkillCard({ skill, position, categoryColor, isFlipped, onFlip }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      
      // Rotation animation
      if (!isFlipped) {
        meshRef.current.rotation.y += 0.01;
      }
      
      // Hover effect
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
      
      // Flip animation
      if (isFlipped) {
        meshRef.current.rotation.y = Math.PI;
      }
    }
  });

  return (
    <group
      position={position}
      ref={meshRef}
      onClick={onFlip}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Front face */}
      <Box args={[2, 2.5, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={categoryColor}
          metalness={0.3}
          roughness={0.4}
          emissive={categoryColor}
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Skill name */}
      <Text
        position={[0, 0.8, 0.06]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {skill.name}
      </Text>
      
      {/* Skill icon */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {skill.icon}
      </Text>
      
      {/* Level */}
      <Text
        position={[0, -0.2, 0.06]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"

      >
        {skill.level}%
      </Text>
      
      {/* Progress bar */}
      <Box position={[0, -0.6, 0.06]} args={[1.5, 0.1, 0.02]}>
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </Box>
      <Box 
        position={[-0.75 + (skill.level / 100) * 0.75, -0.6, 0.07]} 
        args={[(skill.level / 100) * 1.5, 0.1, 0.02]}
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* Back face (description) */}
      {isFlipped && (
        <group position={[0, 0, -0.06]} rotation={[0, Math.PI, 0]}>
          <Box args={[2, 2.5, 0.1]}>
            <meshStandardMaterial
              color="#333333"
              metalness={0.1}
              roughness={0.8}
            />
          </Box>
          <Text
            position={[0, 0.5, 0.06]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            {skill.description}
          </Text>
          <Text
            position={[0, -0.3, 0.06]}
            fontSize={0.12}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
          >
            Click to flip back
          </Text>
        </group>
      )}
      
      {/* Glow effect */}
      {hovered && (
        <Sphere position={[0, 0, 0]} args={[1.5, 16, 16]}>
          <meshBasicMaterial
            color={categoryColor}
            transparent
            opacity={0.1}
          />
        </Sphere>
      )}
    </group>
  );
}

// Category Container Component
function CategoryContainer({ category, categoryData, isDragging, onDragStart, onDragEnd }) {
  const groupRef = useRef();
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [position, setPosition] = useState(categoryData.position);
  const { camera, gl, scene } = useThree();
  
  useFrame((state) => {
    if (groupRef.current && !isDragging) {
      // Gentle floating animation for the whole category
      groupRef.current.position.y = categoryData.position[1] + Math.sin(state.clock.elapsedTime * 0.5 + categoryData.position[0]) * 0.2;
      
      // Subtle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const handleCardFlip = (cardIndex) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardIndex)) {
        newSet.delete(cardIndex);
      } else {
        newSet.add(cardIndex);
      }
      return newSet;
    });
  };

  // Drag functionality
  const handlePointerDown = (event) => {
    event.stopPropagation();
    onDragStart();
    gl.domElement.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const newPosition = [
        position[0] + event.movementX * 0.01,
        position[1] - event.movementY * 0.01,
        position[2]
      ];
      setPosition(newPosition);
    }
  };

  const handlePointerUp = (event) => {
    onDragEnd();
    gl.domElement.releasePointerCapture(event.pointerId);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Category title */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color={categoryData.color}
        anchorX="center"
        anchorY="middle"

      >
        {categoryData.title}
      </Text>
      
      {/* Skills cards arranged in a grid */}
      {categoryData.skills.map((skill, index) => {
        const cols = Math.ceil(Math.sqrt(categoryData.skills.length));
        const row = Math.floor(index / cols);
        const col = index % cols;
        const cardPosition = [
          (col - (cols - 1) / 2) * 2.5,
          1 - row * 3,
          0
        ];
        
        return (
          <SkillCard
            key={index}
            skill={skill}
            position={cardPosition}
            categoryColor={categoryData.color}
            isFlipped={flippedCards.has(index)}
            onFlip={() => handleCardFlip(index)}
          />
        );
      })}
      
      {/* Category base/platform */}
      <Box 
        position={[0, -1, -0.5]} 
        args={[categoryData.skills.length > 4 ? 8 : 6, 0.2, 4]}
      >
        <meshStandardMaterial
          color={categoryData.color}
          opacity={0.2}
          transparent
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
    </group>
  );
}

// Camera Controller with smooth movement
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Smooth camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 15;
    camera.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.15) * 3;
    camera.position.z = 20 + Math.sin(state.clock.elapsedTime * 0.08) * 5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main Skills3DCards Component
const Skills3DCards = () => {
  const [draggedCategory, setDraggedCategory] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleDragStart = (category) => {
    setDraggedCategory(category);
  };

  const handleDragEnd = () => {
    setDraggedCategory(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative">
      {/* UI Controls */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white">
        <h3 className="text-lg font-bold mb-3">Skills Categories</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>MERN Stack</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Frontend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Backend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Databases</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white max-w-xs">
        <h4 className="text-sm font-bold mb-2">Instructions:</h4>
        <ul className="text-xs space-y-1">
          <li>• Click cards to flip and see details</li>
          <li>• Drag categories to reposition</li>
          <li>• Camera moves automatically</li>
          <li>• Each card shows skill level</li>
        </ul>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            autoRotate 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          {autoRotate ? 'Pause Camera' : 'Auto Camera'}
        </button>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        className="w-full h-screen"
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        <spotLight
          position={[0, 20, 10]}
          angle={Math.PI / 4}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Camera controller */}
        {autoRotate && <CameraController />}

        {/* Skill categories */}
        {Object.entries(skillCategories).map(([categoryKey, categoryData]) => (
          <CategoryContainer
            key={categoryKey}
            category={categoryKey}
            categoryData={categoryData}
            isDragging={draggedCategory === categoryKey}
            onDragStart={() => handleDragStart(categoryKey)}
            onDragEnd={handleDragEnd}
          />
        ))}

        {/* Environment effects */}
        <fog attach="fog" args={['#1a1a2e', 20, 80]} />
        
        {/* Particle effects */}
        {Array.from({ length: 50 }, (_, i) => (
          <Sphere
            key={i}
            position={[
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 100
            ]}
            args={[0.1, 8, 8]}
          >
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.1}
            />
          </Sphere>
        ))}
      </Canvas>
    </div>
  );
};

export default Skills3DCards;
