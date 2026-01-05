import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechBackground } from '../components/canvas/TechBackground';
import { CVEntry, ResearchArea } from '../types';

const imgPortrait1 = '/assets/images/about/author-0.jpg';
const imgPortrait2 = '/assets/images/about/author-2.jpg';

const RESEARCH_AREAS: ResearchArea[] = [
    { title: 'Generative Design', description: 'exploring algorithms for form finding' },
    { title: 'Human-Computer Interaction', description: 'reimagining digital interfaces through spatial computing' },
    { title: 'Creative Coding', description: 'bridging the gap between logic and aesthetics' },
];

const EXPERIENCE: CVEntry[] = [
    { year: '2024-Present', title: 'Creative Technologist', organization: ' Lab', description: 'Leading R&D for immersive installations.' },
    { year: '2022-2024', title: 'Interaction Designer', organization: ' Studio', description: 'Designed UI/UX for next-gen fintech apps.' },
];

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={containerVariants}
            className="relative min-h-screen w-full pt-20 px-6 md:px-20 overflow-y-auto"
        >
            <TechBackground />

            <div className="relative z-10 max-w-6xl mx-auto pb-20">
                <div className="grid md:grid-cols-12 gap-12">

                    {/* Left Column: Info */}
                    <div className="md:col-span-7 space-y-12">
                        <Link to="/" className="inline-flex items-center text-cyber-cyan hover:text-white transition-colors group">
                            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Home
                        </Link>

                        <motion.section variants={itemVariants}>
                            <h1 className="text-6xl font-display font-bold mb-6">Hu Zhewen</h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                                I believe that great design is not just about aesthetics—it's about creating experiences 
                                that feel alive, responsive, and intuitive. Every project is an opportunity to push boundaries 
                                and explore new frontiers in digital creativity.
                            </p>
                        </motion.section>

                        <motion.section variants={itemVariants}>
                            <h2 className="text-2xl font-display text-cyber-cyan mb-6 border-b border-cyber-cyan/30 pb-2">Research Areas</h2>
                            <div className="grid gap-4">
                                {RESEARCH_AREAS.map((area, idx) => (
                                    <div key={idx} className="glass-panel p-4 rounded-lg hover:border-cyber-cyan/50 transition-colors">
                                        <h3 className="text-lg font-bold text-white">{area.title}</h3>
                                        <p className="text-sm text-gray-400 capitalize">{area.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section variants={itemVariants}>
                            <h2 className="text-2xl font-display text-cyber-cyan mb-6 border-b border-cyber-cyan/30 pb-2">Experience</h2>
                            <div className="space-y-6">
                                {EXPERIENCE.map((job, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-8">
                                        <span className="font-mono text-gray-500 w-32 shrink-0">{job.year}</span>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                            <div className="text-cyber-magenta text-sm mb-1">{job.organization}</div>
                                            <p className="text-gray-400 text-sm">{job.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Right Column: Portrait */}
                    <div className="md:col-span-5 flex flex-col items-center">
                        <motion.div
                            variants={itemVariants}
                            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            transition={{ duration: 0.5, delay: 1 * 0.2 }}
                            whileHover={{ scale: 1.05, rotateY: 5, transition: { duration: 0.5 } }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            {/* Portrait Placeholder */}
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                <img 
                                src={imgPortrait1} 
                                alt="Portrait" 
                                className="w-full h-auto object-cover"
                            />
                            </div>
                            <div className="absolute bottom-6 left-6 z-20">
                                <div className="font-display text-xl">Hu Zhewen</div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8 grid grid-cols-2 gap-4 w-full">
                            <a href="mailto:fibergy55@outlook.com" className="p-4 glass-panel rounded-lg text-center hover:bg-white/5 transition-colors">Email</a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default About;
