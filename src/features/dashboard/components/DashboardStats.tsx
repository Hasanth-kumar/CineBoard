/**
 * File: DashboardStats.tsx
 * Responsibility: Displays dashboard statistics cards with icons and metrics
 * Features: Animated stat cards with trend indicators
 */

'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Film, Sparkles, Users, LucideIcon } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  color: string;
}

interface DashboardStatsProps {
  stats: Stat[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard className="relative overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div className={`glass p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}






