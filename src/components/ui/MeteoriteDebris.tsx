import { useEffect, useRef } from 'react';

interface MeteoriteParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

interface MeteoriteDebrisProps {
    isHovered: boolean;
    color?: string;
}

export const MeteoriteDebris: React.FC<MeteoriteDebrisProps> = ({ 
    isHovered, 
    color = '#6CBFCD' 
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<MeteoriteParticle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 设置 canvas 尺寸
        const size = 150;
        canvas.width = size;
        canvas.height = size;
        const centerX = size / 2;
        const centerY = size / 2;

        // 创建粒子
        const createParticle = (): MeteoriteParticle => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 80 + Math.random() * 15; // 调整到 80-95px，大于放大后的陨石（73.6px 半径）
            return {
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                vx: Math.cos(angle) * 0.5,
                vy: Math.sin(angle) * 0.5,
                life: Math.random() * 100 + 100,
                maxLife: Math.random() * 100 + 100,
                size: Math.random() * 2 + 1
            };
        };

        // 初始化粒子
        const initParticles = (count: number) => {
            particlesRef.current = [];
            for (let i = 0; i < count; i++) {
                particlesRef.current.push(createParticle());
            }
        };

        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, size, size);

            const targetCount = isHovered ? 25 : 0; // 悬停时 25 个粒子，平常时 0 个（不显示）
            
            // 动态调整粒子数量
            while (particlesRef.current.length < targetCount) {
                particlesRef.current.push(createParticle());
            }

            // 更新和绘制粒子
            particlesRef.current = particlesRef.current.filter(particle => {
                // 更新位置
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;

                // 粒子消失后重生
                if (particle.life <= 0) {
                    if (particlesRef.current.length <= targetCount) {
                        const angle = Math.random() * Math.PI * 2;
                        const radius = 80 + Math.random() * 15; // 调整到 80-95px，大于放大后的陨石（73.6px 半径）
                        particle.x = centerX + Math.cos(angle) * radius;
                        particle.y = centerY + Math.sin(angle) * radius;
                        particle.vx = Math.cos(angle) * 0.5;
                        particle.vy = Math.sin(angle) * 0.5;
                        particle.life = particle.maxLife;
                        return true;
                    }
                    return false;
                }

                // 绘制粒子 - 只绘制一层以提升性能
                const alpha = particle.life / particle.maxLife;
                const rgb = hexToRgb(color);
                
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
                ctx.fill();

                return true;
            });

            // 悬停时添加能量爆发效果（能量环对应调整）
            if (isHovered) {
                ctx.strokeStyle = `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, 0.3)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 88 + Math.sin(Date.now() * 0.005) * 7, 0, Math.PI * 2); // 调整到 88px，对应粒子圈的中间位置
                ctx.stroke();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        initParticles(0); // 初始不显示粒子
        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isHovered, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{
                width: '100%',
                height: '100%',
                opacity: 0.6 // 降低透明度
            }}
        />
    );
};

// 辅助函数：将 hex 颜色转换为 RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 108, g: 191, b: 205 };
}
