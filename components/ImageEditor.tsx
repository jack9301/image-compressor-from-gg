
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
  Type
} from 'lucide-react';
import { CompressionSettings, SocialPreset } from '../types';
import { SOCIAL_PRESETS, FORMAT_OPTIONS } from '../constants';

interface Props {
  settings: CompressionSettings;
  setSettings: (settings: CompressionSettings) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

const ImageEditor: React.FC<Props> = ({ settings, setSettings, onProcess, isProcessing }) => {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, quality: parseInt(e.target.value) });
  };

  const handleFormatChange = (format: string) => {
    setSettings({ ...settings, format });
  };

  const handleResizeType = (type: CompressionSettings['resizeType']) => {
    setSettings({ ...settings, resizeType: type });
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

  return (
    <div className="space-y-8">
      {/* Quality Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-300">Compression Quality</label>
          <span className="text-indigo-400 font-bold bg-indigo-400/10 px-2 py-1 rounded-md text-xs">{settings.quality}%</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={settings.quality} 
          onChange={handleQualityChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-bold">
          <span>TINY SIZE</span>
          <span>BEST QUALITY</span>
        </div>
      </div>

      {/* Format Selection */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-300">Convert To</label>
        <div className="grid grid-cols-3 gap-2">
          {FORMAT_OPTIONS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleFormatChange(fmt)}
              className={`
                px-3 py-2 rounded-xl text-xs font-bold transition-all border
                ${settings.format === fmt 
                  ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20' 
                  : 'bg-white/5 border-white/5 hover:border-white/10'
                }
              `}
            >
              {fmt.split('/')[1].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Resize Strategy */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-300">Resize Mode</label>
        <div className="flex flex-col gap-2">
          <ResizeOption 
            active={settings.resizeType === 'original'} 
            onClick={() => handleResizeType('original')}
            icon={<Maximize2 className="w-4 h-4" />}
            label="Original Size"
            desc="Keep dimensions intact"
          />
          <ResizeOption 
            active={settings.resizeType === 'pixel'} 
            onClick={() => handleResizeType('pixel')}
            icon={<Type className="w-4 h-4" />}
            label="Specific Pixels"
            desc="Set custom W × H"
          />
          <ResizeOption 
            active={settings.resizeType === 'percentage'} 
            onClick={() => handleResizeType('percentage')}
            icon={<Percent className="w-4 h-4" />}
            label="Percentage"
            desc="Scale down uniformly"
          />
          <ResizeOption 
            active={settings.resizeType === 'social'} 
            onClick={() => handleResizeType('social')}
            icon={<Layers className="w-4 h-4" />}
            label="Social Presets"
            desc="Ready for platforms"
          />
        </div>

        {/* Conditional Controls */}
        {settings.resizeType === 'pixel' && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Width</label>
              <input 
                type="number" 
                value={settings.width || ''} 
                onChange={(e) => setSettings({...settings, width: parseInt(e.target.value)})}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500"
                placeholder="1920"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Height</label>
              <input 
                type="number" 
                value={settings.height || ''} 
                onChange={(e) => setSettings({...settings, height: parseInt(e.target.value)})}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500"
                placeholder="1080"
              />
            </div>
          </div>
        )}

        {settings.resizeType === 'percentage' && (
          <div className="pt-2">
             <input 
              type="range" 
              min="10" 
              max="100" 
              step="5"
              value={settings.percentage || 100} 
              onChange={(e) => setSettings({...settings, percentage: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between mt-2">
               <span className="text-[10px] text-slate-500 font-bold uppercase">Scaling</span>
               <span className="text-xs font-bold text-purple-400">{settings.percentage}%</span>
            </div>
          </div>
        )}

        {settings.resizeType === 'social' && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            {SOCIAL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSocialPreset(preset)}
                className={`
                  p-3 rounded-2xl flex flex-col items-start gap-2 border text-left transition-all
                  ${settings.socialPreset === preset.id 
                    ? 'bg-indigo-600/10 border-indigo-500 shadow-sm' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                  }
                `}
              >
                <div className="p-2 rounded-lg bg-white/5 text-indigo-400">
                  {preset.id.includes('ig') && <Instagram className="w-4 h-4" />}
                  {preset.id.includes('fb') && <Facebook className="w-4 h-4" />}
                  {preset.id.includes('tw') && <Twitter className="w-4 h-4" />}
                  {preset.id.includes('yt') && <Youtube className="w-4 h-4" />}
                  {preset.id.includes('desktop') && <Monitor className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-100">{preset.name}</div>
                  <div className="text-[8px] text-slate-500">{preset.width}x{preset.height}px</div>
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
      flex items-center gap-4 p-4 rounded-2xl border transition-all text-left
      ${active 
        ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/10' 
        : 'bg-white/5 border-white/5 hover:border-white/10'
      }
    `}
  >
    <div className={`p-2 rounded-xl ${active ? 'bg-white/10' : 'bg-slate-800'} text-indigo-400`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className={`text-sm font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{label}</div>
      <div className={`text-[10px] ${active ? 'text-indigo-200' : 'text-slate-500'}`}>{desc}</div>
    </div>
  </button>
);

export default ImageEditor;
