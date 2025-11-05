'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const Component = hover ? motion.div : 'div';
  
  return (
    <Component
      {...(hover && {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 }
      })}
      className={`glass rounded-2xl p-6 ${hover ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
