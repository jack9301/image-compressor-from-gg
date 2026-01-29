
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Scissors, RefreshCcw, Layout, Heart } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="mt-32 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Everything you need just in one Place.</h2>
        <p className="text-slate-400 max-w-xl mx-auto">ImageHero combines professional-grade compression with modern utility features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<ShieldCheck className="w-6 h-6" />}
          title="Privacy First"
          desc="Your images never leave your computer. All processing is done locally in your browser context."
        />
        <FeatureCard 
          icon={<Zap className="w-6 h-6" />}
          title="Ultra Fast"
          desc="Powered by WebAssembly and Canvas API, get instant results even for large batches of images."
        />
        <FeatureCard 
          icon={<Scissors className="w-6 h-6" />}
          title="Smart Resize"
          desc="Social media presets and custom scaling options make resizing for any platform a breeze."
        />
        <FeatureCard 
          icon={<RefreshCcw className="w-6 h-6" />}
          title="Batch Convert"
          desc="Switch between PNG, JPG, and WebP instantly. Save time by converting multiple files at once."
        />
        <FeatureCard 
          icon={<Layout className="w-6 h-6" />}
          title="Zip Export"
          desc="Download your optimized collection as a single, organized ZIP file with one click."
        />
        <FeatureCard 
          icon={<Heart className="w-6 h-6" />}
          title="Completely Free"
          desc="No signups, no watermarks, no limits. Just a powerful tool for your daily workflow."
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-[2rem] border border-white/5 space-y-4"
  >
    <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Features;
