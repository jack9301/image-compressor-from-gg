
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What file formats are supported by the image compressor?",
    answer: "ImageHero currently supports JPEG, PNG, and WebP formats. You can compress these files or convert between them instantly while maintaining the best possible visual fidelity."
  },
  {
    question: "Is there a file size limit to compress image?",
    answer: "There are no hard software limits for file sizes. Since all processing happens locally on your device, the only limit is your computer's memory (RAM). Most modern browsers can easily handle high-resolution images up to 50MB+."
  },
  {
    question: "Is my data secure with the image compressor?",
    answer: "Absolutely. Security is our core value. Unlike other online tools, ImageHero never uploads your images to a server. Everything happens right in your browser tab, meaning your private photos never leave your computer."
  },
  {
    question: "How does your image compressor work?",
    answer: "We use high-performance browser APIs and optimized encoding algorithms. When you drop an image, we use the HTML5 Canvas and advanced WebAssembly engines to re-render and re-encode the image at a lower byte-size without sacrificing perceptible quality."
  },
  {
    question: "Can I use the image compressor without internet?",
    answer: "Yes! Once you've loaded the ImageHero website, the entire application logic is stored in your browser. You can disconnect from the internet and continue to compress, resize, and convert images perfectly fine."
  },
  {
    question: "Is it free to compress image with ImageHero?",
    answer: "Yes, ImageHero is 100% free. No hidden fees, no 'Pro' subscriptions, no watermarks, and no sign-ups required. We built this as a gift to the creative community."
  }
];

const FAQ: React.FC = () => {
  return (
    <div className="mt-32 space-y-16 max-w-4xl mx-auto px-4">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
          <HelpCircle className="w-3 h-3" />
          Common Questions
        </div>
        <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-slate-400">Everything you need to know about how ImageHero protects and processes your media.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

const AccordionItem: React.FC<{ faq: FAQItem }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`glass rounded-3xl border border-white/5 transition-all duration-300 ${isOpen ? 'bg-white/[0.05] border-white/10' : 'hover:border-white/10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 sm:p-8 text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-indigo-400' : 'text-slate-200 group-hover:text-white'}`}>
          {faq.question}
        </span>
        <div className={`shrink-0 ml-4 p-2 rounded-xl transition-all ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-white/5 text-slate-500 group-hover:bg-white/10'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 sm:px-8 sm:pb-10 text-slate-400 leading-relaxed font-medium">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
