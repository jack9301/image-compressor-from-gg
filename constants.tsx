
import React from 'react';
import { Instagram, Facebook, Twitter, Youtube, Monitor } from 'lucide-react';
import { SocialPreset } from './types';

export const SOCIAL_PRESETS: SocialPreset[] = [
  { id: 'ig-square', name: 'Instagram Square', width: 1080, height: 1080, icon: 'Instagram' },
  { id: 'ig-story', name: 'Instagram Story', width: 1080, height: 1920, icon: 'Instagram' },
  { id: 'fb-cover', name: 'Facebook Cover', width: 820, height: 312, icon: 'Facebook' },
  { id: 'tw-header', name: 'Twitter Header', width: 1500, height: 500, icon: 'Twitter' },
  { id: 'yt-thumb', name: 'YouTube Thumbnail', width: 1280, height: 720, icon: 'Youtube' },
  { id: 'desktop-hd', name: 'FHD Desktop', width: 1920, height: 1080, icon: 'Monitor' },
];

export const FORMAT_OPTIONS = ['image/jpeg', 'image/png', 'image/webp'];
