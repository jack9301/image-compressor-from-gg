
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  X, 
  User, 
  Image as ImageIcon,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Feedback } from '../types';

const FeedbackSection: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load mock feedbacks or from "storage"
  useEffect(() => {
    const saved = localStorage.getItem('imagehero_feedbacks');
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    } else {
      // Seed initial mock data
      const initial: Feedback[] = [
        {
          id: '1',
          topic: 'Feature Request',
          content: 'I would love to see bulk renaming features added to the download step!',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          userName: 'CreativeDirector'
        },
        {
          id: '2',
          topic: 'General Feedback',
          content: 'The speed of this tool is insane. Totally replaced my Photoshop workflow for quick web exports.',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          userName: 'WebDevHero'
        }
      ];
      setFeedbacks(initial);
      localStorage.setItem('imagehero_feedbacks', JSON.stringify(initial));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setAttachment(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !content) return;

    setIsSubmitting(true);
    
    // Simulate Supabase logic:
    // 1. Upload to storage: const { data } = await supabase.storage.from('feedback').upload(path, attachment)
    // 2. Save to DB: await supabase.from('feedbacks').insert({ topic: 'Community Feedback', content, attachment_url: data.path, user_name: nickname })
    
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: Math.random().toString(36).substr(2, 9),
        topic: 'Feedback',
        content,
        attachmentUrl: previewUrl || undefined,
        createdAt: new Date().toISOString(),
        userName: nickname
      };

      const updated = [newFeedback, ...feedbacks];
      setFeedbacks(updated);
      localStorage.setItem('imagehero_feedbacks', JSON.stringify(updated));
      
      setNickname('');
      setContent('');
      setAttachment(null);
      setPreviewUrl(null);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section className="py-24 space-y-16 border-t border-black/5 dark:border-white/5 mt-20">
      <div className="text-center space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
          <MessageSquare className="w-3 h-3" />
          Community Hub
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">Help us improve <span className="text-gradient">ImageHero</span></h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">Found a bug? Have a feature request? Share it with the community below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Feedback Form */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            layout
            className="glass p-8 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-16 h-16 text-indigo-500" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Your Nickname</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. PixelWizard, TechieJane..."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Detailed Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us more about your experience..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-6 py-4 font-medium outline-none focus:border-indigo-500 transition-all dark:text-white resize-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Attachments</label>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-1.5"
                  >
                    <Paperclip className="w-3 h-3" />
                    Attach Screenshot
                  </button>
                </div>
                
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <AnimatePresence>
                  {previewUrl ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative w-full aspect-video rounded-2xl overflow-hidden group border border-black/10 dark:border-white/10"
                    >
                      <img src={previewUrl} className="w-full h-full object-cover" alt="Attachment Preview" />
                      <button 
                        type="button"
                        onClick={removeAttachment}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all text-slate-400"
                    >
                      <ImageIcon className="w-6 h-6 opacity-50" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Images only (Max 5MB)</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                  showSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20'
                } disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : showSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Submitted!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Feedback Feed */}
        <div className="lg:col-span-7 space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
           <div className="flex items-center justify-between px-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Community Feed ({feedbacks.length})</span>
           </div>

           <div className="space-y-4">
             <AnimatePresence initial={false}>
               {feedbacks.map((item, idx) => (
                 <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass p-6 rounded-[1.5rem] border border-black/5 dark:border-white/5 space-y-4 group"
                 >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-indigo-500 border border-black/5 dark:border-white/10">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold dark:text-white">{item.userName || 'Anonymous User'}</div>
                          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-600">
                            {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {item.topic}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {item.content}
                    </p>

                    {item.attachmentUrl && (
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
                         <img src={item.attachmentUrl} className="w-full h-full object-cover" alt="User Attachment" />
                      </div>
                    )}
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
