/**
 * File: EmptyState.tsx
 * Responsibility: Display graceful empty states for different scenarios in Script2Scene workflow
 * Features: Different types of empty states with appropriate icons, messages, and CTAs
 */

'use client';

import { FileText, Film, Camera, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import Button from '@/src/components/Button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type: 'no-script' | 'no-scenes' | 'no-shots' | 'no-accepted-shots';
  onAction?: () => void;
}

const emptyStateConfig = {
  'no-script': {
    icon: FileText,
    title: 'No Script Provided',
    message: 'Enter your script text to begin analyzing and generating scenes.',
    actionLabel: 'Enter Script',
    iconColor: 'text-accent-teal',
  },
  'no-scenes': {
    icon: Film,
    title: 'No Scenes Found',
    message: 'We couldn\'t extract any scenes from your script. Please try with a different script or check your input.',
    actionLabel: 'Try Again',
    iconColor: 'text-accent-purple',
  },
  'no-shots': {
    icon: Camera,
    title: 'No Shots Generated',
    message: 'This scene doesn\'t have any shots yet. Generate shots to see visual previews.',
    actionLabel: 'Generate Shots',
    iconColor: 'text-accent-teal',
  },
  'no-accepted-shots': {
    icon: CheckCircle2,
    title: 'No Accepted Shots',
    message: 'You need to accept at least one shot before merging. Review and accept shots from your scenes.',
    actionLabel: 'Review Shots',
    iconColor: 'text-accent-purple',
  },
};

export default function EmptyState({ type, onAction }: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <GlassCard className="text-center max-w-md" isHoverable={false}>
        <div className="flex flex-col items-center space-y-4">
          <div className={`${config.iconColor} mb-2`}>
            <Icon className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-bold text-white">{config.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{config.message}</p>
          {onAction && (
            <div className="pt-2">
              <Button onClick={onAction} variant="primary">
                {config.actionLabel}
              </Button>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}



