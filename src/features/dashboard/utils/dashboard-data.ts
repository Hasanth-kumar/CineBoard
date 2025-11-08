/**
 * File: dashboard-data.ts
 * Responsibility: Provides mock data utilities for dashboard statistics and recent projects.
 */

import { TrendingUp, Film, Sparkles, Users } from 'lucide-react';

export interface Stat {
  icon: typeof Film;
  label: string;
  value: string;
  change: string;
  color: string;
}

export interface Project {
  name: string;
  status: string;
  progress: number;
}

export const getDashboardStats = (): Stat[] => [
  { icon: Film, label: 'Total Projects', value: '24', change: '+12%', color: 'text-accent-teal' },
  { icon: Sparkles, label: 'AI Evaluations', value: '156', change: '+28%', color: 'text-accent-purple' },
  { icon: TrendingUp, label: 'Success Rate', value: '94%', change: '+5%', color: 'text-accent-teal' },
  { icon: Users, label: 'Team Members', value: '8', change: '+2', color: 'text-accent-purple' },
];

export const getRecentProjects = (): Project[] => [
  { name: 'Cinematic Trailer', status: 'In Progress', progress: 75 },
  { name: 'Product Demo', status: 'Rendering', progress: 45 },
  { name: 'Brand Story', status: 'Draft', progress: 20 },
];


