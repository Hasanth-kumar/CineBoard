/**
 * File: AssetTypes.tsx
 * Responsibility: Displays grid of asset type cards with counts
 * Features: Responsive grid with animated cards
 */

'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/src/components/GlassCard';
import { AssetType } from '../utils/assets-data';

interface AssetTypesProps {
  assetTypes: AssetType[];
}

export default function AssetTypes({ assetTypes }: AssetTypesProps) {
  return (
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
  );
}


