/**
 * File: useAutoApplyFix.ts
 * Responsibility: Handles auto-apply fix state and animation
 */

import { useState, useCallback } from 'react';

export function useAutoApplyFix() {
  const [isApplyingFix, setIsApplyingFix] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAutoApplyFix = useCallback(() => {
    setIsApplyingFix(true);
    setShowToast(false);
    // Simulate AI processing - 2s as specified
    setTimeout(() => {
      setIsApplyingFix(false);
      setShowToast(true);
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 2000);
  }, []);

  return {
    isApplyingFix,
    showToast,
    handleAutoApplyFix,
  };
}

