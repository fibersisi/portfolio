import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TechBackground } from '../components/canvas/TechBackground';

// 项目图片资源（需要从 Figma 导出）
const imgProject3Cover1 = 'assets/images/project3/prj-3-cover1.png';
// const imgProject3Cover2 = 'assets/images/project3/prj-3-cover2.png';
const imgProject3Doc1 = 'assets/images/project3/prj-3-doc1.png';
const imgProject3Doc2 = 'assets/images/project3/prj-3-doc2.png';
const imgProject3Doc3 = 'assets/images/project3/prj-3-doc3.png';
const imgProject3Result = 'assets/images/project3/prj-3-result.png';

const Project3 = () => {
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
                            <span className="text-[#e5a17b]">PROJECT 03</span>
                            <span className="text-white">{`  The Starlight Syntax`}</span>
                        </h1>

                        <h2 className="font-['Aboreto',sans-serif] text-3xl text-[#999] tracking-wide leading-snug mb-8">
                            <span>"</span>
                            <span className="text-[#80d691]">Translating</span>
                            <span> the silent dialect of </span>
                            <span className="text-[#80d691]">starlight</span>
                            <br />
                            <span>into the shared </span>
                            <span className="text-[#80d691]">syntax</span>
                            <span> of the world."</span>
                        </h2>

                        <p className="font-['Barlow',sans-serif] text-lg text-gray-200 max-w-2xl">
                            I chose to name this project <span className="italic">The Starlight Syntax</span> because it focuses on individuals with neurodiversity and has developed two branches: documentary and app, as well as service design.
                        </p>
                    </motion.div>

                    {/* 项目 01: 纪录片 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-20"
                    >
                        <div className="mb-8">
                            <h3 className="font-['Barlow',sans-serif] text-5xl font-bold text-[#999] mb-2">01</h3>
                            <h4 className="font-['Barlow',sans-serif] text-3xl font-bold text-white mb-4">
                                We are Different, We are All The Same
                            </h4>
                            <div className="text-gray-400 space-y-1">
                                <p>2023.12</p>
                                <p>Documentary / Video</p>
                            </div>
                        </div>

                        {/* 项目信息表格 */}
                        <div className="grid grid-cols-4 gap-8 mb-8">
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Role</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Volunteer Service</li>
                                    <li>Storyboard Planning</li>
                                    <li>Material Shooting</li>
                                    <li>Animation Drawing</li>
                                    <li>Editing</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Team</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Ruiyan Cheng</li>
                                    <li>Xinyue Gan</li>
                                    <li>Min Hu</li>
                                    <li>Zhiyi Fang</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Tools</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Camera</li>
                                    <li>Photoshop</li>
                                    <li>Premiere</li>
                                    <li>Audition</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Skills</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Documentary Design</li>
                                    <li>Animation Design</li>
                                    <li>Volunteer Service</li>
                                </ul>
                            </div>
                        </div>

                        {/* 封面图片 */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5">
                                <img src={imgProject3Cover1} alt="Documentary Cover 1" className="w-full h-auto" />
                            </div>
                            <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5 bg-gray-700/20 aspect-video flex items-center justify-center">
                                <span className="text-gray-400">Video Placeholder</span>
                            </div>
                        </div>

                        {/* 视频占位符 */}
                        <div className="w-full h-[500px] rounded-lg bg-gray-700/20 border border-white/10 flex items-center justify-center mb-8">
                            <p className="font-['Barlow',sans-serif] text-xl text-gray-400">
                                Documentary Placeholder
                            </p>
                        </div>

                        {/* 项目介绍 */}
                        <div className="space-y-6">
                            <h5 className="text-[#e5a17b] text-2xl font-semibold">Project Introduction</h5>
                            <p className="text-gray-400 leading-relaxed">
                                This 8-minute documentary short film, by closely documenting the real moments of children with neurodiversity in an art therapy class, aims to present their unique ways of connecting with the world from a straightforward perspective.
                            </p>
                            <p className="text-white leading-relaxed">
                                I gradually realized that to truly engage with a community, one must first learn to listen attentively to their language. This 8-minute documentary short film represents my team's efforts in mastering this. I captured <span className="font-bold">connection moments</span>—especially in a co-drawing healing experiment, where special needs children and volunteers' brushes intersected on paper, creating pure, language-free dialogue through colors and shapes. Light animations visualize these abstract relationships. It's about <span className="font-bold">a visual poem on commonality</span>, inviting viewers into their rich inner worlds. This became the foundation for my future design projects.
                            </p>
                            <p className="text-white">
                                As team leader, I was deeply involved in all aspects, from filming and editing to animation.
                            </p>
                        </div>

                        {/* 过程图片 */}
                        <div className="mt-12 space-y-8">
                            <h5 className="text-[#e5a17b] text-2xl font-semibold">Process</h5>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="rounded-lg overflow-hidden border border-white/10">
                                    <img src={imgProject3Doc1} alt="Process 1" className="w-full h-auto" />
                                </div>
                                <div className="rounded-lg overflow-hidden border border-white/10">
                                    <img src={imgProject3Doc2} alt="Process 2" className="w-full h-auto" />
                                </div>
                                <div className="rounded-lg overflow-hidden border border-white/10">
                                    <img src={imgProject3Doc3} alt="Process 3" className="w-full h-auto" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 项目 02: ELM 平台 */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-20"
                    >
                        <div className="mb-8">
                            <h3 className="font-['Barlow',sans-serif] text-5xl font-bold text-[#999] mb-2">02</h3>
                            <h4 className="font-['Barlow',sans-serif] text-3xl font-bold text-white mb-4">
                                ELM<br />
                                Employment Platform for Older Neurodiverse Individuals
                            </h4>
                            <div className="text-gray-400 space-y-1">
                                <p>2023.12 - 2024.12</p>
                                <p>Service Design, UI Design</p>
                                <p>Figma, App, Website, Vue/Flutter</p>
                            </div>
                        </div>

                        {/* 项目信息表格 */}
                        <div className="grid grid-cols-4 gap-8 mb-8">
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Role</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Pre-Planning</li>
                                    <li>Visual Design</li>
                                    <li>UI Design</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Team</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Cheng Ruiyan</li>
                                    <li>Zheng Han</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Tools</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>Figma</li>
                                    <li>Flutter Framework</li>
                                    <li>Spring Boot</li>
                                    <li>Spark Model (AI)</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[#80d691] text-xl font-semibold mb-3">Skills</h5>
                                <ul className="text-gray-400 space-y-1 text-sm">
                                    <li>App Design</li>
                                    <li>Service Design</li>
                                    <li>Project Management</li>
                                </ul>
                            </div>
                        </div>

                        {/* 动机 */}
                        <div className="space-y-6 mb-12">
                            <h5 className="text-[#e5a17b] text-2xl font-semibold">Motivation</h5>
                            <p className="text-white leading-relaxed">
                                This project focuses on bridging <span className="font-bold">the employment gap for adults with diverse special needs</span>. By <span className="font-bold">integrating AI technology with inclusive UI/UX design</span>, we have created a digital ecosystem designed to connect their unique talents with the right career opportunities.
                            </p>
                            <p className="text-white leading-relaxed">
                                Through my experience with documentary filming and conversations with the head of the Fujian SuiXin Charity organization, I discovered the significant challenges faced by individuals with special needs in finding employment as they grow older. Many of them possess <span className="font-bold">unique talents</span>, such as the ability to sense and express their experiences in the womb, or an extraordinary interest and deep understanding of certain fields, like plants. However, due to physical limitations, they are often <span className="font-bold">rejected by employers</span>, resulting in <span className="font-bold">their potential being left untapped</span>. Inspired by these insights, I founded <span className="font-bold">the ELM platform</span> with the aim of helping neurodiverse adults fully realize their abilities and talents, ensuring they have opportunities for career development.
                            </p>
                        </div>

                        {/* 问题 */}
                        <div className="space-y-6 mb-12">
                            <h5 className="text-[#80d691] text-2xl font-semibold">Problem</h5>
                            <p className="text-white leading-relaxed">
                                We believe that every individual with special needs <span className="font-bold">possesses unique talents and focus</span>, such as sensitivity to numbers and a strong sense of order.
                            </p>
                            <p className="text-white leading-relaxed">
                                We aim to <span className="font-bold">uncover these potentials</span> and <span className="font-bold">help each person realize their unique abilities</span>.
                            </p>
                            <p className="text-white leading-relaxed">
                                We seek to fill the gaps in the market and policies, shifting from <span className="font-bold">traditional care</span> to <span className="font-bold">empowerment</span>, and assist them in transitioning from being a <span className="font-bold">family burden</span> to <span className="font-bold">a creator of social value</span>.
                            </p>
                        </div>

                        {/* 最终成果 */}
                        <div className="space-y-6">
                            <h5 className="text-[#80d691] text-2xl font-semibold">Final App & Result</h5>
                            <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-white/5">
                                <img src={imgProject3Result} alt="ELM App Result" className="w-full h-auto" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Project3;
