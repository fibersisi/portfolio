import { useEffect, useRef } from 'react';
// import particleImage from 'assets/images/project2/prg-2-bg.png';
// 图片文件不存在，使用占位符
const particleImage = 'assets/images/project2/prg-2-bg.png';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export function ParticleFieldProject2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the particle image
    const img = new Image();
    img.src = particleImage;
    imageRef.current = img;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with increased quantity
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 100; // Increased from 80

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 30 + 15; // 15-45px (larger range)
        // Smaller particles = lower transparency (more opaque)
        // Larger particles = higher transparency (more transparent)
        const opacity = (size - 15) / 30 * 0.5 + 0.3; // Maps 15-45px to 0.3-0.8 opacity

        // Random compression ratios for 3D effect
        const compressionType = Math.random();
        let scaleX = 1;
        let scaleY = 1;

        if (compressionType < 0.33) {
          // 1:2 compression (compressed vertically)
          scaleY = 0.5;
        } else if (compressionType < 0.5) {
          // 1:3 compression (compressed vertically)
          scaleY = 0.33;
        } else if (compressionType < 0.66) {
          // 1:2 compression (compressed horizontally)
          scaleX = 0.5;
        } else if (compressionType < 0.75) {
          // 1:3 compression (compressed horizontally)
          scaleX = 0.33;
        }
        // Otherwise keep 1:1 ratio

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height, // Start above screen
          size: size,
          speed: Math.random() * 3, // Increased speed: 2-5 (was 0.5-2)
          opacity: opacity,
          rotation: Math.random() * Math.PI * 2, // Random rotation 0-360 degrees
          scaleX: scaleX,
          scaleY: scaleY,
        });
      }
      particlesRef.current = particles;
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Check if mouse is near particle
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hoverRadius = 100;

        // Slow down and enlarge if mouse is hovering nearby
        let currentSpeed = particle.speed;
        let sizeMultiplier = 1;
        if (mouseRef.current.isHovering && distance < hoverRadius) {
          currentSpeed = particle.speed * 0.2; // Slow to 20% speed
          sizeMultiplier = 1.3; // Increase size by 30%
        }

        // Update position (falling down)
        particle.y += currentSpeed;

        // Reset particle to top when it goes off screen
        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle using image with rotation and compression
        if (imageRef.current && imageRef.current.complete) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;

          // Move to particle position
          ctx.translate(particle.x, particle.y);

          // Apply rotation
          ctx.rotate(particle.rotation);

          // Apply scale/compression for 3D effect
          ctx.scale(particle.scaleX, particle.scaleY);

          // Draw image centered at origin with size multiplier
          const currentSize = particle.size * sizeMultiplier;
          ctx.drawImage(
            imageRef.current,
            -currentSize / 2,
            -currentSize / 2,
            currentSize,
            currentSize
          );

          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after image loads
    img.onload = () => {
      animate();
    };

    // If image is already loaded
    if (img.complete) {
      animate();
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}