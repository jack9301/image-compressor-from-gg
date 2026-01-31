
import React from 'react';
import { 
  Maximize2, 
  Layers, 
  Percent, 
  Instagram, 
  Facebook, 
  Twitter, 
  Monitor, 
  Youtube,
  Type,
  ChevronRight,
  ZapOff,
  Zap
} from 'lucide-react';
import { CompressionSettings, SocialPreset } from '../types';
import { SOCIAL_PRESETS, FORMAT_OPTIONS } from '../constants';

interface Props {
  settings: CompressionSettings;
  setSettings: (settings: CompressionSettings) => void;
  onProcess: () => void;
  isProcessing: boolean;
  mode: string;
}

const ImageEditor: React.FC<Props> = ({ settings, setSettings, mode }) => {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, quality: parseInt(e.target.value) });
  };

  const handleFormatChange = (format: string) => {
    setSettings({ ...settings, format });
  };

  const handleResizeType = (type: CompressionSettings['resizeType']) => {
    setSettings({ ...settings, resizeType: type });
  };

  const handleToggleCompression = () => {
    setSettings({ ...settings, applyCompression: !settings.applyCompression });
  };

  const handleSocialPreset = (preset: SocialPreset) => {
    setSettings({ 
      ...settings, 
      resizeType: 'social', 
      socialPreset: preset.id,
      width: preset.width,
      height: preset.height
    });
  };

  const showCompressionToggle = mode === 'resize' || mode === 'convert';

  return (
    <div className="space-y-10">
      {/* Quality Section - prioritized in 'compress' mode */}
      <div className={`space-y-4 transition-all ${mode === 'compress' ? 'ring-2 ring-indigo-500/20 p-4 rounded-2xl bg-indigo-500/5' : ''}`}>
        
        {showCompressionToggle && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg ${settings.applyCompression ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                {settings.applyCompression ? <Zap className="w-3.5 h-3.5" /> : <ZapOff className="w-3.5 h-3.5" />}
              </span>
              <label className="text-xs font-bold text-slate-300">Enable Compression</label>
            </div>
            <button
              onClick={handleToggleCompression}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.applyCompression ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.applyCompression ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        )}

        <div className={`space-y-4 transition-opacity duration-300 ${!settings.applyCompression && showCompressionToggle ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-300">Compression Strength</label>
            <span className="text-indigo-400 font-black bg-indigo-400/10 px-2 py-1 rounded-md text-xs">{settings.quality}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={settings.quality} 
            onChange={handleQualityChange}
            disabled={!settings.applyCompression && showCompressionToggle}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-600 font-black uppercase tracking-widest">
            <span>Max Space</span>
            <span>Max Quality</span>
          </div>
        </div>
      </div>

      {/* Format Section - prioritized in 'convert' mode */}
      <div className={`space-y-4 transition-all ${mode === 'convert' ? 'ring-2 ring-indigo-500/20 p-4 rounded-2xl bg-indigo-500/5' : ''}`}>
        <label className="text-sm font-bold text-slate-300">Output Format</label>
        <div className="grid grid-cols-3 gap-2">
          {FORMAT_OPTIONS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleFormatChange(fmt)}
              className={`
                px-3 py-2.5 rounded-xl text-xs font-black transition-all border
                ${settings.format === fmt 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-400'
                }
              `}
            >
              {fmt.split('/')[1].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Resize Section - prioritized in 'resize' mode */}
      <div className={`space-y-5 transition-all ${mode === 'resize' ? 'ring-2 ring-indigo-500/20 p-4 rounded-2xl bg-indigo-500/5' : ''}`}>
        <label className="text-sm font-bold text-slate-300">Resize Strategy</label>
        <div className="flex flex-col gap-2">
          <ResizeOption 
            active={settings.resizeType === 'original'} 
            onClick={() => handleResizeType('original')}
            icon={<Maximize2 className="w-4 h-4" />}
            label="Original Size"
            desc="No resizing applied"
          />
          <ResizeOption 
            active={settings.resizeType === 'pixel'} 
            onClick={() => handleResizeType('pixel')}
            icon={<Type className="w-4 h-4" />}
            label="Custom Dimensions"
            desc="Set exact W × H"
          />
          <ResizeOption 
            active={settings.resizeType === 'percentage'} 
            onClick={() => handleResizeType('percentage')}
            icon={<Percent className="w-4 h-4" />}
            label="Percentage Scale"
            desc="Uniform scaling"
          />
          <ResizeOption 
            active={settings.resizeType === 'social'} 
            onClick={() => handleResizeType('social')}
            icon={<Layers className="w-4 h-4" />}
            label="Social Media Presets"
            desc="W/H for top platforms"
          />
        </div>

        {/* Dynamic Controls based on resize mode */}
        {settings.resizeType === 'pixel' && (
          <div className="grid grid-cols-2 gap-3 pt-2 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Width</label>
              <input 
                type="number" 
                value={settings.width || ''} 
                onChange={(e) => setSettings({...settings, width: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-indigo-500 transition-colors"
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Height</label>
              <input 
                type="number" 
                value={settings.height || ''} 
                onChange={(e) => setSettings({...settings, height: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-indigo-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>
        )}

        {settings.resizeType === 'percentage' && (
          <div className="pt-2 space-y-3 animate-in fade-in slide-in-from-top-2">
             <input 
              type="range" 
              min="5" 
              max="100" 
              step="5"
              value={settings.percentage || 100} 
              onChange={(e) => setSettings({...settings, percentage: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl border border-white/5">
               <span className="text-[10px] text-slate-400 font-black uppercase">Current Scale</span>
               <span className="text-sm font-black text-indigo-400">{settings.percentage}%</span>
            </div>
          </div>
        )}

        {settings.resizeType === 'social' && (
          <div className="grid grid-cols-2 gap-2 pt-2 animate-in fade-in slide-in-from-top-2">
            {SOCIAL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSocialPreset(preset)}
                className={`
                  p-3 rounded-2xl flex flex-col items-start gap-2 border text-left transition-all
                  ${settings.socialPreset === preset.id 
                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/10' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                  }
                `}
              >
                <div className={`p-1.5 rounded-lg ${settings.socialPreset === preset.id ? 'bg-white/20' : 'bg-slate-800'} text-white`}>
                  {preset.id.includes('ig') && <Instagram className="w-3 h-3" />}
                  {preset.id.includes('fb') && <Facebook className="w-3 h-3" />}
                  {preset.id.includes('tw') && <Twitter className="w-3 h-3" />}
                  {preset.id.includes('yt') && <Youtube className="w-3 h-3" />}
                  {preset.id.includes('desktop') && <Monitor className="w-3 h-3" />}
                </div>
                <div>
                  <div className={`text-[10px] font-black leading-none ${settings.socialPreset === preset.id ? 'text-white' : 'text-slate-200'}`}>{preset.name}</div>
                  <div className={`text-[9px] font-medium mt-1 ${settings.socialPreset === preset.id ? 'text-indigo-200' : 'text-slate-500'}`}>{preset.width}x{preset.height}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ResizeOption: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; desc: string }> = ({ active, onClick, icon, label, desc }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group
      ${active 
        ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/10' 
        : 'bg-white/5 border-white/5 hover:border-white/10'
      }
    `}
  >
    <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-white/10' : 'bg-slate-800'} text-indigo-400 group-hover:text-white`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className={`text-sm font-black ${active ? 'text-white' : 'text-slate-200'}`}>{label}</div>
      <div className={`text-[10px] font-medium leading-tight ${active ? 'text-indigo-200' : 'text-slate-500'}`}>{desc}</div>
    </div>
    {active && <ChevronRight className="w-4 h-4 text-white/50" />}
  </button>
);

export default ImageEditor;
