import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Html } from '@react-three/drei';

const KeyboardKey = ({ position, args, color, onClick, children, skill, hovered, setHovered }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 4) * 0.1;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick && skill) {
      onClick(skill);
    }
  };

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={args}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          setHovered(skill?.key || children);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
          setHovered(null);
        }}
      >
        <meshStandardMaterial
          color={isHovered ? (skill ? '#60a5fa' : '#ef4444') : (skill ? color : '#6b7280')}
          metalness={0.8}
          roughness={0.2}
          emissive={isHovered ? '#1e40af' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </Box>
      <Html
        position={[0, 0, 0.51]}
        center
        transform
        occlude
        style={{
          color: isHovered ? 'white' : 'black',
          fontSize: '14px',
          fontWeight: 'bold',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {children}
      </Html>
    </group>
  );
};

const Keyboard3D = ({ skills = [], onSkillClick }) => {
  const [hoveredKey, setHoveredKey] = useState(null);
  
  // Create skill key mapping
  const skillKeyMap = {};
  skills.forEach(skill => {
    if (skill.key) {
      skillKeyMap[skill.key] = skill;
    }
  });

  // Keyboard layout
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const renderKeyboard = () => {
    const keys = [];
    
    keyboardLayout.forEach((row, rowIndex) => {
      row.forEach((key, keyIndex) => {
        const skill = skillKeyMap[key];
        const x = (keyIndex - row.length / 2) * 1.2;
        const y = (1 - rowIndex) * 1.2;
        const z = 0;
        
        keys.push(
          <KeyboardKey
            key={`${rowIndex}-${keyIndex}`}
            position={[x, y, z]}
            args={[1, 1, 1]}
            color={skill ? skill.color : '#9ca3af'}
            onClick={onSkillClick}
            skill={skill}
            hovered={hoveredKey}
            setHovered={setHoveredKey}
          >
            {key}
          </KeyboardKey>
        );
      });
    });
    
    return keys;
  };

  return (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#60a5fa" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#8b5cf6" />
        
        {renderKeyboard()}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
          maxDistance={20}
          minDistance={8}
        />
      </Canvas>
      
      {hoveredKey && skillKeyMap[hoveredKey] && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-2xl transition-all duration-300">
          <div className="font-bold text-lg">{skillKeyMap[hoveredKey].name}</div>
          <div className="text-sm opacity-80">{skillKeyMap[hoveredKey].level}% Proficiency</div>
          <div className="text-xs opacity-60 mt-1">Click to explore</div>
        </div>
      )}
    </div>
  );
};

export default Keyboard3D;
