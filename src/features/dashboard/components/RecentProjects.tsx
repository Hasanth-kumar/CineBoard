'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/src/components/GlassCard';

interface Project {
  name: string;
  status: string;
  progress: number;
}

interface RecentProjectsProps {
  projects: Project[];
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <GlassCard isHoverable={false}>
        <h3 className="text-xl font-bold mb-4">Recent Projects</h3>
        <div className="space-y-4">
          {projects.map((project, i) => (
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
  );
}


