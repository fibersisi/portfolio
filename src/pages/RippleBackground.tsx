import { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import backgroundImage from '../assets/images/project2/prg-2-bg.webp';
// 图片文件不存在，使用占位符
const backgroundImage = '';

export function RippleBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseFrequency, setBaseFrequency] = useState(0.01);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Animate ripple effect when not hovering
  useEffect(() => {
    if (isHovering) return;

    let animationId: number;
    let time = 0;

    const animateRipple = () => {
      time += 0.008; // Increased from 0.002 for faster frequency
      const frequency = 0.015 + Math.sin(time) * 0.008; // Increased range for more significant fluctuation
      setBaseFrequency(frequency);
      animationId = requestAnimationFrame(animateRipple);
    };

    animationId = requestAnimationFrame(animateRipple);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="waterRipple" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves="3"
              seed="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="35"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Background Image with Water Ripple Filter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={backgroundImage}
          alt="Background"
          className="min-w-full min-h-full object-cover"
          style={{
            filter: 'url(#waterRipple)',
            transform: 'scale(1.1)',
          }}
        />
      </div>

      {/* Mouse Hover Overlay Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255, 255, 255, ${isHovering ? '0.1' : '0'}) 0%, 
            transparent 30%)`,
          transition: 'background 0.3s ease',
        }}
      />
    </div>
  );
}