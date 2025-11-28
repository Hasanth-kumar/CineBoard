/**
 * File: SceneCardSkeleton.tsx
 * Responsibility: Loading skeleton component for scene cards during analysis
 * Features: Animated skeleton matching SceneCard layout
 */

'use client';

import GlassCard from '@/src/components/GlassCard';
import { motion } from 'framer-motion';

interface SceneCardSkeletonProps {
  count?: number;
}

export default function SceneCardSkeleton({ count = 3 }: SceneCardSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <GlassCard className="animate-pulse" isHoverable={false}>
            <div className="space-y-4">
              {/* Header skeleton */}
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-white/10 rounded w-1/3"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                </div>
                <div className="h-8 w-8 bg-white/10 rounded"></div>
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                <div className="h-4 bg-white/10 rounded w-4/6"></div>
              </div>
              
              {/* Metadata skeleton */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-3 bg-white/5 rounded w-full"></div>
                <div className="h-3 bg-white/5 rounded w-full"></div>
              </div>
              
              {/* Action button skeleton */}
              <div className="pt-2">
                <div className="h-10 bg-white/10 rounded w-32"></div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}



