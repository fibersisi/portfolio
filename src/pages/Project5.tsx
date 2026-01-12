import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TechBackground } from '../components/canvas/TechBackground';

// Figma 设计的图片资源
const imgPrj5Page1 = 'assets/images/project5/prj-5-p1.png';
const imgPrj5Page2 = 'assets/images/project5/prj-5-p2.png';
const imgPrj5Page3 = 'assets/images/project5/prj-5-p3.png';
const imgPrj5Page4 = 'assets/images/project5/prj-5-p4.png';
const imgPrj5Page5 = 'assets/images/project5/prj-5-p5.png';
const imgPrj5Page6 = 'assets/images/project5/prj-5-p6.png';



const Project5 = () => {
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

                    {/* 主要 PDF 页面 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >

                        {/* 图片 1 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj5Page1}
                                alt="Project 5 - Page 1"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 2 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj5Page2}
                                alt="Project 5 - Page 2"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 3 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj5Page3}
                                alt="Project 5 - Page 3"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 4 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj5Page4}
                                alt="Project 5 - Page 4"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 5 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj5Page5}
                                alt="Project 5 - Page 5"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 图片 6 */}
                        <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <img
                                src={imgPrj5Page6}
                                alt="Project 5 - Page 6"
                                className="w-full h-auto object-cover"
                            />
                        </div>


                    </motion.div>



                </div>
            </div>
        </motion.div>
    );
};

export default Project5;
