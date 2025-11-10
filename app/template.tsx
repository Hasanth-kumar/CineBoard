/**
 * File: template.tsx
 * Responsibility: Next.js template wrapper for page transitions
 * Features: Wraps all pages with PageTransition component for smooth animations
 */

'use client';

import PageTransition from '@/src/layouts/PageTransition';
import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
