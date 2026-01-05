import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Banner = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const links = [
        { path: '/about', label: 'About' },
        { path: '/', label: 'Projects' } // Home acts as projects for now, or we scroll
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center"
            style={{ background: 'transparent' }}
        >
            <Link to="/" className="text-xl font-display font-bold tracking-wider text-white hover:text-cyber-cyan transition-colors duration-300">
                HU ZHEWEN
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`font-sans text-sm tracking-widest uppercase hover:text-cyber-cyan transition-colors duration-300 ${location.pathname === link.path ? 'text-cyber-cyan text-glow' : 'text-gray-400'}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-white hover:text-cyber-cyan"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Nav */}
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="absolute top-full left-0 right-0 bg-cyber-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden md:hidden"
            >
                <div className="flex flex-col p-6 gap-4">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`font-display text-lg tracking-wider ${location.pathname === link.path ? 'text-cyber-cyan' : 'text-gray-400'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.header>
    );
};
