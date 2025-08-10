import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Box } from '@react-three/drei';
import { Vector3 } from 'three';

const KeyboardKey = ({ position, args, color, onClick, children, skill, hovered, setHovered }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
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
          metalness={0.6}
          roughness={0.4}
        />
      </Box>
      <Text
        position={[0, 0, 0.51]}
        fontSize={0.3}
        color={isHovered ? 'white' : 'black'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {children}
      </Text>
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
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {renderKeyboard()}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {hoveredKey && skillKeyMap[hoveredKey] && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg backdrop-blur-sm">
          <div className="font-bold">{skillKeyMap[hoveredKey].name}</div>
          <div className="text-sm opacity-80">{skillKeyMap[hoveredKey].level}% Proficiency</div>
        </div>
      )}
    </div>
  );
};

export default Keyboard3D;
