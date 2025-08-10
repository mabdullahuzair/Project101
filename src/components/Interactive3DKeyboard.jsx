import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Skill mapping for keyboard keys
const skillMapping = {
  'M': { name: 'MongoDB', color: '#47A248', description: 'NoSQL database for modern applications', level: 75 },
  'E': { name: 'Express.js', color: '#000000', description: 'Fast, minimalist web framework', level: 80 },
  'R': { name: 'React.js', color: '#61DAFB', description: 'Frontend library for building UIs', level: 90 },
  'N': { name: 'Node.js', color: '#339933', description: 'JavaScript runtime environment', level: 85 },
  'H': { name: 'HTML5', color: '#E34F26', description: 'Standard markup language', level: 95 },
  'C': { name: 'CSS3', color: '#1572B6', description: 'Styling language for web pages', level: 90 },
  'J': { name: 'JavaScript', color: '#F7DF1E', description: 'Programming language of the web', level: 88 },
  'P': { name: 'PHP', color: '#777BB4', description: 'Server-side scripting language', level: 82 },
  'Y': { name: 'Python', color: '#3776AB', description: 'Versatile programming language', level: 75 },
  'G': { name: 'Git', color: '#F05032', description: 'Version control system', level: 90 },
  'V': { name: 'VS Code', color: '#007ACC', description: 'Code editor and IDE', level: 95 },
  'T': { name: 'Tailwind CSS', color: '#06B6D4', description: 'Utility-first CSS framework', level: 92 },
  'B': { name: 'Bootstrap', color: '#7952B3', description: 'CSS framework for responsive design', level: 88 },
  'S': { name: 'MySQL', color: '#4479A1', description: 'Relational database management', level: 80 },
  'A': { name: 'APIs', color: '#FF6B6B', description: 'Application Programming Interfaces', level: 85 },
  'L': { name: 'Machine Learning', color: '#FF9500', description: 'AI and data science', level: 68 }
};

// Keyboard layout
const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

// Individual Key Component
function Key({ letter, position, isActive, onKeyPress, isPressed }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
      
      // Glow effect for active keys
      if (isActive && meshRef.current.material) {
        meshRef.current.material.emissive.setHex(hovered ? 0x444444 : 0x222222);
      }
      
      // Press animation
      if (isPressed) {
        meshRef.current.position.z = position[2] - 0.05;
        meshRef.current.scale.setScalar(0.95);
      } else {
        meshRef.current.position.z = position[2];
        meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
      }
    }
  });

  const handleClick = () => {
    onKeyPress(letter);
  };

  return (
    <group>
      <Box
        ref={meshRef}
        position={position}
        args={[0.8, 0.8, 0.2]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={isActive ? skillMapping[letter]?.color || '#666666' : '#333333'}
          metalness={0.3}
          roughness={0.4}
          emissive={isActive ? '#111111' : '#000000'}
        />
      </Box>
      
      <Text
        position={[position[0], position[1], position[2] + 0.11]}
        fontSize={0.3}
        color={isActive ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"

      >
        {letter}
      </Text>
      
      {/* Glow effect for active keys */}
      {isActive && (
        <Sphere position={[position[0], position[1], position[2] - 0.2]} args={[1, 16, 16]}>
          <meshBasicMaterial
            color={skillMapping[letter]?.color || '#666666'}
            transparent
            opacity={0.1}
          />
        </Sphere>
      )}
    </group>
  );
}

// Keyboard Component
function Keyboard({ onKeyPress, pressedKey }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const keys = [];
  keyboardLayout.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
      const x = (colIndex - row.length / 2) * 1;
      const y = (keyboardLayout.length / 2 - rowIndex) * 1;
      const z = 0;
      
      keys.push(
        <Key
          key={letter}
          letter={letter}
          position={[x, y, z]}
          isActive={!!skillMapping[letter]}
          onKeyPress={onKeyPress}
          isPressed={pressedKey === letter}
        />
      );
    });
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {keys}
      
      {/* Keyboard base */}
      <Box position={[0, -1, -0.3]} args={[12, 4, 0.5]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </Box>
    </group>
  );
}

// Skill Card Component
function SkillCard({ skill, visible }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth appearance animation
      meshRef.current.scale.setScalar(visible ? 1 : 0);
      meshRef.current.position.y = 2 + (visible ? 0 : -2);
      
      // Floating animation when visible
      if (visible) {
        meshRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  if (!skill) return null;

  return (
    <group ref={meshRef}>
      {/* Card background */}
      <Box position={[0, 0, 0]} args={[4, 2, 0.1]}>
        <meshStandardMaterial
          color={skill.color}
          metalness={0.1}
          roughness={0.3}
          emissive={skill.color}
          emissiveIntensity={0.2}
        />
      </Box>
      
      {/* Skill name */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"

        maxWidth={3.5}
      >
        {skill.name}
      </Text>
      
      {/* Description */}
      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {skill.description}
      </Text>
      
      {/* Level bar */}
      <Box position={[-1.5, -0.5, 0.06]} args={[3, 0.1, 0.02]}>
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </Box>
      <Box position={[-1.5 + (skill.level / 100) * 1.5 - 1.5, -0.5, 0.07]} args={[(skill.level / 100) * 3, 0.1, 0.02]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* Level text */}
      <Text
        position={[1.2, -0.5, 0.06]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {skill.level}%
      </Text>
    </group>
  );
}

// Camera Controller
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    camera.position.z = 8 + Math.sin(state.clock.elapsedTime * 0.15) * 1;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main Interactive3DKeyboard Component
const Interactive3DKeyboard = () => {
  const [pressedKey, setPressedKey] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [typedText, setTypedText] = useState('');

  // Handle key press from 3D keyboard
  const handleKeyPress = (key) => {
    setPressedKey(key);
    setTypedText(prev => prev + key);
    
    // Show skill if it exists
    if (skillMapping[key]) {
      setCurrentSkill(skillMapping[key]);
    }
    
    // Reset pressed key after animation
    setTimeout(() => {
      setPressedKey(null);
    }, 200);
    
    // Hide skill card after 3 seconds
    if (skillMapping[key]) {
      setTimeout(() => {
        setCurrentSkill(null);
      }, 3000);
    }
  };

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (keyboardLayout.flat().includes(key)) {
        event.preventDefault();
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const clearText = () => {
    setTypedText('');
    setCurrentSkill(null);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white">
        <h3 className="text-lg font-bold mb-2">Type to Explore Skills</h3>
        <div className="text-sm mb-2">
          <span className="text-blue-300">Typed:</span> {typedText || 'Start typing...'}
        </div>
        <button
          onClick={clearText}
          className="px-3 py-1 bg-red-500 rounded-lg text-xs hover:bg-red-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white max-w-xs">
        <h4 className="text-sm font-bold mb-2">Instructions:</h4>
        <ul className="text-xs space-y-1">
          <li>• Click keys or use your keyboard</li>
          <li>• Colored keys represent skills</li>
          <li>• Skills appear above keyboard</li>
          <li>• Camera moves automatically</li>
        </ul>
      </div>

      {/* Current Skill Display */}
      {currentSkill && (
        <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white max-w-sm">
          <h4 className="text-lg font-bold mb-2" style={{ color: currentSkill.color }}>
            {currentSkill.name}
          </h4>
          <p className="text-sm mb-2">{currentSkill.description}</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${currentSkill.level}%`,
                  backgroundColor: currentSkill.color
                }}
              />
            </div>
            <span className="text-sm font-bold">{currentSkill.level}%</span>
          </div>
        </div>
      )}

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        className="w-full h-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        <spotLight
          position={[0, 10, 0]}
          angle={Math.PI / 6}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* Components */}
        <CameraController />
        <Keyboard onKeyPress={handleKeyPress} pressedKey={pressedKey} />
        <SkillCard skill={currentSkill} visible={!!currentSkill} />

        {/* Environment */}
        <fog attach="fog" args={['#1a1a2e', 10, 50]} />
      </Canvas>
    </div>
  );
};

export default Interactive3DKeyboard;
