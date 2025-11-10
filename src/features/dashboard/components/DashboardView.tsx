'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Film, Brain } from 'lucide-react';
import DashboardStats from './DashboardStats';
import RecentProjects from './RecentProjects';
import QuickActions from './QuickActions';
import { getDashboardStats, getRecentProjects } from '../utils/dashboard-data';

export default function DashboardView() {
  const stats = getDashboardStats();
  const recentProjects = getRecentProjects();

  const cards = [
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-white/60">Welcome back, here's what's happening</p>
      </div>

      {/* Cinematic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={card.href}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer"
                >
                  {/* Gradient Border - Only on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.gradient} opacity-0 blur-xl group-hover:opacity-75 transition-opacity duration-300`} />
                  
                  {/* Card Content */}
                  <div className="relative glass rounded-3xl p-12 min-h-[300px] flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-white/30">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mb-6"
                    >
                      <div 
                        className="w-20 h-20 rounded-2xl glass flex items-center justify-center transition-all duration-300 icon-gradient-hover"
                        style={{ '--gradient': card.gradientColors } as React.CSSProperties}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-3 text-white">
                      {card.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-white/70 text-lg">
                      {card.subtitle}
                    </p>

                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjects projects={recentProjects} />
        <QuickActions />
      </div>
    </div>
  );
}


