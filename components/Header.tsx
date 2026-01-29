
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Scissors, 
  RefreshCcw, 
  Wrench, 
  Shrink, 
  ChevronDown, 
  FileImage, 
  FileDigit, 
  FileMinus 
} from 'lucide-react';
import { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
  activePage: Page;
}

const Header: React.FC<Props> = ({ onNavigate, activePage }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const isToolActive = ['pdf-to-jpg', 'jpg-to-pdf', 'compress-pdf', 'home'].includes(activePage);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-full px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-8 border border-white/10 shadow-2xl relative"
      >
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden lg:block">ImageHero</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
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
          
          <div 
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <HeaderLink 
              icon={<Wrench className="w-4 h-4" />} 
              label="Tools" 
              active={isToolActive}
              onClick={() => onNavigate('home')} 
              hasSubmenu
            />
            
            <AnimatePresence>
              {isToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 glass rounded-[1.5rem] overflow-hidden p-2 shadow-2xl border border-white/10"
                >
                  <SubmenuLink 
                    icon={<FileImage className="w-4 h-4" />} 
                    label="PDF to JPG" 
                    onClick={() => { onNavigate('pdf-to-jpg'); setIsToolsOpen(false); }} 
                  />
                  <SubmenuLink 
                    icon={<FileDigit className="w-4 h-4" />} 
                    label="JPG to PDF" 
                    onClick={() => { onNavigate('jpg-to-pdf'); setIsToolsOpen(false); }} 
                  />
                  <SubmenuLink 
                    icon={<FileMinus className="w-4 h-4" />} 
                    label="Compress PDF" 
                    onClick={() => { onNavigate('compress-pdf'); setIsToolsOpen(false); }} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

const HeaderLink: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
  hasSubmenu?: boolean 
}> = ({ icon, label, active, onClick, hasSubmenu }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 text-xs sm:text-sm font-medium transition-all px-2 sm:px-4 py-2 rounded-full group ${
      active 
      ? 'bg-indigo-600/10 text-indigo-400' 
      : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-200'}>{icon}</span>
    <span className="hidden sm:inline">{label}</span>
    {hasSubmenu && <ChevronDown className={`w-3 h-3 transition-transform group-hover:translate-y-0.5 ${active ? 'text-indigo-400' : 'text-slate-600'}`} />}
  </button>
);

const SubmenuLink: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void 
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-indigo-600/20 transition-all text-left"
  >
    <span className="text-indigo-400">{icon}</span>
    {label}
  </button>
);

export default Header;
