import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TechBackground } from '../components/canvas/TechBackground';

// Figma 设计的图片资源
const imgPrj1Page1 = '/assets/images/project1/prj-1-p1.png';
const imgPrj1Page2 = '/assets/images/project1/prj-1-p2.png';
const imgPrj1Page3 = '/assets/images/project1/prj-1-p3.png';
const imgPrj1Page4 = '/assets/images/project1/prj-1-p4.png';
const imgPrj1Page5 = '/assets/images/project1/prj-1-p5.png';

const Project1 = () => {
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
                            <span className="text-[#ad2309]">PROJECT 01</span>
                            <span className="text-white">{`  Six Bodies, Awaiting the Flame`}</span>
                        </h1>
                        
                        <h2 className="font-['Alumni_Sans',sans-serif] text-3xl text-[#999] tracking-[6px] leading-snug mb-8">
                            <span className="text-[#757575]">Within </span>
                            <span className="text-[#ad2309]">six vessels</span>
                            <br />
                            <span className="text-[#757575]">I set time on </span>
                            <span className="text-[#ad2309]">fire</span>
                            <br />
                            <span className="text-[#757575]">and let the concrete </span>
                            <span className="text-[#ad2309]">bleed</span>
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
                                This project acts as a spirit-summoning ritual mediated by architecture, serving simultaneously as an artistic dissection of the systemic violence concealed within space. To me, architecture is never merely bricks and concrete; it bears the weight of too many invisible wounds.
                            </p>
                            
                            <p>
                                It all begins with an act of digital archaeology. I meticulously studied the original blueprints of <span className="italic">the 1933 Old Slaughterhouse</span> in Shanghai, reconstructing its geometry to extract six distinct corners. These spaces seem to brim with the immense agony of animal memories. I treat them as vessels of trauma, stringing together the final wails of livestock before their death.
                            </p>
                            
                            <p>
                                What followed was a transformative process steeped in ritual. I first 3D-printed these digital structures into white skeletons, then coated them with a cement-like skin. Finally, I poured scalding wax to reconstruct their flesh—wax, being organic, holds both temperature and memory. As the wax burns away, it mimics the flow of blood: the livestock, stained with gore, marching to the top-floor workshop, transforming into liquid blood, and draining all the way to the bottom.
                            </p>
                            
                            <p>
                                I ignited these six sculpted incarnations. The flames melted the waxen flesh, exposing the charred architectural skeleton beneath. This is not mere destruction, but a rite of summoning—a violent compulsion forcing these silent vessels to articulate their trauma.
                            </p>
                            
                            <p>
                                Ultimately, this ritual manifests as an installation combining dual-channel video and wax sculptures, which I hope to exhibit on-site at <span className="italic">the 1933 Old Slaughterhouse</span>. The right screen displays the process of burning sacrifice, while the left juxtaposes historical footage of slaughter with the now-empty site. The charred remains of the six sculptures sit like relics alongside the video, creating a contemplative space regarding memory, violence, and spatial echoes. This work deeply empathizes with those vanished lives, using them as a metaphor for the fragility of the individual under the crushing pressure of vast, ruthless contemporary systems.
                            </p>
                        </div>
                    </motion.div>

                    {/* 图片画廊 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-8"
                    >
                        {/* 图片 1 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgPrj1Page1} 
                                alt="Project 1 - Page 1" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 2 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgPrj1Page2} 
                                alt="Project 1 - Page 2" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 3 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgPrj1Page3} 
                                alt="Project 1 - Page 3" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 4 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgPrj1Page4} 
                                alt="Project 1 - Page 4" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 5 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img 
                                src={imgPrj1Page5} 
                                alt="Project 1 - Page 5" 
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 视频占位符 */}
                        <div className="w-full h-[500px] rounded-lg bg-[#d9d9d9]/10 border border-white/10 flex items-center justify-center">
                            <p className="font-['Barlow',sans-serif] text-xl text-gray-400">
                                video placeholder
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Project1;
