import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Files } from 'lucide-react';

interface Props {
  onFilesAdded: (files: File[]) => void;
}

const Dropzone: React.FC<Props> = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      // Fix: Explicitly cast Array.from(FileList) to File[] to ensure 'type' property is accessible
      onFilesAdded((Array.from(e.dataTransfer.files) as File[]).filter(f => f.type.startsWith('image/')));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Fix: Explicitly cast Array.from(FileList) to File[] to ensure 'type' property is accessible
      onFilesAdded((Array.from(e.target.files) as File[]).filter(f => f.type.startsWith('image/')));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer group overflow-hidden
          border-2 border-dashed rounded-[2.5rem] p-16
          transition-all duration-300
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
          }
        `}
      >
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-500/20 transform group-hover:-translate-y-2 transition-transform duration-300">
            <Upload className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Drop your images here</h3>
            <p className="text-slate-400">
              or click to browse from your computer <br />
              <span className="text-xs uppercase tracking-widest font-bold mt-2 inline-block text-indigo-400">supports PNG, JPG, WEBP</span>
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4">
             <span className="px-4 py-2 rounded-xl glass border border-white/5 flex items-center gap-2 text-sm">
                <Files className="w-4 h-4 text-indigo-400" />
                Multiple Files
             </span>
             <span className="px-4 py-2 rounded-xl glass border border-white/5 flex items-center gap-2 text-sm">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                Original Quality
             </span>
          </div>
        </div>

        <input 
          ref={inputRef} 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={handleChange}
        />

        {/* Animated Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none rounded-full" />
      </motion.div>
    </div>
  );
};

export default Dropzone;