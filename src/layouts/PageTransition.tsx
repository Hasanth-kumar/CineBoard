/**
 * File: PageTransition.tsx
 * Responsibility: Page transition wrapper with cinematic lens flare effects
 * Features: Smooth page transitions with blur and brightness effects
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-content"
        initial={{ opacity: 0, filter: 'brightness(0.5) blur(20px)', scale: 1.1 }}
        animate={{ opacity: 1, filter: 'brightness(1) blur(0px)', scale: 1 }}
        exit={{ opacity: 0, filter: 'brightness(0.5) blur(20px)', scale: 0.9 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          position: 'relative',
        }}
      >
        {/* Lens flare overlay effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.6,
            times: [0, 0.5, 1],
          }}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 255, 198, 0.4) 0%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <div className="relative z-0">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}






