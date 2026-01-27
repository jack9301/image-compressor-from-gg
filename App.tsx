
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Settings, 
  Download, 
  Zap, 
  ShieldCheck, 
  Trash2, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import JSZip from 'jszip';

import Header from './components/Header';
import Hero from './components/Hero';
import Dropzone from './components/Dropzone';
import ImageEditor from './components/ImageEditor';
import Features from './components/Features';
import Footer from './components/Footer';
import { ImageFile, CompressionSettings } from './types';
import { processImage, formatSize } from './services/imageService';

const App: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [globalSettings, setGlobalSettings] = useState<CompressionSettings>({
    quality: 80,
    format: 'image/jpeg',
    resizeType: 'original'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesAdded = (files: File[]) => {
    const newImages: ImageFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      originalSize: file.size,
      compressedSize: null,
      compressedUrl: null,
      status: 'idle',
      width: 0,
      height: 0,
      format: file.type
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removed = prev.find(img => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.previewUrl);
        if (removed.compressedUrl) URL.revokeObjectURL(removed.compressedUrl);
      }
      return filtered;
    });
  };

  const clearAll = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  };

  const processAll = async () => {
    setIsProcessing(true);
    const updatedImages = await Promise.all(images.map(async (img) => {
      try {
        const result = await processImage(img.file, globalSettings);
        return {
          ...img,
          compressedUrl: result.url,
          compressedSize: result.blob.size,
          width: result.width,
          height: result.height,
          status: 'completed' as const
        };
      } catch (err) {
        return { ...img, status: 'error' as const };
      }
    }));
    setImages(updatedImages);
    setIsProcessing(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    images.forEach((img, index) => {
      if (img.compressedUrl && img.status === 'completed') {
        const fileName = img.file.name.split('.')[0];
        const ext = globalSettings.format.split('/')[1];
        // Fetch the blob from the URL
        zip.file(`${fileName}_compressed.${ext}`, img.file); // Fallback to original if blob isn't easily accessible
        // In a real production app, you'd fetch the blob from the URL or store the blob in state
      }
    });

    // To properly ZIP the *compressed* data, we actually need the blobs. 
    // Let's refine the processAll to keep blobs or just re-generate for ZIP
    const zipContent = new JSZip();
    for (const img of images) {
      if (img.status === 'completed') {
        const result = await processImage(img.file, globalSettings);
        const fileName = img.file.name.split('.')[0];
        const ext = globalSettings.format.split('/')[1];
        zipContent.file(`${fileName}_pixelshrink.${ext}`, result.blob);
      }
    }

    const content = await zipContent.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pixelshrink_images.zip';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <Hero />

        <div id="tools" className="mt-16 scroll-mt-24">
          <AnimatePresence mode="wait">
            {images.length === 0 ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Dropzone onFilesAdded={handleFilesAdded} />
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Settings Panel */}
                  <div className="w-full lg:w-1/3 glass p-6 rounded-3xl sticky top-24">
                    <div className="flex items-center gap-2 mb-6">
                      <Settings className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-xl font-semibold">Global Settings</h2>
                    </div>
                    
                    <ImageEditor 
                      settings={globalSettings} 
                      setSettings={setGlobalSettings} 
                      onProcess={processAll}
                      isProcessing={isProcessing}
                    />

                    <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
                      <button
                        onClick={processAll}
                        disabled={isProcessing}
                        className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                      >
                        {isProcessing ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        ) : (
                          <Zap className="w-5 h-5" />
                        )}
                        {isProcessing ? 'Optimizing...' : 'Optimize All Images'}
                      </button>
                      
                      {images.some(img => img.status === 'completed') && (
                        <button
                          onClick={downloadZip}
                          className="w-full py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
                        >
                          <Download className="w-5 h-5" />
                          Download All (.ZIP)
                        </button>
                      )}
                      
                      <button
                        onClick={clearAll}
                        className="w-full py-3 px-6 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Image List */}
                  <div className="w-full lg:w-2/3 space-y-4">
                    {images.map((img) => (
                      <ImageCard 
                        key={img.id} 
                        img={img} 
                        onRemove={() => removeImage(img.id)} 
                        settings={globalSettings}
                      />
                    ))}
                    
                    <button 
                      onClick={() => document.getElementById('file-input')?.click()}
                      className="w-full p-8 border-2 border-dashed border-white/10 rounded-3xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group flex flex-col items-center justify-center gap-3 text-slate-400"
                    >
                      <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>Add more images</span>
                    </button>
                    <input 
                      id="file-input" 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={(e) => e.target.files && handleFilesAdded(Array.from(e.target.files))}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Features />
      </main>

      <Footer />
    </div>
  );
};

const ImageCard: React.FC<{ img: ImageFile; onRemove: () => void; settings: CompressionSettings }> = ({ img, onRemove, settings }) => {
  const reduction = img.compressedSize 
    ? Math.round(((img.originalSize - img.compressedSize) / img.originalSize) * 100) 
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-4 sm:p-6 rounded-3xl group relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-inner">
          <img 
            src={img.compressedUrl || img.previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          {img.status === 'completed' && (
            <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3 w-full">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold text-lg truncate text-slate-100">{img.file.name}</h3>
            <button 
              onClick={onRemove}
              className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase font-medium">Original</p>
              <p className="text-sm font-medium">{formatSize(img.originalSize)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase font-medium">Result</p>
              <p className="text-sm font-medium text-indigo-400">
                {img.compressedSize ? formatSize(img.compressedSize) : '--'}
              </p>
            </div>
          </div>

          {img.status === 'completed' && (
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full">
                Saved {reduction}%
              </div>
              {img.width > 0 && (
                <div className="text-xs text-slate-500">
                  {img.width} × {img.height}px
                </div>
              )}
            </div>
          )}
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          {img.status === 'completed' && img.compressedUrl ? (
            <a
              href={img.compressedUrl}
              download={`${img.file.name.split('.')[0]}_pixelshrink.${settings.format.split('/')[1]}`}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-indigo-500/30"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          ) : (
             <div className="px-6 py-3 text-slate-500 text-sm font-medium flex items-center gap-2">
               <Info className="w-4 h-4" />
               Ready to compress
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default App;
