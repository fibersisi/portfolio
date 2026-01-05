import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Particle {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    alpha: number;
    size: number;
    lifespan: number;
    maxLifespan: number;
}

interface Ripple {
    pos: p5.Vector;
    radius: number;
    maxRadius: number;
    alpha: number;
}

export const P5EnergyField = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<p5 | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (p: p5) => {
            let particles: Particle[] = [];
            let ripples: Ripple[] = [];
            const centerX = p.windowWidth / 2;
            const centerY = p.windowHeight / 2;
            const numParticles = 500; // 从 1500 降低到 500

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                p.colorMode(p.RGB);
                
                // 初始化粒子
                for (let i = 0; i < numParticles; i++) {
                    const angle = p.random(p.TWO_PI);
                    const radius = p.random(100, p.min(p.width, p.height) * 0.6);
                    const pos = p.createVector(
                        centerX + p.cos(angle) * radius,
                        centerY + p.sin(angle) * radius
                    );
                    
                    particles.push({
                        pos: pos,
                        vel: p.createVector(0, 0),
                        acc: p.createVector(0, 0),
                        alpha: p.random(100, 255),
                        size: p.random(1, 3),
                        lifespan: p.random(200, 400),
                        maxLifespan: p.random(200, 400)
                    });
                }
            };

            p.draw = () => {
                // 半透明背景实现拖尾效果
                p.background(0, 0, 0, 25);

                // const center = p.createVector(centerX, centerY);

                // 绘制粒子 - 移除双层绘制，只绘制一层以提升性能
                particles.forEach((particle) => {
                    // 计算到中心的距离和方向
                    const dx = centerX - particle.pos.x;
                    const dy = centerY - particle.pos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // 引力效果（太极球的吸引力）
                    if (distance > 250) {
                        const force = 0.05 / distance;
                        particle.acc.x += dx * force;
                        particle.acc.y += dy * force;
                    } else {
                        // 近距离时产生轨道运动
                        particle.acc.x += -dy * 0.5;
                        particle.acc.y += dx * 0.5;
                    }

                    // 添加噪声实现有机运动
                    const noiseVal = p.noise(particle.pos.x * 0.005, particle.pos.y * 0.005, p.frameCount * 0.01);
                    const noiseAngle = noiseVal * p.TWO_PI * 2;
                    particle.acc.x += Math.cos(noiseAngle) * 0.1;
                    particle.acc.y += Math.sin(noiseAngle) * 0.1;

                    // 更新速度和位置
                    particle.vel.add(particle.acc);
                    particle.vel.limit(2);
                    particle.pos.add(particle.vel);
                    particle.acc.mult(0);

                    // 生命周期管理
                    particle.lifespan--;
                    if (particle.lifespan <= 0) {
                        // 重生粒子
                        const angle = p.random(p.TWO_PI);
                        const radius = p.random(100, p.min(p.width, p.height) * 0.6);
                        particle.pos.set(
                            centerX + p.cos(angle) * radius,
                            centerY + p.sin(angle) * radius
                        );
                        particle.vel.set(0, 0);
                        particle.lifespan = particle.maxLifespan;
                        particle.alpha = p.random(100, 255);
                    }

                    // 绘制粒子 - 只绘制一层
                    const lifespanRatio = particle.lifespan / particle.maxLifespan;
                    const alpha = particle.alpha * lifespanRatio;
                    
                    // 青色粒子（#6CBFCD）带光晕
                    p.noStroke();
                    p.fill(108, 191, 205, alpha * 0.6);
                    p.circle(particle.pos.x, particle.pos.y, particle.size * 1.5);
                });

                // 绘制粒子连线（能量网络）- 优化：只检查部分粒子
                if (particles.length > 0) {
                    const step = 3; // 每 3 个粒子检查一次，大幅减少计算量
                    p.stroke(108, 191, 205, 30);
                    p.strokeWeight(0.5);
                    for (let i = 0; i < particles.length; i += step) {
                        for (let j = i + step; j < particles.length; j += step) {
                            const dx = particles[i].pos.x - particles[j].pos.x;
                            const dy = particles[i].pos.y - particles[j].pos.y;
                            const d = Math.sqrt(dx * dx + dy * dy); // 手动计算距离，避免创建 Vector
                            if (d < 80) {
                                const alpha = p.map(d, 0, 80, 40, 0);
                                p.stroke(108, 191, 205, alpha);
                                p.line(
                                    particles[i].pos.x, particles[i].pos.y,
                                    particles[j].pos.x, particles[j].pos.y
                                );
                            }
                        }
                    }
                }

                // 绘制并更新波纹
                for (let i = ripples.length - 1; i >= 0; i--) {
                    const ripple = ripples[i];
                    
                    // 更新波纹
                    ripple.radius += 3;
                    ripple.alpha -= 3;
                    
                    // 绘制波纹
                    p.noFill();
                    p.stroke(108, 191, 205, ripple.alpha);
                    p.strokeWeight(2);
                    p.circle(ripple.pos.x, ripple.pos.y, ripple.radius * 2);
                    
                    // 内层波纹
                    p.stroke(108, 191, 205, ripple.alpha * 0.5);
                    p.strokeWeight(1);
                    p.circle(ripple.pos.x, ripple.pos.y, ripple.radius * 1.5);
                    
                    // 移除消失的波纹
                    if (ripple.alpha <= 0 || ripple.radius > ripple.maxRadius) {
                        ripples.splice(i, 1);
                    }
                }

                // 中心能量环（太极球周围）
                p.noFill();
                const pulseSize = 250 + p.sin(p.frameCount * 0.05) * 20;
                p.stroke(108, 191, 205, 30);
                p.strokeWeight(2);
                p.circle(centerX, centerY, pulseSize * 2);
                
                p.stroke(108, 191, 205, 15);
                p.strokeWeight(1);
                p.circle(centerX, centerY, (pulseSize + 30) * 2);
            };

            p.mousePressed = () => {
                // 点击时创建波纹
                ripples.push({
                    pos: p.createVector(p.mouseX, p.mouseY),
                    radius: 0,
                    maxRadius: 300,
                    alpha: 150
                });
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };

        const p5Instance = new p5(sketch, containerRef.current);
        p5InstanceRef.current = p5Instance;

        return () => {
            p5Instance.remove();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'black' }}
        />
    );
};
