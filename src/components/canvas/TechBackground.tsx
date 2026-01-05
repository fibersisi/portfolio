import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
    particleCount: number;
    enableRotation: boolean;
}

const ParticleField = ({ particleCount, enableRotation }: ParticleFieldProps) => {
    const ref = useRef<any>();

    // Generate random points in a sphere
    const positions = useMemo(() => {
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 10 * Math.cbrt(Math.random()) + 2; // Spread with a hole in the middle

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            posArray[i * 3] = x;
            posArray[i * 3 + 1] = y;
            posArray[i * 3 + 2] = z;
        }
        return posArray;
    }, [particleCount]);

    useFrame((_state, delta) => {
        if (ref.current && enableRotation) {
            ref.current.rotation.x -= delta / 30; // Slow rotation
            ref.current.rotation.y -= delta / 40;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

interface CameraControllerProps {
    enableCameraFollow: boolean;
}

const CameraController = ({ enableCameraFollow }: CameraControllerProps) => {
    const { camera, pointer } = useThree();

    useEffect(() => {
        if (!enableCameraFollow) return;

        const handleMouseMove = (event: MouseEvent) => {
            // Update pointer based on global mouse position
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enableCameraFollow, pointer]);

    useFrame((_state, delta) => {
        if (!enableCameraFollow) return;

        // Smooth camera movement based on mouse pointer
        const targetX = pointer.x * 1.5; // 减小响应幅度从 3 到 1.5
        const targetY = pointer.y * 1.5; // 减小响应幅度从 3 到 1.5

        camera.position.x += (targetX - camera.position.x) * delta * 1.5; // 减小响应速度
        camera.position.y += (targetY - camera.position.y) * delta * 1.5; // 减小响应速度
        camera.lookAt(0, 0, 0);
    });
    return null;
};


export const TechBackground = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [particleCount, setParticleCount] = useState(2000);

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setParticleCount(mobile ? 1000 : 2000);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-cyber-dark">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={isMobile ? [1, 1] : [1, 2]}
                gl={{ antialias: false, alpha: false }}
            >
                <color attach="background" args={['#050508']} />
                <ParticleField
                    particleCount={particleCount}
                    enableRotation={!isMobile}
                />
                <CameraController enableCameraFollow={!isMobile} />
            </Canvas>
        </div>
    );
};
