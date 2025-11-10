/**
 * File: useAutoApplyFix.ts
 * Responsibility: Handles auto-apply fix state and animation
 */

import { useState, useCallback } from 'react';

export function useAutoApplyFix() {
  const [isApplyingFix, setIsApplyingFix] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleAutoApplyFix = useCallback(() => {
    setIsApplyingFix(true);
    setShowToast(false);
    setShowComparison(false);
    // Simulate AI processing - 2s as specified
    setTimeout(() => {
      setIsApplyingFix(false);
      setShowComparison(true);
      setShowToast(true);
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 2000);
  }, []);

  const handleAcceptChanges = useCallback(() => {
    setShowComparison(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, []);

  const handleRevert = useCallback(() => {
    setShowComparison(false);
  }, []);

  return {
    isApplyingFix,
    showToast,
    showComparison,
    handleAutoApplyFix,
    handleAcceptChanges,
    handleRevert,
  };
}

