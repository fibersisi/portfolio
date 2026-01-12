import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { TechBackground } from '../components/canvas/TechBackground';
import { P5InteractionLayer } from '../components/canvas/P5InteractionLayer';
import { TaiChiSphere } from '../components/canvas/TaiChiSphere';
import { FloatingNode } from '../components/ui/FloatingNode';
import { PROJECTS } from '../constants';
import { ViewState } from '../types';

const Home = () => {
    const navigate = useNavigate();
    const [viewState, setViewState] = useState<ViewState>('neutral');
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnterArt = (isHover: boolean) => {
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
        }
        console.log('Artist hover:', isHover); // 调试日志
        setViewState(isHover ? 'artist_focus' : 'neutral');
    };

    const handleMouseEnterDesign = (isHover: boolean) => {
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
        }
        console.log('Designer hover:', isHover); // 调试日志
        setViewState(isHover ? 'designer_focus' : 'neutral');
    };

    const handleMouseLeave = () => {
        resetTimerRef.current = setTimeout(() => {
            setViewState('neutral');
        }, 100);
    };

    const handleProjectClick = (id: string) => {
        // id 为 a1 的跳转到专门的 project1 页面
        if (id === 'a1') {
            navigate('/project1');
        } else if (id === 'a2') {
            navigate('/project2');
        } else if (id === 'a3') {
            navigate('/project3');
        } else if (id === 'a4') {
            navigate('/project4');
        } else if (id === 'd1') {
            navigate('/project5');
        } else if (id === 'd2') {
            navigate('/project6');
        } else if (id === 'd3') {
            navigate('/project7');
        } else if (id === 'd4') {
            navigate('/project8');
        } else {
            navigate(`/project/${id}`);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
            {/* 星空粒子背景 */}
            <TechBackground />

            {/* P5.js 交互反馈层 */}
            <P5InteractionLayer />

            {/* Main Content Layer */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">

                {/* 3D Tai Chi Sphere Container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-20"
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="w-[500px] h-[500px] relative">
                        {/* Glow effect for Artist side */}
                        <motion.div
                            className="absolute pointer-events-none z-10"
                            style={{
                                inset: '-150px',
                                background: 'radial-gradient(circle, transparent 0%, transparent 35%, #6CBFCDFF 50%, #6CBFCDFF 65%, #6CBFCD80 80%, transparent 100%)',
                                filter: 'blur(60px)',
                                mixBlendMode: 'screen',
                            }}
                            animate={{
                                opacity: viewState === 'artist_focus' ? 1 : 0,
                                scale: viewState === 'artist_focus' ? 1.5 : 0.9,
                            }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                        {/* Glow effect for Designer side */}
                        <motion.div
                            className="absolute pointer-events-none z-10"
                            style={{
                                inset: '-150px',
                                background: 'radial-gradient(circle, transparent 0%, transparent 35%, #6CBFCDFF 50%, #6CBFCDFF 65%, #6CBFCD80 80%, transparent 100%)',
                                filter: 'blur(60px)',
                                mixBlendMode: 'screen',
                            }}
                            animate={{
                                opacity: viewState === 'designer_focus' ? 1 : 0,
                                scale: viewState === 'designer_focus' ? 1.5 : 0.9,
                            }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
                            {/* 增强环境光 */}
                            <ambientLight intensity={0.8} />
                            {/* 主光源 - 增强立体感 */}
                            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                            {/* 顶部光源 */}
                            <pointLight position={[0, 10, 5]} intensity={1.2} color="#ffffff" />
                            {/* 右侧光源 - 增强高光 */}
                            <pointLight position={[10, 0, 5]} intensity={1} color="#6CBFCD" />
                            {/* 左侧补光 */}
                            <pointLight position={[-10, 0, 5]} intensity={0.8} color="#ffffff" />
                            {/* 底部补光 - 减少阴影 */}
                            <pointLight position={[0, -10, 5]} intensity={0.6} color="#4A9BA8" />
                            <TaiChiSphere
                                onHoverArt={handleMouseEnterArt}
                                onHoverDesign={handleMouseEnterDesign}
                                onClickArt={() => { }}
                                onClickDesign={() => { }}
                            />
                        </Canvas>
                    </div>
                </div>

                {/* Floating Projects Layer */}
                <div className="relative w-full max-w-7xl h-full pointer-events-none z-30">
                    {/* Projects (Satellites) */}
                    {PROJECTS.map((project) => (
                        <FloatingNode
                            key={project.id}
                            project={project}
                            viewState={viewState}
                            onClick={handleProjectClick}
                        />
                    ))}
                </div>

                {/* Labels */}
                <div className="absolute top-10 left-0 right-0 flex justify-between px-20 pointer-events-none">
                    <motion.h2
                        animate={{ opacity: viewState === 'artist_focus' ? 1 : 0.5, scale: viewState === 'artist_focus' ? 1.1 : 1 }}
                        className="text-4xl font-display font-light tracking-widest text-white uppercase"
                    >

                    </motion.h2>
                    <motion.h2
                        animate={{ opacity: viewState === 'designer_focus' ? 1 : 0.5, scale: viewState === 'designer_focus' ? 1.1 : 1 }}
                        className="text-4xl font-display font-light tracking-widest text-white uppercase"
                    >

                    </motion.h2>
                </div>
            </div>
        </div>
    );
};

export default Home;
