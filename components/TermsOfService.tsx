
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, ShieldAlert, Cpu, Gavel } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const TermsOfService: React.FC<Props> = ({ onBack }) => {
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
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-slate-400">Effective Date: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Cpu className="w-6 h-6 text-indigo-400" />
            1. Description of Service
          </h2>
          <p className="text-slate-400 leading-relaxed">
            ImageHero provides a browser-based utility for compressing, converting, and resizing images. By using this service, you acknowledge that all computations are performed locally on your device ("client-side"). We do not provide cloud storage or server-side processing.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-indigo-400" />
            2. Intellectual Property
          </h2>
          <p className="text-slate-400 leading-relaxed">
            You retain 100% ownership and all rights to any images you process through ImageHero. We do not claim any rights to your files, nor do we ever see, store, or transmit your files to any third party or our own servers.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Gavel className="w-6 h-6 text-indigo-400" />
            3. Disclaimer of Warranty
          </h2>
          <p className="text-slate-400 leading-relaxed">
            The service is provided "as is" and "as available" without any warranties of any kind. While we strive for high-quality output, we are not responsible for any data loss, image corruption, or hardware performance issues arising from the use of this tool.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. Prohibited Usage</h2>
          <p className="text-slate-400 leading-relaxed">
            You agree not to attempt to reverse-engineer the application or use it in any manner that could damage, disable, or overburden our infrastructure (such as automated botting).
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
          <p className="text-slate-400 leading-relaxed">
            In no event shall ImageHero or its developers be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
          </p>
        </section>

        <footer className="pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            We reserve the right to update these terms at any time. Your continued use of the service constitutes acceptance of any changes.
          </p>
        </footer>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
