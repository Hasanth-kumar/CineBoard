'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AssetTypes from './AssetTypes';
import RecentAssets from './RecentAssets';
import { getAssetTypes, getRecentAssets } from '../utils/assets-data';

export default function AssetsView() {
  const assetTypes = getAssetTypes();
  const recentAssets = getRecentAssets();

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
          className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-teal to-accent-purple font-semibold flex items-center gap-2 hover-glow"
        >
          <Plus className="w-5 h-5" />
          Upload Assets
        </motion.button>
      </div>

      <AssetTypes assetTypes={assetTypes} />

      <RecentAssets assets={recentAssets} />
    </div>
  );
}


