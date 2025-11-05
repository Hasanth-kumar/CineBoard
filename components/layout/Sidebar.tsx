'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Film, 
  Sparkles, 
  Clapperboard, 
  FolderOpen, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Film, label: 'Projects', href: '/projects' },
  { icon: Sparkles, label: 'Teaser Evaluator', href: '/teaser-evaluator' },
  { icon: Clapperboard, label: 'Script2Scene', href: '/script2scene' },
  { icon: FolderOpen, label: 'Assets', href: '/assets' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: isExpanded ? 240 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass border-r border-white/10 flex flex-col h-full relative"
    >
      <div className="flex-1 py-6 px-3 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 shadow-lg' 
                    : 'hover:bg-white/5'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 255, 198, 0.3), 0 0 40px rgba(160, 32, 240, 0.2)',
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10">
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive 
                        ? 'text-accent-teal' 
                        : 'text-white/60 group-hover:text-white'
                    }`} 
                  />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        relative z-10 text-sm font-medium whitespace-nowrap
                        ${isActive ? 'text-white' : 'text-white/70'}
                      `}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-white/10 p-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full glass glass-hover rounded-lg p-3 flex items-center justify-center"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white/60" />
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
