import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TechBackground } from '../components/canvas/TechBackground';

// Figma 设计的图片资源
const imgBoundlessFood02 = '/assets/images/project6/prj-6-p2.png';
const imgBoundlessFood03 = '/assets/images/project6/prj-6-p3.png';
const imgBoundlessFood04 = '/assets/images/project6/prj-6-p4.png';
const imgBoundlessFood05 = '/assets/images/project6/prj-6-p5.png';
const imgBoundlessFood06 = '/assets/images/project6/prj-6-p6.png';
const imgBoundlessFood07 = '/assets/images/project6/prj-6-p7.png';
const imgBoundlessFood08 = '/assets/images/project6/prj-6-p8.png';

const Project6 = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full"
        >
            {/* 背景 */}
            <TechBackground />

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
                            <span className="text-[#88baa1]">PROJECT 06</span>
                            <span className="text-white">{`  Boundless Food. Plc`}</span>
                        </h1>
                        
                        <h2 className="font-['Aboreto',sans-serif] text-3xl text-[#999] tracking-wide leading-snug mb-8">
                            <span>"</span>
                            <span className="text-[#efc971]">Everyone</span>
                            <span> can have</span>
                            <span className="text-[#efc971]"> a full meal</span>
                            <span> safely!"</span>
                        </h2>

                        <div className="text-white space-y-6 max-w-3xl">
                            <p className="text-lg leading-relaxed">
                                This project is the result of my participation in the Winter School jointly organized by Imperial College London and the Royal College of Art when I first entered university as a freshman. It was also <span className="font-bold">my first systematic exposure to design thinking</span> and the <span className="font-bold">SDGs</span>, using them to tackle <span className="font-bold">a pressing global issue—food waste</span>.
                            </p>
                            <p className="text-lg leading-relaxed">
                                I designed a <span className="font-bold">company called Boundless Food</span> to complete a service design project.
                            </p>
                        </div>
                    </motion.div>

                    {/* 项目详细描述 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-16"
                    >
                        <div className="text-white space-y-6 max-w-3xl">
                            <p className="text-lg leading-relaxed">
                                My perspective expanded from <span className="font-bold">the fate of an individual life</span> to <span className="font-bold">examine a fractured social network composed of farmers, restaurant owners, and people in need in the city</span>. I didn't just feel the problem, I also learned to map it. Using the user journey map and service blueprint, I clearly identified the invisible pain points—unsold agricultural products and discarded leftover food.
                            </p>
                            <p className="text-lg leading-relaxed">
                                In the end, I designed an <span className="font-bold">app service process</span> that connects both the supply and demand sides. This experience truly awakened my design thinking and made me realize that <span className="font-bold">empathy</span>, when empowered by a rigorous methodology, <span className="font-bold">can become the most powerful lever</span> to drive change in complex systems. This project laid the first key stone for all my later, more ambitious social innovation practices.
                            </p>
                        </div>
                    </motion.div>

                    {/* 图片画廊 - 7张图片 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood02} 
                                alt="Boundless Food - Design 02" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood03} 
                                alt="Boundless Food - Design 03" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood04} 
                                alt="Boundless Food - Design 04" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood05} 
                                alt="Boundless Food - Design 05" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood06} 
                                alt="Boundless Food - Design 06" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood07} 
                                alt="Boundless Food - Design 07" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgBoundlessFood08} 
                                alt="Boundless Food - Design 08" 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Project6;
