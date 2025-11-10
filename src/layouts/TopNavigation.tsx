'use client';

import { motion } from 'framer-motion';
import { Film, User, Bell } from 'lucide-react';
import Link from 'next/link';

export default function TopNavigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative glass border-b border-white/10"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-teal to-accent-purple p-2 flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">CineBoard AI</h1>
              <p className="text-xs text-white/50">Cinematic Intelligence</p>
            </div>
          </motion.div>
        </Link>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg glass-hover"
          >
            <Bell className="w-5 h-5 text-white/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-teal rounded-full"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 glass glass-hover px-4 py-2 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-teal to-accent-purple flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">John Doe</span>
          </motion.button>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, rgba(0, 255, 198, 0.3), rgba(160, 32, 240, 0.3))',
        }}
      />
    </motion.nav>
  );
}






