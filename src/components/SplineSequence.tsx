import { useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

interface SplineSequenceProps {
    scenes: string[];
    className?: string;
}

export const SplineSequence: React.FC<SplineSequenceProps> = ({ scenes, className }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false); // 是否开始播放
    const [isLoading, setIsLoading] = useState(false); // 是否正在加载场景
    const splineAppRef = useRef<Application | null>(null);

    // 监听场景加载完成
    const handleLoad = (splineApp: Application) => {
        splineAppRef.current = splineApp;
        console.log(`✅ 场景 ${currentSceneIndex + 1} 加载完成`);
        
        // 加载完成，隐藏 loading，显示场景
        setIsLoading(false);
        setOpacity(1);

        // 只有在播放状态下才监听场景结束并自动播放
        if (isPlaying) {
            console.log(`▶️ 开始播放场景 ${currentSceneIndex + 1}`);
            checkSceneEnd(splineApp);
        }
    };

    // 监听场景中的状态变化事件
    const checkSceneEnd = (splineApp: Application) => {
        // 方案1: 监听特定对象的状态（如果你的场景有状态机）
        let hasStateController = false;
        
        try {
            const sceneController = splineApp.findObjectByName('SceneController');
            if (sceneController) {
                hasStateController = true;
                console.log('🎬 找到 SceneController，使用状态监听模式（场景播放完毕后切换）');
                // @ts-ignore - Spline 类型定义不完整
                splineApp.addEventListener('stateChanged', (e: any) => {
                    if (e.target === sceneController && e.stateName === 'End') {
                        console.log('⏹️ 场景播放完毕，准备切换...');
                        handleSceneEnd();
                    }
                });
            }
        } catch (error) {
            console.warn('SceneController 查找失败:', error);
        }

        // 方案2: 如果没有状态机，使用测试定时器（15秒）
        if (!hasStateController) {
            console.warn('⚠️ 未找到 SceneController！');
            console.warn('使用测试模式：每个场景 15 秒后自动切换');
            console.warn('正式使用请在 Spline 中添加 "SceneController" 对象和状态机');
            
            // 测试用：15秒后自动切换
            setTimeout(() => {
                console.log(`⏰ 测试定时器触发，切换场景 ${currentSceneIndex + 1} -> ${currentSceneIndex + 2}`);
                handleSceneEnd();
            }, 15000);
        }
    };

    // 处理场景结束，切换到下一个场景
    const handleSceneEnd = () => {
        console.log(`📊 当前场景: ${currentSceneIndex + 1}/${scenes.length}`);
        
        if (currentSceneIndex < scenes.length - 1) {
            // 还有下一个场景，继续播放
            console.log(`🔄 切换到场景 ${currentSceneIndex + 2}`);
            
            // 显示 Loading
            setIsLoading(true);
            setOpacity(0);
            
            // 延迟切换场景
            setTimeout(() => {
                setCurrentSceneIndex(prev => prev + 1);
            }, 500);
        } else {
            // 所有场景播放完毕，停止播放
            console.log('✅ 所有 4 个场景播放完毕，停止播放');
            setIsPlaying(false); // 停止播放状态
        }
    };

    // 手动开始播放（点击启动）
    const handleStart = () => {
        if (!isPlaying) {
            console.log('🎬 点击开始播放按钮');
            setIsPlaying(true);
            
            // 如果场景已经加载完成，直接开始播放
            if (splineAppRef.current) {
                console.log('✅ 场景已加载，立即开始播放');
                console.log(`▶️ 开始播放场景 ${currentSceneIndex + 1}`);
                checkSceneEnd(splineAppRef.current);
            } else {
                // 场景还未加载，等待 handleLoad 触发
                console.log('⏳ 等待场景加载...');
            }
        }
    };

    return (
        <div className={`relative ${className || ''}`}>
            <div 
                style={{ 
                    opacity,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            >
                <Spline 
                    scene={scenes[currentSceneIndex]} 
                    onLoad={handleLoad}
                />
            </div>

            {/* Loading 提示（场景加载时显示） */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#6CBFCD] border-t-transparent mb-4"></div>
                        <p className="text-white text-lg font-bold">Loading Scene {currentSceneIndex + 1}...</p>
                        <p className="text-white/60 text-sm mt-2">({currentSceneIndex + 1}/{scenes.length})</p>
                    </div>
                </div>
            )}

            {/* 启动按钮（只在第一个场景且未开始播放时显示） */}
            {!isPlaying && currentSceneIndex === 0 && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer"
                    onClick={handleStart}
                >
                    <div className="text-center">
                        <button className="px-8 py-4 bg-[#6CBFCD] hover:bg-[#6CBFCD]/80 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                            ▶ Start Play
                        </button>
                        <p className="mt-4 text-white/80 text-sm">Click to start and watch {scenes.length} scenes</p>
                    </div>
                </div>
            )}

            {/* 进度指示器（播放时显示） */}
            {isPlaying && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
                    {scenes.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentSceneIndex 
                                    ? 'bg-[#6CBFCD]' 
                                    : index < currentSceneIndex 
                                        ? 'bg-[#6CBFCD]/50' 
                                        : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* 播放完成提示 */}
            {isPlaying && currentSceneIndex === scenes.length - 1 && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm">
                    Scene {currentSceneIndex + 1}/{scenes.length}
                </div>
            )}
        </div>
    );
};
