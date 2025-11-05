'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Film, Sparkles, Users } from 'lucide-react';
import GlassCard from '@/components/layout/GlassCard';

export default function Dashboard() {
  const stats = [
    { icon: Film, label: 'Total Projects', value: '24', change: '+12%', color: 'text-accent-teal' },
    { icon: Sparkles, label: 'AI Evaluations', value: '156', change: '+28%', color: 'text-accent-purple' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%', change: '+5%', color: 'text-accent-teal' },
    { icon: Users, label: 'Team Members', value: '8', change: '+2', color: 'text-accent-purple' },
  ];

  const recentProjects = [
    { name: 'Cinematic Trailer', status: 'In Progress', progress: 75 },
    { name: 'Product Demo', status: 'Rendering', progress: 45 },
    { name: 'Brand Story', status: 'Draft', progress: 20 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-white/60">Welcome back, here's what's happening</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard hover={false}>
            <h3 className="text-xl font-bold mb-4">Recent Projects</h3>
            <div className="space-y-4">
              {recentProjects.map((project, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-white/60">{project.status}</p>
                    </div>
                    <span className="text-accent-teal text-sm font-medium">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 glass rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-accent-teal to-accent-purple"
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard hover={false}>
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Create New Project', icon: Film },
                { label: 'Evaluate Teaser', icon: Sparkles },
                { label: 'Generate Scene', icon: TrendingUp },
              ].map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass glass-hover rounded-lg p-4 flex items-center gap-3"
                >
                  <action.icon className="w-5 h-5 text-accent-teal" />
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
