
export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
  compressedSize: number | null;
  compressedUrl: string | null;
  status: 'idle' | 'processing' | 'completed' | 'error';
  width: number;
  height: number;
  format: string;
}

export interface CompressionSettings {
  quality: number;
  format: string;
  resizeType: 'original' | 'pixel' | 'percentage' | 'social';
  width?: number;
  height?: number;
  percentage?: number;
  socialPreset?: string;
}

export interface SocialPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: string;
}
