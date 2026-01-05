import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SplineSequence } from '../components/SplineSequence';

import { ParticleFieldProject2 } from './ParticleFieldProject2';
import { RippleBackground } from './RippleBackground';

// Figma 设计的图片资源
const imgPrj2Page1 = 'assets/images/project2/prj-2-p1.png';
const imgPrj2Page2 = 'assets/images/project2/prj-2-p2.png';
const imgPrj2Page3 = 'assets/images/project2/prj-2-p3.png';
const imgPrj2Page4 = 'assets/images/project2/prj-2-p4.png';
const imgPrj2Page5 = 'assets/images/project2/prj-2-p5.png';
const imgPrj2Page6 = 'assets/images/project2/prj-2-p6.png';

// Spline 场景链接 - 4个场景将按顺序播放
const splineScenes = [
    'https://prod.spline.design/ZBUCCc3eT2EdBPFL/scene.splinecode', // 场景1
    'https://prod.spline.design/B-2Wj6yNKY0Z7mZ8/scene.splinecode', // 场景2
    'https://prod.spline.design/HoRsT5nYPM9yxcJT/scene.splinecode', // 场景3
    'https://prod.spline.design/ZpUQoJcCcpmEpI8A/scene.splinecode'  // 场景4
];

const Project2 = () => {
    const location = useLocation();
    const splineRef = useRef<HTMLDivElement>(null);

    // 检查 URL 查询参数，如果有 ?v 或 ?scroll，自动滚动到 Spline 窗口
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const shouldScroll = params.has('v') || params.has('scroll');

        if (shouldScroll && splineRef.current) {
            // 延迟滚动，等待页面加载完成
            setTimeout(() => {
                splineRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('🎯 自动滚动到 Spline 窗口');
            }, 800); // 等待动画完成
        }
    }, [location]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full"
        >
            {/* 背景 */}
            {/* <TechBackground /> */}
            {/* Ripple Background Image */}
            <RippleBackground />

            {/* Falling Paper Money Particles */}
            <ParticleFieldProject2 />

            <div className="relative z-10 w-full">
                {/* 返回按钮 - 固定在顶部 */}
                <div className="fixed top-8 left-8 z-50">
                    <Link
                        to="/"
                        className="inline-flex items-center text-[#6CBFCD] hover:text-white transition-colors group bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                        <span className="font-['Barlow',sans-serif]">Back </span>
                    </Link>
                </div>

                {/* 主内容区域 */}
                <div className="max-w-[1500px] mx-auto px-8 pt-32 pb-20">
                    {/* 标题区域 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h1 className="font-['Barlow',sans-serif] text-5xl font-bold mb-6">
                            <span className="text-[#ad2309]">PROJECT 02</span>
                            <span className="text-white">{`  Pixelated Scroll for the Afterlife`}</span>
                        </h1>

                        <h2 className="font-['Alumni_Sans',sans-serif] text-3xl text-[#757575] tracking-[6px] leading-snug mb-8">
                            <span>Within the rift between </span>
                            <span className="text-[#ad2309]">Being</span>
                            <span> and </span>
                            <span className="text-[#ad2309]">Non-being</span>
                            <span>, </span>
                            <br />
                            <span>I attempt to fathom the </span>
                            <span className="text-[#ad2309]">gravity</span>
                            <span> of </span>
                            <span className="text-[#ad2309]">human agency</span>
                        </h2>
                    </motion.div>

                    {/* 项目描述 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-16"
                    >
                        <div className="font-['Barlow',sans-serif] text-lg text-gray-200 leading-normal space-y-4 max-w-4xl">
                            <p>
                                From the contemplation of the invisible traumas of the Other in my previous project, I was naturally drawn to a more intrinsic and complex inquiry: standing at the threshold between life and death, existence and the void, how much agency do we, as humans, truly possess? This work is a visual exploration of this grand proposition from an Eastern perspective, unfurling like an ancient scroll within the digital realm.
                            </p>

                            <p>
                                I do not attempt to prescribe a definitive answer; instead, I have constructed a metaphor-rich interactive webpage designed for free wandering. Its visual language draws inspiration from the Feiyi (Flying Garment) silk banner of the Mawangdui Han Tombs, which depicts the soul's passage through different worlds. The viewer acts as a silent observer, drifting through this fluid panorama and traversing the most sacred yet controversial territories of our society—from abortion and surrogacy to euthanasia and a funeral—while encountering family entanglements that spread like a mycelial network.
                            </p>

                            <p>
                                This is not a game to be conquered, but a quiet field for contemplation. It offers no conclusions, for the only valuable answers lie within the silent dialogue between the viewer and the work. Through this immersive journey, I aim to build a space for self-reflection, allowing the audience to reweigh the gravity of life within the cyclical worldview of Eastern philosophy, and ultimately, to find their own internal resonance regarding autonomy. This piece is a poetic and gentle inquiry, utilizing digital media to address the most profound ethical dilemmas of our age.
                            </p>
                        </div>
                    </motion.div>

                    {/* 图片画廊 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {/* 图片 1 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj2Page1}
                                alt="Project 2 - Page 1"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 2 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5 mt-[160px]">
                            <img
                                src={imgPrj2Page2}
                                alt="Project 2 - Page 2"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 3 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5 mt-[160px]">
                            <img
                                src={imgPrj2Page3}
                                alt="Project 2 - Page 3"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 4 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5 mt-[160px]">
                            <img
                                src={imgPrj2Page4}
                                alt="Project 2 - Page 4"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 5 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5 mt-[160px]">
                            <img
                                src={imgPrj2Page5}
                                alt="Project 2 - Page 5"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 6 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5 mt-[160px]">
                            <img
                                src={imgPrj2Page6}
                                alt="Project 2 - Page 6"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Spline 3D Scene - 4个场景顺序播放 */}
                        <div
                            ref={splineRef}
                            className="w-full h-[800px] rounded-lg border border-white/10 bg-black/20 mt-[160px] relative overflow-hidden"
                        >
                            <SplineSequence scenes={splineScenes} className="w-full h-full" />
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Project2;
