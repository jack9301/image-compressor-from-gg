
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Heart, ShieldCheck, Sparkles, Coffee, Smile, Lock } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const AboutUs: React.FC<Props> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-12 pb-24 px-4"
    >
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to the Workspace
      </button>

      <div className="glass p-8 md:p-16 rounded-[3rem] border border-white/10 space-y-16 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none rounded-full -ml-32 -mb-32" />

        <header className="space-y-6 text-center relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Zap className="w-12 h-12 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            From one creator <br />
            <span className="text-gradient">to another.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Hey there! We built ImageHero because we were tired of the "modern web"—you know, the part with the ads, the tracking, and the slow uploads.
          </p>
        </header>

        <section className="space-y-12 relative z-10">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Smile className="w-8 h-8 text-yellow-400" />
              Think of us as your old friend.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              You know that friend who always has the right tool in their garage? That's what we want to be for your digital workflow. ImageHero isn't a big corporation; it's a labor of love designed to make your life a little easier, one pixel at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureNote 
              icon={<Lock className="w-5 h-5 text-green-400" />}
              title="Privacy is our Promise"
              text="Your images never, ever leave your device. We use 'Edge AI' processing, meaning everything happens right here in your browser. No server uploads, no prying eyes."
            />
            <FeatureNote 
              icon={<Zap className="w-5 h-5 text-indigo-400" />}
              title="Built for Speed"
              text="We optimized the functions so you don't have to wait. Batch resize, convert, and compress hundreds of photos in seconds. Your time is precious."
            />
            <FeatureNote 
              icon={<Sparkles className="w-5 h-5 text-purple-400" />}
              title="No Watermarks, Ever"
              text="It's your work, and you should be proud of it. We provide clean, professional exports with zero watermarks—just the way it should be."
            />
            <FeatureNote 
              icon={<Heart className="w-5 h-5 text-red-400" />}
              title="Free Forever"
              text="No subscriptions, no hidden fees, and no 'Pro' plans. Enjoy unlimited free downloads. If you like it, just tell a friend—that's payment enough for us."
            />
          </div>
        </section>

        <div className="pt-12 border-t border-white/5 space-y-8 text-center relative z-10">
          <h3 className="text-2xl font-bold text-white">Why did we do this?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Because we believe the best tools should be simple, fast, and respectful. We spent months tweaking the compression algorithms to ensure you get the smallest file sizes with the highest possible quality.
          </p>
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50" />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-300">Hand-crafted by the ImageHero Team</p>
          </div>
        </div>

        <footer className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <Coffee className="w-4 h-4 text-orange-400" />
            Made with love and a lot of caffeine
          </div>
          <p className="text-slate-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} ImageHero. Stay creative!
          </p>
        </footer>
      </div>
    </motion.div>
  );
};

const FeatureNote: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="font-bold text-white">{title}</h4>
    </div>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">
      {text}
    </p>
  </div>
);

export default AboutUs;
