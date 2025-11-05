'use client';

import { motion } from 'framer-motion';
import { Sparkles, Film, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-4 mb-8"
        >
          <div className="glass p-4 rounded-2xl">
            <Sparkles className="w-12 h-12 text-accent-teal" />
          </div>
          <div className="glass p-4 rounded-2xl">
            <Film className="w-12 h-12 text-accent-purple" />
          </div>
          <div className="glass p-4 rounded-2xl">
            <Zap className="w-12 h-12 text-accent-teal" />
          </div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-bold">
          <span className="text-gradient">CineBoard AI</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">
          A cinematic AI-powered platform with premium glassmorphic design
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button className="glass glass-hover px-8 py-4 rounded-full font-semibold text-lg">
            Get Started
          </button>
          <button className="glass glass-hover px-8 py-4 rounded-full font-semibold text-lg border-accent-teal">
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { icon: Sparkles, title: 'AI Powered', desc: 'Advanced AI capabilities' },
            { icon: Film, title: 'Cinematic', desc: 'Beautiful premium design' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass glass-hover p-6 rounded-2xl"
            >
              <feature.icon className="w-8 h-8 text-accent-teal mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
