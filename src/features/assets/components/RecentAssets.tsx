'use client';

import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { RecentAsset } from '../utils/assetsData';

interface RecentAssetsProps {
  assets: RecentAsset[];
}

export default function RecentAssets({ assets }: RecentAssetsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <GlassCard hover={false}>
        <h3 className="text-xl font-bold mb-6">Recent Assets</h3>
        <div className="space-y-4">
          {assets.map((asset, i) => (
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
  );
}


