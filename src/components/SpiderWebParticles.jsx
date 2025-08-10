import { useEffect, useRef, useState, useCallback } from 'react';

const SpiderWebParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef([]);
  const [isVisible, setIsVisible] = useState(true);

  // Configuration
  const config = {
    nodeCount: 120,
    maxDistance: 150,
    nodeSize: 2,
    cursorInfluence: 200,
    cursorRepulsion: 80,
    connectionOpacity: window.innerWidth <= 768 ? 0.05 : 0.15,
    nodeOpacity: window.innerWidth <= 768 ? 0.3 : 0.6,
    speed: 0.5,
    cursorSpeed: 0.08,
    wobbleIntensity: 0.3,
    colors: {
      light: {
        nodes: window.innerWidth <= 768 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.6)',
        connections: window.innerWidth <= 768 ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.15)',
        cursorGlow: window.innerWidth <= 768 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.3)'
      },
      dark: {
        nodes: window.innerWidth <= 768 ? 'rgba(147, 197, 253, 0.4)' : 'rgba(147, 197, 253, 0.8)',
        connections: window.innerWidth <= 768 ? 'rgba(147, 197, 253, 0.08)' : 'rgba(147, 197, 253, 0.2)',
        cursorGlow: window.innerWidth <= 768 ? 'rgba(147, 197, 253, 0.2)' : 'rgba(147, 197, 253, 0.4)'
      }
    }
  };

  // Node class for individual particles
  class Node {
    constructor(x, y, canvas) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.size = Math.random() * config.nodeSize + 1;
      this.canvas = canvas;
      this.wobbleX = Math.random() * Math.PI * 2;
      this.wobbleY = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.02 + Math.random() * 0.01;
      this.distanceFromCursor = 0;
      this.targetX = x;
      this.targetY = y;
    }

    update(mouse) {
      // Calculate distance from cursor
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      this.distanceFromCursor = Math.sqrt(dx * dx + dy * dy);

      // Cursor influence - attraction and repulsion
      if (this.distanceFromCursor < config.cursorInfluence) {
        const force = (config.cursorInfluence - this.distanceFromCursor) / config.cursorInfluence;
        
        if (this.distanceFromCursor < config.cursorRepulsion) {
          // Repulsion when too close
          const repulsionForce = (config.cursorRepulsion - this.distanceFromCursor) / config.cursorRepulsion;
          this.targetX = this.originalX - (dx / this.distanceFromCursor) * repulsionForce * 60;
          this.targetY = this.originalY - (dy / this.distanceFromCursor) * repulsionForce * 60;
        } else {
          // Gentle attraction
          const attractionForce = force * 0.3;
          this.targetX = this.originalX + (dx / this.distanceFromCursor) * attractionForce * 30;
          this.targetY = this.originalY + (dy / this.distanceFromCursor) * attractionForce * 30;
        }
      } else {
        // Return to original position
        this.targetX = this.originalX;
        this.targetY = this.originalY;
      }

      // Smooth interpolation to target position
      this.x += (this.targetX - this.x) * config.cursorSpeed;
      this.y += (this.targetY - this.y) * config.cursorSpeed;

      // Add subtle wobble effect
      this.wobbleX += this.wobbleSpeed;
      this.wobbleY += this.wobbleSpeed;
      
      const wobbleOffsetX = Math.sin(this.wobbleX) * config.wobbleIntensity;
      const wobbleOffsetY = Math.cos(this.wobbleY) * config.wobbleIntensity;
      
      this.x += wobbleOffsetX;
      this.y += wobbleOffsetY;

      // Keep nodes within canvas bounds
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
      
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    draw(ctx, isDark) {
      const colors = isDark ? config.colors.dark : config.colors.light;
      
      // Enhanced node rendering with glow effect
      const intensity = this.distanceFromCursor < config.cursorInfluence 
        ? (config.cursorInfluence - this.distanceFromCursor) / config.cursorInfluence 
        : 0;

      // Outer glow
      if (intensity > 0) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        gradient.addColorStop(0, colors.cursorGlow);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Main node
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = colors.nodes;
      ctx.fill();

      // Inner bright core for nodes near cursor
      if (intensity > 0.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.8})`;
        ctx.fill();
      }
    }
  }

  // Initialize nodes
  const initializeNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const nodes = [];
    const cols = Math.ceil(Math.sqrt(config.nodeCount * (canvas.width / canvas.height)));
    const rows = Math.ceil(config.nodeCount / cols);
    
    const spacingX = canvas.width / (cols + 1);
    const spacingY = canvas.height / (rows + 1);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (nodes.length >= config.nodeCount) break;
        
        const x = spacingX * (j + 1) + (Math.random() - 0.5) * spacingX * 0.3;
        const y = spacingY * (i + 1) + (Math.random() - 0.5) * spacingY * 0.3;
        
        nodes.push(new Node(x, y, canvas));
      }
    }
    
    nodesRef.current = nodes;
  }, []);

  // Draw connections between nearby nodes
  const drawConnections = useCallback((ctx, nodes, isDark) => {
    const colors = isDark ? config.colors.dark : config.colors.light;
    
    ctx.strokeStyle = colors.connections;
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.maxDistance) {
          const opacity = 1 - distance / config.maxDistance;
          
          // Enhanced opacity for nodes near cursor
          const cursorInfluenceI = nodes[i].distanceFromCursor < config.cursorInfluence ? 
            (config.cursorInfluence - nodes[i].distanceFromCursor) / config.cursorInfluence : 0;
          const cursorInfluenceJ = nodes[j].distanceFromCursor < config.cursorInfluence ? 
            (config.cursorInfluence - nodes[j].distanceFromCursor) / config.cursorInfluence : 0;
          
          const maxCursorInfluence = Math.max(cursorInfluenceI, cursorInfluenceJ);
          const finalOpacity = opacity * (config.connectionOpacity + maxCursorInfluence * 0.4);

          ctx.globalAlpha = finalOpacity;
          
          // Gradient line for enhanced effect
          if (maxCursorInfluence > 0.3) {
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, colors.cursorGlow);
            gradient.addColorStop(0.5, colors.connections);
            gradient.addColorStop(1, colors.cursorGlow);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + maxCursorInfluence;
          } else {
            ctx.strokeStyle = colors.connections;
            ctx.lineWidth = 1;
          }

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    const isDark = document.documentElement.classList.contains('dark');

    // Clear canvas with subtle background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    const nodes = nodesRef.current;
    nodes.forEach(node => {
      node.update(mouseRef.current);
      node.draw(ctx, isDark);
    });

    // Draw connections
    drawConnections(ctx, nodes, isDark);

    // Draw cursor effect
    const mouse = mouseRef.current;
    if (mouse.x > 0 && mouse.y > 0) {
      const colors = isDark ? config.colors.dark : config.colors.light;
      
      // Cursor glow effect
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 50);
      gradient.addColorStop(0, colors.cursorGlow);
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [drawConnections, isVisible]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeNodes();
  }, [initializeNodes]);

  // Initialize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, handleMouseMove, handleMouseLeave, animate]);

  // Visibility toggle based on user preference or performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  );
};

export default SpiderWebParticles;
