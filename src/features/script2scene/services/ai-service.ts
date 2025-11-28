/**
 * File: ai-service.ts
 * Responsibility: Service facade for AI integrations. Provides a unified interface for script analysis, shot generation, and video merging. Currently returns mock service, structured for easy swap to real AI services.
 */

import type { Scene, Shot, MergeResult } from '../types';
import { useMockAI } from './mock-ai-service';

/**
 * Interface contract for AI service implementations
 * Defines the core methods required for script analysis and video generation
 */
export interface AIService {
  /**
   * Analyzes a script and extracts scene breakdowns
   * @param scriptText - The screenplay text to analyze
   * @returns Promise that resolves to an array of Scene objects
   */
  analyzeScript(scriptText: string): Promise<Scene[]>;

  /**
   * Generates shots (images or videos) for a given scene
   * @param sceneId - The ID of the scene to generate shots for
   * @param scene - The scene object containing metadata for shot generation
   * @returns Promise that resolves to an array of Shot objects
   */
  generateShotsForScene(sceneId: string, scene: Scene): Promise<Shot[]>;

  /**
   * Merges multiple shots into a single video output
   * @param shots - Array of Shot objects to merge
   * @returns Promise that resolves to a MergeResult object
   */
  mergeShots(shots: Shot[]): Promise<MergeResult>;
}

/**
 * Gets the current AI service implementation
 * TODO: Replace with Gemini API for script analysis
 * TODO: Replace with Flow/Shotstack for video generation
 * TODO: Replace with ElevenLabs for voice generation
 * 
 * Currently returns the mock service for development/testing.
 * In production, this should return the real AI service implementation.
 * 
 * @returns The current AIService implementation
 */
export function getAIService(): AIService {
  // Currently returns mock service
  // Future: return real AI service based on environment or configuration
  return useMockAI;
}



