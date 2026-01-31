
import React from 'react';
import { Zap, ChevronDown, Globe } from 'lucide-react';
import { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          {/* Left Block: Logo & Intro */}
          <div className="space-y-8 max-w-md">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-2xl shadow-indigo-600/20 border-2 border-white/10">
                <Zap className="w-7 h-7 text-white" fill="currentColor" />
              </div>
              <span className="text-3xl font-black tracking-tighter">ImageHero</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg font-medium">
              A private, high-speed image optimization suite designed for developers and designers. Our edge-computing approach ensures your files never leave your device while delivering professional-grade results instantly.
            </p>
          </div>

          {/* Right Block: Menu - Mirrored from Header */}
          <div className="flex lg:justify-end">
            <div className="grid grid-cols-2 gap-12 sm:gap-24">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Image Suite</h4>
                <nav className="flex flex-col gap-4">
                  <FooterLink onClick={() => onNavigate('compress')} label="Compress" />
                  <FooterLink onClick={() => onNavigate('resize')} label="Resize" />
                  <FooterLink onClick={() => onNavigate('convert')} label="Convert" />
                  <FooterLink onClick={() => onNavigate('home')} label="Tools Home" />
                </nav>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Support</h4>
                <nav className="flex flex-col gap-4">
                  <FooterLink onClick={() => onNavigate('about')} label="About Us" />
                  <FooterLink onClick={() => onNavigate('privacy')} label="Privacy" />
                  <FooterLink onClick={() => onNavigate('terms')} label="Terms" />
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[13px] font-bold text-slate-500 uppercase tracking-widest">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Use</button>
          </nav>

          <div className="flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all">
                <Globe className="w-4 h-4 text-indigo-400" />
                English (US)
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform opacity-50" />
              </button>
              {/* Language Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                 <div className="glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/20 whitespace-nowrap shadow-2xl">
                   Global Default
                 </div>
              </div>
            </div>
            
            <div className="text-[11px] text-slate-600 font-black uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} IMAGEHERO 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button 
    onClick={onClick} 
    className="text-slate-400 hover:text-white font-bold transition-all text-left text-base decoration-indigo-500/0 hover:decoration-indigo-500/100 underline underline-offset-4"
  >
    {label}
  </button>
);

export default Footer;
