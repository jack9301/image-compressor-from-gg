
import React from 'react';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-indigo-500" fill="currentColor" />
          <span className="text-xl font-bold tracking-tight">PixelShrink</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          <a href="https://github.com" className="hover:text-white transition-colors">Open Source</a>
        </nav>

        <div className="flex gap-6">
          <SocialIcon icon={<Twitter className="w-5 h-5" />} />
          <SocialIcon icon={<Github className="w-5 h-5" />} />
          <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
        </div>

        <div className="text-xs text-slate-600 font-medium uppercase tracking-widest">
          &copy; {new Date().getFullYear()} PIXELSHRINK • CRAFTED WITH LOVE FOR THE WEB
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
    {icon}
  </a>
);

export default Footer;
