
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="text-center space-y-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-indigo-400 text-sm font-medium mb-4"
      >
        <ShieldCheck className="w-4 h-4" />
        100% Private Client-Side Optimization
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight"
      >
        Free Online <br />
        <span className="text-gradient">Image Compressor.</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto text-lg text-slate-400 font-medium"
      >
        Optimized, high-speed, and secure. Resize, convert and compress images without server uploads. 100% private processing happens instantly in your browser.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-8 pt-8"
      >
        <HeroFeature icon={<Zap aria-hidden="true" />} text="Lightning Fast" />
        <HeroFeature icon={<Globe aria-hidden="true" />} text="No Upload Required" />
        <HeroFeature icon={<Cpu aria-hidden="true" />} text="Browser-Only Engine" />
      </motion.div>
    </div>
  );
};

const HeroFeature: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-slate-500 font-medium">
    <span className="text-indigo-400">{icon}</span>
    {text}
  </div>
);

export default Hero;
