
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-12 pb-24"
    >
      <button
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </button>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 space-y-12">
        <header className="space-y-4 border-b border-white/5 pb-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <EyeOff className="w-6 h-6 text-indigo-400" />
            1. Zero-Data Collection
          </h2>
          <p className="text-slate-400 leading-relaxed">
            ImageHero is built on a "Privacy First" philosophy. Unlike traditional online image compressors, <strong>we do not upload your images to any server</strong>. All image processing, compression, and resizing happens locally within your web browser using your device's hardware.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Lock className="w-6 h-6 text-indigo-400" />
            2. Local Processing
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Your images are processed using the browser's Canvas API. This means your files remain on your local machine at all times. We do not have access to your photos, metadata, or the results of your optimizations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">What we see:</h4>
              <p className="text-xs text-slate-500">Absolutely nothing. No file names, no image content, no location data.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="font-bold mb-2">What we store:</h4>
              <p className="text-xs text-slate-500">Nothing. No databases, no logs, no permanent records.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Database className="w-6 h-6 text-indigo-400" />
            3. Cookies & Analytics
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We use standard, anonymous analytics to understand how many people use our tool. This data is not linked to your identity or your files. We do not use tracking cookies for advertising or selling your data to third parties.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. Your Consent</h2>
          <p className="text-slate-400 leading-relaxed">
            By using ImageHero, you acknowledge that your data is processed locally. If you do not agree with this localized processing, please do not use the tool.
          </p>
        </section>

        <footer className="pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            If you have questions about our local processing architecture, please contact us via our support channels.
          </p>
        </footer>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
