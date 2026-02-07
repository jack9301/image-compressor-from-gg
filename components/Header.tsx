
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Scissors, 
  RefreshCcw, 
  Shrink,
  Sun,
  Moon
} from 'lucide-react';
import { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
  activePage: Page;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<Props> = ({ onNavigate, activePage, theme, onToggleTheme }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full px-4 sm:px-6 py-2.5 flex items-center gap-3 sm:gap-6 shadow-2xl relative transition-theme"
      >
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden lg:block dark:text-white">ImageHero</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-4">
          <HeaderLink 
            icon={<Shrink className="w-4 h-4" />} 
            label="Compress" 
            active={activePage === 'compress'}
            onClick={() => onNavigate('compress')} 
          />
          <HeaderLink 
            icon={<Scissors className="w-4 h-4" />} 
            label="Resize" 
            active={activePage === 'resize'}
            onClick={() => onNavigate('resize')} 
          />
          <HeaderLink 
            icon={<RefreshCcw className="w-4 h-4" />} 
            label="Convert" 
            active={activePage === 'convert'}
            onClick={() => onNavigate('convert')} 
          />
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all group"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            {theme === 'dark' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </motion.div>
        </button>
      </motion.div>
    </nav>
  );
};

const HeaderLink: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
}> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 text-xs sm:text-sm font-medium transition-all px-2.5 sm:px-4 py-2 rounded-full group ${
      active 
      ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400' 
      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
    }`}
  >
    <span className={active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-200'}>
      {icon}
    </span>
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default Header;
