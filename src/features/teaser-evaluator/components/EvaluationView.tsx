/**
 * File: EvaluationView.tsx
 * Responsibility: Displays video player and AI feedback cards in a responsive layout
 * Features: Responsive grid layout that collapses feedback panel below video on mobile
 */

'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import GlassCard from '@/src/components/GlassCard';
import FeedbackCard from './FeedbackCard';
import type { FeedbackCard as FeedbackCardType } from '../utils/teaser-data';

// Dynamically import react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface EvaluationViewProps {
  videoUrl: string | null;
  feedbackCards: FeedbackCardType[];
}

// Helper function to detect blob URLs
const isBlobUrl = (url: string | null): boolean => {
  return url?.startsWith('blob:') ?? false;
};

export default function EvaluationView({ videoUrl, feedbackCards }: EvaluationViewProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-gradient">Teaser Evaluator</span>
        </h1>
        <p className="text-white/60 text-sm md:text-base">AI-powered analysis of your video teasers</p>
      </motion.div>

      {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-10 gap-4 md:gap-6">
        {/* Video Player - Full width on mobile, 70% on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:col-span-7 order-1 lg:order-1"
        >
          <GlassCard isHoverable={false} className="relative overflow-hidden">
            <div 
              className="relative w-full rounded-xl overflow-hidden video-container"
            >
              {videoUrl && (
                <div className="aspect-video">
                  {isBlobUrl(videoUrl) ? (
                    // Use native video for blob URLs (local files)
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-full"
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    // Use ReactPlayer for external URLs (YouTube, Vimeo, etc.)
                    <ReactPlayer
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls
                      playing={false}
                    />
                  )}
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Feedback Panel - Full width on mobile (below video), 30% on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:col-span-3 order-2 lg:order-2"
        >
          <GlassCard isHoverable={false} className="h-full lg:max-h-[600px] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-accent-teal" />
              <h3 className="text-lg font-bold">AI Feedback</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {feedbackCards.map((card, index) => (
                <FeedbackCard key={card.id} card={card} index={index} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

