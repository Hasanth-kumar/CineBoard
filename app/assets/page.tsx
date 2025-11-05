'use client';

import { motion } from 'framer-motion';
import { FolderOpen, Image, Video, Music, FileText, Plus } from 'lucide-react';
import GlassCard from '@/components/layout/GlassCard';

export default function Assets() {
  const assetTypes = [
    { icon: Image, label: 'Images', count: 45, color: 'text-accent-teal' },
    { icon: Video, label: 'Videos', count: 12, color: 'text-accent-purple' },
    { icon: Music, label: 'Audio', count: 28, color: 'text-accent-teal' },
    { icon: FileText, label: 'Documents', count: 34, color: 'text-accent-purple' },
  ];

  const recentAssets = [
    { name: 'hero_scene_final.mp4', type: 'Video', size: '145 MB', date: '2 hours ago' },
    { name: 'background_music.mp3', type: 'Audio', size: '8.2 MB', date: '5 hours ago' },
    { name: 'storyboard_v2.pdf', type: 'Document', size: '2.1 MB', date: '1 day ago' },
    { name: 'thumbnail_draft.png', type: 'Image', size: '892 KB', date: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Assets</span>
          </h1>
          <p className="text-white/60">Manage your media library</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-teal to-accent-purple font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Upload Assets
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assetTypes.map((type, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard>
              <div className={`glass p-3 rounded-xl ${type.color} w-fit mb-4`}>
                <type.icon className="w-6 h-6" />
              </div>
              <p className="text-white/60 text-sm mb-1">{type.label}</p>
              <p className="text-2xl font-bold">{type.count}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard hover={false}>
          <h3 className="text-xl font-bold mb-6">Recent Assets</h3>
          <div className="space-y-4">
            {recentAssets.map((asset, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 glass rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-accent-teal" />
                  </div>
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-white/60">{asset.type} • {asset.size}</p>
                  </div>
                </div>
                <p className="text-sm text-white/40">{asset.date}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
