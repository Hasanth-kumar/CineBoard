'use client';

import DashboardStats from './DashboardStats';
import RecentProjects from './RecentProjects';
import QuickActions from './QuickActions';
import { getDashboardStats, getRecentProjects } from '../utils/dashboard-data';

export default function DashboardView() {
  const stats = getDashboardStats();
  const recentProjects = getRecentProjects();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-white/60">Welcome back, here's what's happening</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjects projects={recentProjects} />
        <QuickActions />
      </div>
    </div>
  );
}


