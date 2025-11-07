/**
 * File: assetsData.ts
 * Responsibility: Provides mock data utilities for asset types and recent assets in the media library.
 */

import { Image, Video, Music, FileText, LucideIcon } from 'lucide-react';

export interface AssetType {
  icon: LucideIcon;
  label: string;
  count: number;
  color: string;
}

export interface RecentAsset {
  name: string;
  type: string;
  size: string;
  date: string;
}

export const getAssetTypes = (): AssetType[] => [
  { icon: Image, label: 'Images', count: 45, color: 'text-accent-teal' },
  { icon: Video, label: 'Videos', count: 12, color: 'text-accent-purple' },
  { icon: Music, label: 'Audio', count: 28, color: 'text-accent-teal' },
  { icon: FileText, label: 'Documents', count: 34, color: 'text-accent-purple' },
];

export const getRecentAssets = (): RecentAsset[] => [
  { name: 'hero_scene_final.mp4', type: 'Video', size: '145 MB', date: '2 hours ago' },
  { name: 'background_music.mp3', type: 'Audio', size: '8.2 MB', date: '5 hours ago' },
  { name: 'storyboard_v2.pdf', type: 'Document', size: '2.1 MB', date: '1 day ago' },
  { name: 'thumbnail_draft.png', type: 'Image', size: '892 KB', date: '2 days ago' },
];


