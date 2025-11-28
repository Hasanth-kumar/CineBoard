/**
 * File: SceneCard.tsx
 * Responsibility: Displays individual scene card with metadata, expandable description, and interactive hover effects
 * Features: Glassmorphic styling, expand/collapse animation, staggered entrance, keyboard accessibility
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronDown, ChevronUp, Film } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import Button from '@/src/components/Button';
import type { Scene, Shot } from '../types';

interface SceneCardProps {
  scene: Scene;
  index: number;
  shots?: Shot[];
  onSelect?: (sceneId: string) => void;
  onGenerateShots?: (sceneId: string) => void;
}

export default function SceneCard({ scene, index, shots = [], onSelect, onGenerateShots }: SceneCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(scene.id);
    }
  };

  const handleGenerateShots = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onGenerateShots) {
      onGenerateShots(scene.id);
    }
  };

  const sceneShots = shots.filter((shot) => shot.sceneId === scene.id);
  const acceptedShots = sceneShots.filter((shot) => shot.status === 'accepted');
  const hasShots = sceneShots.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Check if description needs truncation (rough estimate: 2 lines ≈ 120-150 chars)
  // We'll use CSS line-clamp for accurate truncation, but need to check if it's long enough
  const needsTruncation = scene.description.length > 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
      style={{ transition: 'all 0.3s ease' }}
    >
      <motion.div
        onClick={onSelect ? handleClick : undefined}
        onKeyDown={onSelect ? handleKeyDown : undefined}
        tabIndex={onSelect ? 0 : -1}
        role={onSelect ? 'button' : undefined}
        aria-label={onSelect ? `Scene ${scene.order}: ${scene.title}` : undefined}
        whileHover={onSelect ? { scale: 1.02 } : {}}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={`rounded-2xl transition-all duration-300 ${
          onSelect 
            ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-teal/50 focus:ring-offset-2 focus:ring-offset-transparent' 
            : ''
        }`}
      >
        <GlassCard
          isHoverable={true}
          className="h-full flex flex-col"
        >
        <div className="flex flex-col h-full">
          {/* Scene Number Badge */}
          <div className="flex items-start justify-between mb-3">
            <span className="px-3 py-1 text-xs font-semibold bg-accent-teal/20 text-accent-teal rounded-full border border-accent-teal/30">
              Scene {scene.order}
            </span>
            {hasShots && (
              <span className="px-3 py-1 text-xs font-semibold bg-accent-purple/20 text-accent-purple rounded-full border border-accent-purple/30 flex items-center gap-1">
                <Film className="w-3 h-3" />
                {sceneShots.length} shot{sceneShots.length !== 1 ? 's' : ''}
                {acceptedShots.length > 0 && `, ${acceptedShots.length} accepted`}
              </span>
            )}
          </div>

          {/* Title with Orbitron font and gradient */}
          <h3 
            className="text-lg md:text-xl font-bold mb-3 text-gradient"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {scene.title}
          </h3>

          {/* Description with expand/collapse */}
          <div className="flex-1 mb-4">
            <motion.p
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`text-sm text-white/70 leading-relaxed ${
                !isExpanded ? 'line-clamp-2' : ''
              }`}
            >
              {scene.description}
            </motion.p>
            {needsTruncation && (
              <button
                onClick={toggleExpand}
                className="mt-2 text-xs text-accent-teal hover:text-accent-purple transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-accent-teal/50 rounded"
                aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
              >
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.span
                      key="collapse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <ChevronUp className="w-3 h-3" />
                      Read less
                    </motion.span>
                  ) : (
                    <motion.span
                      key="expand"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <ChevronDown className="w-3 h-3" />
                      Read more
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>

          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* Setting Chip */}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative px-2.5 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-lg border border-white/20 hover:border-accent-teal/50 transition-all overflow-hidden"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 198, 0.1)',
                }}
                whileHover={{
                  boxShadow: '0 0 20px rgba(0, 255, 198, 0.3)',
                }}
              />
              <span className="relative z-10">{scene.setting}</span>
            </motion.span>
            
            {/* Tone Chip */}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative px-2.5 py-1 text-xs font-medium bg-accent-purple/20 text-accent-purple rounded-lg border border-accent-purple/30 hover:border-accent-purple/50 transition-all overflow-hidden"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: '0 0 10px rgba(160, 32, 240, 0.2)',
                }}
                whileHover={{
                  boxShadow: '0 0 20px rgba(160, 32, 240, 0.4)',
                }}
              />
              <span className="relative z-10">{scene.metadata.tone}</span>
            </motion.span>
          </div>

          {/* Camera Direction */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <div
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 198, 0.4))',
              }}
            >
              <Camera className="w-4 h-4 text-accent-teal" />
            </div>
            <span>{scene.metadata.cameraDirection}</span>
          </div>

          {/* Generate Shots Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="primary"
              onClick={handleGenerateShots}
              className="w-full text-sm relative overflow-hidden focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2"
              aria-label={hasShots ? `View shots for scene ${scene.order}: ${scene.title}` : `Generate shots for scene ${scene.order}: ${scene.title}`}
            >
              {/* Glow pulse animation matching SuggestionsSection */}
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
              <span className="relative z-10 flex items-center justify-center">
                <Film className="w-4 h-4 mr-2" />
                {hasShots ? 'View Shots' : 'Generate Shots'}
              </span>
            </Button>
          </motion.div>
        </div>
      </GlassCard>
      </motion.div>
    </motion.div>
  );
}

