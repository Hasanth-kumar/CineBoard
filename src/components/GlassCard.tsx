/**
 * File: GlassCard.tsx
 * Responsibility: Reusable glassmorphic card component with optional hover animations
 * Features: Conditional hover effects, customizable styling
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  isHoverable?: boolean;
}

export default function GlassCard({ children, className = '', isHoverable = true }: GlassCardProps) {
  const Component = isHoverable ? motion.div : 'div';
  
  return (
    <Component
      {...(isHoverable && {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 }
      })}
      className={`glass rounded-2xl p-6 ${isHoverable ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}


