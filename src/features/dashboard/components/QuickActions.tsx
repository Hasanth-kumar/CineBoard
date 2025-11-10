/**
 * File: QuickActions.tsx
 * Responsibility: Displays quick action buttons for common dashboard tasks
 * Features: Animated action buttons with hover effects
 */

'use client';

import { motion } from 'framer-motion';
import { Film, Sparkles, TrendingUp, LucideIcon } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';

interface Action {
  label: string;
  icon: LucideIcon;
}

const ACTIONS: Action[] = [
  { label: 'Create New Project', icon: Film },
  { label: 'Evaluate Teaser', icon: Sparkles },
  { label: 'Generate Scene', icon: TrendingUp },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <GlassCard isHoverable={false}>
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {ACTIONS.map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass glass-hover rounded-lg p-4 flex items-center gap-3 hover-glow"
            >
              <action.icon className="w-5 h-5 text-accent-teal" />
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}


