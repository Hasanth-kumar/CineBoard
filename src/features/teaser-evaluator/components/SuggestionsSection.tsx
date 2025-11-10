'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { Suggestion } from '../utils/teaser-data';

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
  isApplyingFix: boolean;
  onAutoApplyFix: () => void;
}

export default function SuggestionsSection({
  suggestions,
  isApplyingFix,
  onAutoApplyFix,
}: SuggestionsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-gradient">AI Suggestions</span>
        <span>🎯</span>
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {suggestions.map((suggestion) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full glass border border-white/10 hover:border-accent-teal/50 transition-all"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 198, 0.1)'
            }}
          >
            <span className="text-sm text-white/90">{suggestion.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={onAutoApplyFix}
          disabled={isApplyingFix}
          whileHover={{ scale: isApplyingFix ? 1 : 1.05 }}
          whileTap={{ scale: isApplyingFix ? 1 : 0.95 }}
          className={`
            relative px-8 py-4 rounded-full font-semibold text-lg
            bg-gradient-to-r from-accent-teal to-accent-purple
            disabled:opacity-50 disabled:cursor-not-allowed
            overflow-hidden
          `}
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 198, 0.4)'
          }}
        >
          <AnimatePresence mode="wait">
            {isApplyingFix ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <span>Applying AI Fixes...</span>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                <span>Auto-Apply Fix</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

