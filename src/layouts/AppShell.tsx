/**
 * File: AppShell.tsx
 * Responsibility: Main application shell layout with navigation, sidebar, and footer
 * Features: Consistent layout structure across all pages
 */

'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';
import Footer from '@/src/components/Footer';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Global animated gradient background */}
      <div className="fixed inset-0 bg-gradient-wave -z-10" />
      
      <TopNavigation />
      <div className="flex flex-1 overflow-hidden relative z-0">
        <div>
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-6 flex flex-col relative z-0">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

