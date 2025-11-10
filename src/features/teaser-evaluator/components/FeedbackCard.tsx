/**
 * File: FeedbackCard.tsx
 * Responsibility: Displays individual AI feedback card with animated icons and content
 * Features: Icon mapping, rating bars, list/text content rendering
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Film, 
  Heart, 
  Palette, 
  Gauge, 
  Volume2, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import type { FeedbackCard as FeedbackCardType } from '../utils/teaser-data';

interface FeedbackCardProps {
  card: FeedbackCardType;
  index: number;
}

// Map card IDs to appropriate icons
const getIcon = (id: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'scene-summary': Film,
    'emotional-tone': Heart,
    'visual-composition': Palette,
    'pacing': Gauge,
    'audio-balance': Volume2,
    'engagement-rating': TrendingUp,
    'scene-highlights': Sparkles,
  };
  return iconMap[id] || Sparkles;
};

export default function FeedbackCard({ card, index }: FeedbackCardProps) {
  const Icon = getIcon(card.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.2,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative rounded-xl p-3 md:p-4 bg-black/40 backdrop-blur-md border border-teal-400/20 overflow-hidden feedback-card"
    >
      {/* Gradient border accent */}
      <div 
        className="absolute inset-0 rounded-xl opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 198, 0.2), rgba(160, 32, 240, 0.2))',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      <div className="relative">
        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}
            className="relative"
          >
            <div
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 198, 0.6))',
              }}
            >
              <Icon 
                className="w-4 h-4 text-accent-teal"
              />
            </div>
          </motion.div>
          {card.title}
        </h4>
        
        {card.type === 'rating' ? (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(card.content as number) * 10}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-accent-teal to-accent-purple rounded-full"
              />
            </div>
            <span className="text-sm font-bold text-accent-teal">
              {card.content}/10
            </span>
          </div>
        ) : card.type === 'list' ? (
          <ul className="text-sm text-white/70 leading-relaxed space-y-1 list-disc list-inside">
            {Array.isArray(card.content) 
              ? card.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))
              : <li>{card.content}</li>
            }
          </ul>
        ) : (
          <p className="text-sm text-white/70 leading-relaxed">
            {card.content}
          </p>
        )}
      </div>
    </motion.div>
  );
}
