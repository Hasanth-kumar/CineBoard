'use client';

import { motion } from 'framer-motion';
import { Clapperboard, FileText, Image, Wand2 } from 'lucide-react';
import GlassCard from '@/src/components/GlassCard';

export default function Script2SceneView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient">Script2Scene</span>
        </h1>
        <p className="text-white/60">Transform scripts into visual scene concepts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-accent-teal" />
              <h3 className="text-xl font-bold">Script Input</h3>
            </div>
            <textarea
              placeholder="Paste your script here...&#10;&#10;INT. COFFEE SHOP - DAY&#10;&#10;A young woman sits by the window, lost in thought..."
              className="w-full h-96 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-teal/50 transition-colors resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full px-6 py-3 rounded-full bg-gradient-to-r from-accent-teal to-accent-purple font-semibold flex items-center justify-center gap-2"
            >
              <Wand2 className="w-5 h-5" />
              Generate Scene
            </motion.button>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <Image className="w-6 h-6 text-accent-purple" />
              <h3 className="text-xl font-bold">Scene Visualization</h3>
            </div>
            <div className="glass rounded-xl aspect-video flex items-center justify-center mb-4">
              <div className="text-center space-y-3">
                <Clapperboard className="w-16 h-16 text-white/20 mx-auto" />
                <p className="text-white/40">Your scene will appear here</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="glass rounded-lg p-3">
                <p className="text-sm font-medium mb-1">Scene Description</p>
                <p className="text-xs text-white/60">AI-generated scene analysis will appear here</p>
              </div>
              <div className="glass rounded-lg p-3">
                <p className="text-sm font-medium mb-1">Suggested Elements</p>
                <p className="text-xs text-white/60">Camera angles, lighting, props...</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}


