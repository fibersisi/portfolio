import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Ripple {
    pos: p5.Vector;
    radius: number;
    maxRadius: number;
    alpha: number;
}

interface Trail {
    pos: p5.Vector;
    alpha: number;
}

export const P5InteractionLayer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<p5 | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (p: p5) => {
            let ripples: Ripple[] = [];
            let trails: Trail[] = [];
            let mouseTrail: p5.Vector[] = [];
            const maxTrailLength = 30;

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                p.colorMode(p.RGB);
            };

            p.draw = () => {
                // 清除背景（全透明）
                p.clear();

                // 1. 绘制鼠标轨迹
                if (p.mouseIsPressed && p.frameCount % 2 === 0) {
                    mouseTrail.push(p.createVector(p.mouseX, p.mouseY));
                    if (mouseTrail.length > maxTrailLength) {
                        mouseTrail.shift();
                    }
                }

                // 绘制轨迹线
                if (mouseTrail.length > 1) {
                    p.noFill();
                    p.strokeWeight(3);
                    for (let i = 0; i < mouseTrail.length - 1; i++) {
                        const alpha = p.map(i, 0, mouseTrail.length - 1, 0, 150);
                        p.stroke(108, 191, 205, alpha);
                        p.line(
                            mouseTrail[i].x, mouseTrail[i].y,
                            mouseTrail[i + 1].x, mouseTrail[i + 1].y
                        );
                    }
                }

                // 轨迹点淡出
                for (let i = trails.length - 1; i >= 0; i--) {
                    const trail = trails[i];
                    trail.alpha -= 3;

                    if (trail.alpha <= 0) {
                        trails.splice(i, 1);
                    } else {
                        p.noStroke();
                        p.fill(108, 191, 205, trail.alpha);
                        p.circle(trail.pos.x, trail.pos.y, 6);

                        // 外层光晕
                        p.fill(108, 191, 205, trail.alpha * 0.3);
                        p.circle(trail.pos.x, trail.pos.y, 12);
                    }
                }

                // 2. 绘制点击波纹
                for (let i = ripples.length - 1; i >= 0; i--) {
                    const ripple = ripples[i];

                    // 更新波纹
                    ripple.radius += 5;
                    ripple.alpha -= 4;

                    // 绘制多层波纹
                    p.noFill();

                    // 外层波纹
                    p.stroke(108, 191, 205, ripple.alpha * 0.6);
                    p.strokeWeight(3);
                    p.circle(ripple.pos.x, ripple.pos.y, ripple.radius * 2);

                    // 中层波纹
                    p.stroke(108, 191, 205, ripple.alpha * 0.8);
                    p.strokeWeight(2);
                    p.circle(ripple.pos.x, ripple.pos.y, ripple.radius * 1.5);

                    // 内层波纹
                    p.stroke(108, 191, 205, ripple.alpha);
                    p.strokeWeight(1);
                    p.circle(ripple.pos.x, ripple.pos.y, ripple.radius);

                    // 移除消失的波纹
                    if (ripple.alpha <= 0 || ripple.radius > ripple.maxRadius) {
                        ripples.splice(i, 1);
                    }
                }

                // 已移除：鼠标悬停光晕
            };

            p.mousePressed = () => {
                // 点击时创建波纹
                ripples.push({
                    pos: p.createVector(p.mouseX, p.mouseY),
                    radius: 0,
                    maxRadius: 200,
                    alpha: 180
                });

                // 创建轨迹点
                trails.push({
                    pos: p.createVector(p.mouseX, p.mouseY),
                    alpha: 200
                });
            };

            p.mouseReleased = () => {
                // 释放鼠标时清除轨迹
                mouseTrail = [];
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
            className="fixed inset-0 pointer-events-none z-5"
            style={{
                mixBlendMode: 'screen'
            }}
        />
    );
};
