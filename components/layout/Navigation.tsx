'use client';

import { motion } from 'framer-motion';
import { Film, Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Film, label: 'Projects', href: '/projects' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Film className="w-6 h-6 text-accent-teal" />
              <span className="text-xl font-bold text-gradient">CineBoard AI</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full glass-hover cursor-pointer"
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
