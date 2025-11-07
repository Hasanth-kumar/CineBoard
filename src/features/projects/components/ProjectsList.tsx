'use client';

import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';
import { Project } from '../utils/projectsData';

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
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
  );
}


