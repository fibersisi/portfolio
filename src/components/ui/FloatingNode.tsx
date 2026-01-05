import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Project, ViewState, Category } from '../../types';
import { MeteoriteDebris } from './MeteoriteDebris';

interface FloatingNodeProps {
  project: Project;
  viewState: ViewState;
  onClick: (id: string) => void;
}

export const FloatingNode: React.FC<FloatingNodeProps> = ({ project, viewState, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine target position based on current state
  const target = useMemo(() => {
    switch (viewState) {
      case 'artist_focus':
        return project.positions.artist_focus;
      case 'designer_focus':
        return project.positions.designer_focus;
      case 'neutral':
      default:
        return project.positions.neutral;
    }
  }, [viewState, project]);

  // Determine opacity: fade out unrelated projects when focused
  const isRelated = 
    viewState === 'neutral' || 
    (viewState === 'artist_focus' && project.category === Category.ARTIST) ||
    (viewState === 'designer_focus' && project.category === Category.DESIGNER);

  const opacity = isRelated ? 1 : 0.15;
  const grayscale = isRelated ? 0 : 1;

  // Random floating parameters for "antigravity" feel
  const duration = useMemo(() => 3 + Math.random() * 4, []);
  const yOffset = useMemo(() => (10 + Math.random() * 20) * 0.5, []); // 浮动幅度减小50%

  // Glow colors based on category
  const glowColor = '#6CBFCD';

  // 陨石外形：模拟真实陨石的不规则、凹凸边缘
  const meteoriteShapes = [
    // 陨石1：左侧突出，右侧凹陷
    'polygon(15% 5%, 35% 2%, 55% 8%, 70% 3%, 85% 10%, 95% 25%, 98% 45%, 92% 65%, 88% 80%, 80% 92%, 65% 98%, 45% 95%, 30% 88%, 18% 78%, 8% 60%, 3% 40%, 5% 20%)',
    
    // 陨石2：顶部圆润，底部尖锐
    'polygon(20% 8%, 40% 3%, 60% 5%, 78% 12%, 90% 28%, 95% 48%, 90% 68%, 78% 85%, 60% 95%, 50% 98%, 38% 94%, 25% 85%, 15% 70%, 8% 50%, 5% 30%, 10% 15%)',
    
    // 陨石3：整体较圆，多个小凹陷
    'polygon(25% 3%, 45% 1%, 65% 4%, 82% 15%, 93% 32%, 97% 52%, 93% 72%, 82% 88%, 68% 96%, 48% 99%, 28% 95%, 15% 85%, 6% 68%, 2% 48%, 4% 28%, 12% 12%)',
    
    // 陨石4：左右不对称，坑坑洼洼
    'polygon(18% 10%, 38% 4%, 58% 2%, 75% 8%, 88% 20%, 96% 38%, 98% 58%, 92% 75%, 82% 88%, 68% 95%, 50% 97%, 32% 92%, 20% 82%, 12% 68%, 6% 50%, 4% 32%, 8% 18%)',
    
    // 陨石5：扁平型，边缘锯齿状
    'polygon(22% 15%, 42% 8%, 62% 6%, 78% 10%, 90% 22%, 96% 40%, 98% 60%, 92% 78%, 80% 90%, 62% 94%, 42% 92%, 25% 85%, 12% 70%, 5% 50%, 8% 30%, 15% 20%)',
    
    // 陨石6：不规则块状
    'polygon(28% 5%, 48% 2%, 68% 7%, 82% 18%, 92% 35%, 96% 55%, 90% 73%, 78% 87%, 62% 96%, 42% 98%, 25% 90%, 12% 75%, 4% 55%, 3% 35%, 10% 18%, 20% 8%)',
    
    // 陨石7：左下角大缺口
    'polygon(30% 8%, 50% 3%, 70% 6%, 85% 15%, 94% 32%, 98% 52%, 94% 72%, 85% 88%, 70% 96%, 50% 99%, 30% 95%, 15% 85%, 8% 70%, 12% 50%, 18% 35%, 22% 20%)',
    
    // 陨石8：顶部平坦，底部圆润
    'polygon(20% 12%, 40% 6%, 60% 8%, 78% 15%, 90% 30%, 96% 50%, 92% 70%, 82% 86%, 68% 94%, 48% 98%, 28% 94%, 14% 82%, 6% 64%, 3% 44%, 6% 25%, 14% 14%)',
  ];
  
  // 根据 project id 选择不同的陨石形状
  const shapeIndex = useMemo(() => {
    const hash = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % meteoriteShapes.length;
  }, [project.id]);
  
  const clipPath = meteoriteShapes[shapeIndex];

  return (
    <motion.div
      className="absolute cursor-pointer z-10 pointer-events-auto"
      initial={false}
      animate={{
        top: `${target.top}%`,
        left: `${target.left}%`,
        scale: target.scale,
        opacity: opacity,
        filter: `grayscale(${grayscale})`,
      }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 15,
        mass: 1,
      }}
      onClick={() => onClick(project.id)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: target.scale * 1.15, zIndex: 50 }}
    >
      {/* The continuous floating animation container */}
      <motion.div
        animate={{
          y: [-yOffset, yOffset, -yOffset],
          x: [yOffset / 2, -yOffset / 2, yOffset / 2],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute opacity-0 group-hover:opacity-100 pointer-events-none rounded-full"
          style={{
            inset: '-30px',
            background: `radial-gradient(circle, transparent 0%, transparent 50%, ${glowColor}40 70%, ${glowColor}80 90%, transparent 100%)`,
            filter: 'blur(25px)',
          }}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.3 }}
        />
        <div 
          className="w-24 h-24 md:w-32 md:h-32 overflow-hidden border border-white/20 shadow-lg backdrop-blur-sm bg-black/40 hover:border-white/50 transition-colors relative z-10"
          style={{ clipPath }}
        >
          {/* 陨石粒子碎片效果 - 少量 */}
          <MeteoriteDebris isHovered={isHovered} color={glowColor} />
          
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
          />
        </div>
        
        {/* Tooltip on Hover */}
        <motion.div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs font-bold bg-white text-black px-3 py-1 rounded-full shadow-lg">
            {project.title}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};