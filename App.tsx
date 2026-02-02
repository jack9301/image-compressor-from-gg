
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Settings, 
  Download, 
  Zap, 
  Trash2, 
  CheckCircle2,
  Info,
  Clock,
  Maximize,
  Eye,
  X
} from 'lucide-react';
import JSZip from 'jszip';

import Header from './components/Header';
import Hero from './components/Hero';
import Dropzone from './components/Dropzone';
import ImageEditor from './components/ImageEditor';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AboutUs from './components/AboutUs';
import { ImageFile, CompressionSettings } from './types';
import { processImage, formatSize } from './services/imageService';

export type Page = 'home' | 'compress' | 'resize' | 'convert' | 'about' | 'privacy' | 'terms' | 'pdf-to-jpg' | 'jpg-to-pdf' | 'compress-pdf';

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [globalSettings, setGlobalSettings] = useState<CompressionSettings>({
    quality: 80,
    format: 'image/jpeg',
    resizeType: 'original',
    applyCompression: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // SEO: Update page meta based on current tool
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    
    switch(currentPage) {
      case 'compress':
        document.title = "Compress Image Online - Reduce File Size without Quality Loss | ImageHero";
        metaDesc?.setAttribute('content', 'Use our fast image compressor to shrink JPEG, PNG, and WebP files. Professional-grade compression with total privacy.');
        setGlobalSettings(prev => ({ ...prev, resizeType: 'original', quality: 60, applyCompression: true }));
        break;
      case 'resize':
        document.title = "Resize Image Online - Batch Image Resizer & Scaler | ImageHero";
        metaDesc?.setAttribute('content', 'Resize images to any dimensions or social media presets. High-quality scaling for Instagram, Facebook, and more.');
        setGlobalSettings(prev => ({ ...prev, resizeType: 'pixel', width: 1200, height: 800 }));
        break;
      case 'convert':
        document.title = "Convert Image Format - Fast PNG, JPG, WebP Converter | ImageHero";
        metaDesc?.setAttribute('content', 'Batch convert images between WebP, PNG, and JPEG instantly. All processing is local for 100% privacy.');
        setGlobalSettings(prev => ({ ...prev, resizeType: 'original', format: 'image/webp' }));
        break;
      case 'about':
        document.title = "About ImageHero - The Privacy-First Image Optimizer";
        break;
      default:
        document.title = "ImageHero | Free Online Image Compressor, Resizer & Converter";
        metaDesc?.setAttribute('content', 'Compress, resize, and convert images 100% privately in your browser. No server uploads. Fast, batch processing for JPEG, PNG, and WebP.');
    }
  }, [currentPage]);

  const handleFilesAdded = async (files: File[]) => {
    const newImages: ImageFile[] = await Promise.all(files.map(async (file) => {
      const dimensions = await getImageDimensions(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        originalSize: file.size,
        compressedSize: null,
        compressedUrl: null,
        status: 'idle',
        width: dimensions.width,
        height: dimensions.height,
        format: file.type
      };
    }));
    
    setImages(prev => [...prev, ...newImages]);
    
    if (currentPage === 'home' && files.length > 0) {
      setCurrentPage('compress');
    }
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
    const zipContent = new JSZip();
    for (const img of images) {
      if (img.status === 'completed') {
        const result = await processImage(img.file, globalSettings);
        const fileName = img.file.name.split('.')[0];
        const ext = globalSettings.format.split('/')[1];
        zipContent.file(`${fileName}_imagehero.${ext}`, result.blob);
      }
    }

    const content = await zipContent.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `imagehero_${currentPage}_images.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderToolView = (title: string, description: string) => (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-12"
    >
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-slate-400 text-lg">{description}</p>
      </div>

      <div id="tool-workspace" className="scroll-mt-24">
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
                <div className="w-full lg:w-1/3 glass p-6 rounded-[2rem] sticky top-24">
                  <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                    <Settings className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold">Tool Settings</h2>
                  </div>
                  
                  <ImageEditor 
                    settings={globalSettings} 
                    setSettings={setGlobalSettings} 
                    onProcess={processAll}
                    isProcessing={isProcessing}
                    mode={currentPage}
                  />

                  <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
                    <button
                      onClick={processAll}
                      disabled={isProcessing}
                      className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl shadow-indigo-600/20"
                    >
                      {isProcessing ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      ) : (
                        <Zap className="w-5 h-5" />
                      )}
                      {isProcessing ? 'Processing...' : `Apply to All`}
                    </button>
                    
                    {images.some(img => img.status === 'completed') && (
                      <button
                        onClick={downloadZip}
                        className="w-full py-4 px-6 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
                      >
                        <Download className="w-5 h-5" />
                        Download All
                      </button>
                    )}
                    
                    <button
                      onClick={clearAll}
                      className="w-full py-3 px-6 rounded-2xl text-slate-500 hover:text-red-400 font-medium transition-all flex items-center justify-center gap-2 group"
                    >
                      <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Clear Workspace
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 space-y-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                      Queue ({images.length} {images.length === 1 ? 'Image' : 'Images'})
                    </span>
                    <button 
                      onClick={clearAll}
                      className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-400/5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete All
                    </button>
                  </div>

                  <AnimatePresence>
                    {images.map((img) => (
                      <ImageCard 
                        key={img.id} 
                        img={img} 
                        onRemove={() => removeImage(img.id)} 
                        settings={globalSettings}
                        onPreview={(url) => setPreviewUrl(url)}
                      />
                    ))}
                  </AnimatePresence>
                  
                  <button 
                    onClick={() => document.getElementById('file-input')?.click()}
                    className="w-full p-12 border-2 border-dashed border-white/10 rounded-[2.5rem] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group flex flex-col items-center justify-center gap-3 text-slate-400"
                  >
                    <Upload className="w-8 h-8 group-hover:scale-110 transition-transform text-indigo-400" />
                    <span className="font-bold">Add more images to process</span>
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

      <AnimatePresence>
        {previewUrl && (
          <ImageLightbox url={previewUrl} onClose={() => setPreviewUrl(null)} />
        )}
      </AnimatePresence>

      <Features />
      <FAQ />
    </motion.div>
  );

  const renderPlaceholder = (title: string) => (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto py-24 text-center space-y-8"
    >
      <div className="w-24 h-24 bg-indigo-600/10 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-400">
        <Clock className="w-12 h-12" />
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-black">{title}</h1>
        <p className="text-slate-400 text-xl max-w-lg mx-auto leading-relaxed">
          We're currently fine-tuning our PDF engine to bring you the same lightning-fast, local-only performance you love. Stay tuned!
        </p>
      </div>
      <button 
        onClick={() => navigateTo('home')}
        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20"
      >
        Go back to Home
      </button>
    </motion.div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy key="privacy" onBack={() => navigateTo('home')} />;
      case 'terms':
        return <TermsOfService key="terms" onBack={() => navigateTo('home')} />;
      case 'about':
        return <AboutUs key="about" onBack={() => navigateTo('home')} />;
      case 'compress':
        return renderToolView("Image Compressor", "High-performance compression using optimized browser engines. Reduce size, keep quality.");
      case 'resize':
        return renderToolView("Image Resizer", "Precise pixel-perfect resizing. Scale by percentage, custom dimensions, or social presets.");
      case 'convert':
        return renderToolView("Image Converter", "Fast local conversion. Switch between WebP, PNG, and JPEG formats in batch.");
      case 'pdf-to-jpg':
        return renderPlaceholder("PDF to JPG");
      case 'jpg-to-pdf':
        return renderPlaceholder("JPG to PDF");
      case 'compress-pdf':
        return renderPlaceholder("Compress PDF");
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-16"
          >
            <Hero />
            <div id="tools" className="scroll-mt-24">
              <Dropzone onFilesAdded={handleFilesAdded} />
            </div>
            <Features />
            <FAQ />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header onNavigate={navigateTo} activePage={currentPage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

const ImageLightbox: React.FC<{ url: string; onClose: () => void }> = ({ url, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-slate-950/90 backdrop-blur-xl"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="relative max-w-full max-h-full glass rounded-[2.5rem] overflow-hidden shadow-2xl p-2 border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <img src={url} alt="Processed Image Preview" className="max-w-full max-h-[85vh] object-contain rounded-3xl block mx-auto" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
        Full Scale View
      </div>
    </motion.div>
  </motion.div>
);

const ImageCard: React.FC<{ 
  img: ImageFile; 
  onRemove: () => void; 
  settings: CompressionSettings;
  onPreview: (url: string) => void;
}> = ({ img, onRemove, settings, onPreview }) => {
  const reduction = img.compressedSize 
    ? Math.round(((img.originalSize - img.compressedSize) / img.originalSize) * 100) 
    : 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass p-4 sm:p-5 rounded-3xl group relative overflow-hidden border border-white/5"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-inner">
          <img 
            src={img.compressedUrl || img.previewUrl} 
            alt={`Preview of ${img.file.name}`} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          {img.status === 'completed' && (
            <div className="absolute top-2 right-2 p-1.5 bg-green-500 rounded-full shadow-lg border-2 border-slate-900">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3 w-full">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-lg truncate text-slate-100">{img.file.name}</h3>
            <button 
              onClick={onRemove}
              aria-label="Remove image"
              className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest">Original</p>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{formatSize(img.originalSize)}</p>
                <p className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <Maximize className="w-2.5 h-2.5" />
                  {img.width || '--'} × {img.height || '--'} px
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest">Processed</p>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-indigo-400">
                  {img.compressedSize ? formatSize(img.compressedSize) : '--'}
                </p>
                {img.status === 'completed' && (
                  <p className="text-[10px] font-bold text-indigo-400/60 flex items-center gap-1">
                    <Maximize className="w-2.5 h-2.5" />
                    {img.width} × {img.height} px
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {img.status === 'completed' && (
              <div className={`px-3 py-1 text-xs font-black rounded-full ${reduction > 0 ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'}`}>
                {reduction > 0 ? `-${reduction}% SIZE` : 'SAME SIZE'}
              </div>
            )}
            <div className={`px-2 py-1 text-[10px] font-black rounded-md bg-white/5 uppercase tracking-tighter ${img.status === 'idle' ? 'text-slate-500 animate-pulse' : 'text-slate-400'}`}>
              {img.status === 'idle' ? 'In Queue' : img.status === 'processing' ? 'Processing...' : 'Ready for export'}
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto flex flex-col gap-2">
          {img.status === 'completed' && img.compressedUrl ? (
            <>
              <button
                onClick={() => onPreview(img.compressedUrl!)}
                className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-indigo-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <a
                href={img.compressedUrl}
                download={`${img.file.name.split('.')[0]}_imagehero.${settings.format.split('/')[1]}`}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </>
          ) : (
             <div className="px-6 py-3 text-slate-500 text-sm font-bold flex items-center justify-center gap-2 border border-dashed border-white/10 rounded-xl">
               <Info className="w-4 h-4" />
               Pending
             </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default App;
