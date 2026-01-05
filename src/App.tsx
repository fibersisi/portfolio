import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Banner } from './components/ui/Banner';

// Lazy loading pages
const Home = React.lazy(() => import('./pages/Home'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Project1 = React.lazy(() => import('./pages/Project1'));
const Project2 = React.lazy(() => import('./pages/Project2'));
const Project3 = React.lazy(() => import('./pages/Project3'));
const Project4 = React.lazy(() => import('./pages/Project4'));
const Project5 = React.lazy(() => import('./pages/Project5'));
const Project6 = React.lazy(() => import('./pages/Project6'));
const About = React.lazy(() => import('./pages/About'));

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/project1" element={<Project1 />} />
                <Route path="/project2" element={<Project2 />} />
                <Route path="/project3" element={<Project3 />} />
                <Route path="/project4" element={<Project4 />} />
                <Route path="/project5" element={<Project5 />} />
                <Route path="/project6" element={<Project6 />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </AnimatePresence>
    );
};

const LoadingScreen = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-cyber-dark text-cyber-cyan font-display">
        <div className="text-xl animate-pulse">INITIALIZING SYSTEM...</div>
    </div>
);

export default function App() {
    return (
        <HashRouter>
            <div className="relative min-h-screen w-full bg-cyber-dark text-white selection:bg-cyber-magenta selection:text-white">
                <Banner />
                <Suspense fallback={<LoadingScreen />}>
                    <AnimatedRoutes />
                </Suspense>
            </div>
        </HashRouter>
    );
}
