'use client';

import { motion } from 'framer-motion';
import { Film, Plus } from 'lucide-react';
import GlassCard from '@/components/layout/GlassCard';

export default function ProjectsPage() {
  const projects = [
    { id: 1, title: 'Cinematic Trailer', status: 'In Progress', progress: 75 },
    { id: 2, title: 'Product Demo', status: 'Rendering', progress: 45 },
    { id: 3, title: 'Brand Story', status: 'Draft', progress: 20 },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-white/60 text-lg">Manage your creative projects</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass glass-hover px-6 py-3 rounded-full flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-start gap-4 mb-4">
                  <div className="glass p-3 rounded-lg">
                    <Film className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-white/60 text-sm">{project.status}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Progress</span>
                    <span className="text-accent-teal">{project.progress}%</span>
                  </div>
                  <div className="h-2 glass rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      className="h-full bg-gradient-to-r from-accent-teal to-accent-purple"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
