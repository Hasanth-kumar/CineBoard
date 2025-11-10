/**
 * File: dashboard-data.ts
 * Responsibility: Provides mock data utilities for dashboard statistics, recent projects, and dashboard cards.
 */

import { TrendingUp, Film, Sparkles, Users, Brain, LucideIcon } from 'lucide-react';

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

export interface DashboardCard {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  href: string;
  gradient: string;
  gradientColors: string;
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

export const getDashboardCards = (): DashboardCard[] => [
  {
    icon: Film,
    title: 'Teaser Evaluator',
    subtitle: 'Analyze your teaser like a pro',
    href: '/teaser-evaluator',
    gradient: 'from-accent-teal to-accent-purple',
    gradientColors: 'linear-gradient(to bottom right, #00FFC6, #A020F0)',
  },
  {
    icon: Brain,
    title: 'Script2Scene',
    subtitle: 'Turn scripts into cinematic scenes',
    href: '/script2scene',
    gradient: 'from-accent-purple to-accent-teal',
    gradientColors: 'linear-gradient(to bottom right, #A020F0, #00FFC6)',
  },
];


