/**
 * File: SceneBreakdownList.tsx
 * Responsibility: Displays a responsive grid of SceneCard components with empty state handling
 * Features: Responsive grid layout, container entrance animation, empty state message
 */

'use client';

import { motion } from 'framer-motion';
import SceneCard from './SceneCard';
import type { Scene, Shot } from '../types';

interface SceneBreakdownListProps {
  scenes: Scene[];
  shots?: Shot[];
  onSceneSelect?: (sceneId: string) => void;
  onGenerateShots?: (sceneId: string) => void;
}

export default function SceneBreakdownList({ scenes, shots = [], onSceneSelect, onGenerateShots }: SceneBreakdownListProps) {
  if (scenes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 px-4"
      >
        <p className="text-white/60 text-lg">
          No scenes generated yet. Analyze a script to begin.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {scenes.map((scene, index) => (
        <SceneCard
          key={scene.id}
          scene={scene}
          index={index}
          shots={shots}
          onSelect={onSceneSelect}
          onGenerateShots={onGenerateShots}
        />
      ))}
    </motion.div>
  );
}

