/**
 * File: FinalPreviewPlayer.tsx
 * Responsibility: Displays the final merged preview video with timeline
 * Features: Video player, scene timeline, re-edit functionality
 */

'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '@/src/components/Button';
import GlassCard from '@/src/components/GlassCard';
import type { MergeResult, Scene } from '../types';

// Dynamically import react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface FinalPreviewPlayerProps {
  mergeResult: MergeResult | null;
  scenes?: Scene[];
  onReEdit?: () => void;
}

// Helper function to detect blob URLs
const isBlobUrl = (url: string | null): boolean => {
  return url?.startsWith('blob:') ?? false;
};

export default function FinalPreviewPlayer({
  mergeResult,
  scenes = [],
  onReEdit,
}: FinalPreviewPlayerProps) {
  if (!mergeResult) {
    return (
      <GlassCard isHoverable={false}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Merge shots to generate final preview</h3>
          <p className="text-sm text-white/60">
            Accept shots from your scenes and merge them to create a final preview
          </p>
        </div>
      </GlassCard>
    );
  }

  // Get scene information for timeline
  const mergedScenes = scenes.filter((scene) => mergeResult.sceneIds.includes(scene.id));
  
  // Calculate cumulative timestamps for timeline
  let currentTime = 0;
  const timelineItems = mergedScenes.map((scene) => {
    const startTime = currentTime;
    // Estimate scene duration (could be improved with actual shot durations)
    const duration = 5; // Default 5 seconds per scene
    currentTime += duration;
    return {
      scene,
      startTime,
      duration,
      endTime: currentTime,
    };
  });

  return (
    <GlassCard isHoverable={false} className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-1">
            <span className="text-gradient">Final Preview</span>
          </h3>
          <p className="text-sm text-white/60">
            {mergeResult.totalDuration ? `${mergeResult.totalDuration}s` : 'Ready to preview'}
          </p>
        </div>
        {onReEdit && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Button onClick={onReEdit} variant="secondary" className="ml-4">
              Re-edit
            </Button>
          </motion.div>
        )}
      </div>

      {/* Video Player */}
      <div className="relative w-full rounded-xl overflow-hidden video-container">
        <div className="aspect-video">
          {isBlobUrl(mergeResult.previewUrl) ? (
            // Use native video for blob URLs (local files)
            <video
              src={mergeResult.previewUrl}
              controls
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            // Use ReactPlayer for external URLs
            <ReactPlayer
              url={mergeResult.previewUrl}
              width="100%"
              height="100%"
              controls
              playing={false}
            />
          )}
        </div>
      </div>

      {/* Timeline */}
      {timelineItems.length > 0 && (
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-base md:text-lg font-semibold">
            <span className="text-gradient">Timeline</span>
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.scene.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 md:p-4 glass rounded-lg hover:border-accent-teal/50 transition-all"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.scene.title}</p>
                  <p className="text-xs text-white/60 mt-1 line-clamp-1">
                    {item.scene.description}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-xs font-mono text-accent-teal">
                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}

// Helper function to format time in MM:SS format
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

