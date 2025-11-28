/**
 * File: mock-ai-service.ts
 * Responsibility: Mock AI service facade that simulates async script analysis with deterministic scene generation
 */

import type { Scene, Shot, MergeResult } from '../types';
import type { AIService } from './ai-service';
import { generateMockScenes } from '../utils/script-data';

/**
 * Mock AI service object that simulates script analysis
 * Implements AIService interface for easy swap with real AI services
 */
export const useMockAI: AIService = {
  /**
   * Analyzes a script and returns a promise of scene breakdowns
   * Simulates async delay of 1.5-2 seconds
   *
   * @param scriptText - The screenplay text to analyze
   * @returns Promise that resolves to an array of Scene objects
   */
  analyzeScript: (scriptText: string): Promise<Scene[]> => {
    return new Promise((resolve) => {
      // Simulate async delay between 1.5-2 seconds
      const delay = 1500 + Math.random() * 500; // 1500-2000ms

      setTimeout(() => {
        const scenes = generateMockScenes(scriptText);
        resolve(scenes);
      }, delay);
    });
  },

  /**
   * Generates mock shots for a given scene
   * Simulates async delay of 2-3 seconds
   *
   * @param sceneId - The ID of the scene to generate shots for
   * @param scene - The scene object containing metadata for shot generation
   * @returns Promise that resolves to an array of Shot objects
   */
  generateShotsForScene: (sceneId: string, scene: Scene): Promise<Shot[]> => {
    return new Promise((resolve) => {
      // Simulate async delay between 2-3 seconds
      const delay = 2000 + Math.random() * 1000; // 2000-3000ms

      setTimeout(() => {
        // Generate 2-4 mock shots per scene (mix of image/video types)
        const shotCount = 2 + Math.floor(Math.random() * 3); // 2-4 shots
        const shots: Shot[] = [];

        for (let i = 0; i < shotCount; i++) {
          const isVideo = Math.random() > 0.5; // 50% chance of video
          const shotId = `${sceneId}-shot-${i + 1}`;
          
          shots.push({
            id: shotId,
            sceneId,
            type: isVideo ? 'video' : 'image',
            previewUrl: `https://via.placeholder.com/800x450?text=${encodeURIComponent(scene.title)}+Shot+${i + 1}`,
            status: 'pending',
            metadata: isVideo ? { duration: 3 + Math.random() * 5 } : {}, // 3-8 seconds for videos
          });
        }

        resolve(shots);
      }, delay);
    });
  },

  /**
   * Merges all accepted shots into a final preview
   * Simulates async delay of 3-4 seconds
   *
   * @param shots - Array of Shot objects to merge
   * @returns Promise that resolves to a MergeResult object
   */
  mergeShots: (shots: Shot[]): Promise<MergeResult> => {
    return new Promise((resolve) => {
      // Simulate async delay between 3-4 seconds
      const delay = 3000 + Math.random() * 1000; // 3000-4000ms

      setTimeout(() => {
        // Calculate total duration from shot metadata
        const totalDuration = shots.reduce((sum, shot) => {
          if (shot.type === 'video' && shot.metadata?.duration) {
            return sum + shot.metadata.duration;
          }
          // Images contribute 2 seconds each
          return sum + 2;
        }, 0);

        // Extract unique scene IDs
        const sceneIds = Array.from(new Set(shots.map((shot) => shot.sceneId)));

        // Generate a mock preview URL (placeholder video)
        const previewUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

        const mergeResult: MergeResult = {
          success: true,
          previewUrl,
          sceneIds,
          totalDuration: Math.round(totalDuration),
        };

        resolve(mergeResult);
      }, delay);
    });
  },
};




