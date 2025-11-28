/**
 * File: MergeShotsPanel.tsx
 * Responsibility: Panel for merging all accepted shots with animated progress bar
 * Features: Merge button, animated progress bar during merge process
 */

'use client';

import { motion } from 'framer-motion';
import Button from '@/src/components/Button';
import GlassCard from '@/src/components/GlassCard';

interface MergeShotsPanelProps {
  acceptedShotsCount: number;
  onMerge: () => void;
  isMerging: boolean;
  mergeProgress: number;
}

export default function MergeShotsPanel({
  acceptedShotsCount,
  onMerge,
  isMerging,
  mergeProgress,
}: MergeShotsPanelProps) {
  return (
    <GlassCard isHoverable={false}>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-1">
              <span className="text-gradient">Final Preview</span>
            </h3>
            <p className="text-sm text-white/60">
              {acceptedShotsCount > 0
                ? `${acceptedShotsCount} shot${acceptedShotsCount !== 1 ? 's' : ''} ready to merge`
                : 'No accepted shots to merge'}
            </p>
          </div>
        </div>

        <motion.div
          whileHover={acceptedShotsCount > 0 && !isMerging ? { scale: 1.02 } : {}}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={onMerge}
            disabled={acceptedShotsCount === 0 || isMerging}
            variant="primary"
            className={`w-full relative overflow-hidden focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2 ${acceptedShotsCount === 0 || isMerging ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={isMerging ? 'Merging shots in progress' : `Merge ${acceptedShotsCount} accepted shot${acceptedShotsCount !== 1 ? 's' : ''}`}
          >
            {acceptedShotsCount > 0 && !isMerging && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 198, 0.1)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 198, 0.1)',
                    '0 0 30px rgba(0, 255, 198, 0.3)',
                    '0 0 20px rgba(0, 255, 198, 0.1)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            <span className="relative z-10">
              {isMerging ? 'Merging...' : 'Merge All Accepted Shots'}
            </span>
          </Button>
        </motion.div>

        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {isMerging && `Merging shots: ${Math.round(mergeProgress)}% complete`}
          {!isMerging && acceptedShotsCount > 0 && `${acceptedShotsCount} shot${acceptedShotsCount !== 1 ? 's' : ''} ready to merge`}
        </div>

        {isMerging && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div 
              className="h-2 glass rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={mergeProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Merge progress"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mergeProgress}%` }}
                transition={{ 
                  duration: 0.3, 
                  ease: 'easeOut',
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }}
                className="h-full bg-gradient-to-r from-accent-teal to-accent-purple relative overflow-hidden"
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Processing...</span>
              <span className="text-sm font-medium text-accent-teal">
                {Math.round(mergeProgress)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}

