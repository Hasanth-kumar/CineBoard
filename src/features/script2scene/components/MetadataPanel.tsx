/**
 * File: MetadataPanel.tsx
 * Responsibility: Expandable metadata panel displaying detailed cinematic metadata for a selected scene
 * Features: Glassmorphic design, expand/collapse animations, animated glow chips, responsive layout
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Video, ChevronDown } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import type { SceneMetadata } from '../types';

interface MetadataPanelProps {
  metadata: SceneMetadata | null;
  sceneTitle?: string;
}

// Tone emoji mapping
const toneEmojis: Record<string, string> = {
  dramatic: '🎭',
  light: '😊',
  tense: '😰',
  romantic: '💕',
  mysterious: '🔮',
  action: '💥',
  melancholic: '🌙',
  hopeful: '✨',
  dark: '🌑',
  energetic: '⚡',
};

// Get emoji for tone, fallback to default
const getToneEmoji = (tone: string): string => {
  const lowerTone = tone.toLowerCase();
  return toneEmojis[lowerTone] || '🎬';
};

export default function MetadataPanel({ metadata, sceneTitle }: MetadataPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Empty state
  if (!metadata) {
    return (
      <GlassCard isHoverable={false}>
        <div className="text-center py-8">
          <p className="text-white/60 text-sm md:text-base">Select a scene to view metadata</p>
        </div>
      </GlassCard>
    );
  }

  const { environment, lightingStyle, ambience, cameraDirection, tone } = metadata;

  return (
    <GlassCard isHoverable={false} className="overflow-hidden">
      {/* Header with expand/collapse toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4 focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2 rounded-lg p-2 -m-2 transition-all"
        aria-label={isExpanded ? 'Collapse metadata panel' : 'Expand metadata panel'}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg md:text-xl font-bold text-gradient">
            {sceneTitle ? `Metadata: ${sceneTitle}` : 'Scene Metadata'}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </button>

      {/* Collapsed summary view */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-white/80">
                <MapPin className="w-4 h-4 text-accent-teal" />
                <span className="truncate max-w-[150px]">{environment}</span>
              </div>
              <div className="px-2 py-1 rounded-full glass border border-white/10 text-xs">
                {lightingStyle}
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <span>{getToneEmoji(tone)}</span>
                <span>{tone}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded detailed view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-4"
          >
            {/* Environment */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2 min-w-[120px]">
                <MapPin className="w-5 h-5 text-accent-teal flex-shrink-0" />
                <span className="text-sm font-semibold text-white/80">Environment:</span>
              </div>
              <p className="text-base md:text-lg text-white font-medium">{environment}</p>
            </div>

            {/* Lighting Style */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-white/80 min-w-[120px]">Lighting:</span>
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-white/10 hover:border-accent-teal/50 transition-all overflow-hidden"
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 198, 0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  {/* Glow pulse animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
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
                  <span className="relative text-sm md:text-base text-white/90 z-10">{lightingStyle}</span>
                </motion.div>
              </div>
            </div>

            {/* Ambience Chips */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <span className="text-sm font-semibold text-white/80 min-w-[120px] pt-1">Ambience:</span>
              <div className="flex flex-wrap gap-3 flex-1">
                {ambience.length > 0 ? (
                  ambience.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-white/10 hover:border-accent-teal/50 transition-all overflow-hidden"
                    >
                      {/* Animated glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(0, 255, 198, 0.3), transparent)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={{
                          backgroundPosition: ['200% 0', '-200% 0'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: index * 0.3,
                        }}
                      />
                      {/* Glow pulse animation */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
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
                          delay: index * 0.2,
                        }}
                      />
                      <span className="relative text-xs md:text-sm text-white/90 z-10">{item}</span>
                    </motion.div>
                  ))
                ) : (
                  <span className="text-sm text-white/60">No ambience specified</span>
                )}
              </div>
            </div>

            {/* Camera Direction */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2 min-w-[120px]">
                <Video className="w-5 h-5 text-accent-purple flex-shrink-0" />
                <span className="text-sm font-semibold text-white/80">Camera:</span>
              </div>
              <p className="text-base md:text-lg text-white font-medium">{cameraDirection}</p>
            </div>

            {/* Tone */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold text-white/80 min-w-[120px]">Tone:</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getToneEmoji(tone)}</span>
                <p className="text-base md:text-lg text-white font-medium">{tone}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

