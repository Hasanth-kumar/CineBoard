'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/src/components/GlassCard';
import { getSettings } from '../utils/settingsData';

export default function SettingsView() {
  const settings = getSettings();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-white/60 text-lg">Customize your experience</p>
        </div>

        <div className="space-y-4">
          {settings.map((setting, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="flex items-center gap-4 cursor-pointer">
                <div className={`glass p-4 rounded-xl ${setting.color}`}>
                  <setting.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{setting.title}</h3>
                  <p className="text-white/60 text-sm">{setting.description}</p>
                </div>
                <div className="text-white/40">›</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


