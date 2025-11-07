'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cinematic">
      <TopNavigation />
      <div className="flex flex-1 overflow-hidden">
        <div >
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

