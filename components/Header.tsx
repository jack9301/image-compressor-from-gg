
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layout, Scissors, RefreshCcw, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full px-6 py-3 flex items-center gap-8 border border-white/10 shadow-2xl"
      >
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">PixelShrink</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <HeaderLink icon={<Scissors className="w-4 h-4" />} label="Resize" href="#tools" />
          <HeaderLink icon={<Zap className="w-4 h-4" />} label="Compress" href="#tools" />
          <HeaderLink icon={<RefreshCcw className="w-4 h-4" />} label="Convert" href="#tools" />
        </div>

        <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

        <a 
          href="#" 
          className="p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
      </motion.div>
    </nav>
  );
};

const HeaderLink: React.FC<{ icon: React.ReactNode; label: string; href: string }> = ({ icon, label, href }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
  >
    {icon}
    {label}
  </a>
);

export default Header;
