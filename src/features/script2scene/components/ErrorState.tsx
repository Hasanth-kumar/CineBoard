/**
 * File: ErrorState.tsx
 * Responsibility: Display error states with user-friendly messages and recovery actions
 * Features: Error icon, message, retry and dismiss buttons
 */

'use client';

import { AlertCircle, X, RotateCw } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import Button from '@/src/components/Button';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorState({ message, onRetry, onDismiss }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[300px]"
    >
      <GlassCard className="text-center max-w-md border border-red-500/30" isHoverable={false}>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-red-400 mb-2">
            <AlertCircle className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-bold text-white">Something Went Wrong</h3>
          <p className="text-white/60 text-sm leading-relaxed">{message}</p>
          <div className="flex gap-3 pt-2">
            {onRetry && (
              <Button onClick={onRetry} variant="primary" className="flex items-center gap-2">
                <RotateCw className="w-4 h-4" />
                Retry
              </Button>
            )}
            {onDismiss && (
              <Button onClick={onDismiss} variant="ghost" className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}



