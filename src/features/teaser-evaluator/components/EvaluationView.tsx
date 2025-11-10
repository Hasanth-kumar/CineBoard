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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Teaser Evaluator</span>
        </h1>
        <p className="text-white/60">AI-powered analysis of your video teasers</p>
      </motion.div>

      {/* Split Layout: 70% video, 30% feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Video Player - 70% */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <GlassCard isHoverable={false} className="relative overflow-hidden">
            <div 
              className="relative w-full rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 198, 0.3), inset 0 0 20px rgba(0, 255, 198, 0.1)',
                border: '2px solid rgba(0, 255, 198, 0.3)'
              }}
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

        {/* Feedback Panel - 30% */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <GlassCard isHoverable={false} className="h-full max-h-[600px] overflow-hidden flex flex-col">
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

