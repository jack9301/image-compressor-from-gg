
import { CompressionSettings } from '../types';

export const processImage = async (
  file: File,
  settings: CompressionSettings
): Promise<{ blob: Blob; url: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let targetWidth = img.width;
        let targetHeight = img.height;

        // Apply Resizing Logic
        if (settings.resizeType === 'pixel' && settings.width && settings.height) {
          targetWidth = settings.width;
          targetHeight = settings.height;
        } else if (settings.resizeType === 'percentage' && settings.percentage) {
          targetWidth = img.width * (settings.percentage / 100);
          targetHeight = img.height * (settings.percentage / 100);
        } else if (settings.resizeType === 'social') {
          // This would be handled by a preset lookup before calling this function, 
          // but we ensure settings.width/height are passed.
          targetWidth = settings.width || img.width;
          targetHeight = settings.height || img.height;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw image with resizing
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Compress and Convert
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                blob,
                url: URL.createObjectURL(blob),
                width: targetWidth,
                height: targetHeight,
              });
            } else {
              reject(new Error('Blob generation failed'));
            }
          },
          settings.format,
          settings.quality / 100
        );
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File reader error'));
    reader.readAsDataURL(file);
  });
};

export const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
