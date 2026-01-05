import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TechBackground } from '../components/canvas/TechBackground';

// Placeholder data - normally from a data store or API
const PROJECTS = {
    'a1': { title: 'Six Bodies, Awaiting the Flame', description: 'A deep dive into generative art using GANs to create non-existent terrains. This project explores the intersection of machine learning and traditional cartography.', category: 'Artist', year: '2024' },
    'a2': { title: 'Pixelated Scroll for the Afterlife', description: 'Interactive sound installation that reacts to viewer presence. Using ultrasonic sensors and max/msp, the void speaks back to those who stare into it.', category: 'Artist', year: '2023' },
    'a3': { title: 'The Starlight Syntax', description: 'Procedural plant generation using fractal algorithms and L-systems to create infinite variations of botanical life.', category: 'Artist', year: '2024' },
    'a4': { title: 'Memory Fragments', description: 'A VR storytelling experience that reconstructs memories through spatial audio and point cloud data.', category: 'Artist', year: '2023' },
    'd1': { title: 'Neobank App', description: 'A complete redesign of a mobile banking experience focusing on transparency and ease of use. The UI utilizes glassmorphism and bold typography to establish trust.', category: 'Designer', year: '2024' },
    'd2': { title: 'Smart Home Hub', description: 'IoT dashboard allowing users to control their entire home from a single interface. Focus on accessibility and dark mode optimization.', category: 'Designer', year: '2023' },
    'd3': { title: 'EcoTrack', description: 'A platform for tracking personal carbon footprint with data visualization and gamification elements.', category: 'Designer', year: '2024' },
    'd4': { title: 'HealthSync', description: 'Patient portal design focused on simplifying complex medical data for elderly users.', category: 'Designer', year: '2023' },
};

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const project = PROJECTS[id as keyof typeof PROJECTS];

    if (!project) {
        return <div className="text-center mt-20 text-white font-display">Project Not Found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full pt-24 px-6 md:px-20"
        >
            <TechBackground />

            <div className="relative z-10 max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-cyber-cyan hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back 
                </Link>

                <header className="mb-12">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-cyan mb-4"
                    >
                        {project.title}
                    </motion.h1>
                    <div className="flex gap-4 text-sm font-sans tracking-widest text-gray-400 uppercase">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                    </div>
                </header>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-2 gap-12"
                >
                    {/* Main Content */}
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-200">
                            {project.description}
                        </p>
                        <p className="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Media Placeholder */}
                    <div className="bg-white/5 border border-white/10 rounded-xl aspect-video flex items-center justify-center">
                        <span className="text-cyber-glass text-sm">Project Media Placeholder</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
