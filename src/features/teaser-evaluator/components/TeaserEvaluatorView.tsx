'use client';

import { motion } from 'framer-motion';
import { Sparkles, Upload, BarChart3 } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';

export default function TeaserEvaluatorView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Teaser Evaluator</span>
        </h1>
        <p className="text-white/60">AI-powered analysis of your video teasers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <GlassCard isHoverable={false} className="h-full">
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                <Upload className="w-10 h-10 text-accent-teal" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Upload Your Teaser</h3>
                <p className="text-white/60 mb-6">
                  Drag and drop your video file or click to browse
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-teal to-accent-purple font-semibold"
                >
                  Select File
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <GlassCard isHoverable={false}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-teal" />
              AI Analysis
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex justify-between">
                <span>Engagement Score</span>
                <span className="text-white font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span>Pacing Analysis</span>
                <span className="text-white font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span>Emotional Impact</span>
                <span className="text-white font-medium">-</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard isHoverable={false}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent-purple" />
              Metrics
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="text-white font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution</span>
                <span className="text-white font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span>Format</span>
                <span className="text-white font-medium">-</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}


