'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import dynamic from 'next/dynamic';
import GlassCard from '@/src/components/GlassCard';

// Dynamically import react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface ComparisonViewProps {
  videoUrl: string | null;
  onAcceptChanges: () => void;
  onRevert: () => void;
}

// Helper function to detect blob URLs
const isBlobUrl = (url: string | null): boolean => {
  return url?.startsWith('blob:') ?? false;
};

export default function ComparisonView({ videoUrl, onAcceptChanges, onRevert }: ComparisonViewProps) {
  const [dividerPosition, setDividerPosition] = useState(50); // 0-100 percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDividerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDividerPosition(Number(e.target.value));
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setDividerPosition(percentage);
  }, [isDragging]);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Comparison View</span>
        </h1>
        <p className="text-white/60">Compare before and after fixes</p>
      </motion.div>

      {/* Split-screen comparison */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <GlassCard isHoverable={false} className="relative overflow-hidden p-0">
          <div 
            className="relative w-full rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 198, 0.3), inset 0 0 20px rgba(0, 255, 198, 0.1)',
              border: '2px solid rgba(0, 255, 198, 0.3)'
            }}
          >
            {videoUrl && (
              <div className="relative flex" style={{ aspectRatio: '16/9' }}>
                {/* Before - Left Side */}
                <div 
                  className="relative overflow-hidden"
                  style={{ width: `${dividerPosition}%` }}
                >
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="px-4 py-2 rounded-lg glass border border-white/20"
                    >
                      <span className="text-white font-semibold text-sm">Before</span>
                    </motion.div>
                  </div>
                  <div className="w-full h-full">
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
                </div>

                {/* Draggable Divider */}
                <div
                  className="relative z-20 flex items-center justify-center cursor-col-resize group"
                  style={{ width: '4px' }}
                  onMouseDown={handleMouseDown}
                >
                  <motion.div
                    className="absolute inset-y-0 w-full bg-gradient-to-b from-accent-teal/50 via-accent-purple/50 to-accent-teal/50"
                    whileHover={{ width: '6px' }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute w-12 h-12 rounded-full glass border-2 border-accent-teal/50 flex items-center justify-center"
                    whileHover={{ scale: 1.2, borderColor: 'rgba(0, 255, 198, 0.8)' }}
                    transition={{ duration: 0.2 }}
                    style={{
                      boxShadow: '0 0 20px rgba(0, 255, 198, 0.4)',
                    }}
                  >
                    <div className="w-2 h-8 rounded-full bg-gradient-to-b from-accent-teal to-accent-purple" />
                  </motion.div>
                </div>

                {/* After - Right Side */}
                <div 
                  className="relative overflow-hidden"
                  style={{ width: `${100 - dividerPosition}%` }}
                >
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="px-4 py-2 rounded-lg glass border border-white/20"
                    >
                      <span className="text-white font-semibold text-sm">After</span>
                    </motion.div>
                  </div>
                  <div className="w-full h-full">
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
                </div>
              </div>
            )}

            {/* Range input for touch support and accessibility */}
            <input
              type="range"
              min="10"
              max="90"
              value={dividerPosition}
              onChange={handleDividerChange}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-white/10 rounded-full appearance-none cursor-pointer z-30 opacity-0 hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(to right, 
                  rgba(0, 255, 198, 0.3) 0%, 
                  rgba(0, 255, 198, 0.3) ${dividerPosition}%, 
                  rgba(160, 32, 240, 0.3) ${dividerPosition}%, 
                  rgba(160, 32, 240, 0.3) 100%)`
              }}
              aria-label="Adjust comparison divider position"
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 justify-center"
      >
        {/* Accept Changes Button */}
        <motion.button
          onClick={onAcceptChanges}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-green-500 to-emerald-500 overflow-hidden group"
        >
          {/* Green glow animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(34, 197, 94, 0.4)',
                '0 0 60px rgba(34, 197, 94, 0.6)',
                '0 0 40px rgba(34, 197, 94, 0.4)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              boxShadow: [
                '0 0 50px rgba(34, 197, 94, 0.6)',
                '0 0 80px rgba(34, 197, 94, 0.8)',
                '0 0 50px rgba(34, 197, 94, 0.6)',
              ],
            }}
          />
          <div className="relative flex items-center gap-2 z-10">
            <CheckCircle2 className="w-5 h-5" />
            <span>Accept Changes</span>
          </div>
        </motion.button>

        {/* Revert to Original Button */}
        <motion.button
          onClick={onRevert}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-purple-600 to-accent-purple overflow-hidden group"
        >
          {/* Purple glow animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 40px rgba(160, 32, 240, 0.4)',
            }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(160, 32, 240, 0.4)',
                '0 0 60px rgba(160, 32, 240, 0.6)',
                '0 0 40px rgba(160, 32, 240, 0.4)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              boxShadow: [
                '0 0 50px rgba(160, 32, 240, 0.6)',
                '0 0 80px rgba(160, 32, 240, 0.8)',
                '0 0 50px rgba(160, 32, 240, 0.6)',
              ],
            }}
          />
          <div className="relative flex items-center gap-2 z-10">
            <RotateCcw className="w-5 h-5" />
            <span>Revert to Original</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

