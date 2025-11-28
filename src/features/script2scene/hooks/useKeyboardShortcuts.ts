/**
 * File: useKeyboardShortcuts.ts
 * Responsibility: Keyboard shortcuts hook for Script2Scene modal interactions
 * Features: Accept (A), Reject (R), Escape (close), Arrow navigation (optional)
 */

'use client';

import { useEffect, useRef } from 'react';

interface UseKeyboardShortcutsOptions {
  isEnabled: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onClose?: () => void;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  selectedShotIndex?: number;
  totalShots?: number;
}

/**
 * Hook for handling keyboard shortcuts in the shot preview modal
 * - 'A' key: Accept selected shot
 * - 'R' key: Reject selected shot
 * - 'Escape' key: Close modal
 * - 'ArrowLeft' key: Navigate to previous shot (optional)
 * - 'ArrowRight' key: Navigate to next shot (optional)
 */
export function useKeyboardShortcuts({
  isEnabled,
  onAccept,
  onReject,
  onClose,
  onNavigateLeft,
  onNavigateRight,
  selectedShotIndex = 0,
  totalShots = 0,
}: UseKeyboardShortcutsOptions) {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Only handle shortcuts when enabled and not typing in an input
    if (!isEnabled) return;
    
    // Ignore if user is typing in an input, textarea, or contenteditable
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }

    // Prevent default behavior for our shortcuts
    switch (e.key) {
      case 'a':
      case 'A':
        if (onAccept && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          onAccept();
        }
        break;
      case 'r':
      case 'R':
        if (onReject && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          onReject();
        }
        break;
      case 'Escape':
        if (onClose) {
          e.preventDefault();
          onClose();
        }
        break;
      case 'ArrowLeft':
        if (onNavigateLeft && selectedShotIndex > 0) {
          e.preventDefault();
          onNavigateLeft();
        }
        break;
      case 'ArrowRight':
        if (onNavigateRight && selectedShotIndex < totalShots - 1) {
          e.preventDefault();
          onNavigateRight();
        }
        break;
    }
  };

  useEffect(() => {
    if (!isEnabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onAccept, onReject, onClose, onNavigateLeft, onNavigateRight, selectedShotIndex, totalShots]);
}



