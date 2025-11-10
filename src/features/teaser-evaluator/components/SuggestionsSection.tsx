/**
 * File: SuggestionsSection.tsx
 * Responsibility: Displays AI suggestions and auto-apply fix functionality
 * Features: Animated suggestion chips, loading states, toast notifications
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2 } from 'lucide-react';
import type { Suggestion } from '../utils/teaser-data';

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
  isApplyingFix: boolean;
  showToast: boolean;
  onAutoApplyFix: () => void;
}

export default function SuggestionsSection({
  suggestions,
  isApplyingFix,
  showToast,
  onAutoApplyFix,
}: SuggestionsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
        <span className="text-gradient">AI Suggestions</span>
        <span>🎯</span>
      </h2>

      {/* Animated glowing suggestion chips */}
      <div className="flex flex-wrap gap-3 mb-6">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
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
            <span className="relative text-xs md:text-sm text-white/90 z-10">{suggestion.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Auto-Apply Fix Button */}
      <div className="flex justify-center">
        <motion.button
          onClick={onAutoApplyFix}
          disabled={isApplyingFix}
          whileHover={isApplyingFix ? {} : { scale: 1.05 }}
          whileTap={isApplyingFix ? {} : { scale: 0.95 }}
          className="relative px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg bg-gradient-to-r from-accent-teal to-accent-purple disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {/* Glow pulse animation on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 198, 0.4)',
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(0, 255, 198, 0.4)',
                '0 0 60px rgba(160, 32, 240, 0.6)',
                '0 0 40px rgba(0, 255, 198, 0.4)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              boxShadow: [
                '0 0 50px rgba(0, 255, 198, 0.6)',
                '0 0 80px rgba(160, 32, 240, 0.8)',
                '0 0 50px rgba(0, 255, 198, 0.6)',
              ],
            }}
          />

          <AnimatePresence mode="wait">
            {isApplyingFix ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative flex items-center gap-3 z-10"
              >
                {/* Waveform Loading Animation */}
                <div className="flex items-center gap-1 h-6">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="waveform-bar w-1 bg-white rounded-full"
                      style={{
                        height: '100%',
                        minHeight: '8px',
                      }}
                      animate={{
                        scaleY: [0.3, 1, 0.3],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <span className="relative z-10">Applying AI Fixes...</span>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 relative z-10"
              >
                <Zap className="w-5 h-5" />
                <span>Auto-Apply Fix</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="glass px-6 py-4 rounded-lg border border-accent-teal/30 shadow-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-teal" />
              <span className="text-white font-medium">Fix Applied Successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

