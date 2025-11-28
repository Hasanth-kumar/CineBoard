/**
 * File: ShotPreviewModal.tsx
 * Responsibility: Modal for generating and previewing shots per scene with Accept/Reject workflow
 * Features: Glass backdrop, shot carousel/grid, loading states, keyboard navigation
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Video, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import Button from '@/src/components/Button';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import type { Scene, Shot } from '../types';

interface ShotPreviewModalProps {
  isOpen: boolean;
  scene: Scene | null;
  shots: Shot[];
  onClose: () => void;
  onAccept: (shotId: string) => void;
  onReject: (shotId: string) => void;
  isGenerating?: boolean;
}

export default function ShotPreviewModal({
  isOpen,
  scene,
  shots,
  onClose,
  onAccept,
  onReject,
  isGenerating = false,
}: ShotPreviewModalProps) {
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Track selected shot for keyboard navigation
  const selectedShot = shots[selectedShotIndex] || null;

  // Focus management: Save previous focus and restore on close
  useEffect(() => {
    if (isOpen) {
      // Save the element that had focus before modal opened
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      // Restore focus to previous element when modal closes
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
      }
    }
  }, [isOpen]);

  // Focus trap: Keep focus within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    isEnabled: isOpen && !isGenerating && shots.length > 0,
    onAccept: selectedShot && selectedShot.status !== 'accepted' 
      ? () => onAccept(selectedShot.id) 
      : undefined,
    onReject: selectedShot && selectedShot.status !== 'rejected' 
      ? () => onReject(selectedShot.id) 
      : undefined,
    onClose,
    onNavigateLeft: selectedShotIndex > 0 
      ? () => setSelectedShotIndex(prev => Math.max(0, prev - 1))
      : undefined,
    onNavigateRight: selectedShotIndex < shots.length - 1 
      ? () => setSelectedShotIndex(prev => Math.min(shots.length - 1, prev + 1))
      : undefined,
    selectedShotIndex,
    totalShots: shots.length,
  });

  // Reset selected shot index when shots change
  useEffect(() => {
    if (shots.length > 0 && selectedShotIndex >= shots.length) {
      setSelectedShotIndex(0);
    }
  }, [shots.length, selectedShotIndex]);

  if (!isOpen || !scene) return null;

  const acceptedCount = shots.filter((s) => s.status === 'accepted').length;
  const rejectedCount = shots.filter((s) => s.status === 'rejected').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Screen reader announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {isGenerating && 'Generating shots for scene'}
            {!isGenerating && shots.length === 0 && 'No shots generated yet'}
            {!isGenerating && shots.length > 0 && 
              `${shots.length} shot${shots.length !== 1 ? 's' : ''} generated. ${acceptedCount} accepted, ${rejectedCount} rejected.`}
          </div>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          >
            {/* Modal Content */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1],
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <GlassCard isHoverable={false} className="relative flex flex-col h-full max-h-[90vh]">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex-1">
                    <h2
                      id="modal-title"
                      className="text-2xl font-bold mb-2 text-gradient"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {scene.title}
                    </h2>
                    <p id="modal-description" className="text-sm text-white/70 line-clamp-2">{scene.description}</p>
                    {shots.length > 0 && (
                      <div className="flex items-center gap-4 mt-3 text-xs text-white/60" aria-live="polite">
                        <span>
                          {shots.length} shot{shots.length !== 1 ? 's' : ''} generated
                        </span>
                        {acceptedCount > 0 && (
                          <span className="flex items-center gap-1 text-accent-teal">
                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                            {acceptedCount} accepted
                          </span>
                        )}
                        {rejectedCount > 0 && (
                          <span className="flex items-center gap-1 text-red-400">
                            <XCircle className="w-3 h-3" aria-hidden="true" />
                            {rejectedCount} rejected
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="ml-4 p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white/80" aria-hidden="true" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center py-16" role="status" aria-live="polite">
                      <Loader2 className="w-12 h-12 text-accent-teal animate-spin mb-4" aria-hidden="true" />
                      <p className="text-white/70">Generating shots...</p>
                      <p className="text-sm text-white/50 mt-2">This may take a few seconds</p>
                    </div>
                  ) : shots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Image className="w-16 h-16 text-white/30 mb-4" aria-hidden="true" />
                      <p className="text-white/70">No shots generated yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Shot Carousel/Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Generated shots">
                        {shots.map((shot, index) => {
                          const isSelected = index === selectedShotIndex;
                          return (
                            <motion.div
                              key={shot.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              whileHover={{ scale: 1.02 }}
                              role="listitem"
                              aria-label={`Shot ${index + 1} of ${shots.length}, ${shot.type}, ${shot.status === 'accepted' ? 'accepted' : shot.status === 'rejected' ? 'rejected' : 'pending'}`}
                              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                                shot.status === 'accepted'
                                  ? 'border-accent-teal/50 bg-accent-teal/5 hover:border-accent-teal/70 hover:shadow-[0_0_20px_rgba(0,255,198,0.2)]'
                                  : shot.status === 'rejected'
                                  ? 'border-red-400/50 bg-red-400/5 hover:border-red-400/70'
                                  : 'border-white/10 bg-white/5 hover:border-accent-teal/50 hover:shadow-[0_0_15px_rgba(0,255,198,0.1)]'
                              } ${isSelected ? 'ring-2 ring-accent-teal ring-offset-2 ring-offset-transparent' : ''}`}
                            >
                            {/* Shot Preview */}
                            <div className="relative aspect-video bg-black/20">
                              {shot.type === 'video' ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <Video className="w-16 h-16 text-white/30 absolute" />
                                  <img
                                    src={shot.previewUrl}
                                    alt={`Shot ${index + 1} preview`}
                                    className="w-full h-full object-cover opacity-50"
                                  />
                                  {shot.metadata?.duration && (
                                    <span className="absolute bottom-2 right-2 px-2 py-1 text-xs bg-black/70 rounded text-white">
                                      {Math.round(shot.metadata.duration)}s
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <img
                                  src={shot.previewUrl}
                                  alt={`Shot ${index + 1} preview`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {/* Type Badge */}
                              <span className="absolute top-2 left-2 px-2 py-1 text-xs bg-black/70 rounded flex items-center gap-1 text-white">
                                {shot.type === 'video' ? (
                                  <Video className="w-3 h-3" />
                                ) : (
                                  <Image className="w-3 h-3" />
                                )}
                                {shot.type}
                              </span>
                              {/* Status Badge */}
                              {shot.status !== 'pending' && (
                                <span
                                  className={`absolute top-2 right-2 px-2 py-1 text-xs rounded flex items-center gap-1 ${
                                    shot.status === 'accepted'
                                      ? 'bg-accent-teal/90 text-white'
                                      : 'bg-red-400/90 text-white'
                                  }`}
                                >
                                  {shot.status === 'accepted' ? (
                                    <CheckCircle2 className="w-3 h-3" />
                                  ) : (
                                    <XCircle className="w-3 h-3" />
                                  )}
                                  {shot.status}
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 bg-white/5 flex gap-2">
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1"
                              >
                                <Button
                                  variant={shot.status === 'accepted' ? 'primary' : 'secondary'}
                                  onClick={() => onAccept(shot.id)}
                                  className="w-full text-sm relative overflow-hidden focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2"
                                  disabled={shot.status === 'accepted'}
                                  aria-label={`Accept shot ${index + 1}`}
                                >
                                  {shot.status === 'accepted' && (
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
                                  )}
                                  <span className="relative z-10">
                                    {shot.status === 'accepted' ? 'Accepted' : 'Accept'}
                                  </span>
                                </Button>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1"
                              >
                                <Button
                                  variant={shot.status === 'rejected' ? 'primary' : 'ghost'}
                                  onClick={() => onReject(shot.id)}
                                  className={`w-full text-sm relative overflow-hidden focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2 ${
                                    shot.status === 'rejected'
                                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                                      : ''
                                  }`}
                                  disabled={shot.status === 'rejected'}
                                  aria-label={`Reject shot ${index + 1}`}
                                >
                                  {shot.status === 'rejected' && (
                                    <motion.div
                                      className="absolute inset-0 rounded-lg"
                                      style={{
                                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
                                      }}
                                      animate={{
                                        boxShadow: [
                                          '0 0 20px rgba(239, 68, 68, 0.2)',
                                          '0 0 30px rgba(239, 68, 68, 0.4)',
                                          '0 0 20px rgba(239, 68, 68, 0.2)',
                                        ],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                      }}
                                    />
                                  )}
                                  <span className="relative z-10">
                                    {shot.status === 'rejected' ? 'Rejected' : 'Reject'}
                                  </span>
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {shots.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <p className="text-xs text-white/50" aria-live="polite">
                      Press Escape to close, A to accept, R to reject selected shot
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={onClose} 
                      className="text-sm focus:outline focus:outline-2 focus:outline-accent-teal focus:outline-offset-2"
                      aria-label="Close modal"
                    >
                      Close
                    </Button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

