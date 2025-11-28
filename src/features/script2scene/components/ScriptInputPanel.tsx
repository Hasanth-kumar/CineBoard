/**
 * File: ScriptInputPanel.tsx
 * Responsibility: ChatGPT/Gemini-style script input interface
 * Features: Centered initially, moves to bottom when typing, compact single-line input that expands
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import Button from '@/src/components/Button';

interface ScriptInputPanelProps {
  scriptText: string;
  isLoading: boolean;
  onScriptChange: (text: string) => void;
  onAnalyze: () => void;
}

export default function ScriptInputPanel({
  scriptText,
  isLoading,
  onScriptChange,
  onAnalyze,
}: ScriptInputPanelProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = scriptText.trim().length > 0;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // Max height before scrolling
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [scriptText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Enter to submit (Shift+Enter for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && scriptText.trim()) {
        onAnalyze();
      }
    }
  };

  const handleSubmit = () => {
    if (!isLoading && scriptText.trim()) {
      onAnalyze();
    }
  };

  // Determine if input should be centered or at bottom
  // Center when: no text AND not focused AND not loading
  const isCentered = !hasText && !isFocused && !isLoading;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isCentered ? 'centered' : 'bottom'}
        initial={isCentered ? { opacity: 0, y: 20 } : { opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`${
          isCentered
            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 z-10'
            : 'fixed bottom-0 left-0 right-0 px-4 pb-4 z-10'
        }`}
      >
        <GlassCard
          isHoverable={false}
          className={`${
            isCentered
              ? 'shadow-2xl'
              : 'shadow-lg'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Textarea */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={scriptText}
                onChange={(e) => onScriptChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  isCentered
                    ? 'Enter your script to transform it into visual scenes...'
                    : 'Type your script here...'
                }
                className="w-full min-h-[52px] max-h-[200px] bg-white/5 backdrop-blur-xl border-0 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none transition-colors resize-none custom-scrollbar"
                aria-label="Script input textarea"
                rows={1}
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={!isLoading && scriptText.trim() ? { scale: 1.05 } : {}}
              whileTap={!isLoading && scriptText.trim() ? { scale: 0.95 } : {}}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                onClick={handleSubmit}
                disabled={isLoading || !scriptText.trim()}
                className={`h-[52px] w-[52px] p-0 rounded-xl flex items-center justify-center relative overflow-hidden focus:outline-none hover:shadow-none ${
                  isLoading || !scriptText.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                style={{ animation: 'none' }}
                aria-label={isLoading ? 'Analyzing script' : 'Analyze script'}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center"
                    >
                      {/* Waveform Loading Animation */}
                      <div className="flex items-center gap-1 h-6" aria-hidden="true">
                        {[...Array(4)].map((_, i) => (
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
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Wand2 className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>

          {/* Hint text - only show when centered */}
          {isCentered && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-white/40 mt-3 text-center"
            >
              Press Enter to analyze • Shift+Enter for new line
            </motion.p>
          )}

          {/* Screen reader announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {isLoading && 'Analyzing script, please wait'}
          </div>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
}
