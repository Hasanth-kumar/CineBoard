/**
 * File: ProfileView.tsx
 * Responsibility: User profile page displaying profile information and bio
 * Features: Profile card, user information, and bio sections
 */

'use client';

import { motion } from 'framer-motion';
import { User, Mail, Award, Calendar } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';

export default function ProfileView() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">
          <span className="text-gradient">Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <GlassCard isHoverable={false}>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full glass mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-accent-teal" />
                </div>
                <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                <p className="text-white/60">Creative Director</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-6"
          >
            <GlassCard isHoverable={false}>
              <h3 className="text-xl font-bold mb-4">Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent-teal" />
                  <span className="text-white/80">john.doe@cineboard.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent-purple" />
                  <span className="text-white/80">Joined November 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-accent-teal" />
                  <span className="text-white/80">12 Projects Completed</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard isHoverable={false}>
              <h3 className="text-xl font-bold mb-4">Bio</h3>
              <p className="text-white/70 leading-relaxed">
                Passionate creative professional specializing in cinematic content creation.
                Leveraging AI-powered tools to bring innovative storytelling to life.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


