'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ProjectsList from './ProjectsList';
import { getProjects } from '../utils/projectsData';

export default function ProjectsView() {
  const projects = getProjects();

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

        <ProjectsList projects={projects} />
      </div>
    </div>
  );
}


