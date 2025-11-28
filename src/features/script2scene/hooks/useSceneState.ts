/**
 * File: useSceneState.ts
 * Responsibility: Centralized hook that manages all Script2Scene state including script text, scenes, shots, accepted/rejected shots, selected scene, merge state, and generation states. Provides actions for all user interactions.
 */

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { Scene, Shot, GenerationState, MergeResult } from '../types';
import { getAIService } from '../services/ai-service';

/**
 * Hook that manages all Script2Scene state and provides actions for user interactions
 */
export function useSceneState() {
  // State variables
  const [scriptText, setScriptTextState] = useState<string>('');
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [shots, setShots] = useState<Record<string, Shot[]>>({});
  const [acceptedShots, setAcceptedShots] = useState<Shot[]>([]);
  const [rejectedShots, setRejectedShots] = useState<Shot[]>([]);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [mergeProgress, setMergeProgress] = useState<number>(0);
  const [mergeResult, setMergeResult] = useState<MergeResult | null>(null);

  // Ref to track merge progress interval
  const mergeProgressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup merge progress interval on unmount or when merge completes
  useEffect(() => {
    return () => {
      if (mergeProgressIntervalRef.current) {
        clearInterval(mergeProgressIntervalRef.current);
      }
    };
  }, []);

  /**
   * Sets the script text
   */
  const setScriptText = useCallback((text: string) => {
    setScriptTextState(text);
  }, []);

  // Get AI service instance (memoized for stability)
  const aiService = useMemo(() => getAIService(), []);

  /**
   * Analyzes the script and generates scene breakdowns
   */
  const analyzeScript = useCallback(async () => {
    if (!scriptText.trim()) {
      console.warn('Cannot analyze empty script');
      return;
    }

    try {
      setGenerationState('analyzing');
      setErrorMessage(null);
      setScenes([]);
      setShots({});
      setAcceptedShots([]);
      setRejectedShots([]);
      setSelectedSceneId(null);
      setMergeResult(null);

      const generatedScenes = await aiService.analyzeScript(scriptText);
      setScenes(generatedScenes);
      setGenerationState('complete');
    } catch (error) {
      console.error('Error analyzing script:', error);
      setErrorMessage('Something went wrong while analyzing your script. Please try again.');
      setGenerationState('error');
    }
  }, [scriptText]);

  /**
   * Selects a scene by ID
   */
  const selectScene = useCallback((sceneId: string | null) => {
    setSelectedSceneId(sceneId);
  }, []);

  /**
   * Generates shots for a specific scene
   */
  const generateShotsForScene = useCallback(async (sceneId: string) => {
    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene) {
      console.warn(`Scene with id ${sceneId} not found`);
      return;
    }

    try {
      setGenerationState('generating');
      setErrorMessage(null);
      const generatedShots = await aiService.generateShotsForScene(sceneId, scene);
      
      // Update shots record for this scene
      setShots((prevShots) => ({
        ...prevShots,
        [sceneId]: generatedShots,
      }));
      
      setGenerationState('complete');
    } catch (error) {
      console.error('Error generating shots:', error);
      setErrorMessage('Something went wrong while generating shots. Please try again.');
      setGenerationState('error');
    }
  }, [scenes]);

  /**
   * Accepts a shot by moving it to accepted and removing from rejected
   */
  const acceptShot = useCallback((shotId: string) => {
    setShots((prevShots) => {
      const updatedShots = { ...prevShots };
      
      // Find and update the shot in all scenes
      Object.keys(updatedShots).forEach((sceneId) => {
        const sceneShots = updatedShots[sceneId];
        const shotIndex = sceneShots.findIndex((shot) => shot.id === shotId);
        
        if (shotIndex !== -1) {
          const shot = sceneShots[shotIndex];
          const updatedShot = { ...shot, status: 'accepted' as const };
          updatedShots[sceneId] = [
            ...sceneShots.slice(0, shotIndex),
            updatedShot,
            ...sceneShots.slice(shotIndex + 1),
          ];
        }
      });
      
      return updatedShots;
    });

    // Move shot to accepted, remove from rejected
    setAcceptedShots((prevAccepted) => {
      // Check if already in accepted
      if (prevAccepted.some((shot) => shot.id === shotId)) {
        return prevAccepted;
      }

      // Find the shot from all scenes
      const allShots = Object.values(shots).flat();
      const shot = allShots.find((s) => s.id === shotId);
      
      if (shot) {
        return [...prevAccepted, { ...shot, status: 'accepted' as const }];
      }
      return prevAccepted;
    });

    setRejectedShots((prevRejected) => 
      prevRejected.filter((shot) => shot.id !== shotId)
    );
  }, [shots]);

  /**
   * Rejects a shot by moving it to rejected and removing from accepted
   */
  const rejectShot = useCallback((shotId: string) => {
    setShots((prevShots) => {
      const updatedShots = { ...prevShots };
      
      // Find and update the shot in all scenes
      Object.keys(updatedShots).forEach((sceneId) => {
        const sceneShots = updatedShots[sceneId];
        const shotIndex = sceneShots.findIndex((shot) => shot.id === shotId);
        
        if (shotIndex !== -1) {
          const shot = sceneShots[shotIndex];
          const updatedShot = { ...shot, status: 'rejected' as const };
          updatedShots[sceneId] = [
            ...sceneShots.slice(0, shotIndex),
            updatedShot,
            ...sceneShots.slice(shotIndex + 1),
          ];
        }
      });
      
      return updatedShots;
    });

    // Move shot to rejected, remove from accepted
    setRejectedShots((prevRejected) => {
      // Check if already in rejected
      if (prevRejected.some((shot) => shot.id === shotId)) {
        return prevRejected;
      }

      // Find the shot from all scenes
      const allShots = Object.values(shots).flat();
      const shot = allShots.find((s) => s.id === shotId);
      
      if (shot) {
        return [...prevRejected, { ...shot, status: 'rejected' as const }];
      }
      return prevRejected;
    });

    setAcceptedShots((prevAccepted) => 
      prevAccepted.filter((shot) => shot.id !== shotId)
    );
  }, [shots]);

  /**
   * Merges all accepted shots into a final preview
   */
  const mergeShots = useCallback(async () => {
    if (acceptedShots.length === 0) {
      console.warn('No accepted shots to merge');
      return;
    }

    try {
      setIsMerging(true);
      setErrorMessage(null);
      setMergeProgress(0);
      setMergeResult(null);

      // Simulate progress updates
      mergeProgressIntervalRef.current = setInterval(() => {
        setMergeProgress((prev) => {
          if (prev >= 90) {
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      const result = await aiService.mergeShots(acceptedShots);
      
      // Clear progress interval
      if (mergeProgressIntervalRef.current) {
        clearInterval(mergeProgressIntervalRef.current);
        mergeProgressIntervalRef.current = null;
      }
      
      setMergeProgress(100);
      setMergeResult(result);
      setIsMerging(false);
    } catch (error) {
      console.error('Error merging shots:', error);
      
      // Clear progress interval on error
      if (mergeProgressIntervalRef.current) {
        clearInterval(mergeProgressIntervalRef.current);
        mergeProgressIntervalRef.current = null;
      }
      
      setErrorMessage('Something went wrong while merging shots. Please try again.');
      setIsMerging(false);
      setMergeProgress(0);
    }
  }, [acceptedShots]);

  /**
   * Resets all state to initial values
   */
  const reset = useCallback(() => {
    setScriptTextState('');
    setScenes([]);
    setShots({});
    setAcceptedShots([]);
    setRejectedShots([]);
    setSelectedSceneId(null);
    setGenerationState('idle');
    setErrorMessage(null);
    setIsMerging(false);
    setMergeProgress(0);
    setMergeResult(null);

    // Clear merge progress interval if active
    if (mergeProgressIntervalRef.current) {
      clearInterval(mergeProgressIntervalRef.current);
      mergeProgressIntervalRef.current = null;
    }
  }, []);

  /**
   * Clears the error message
   */
  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  /**
   * Undo last action (stubbed for future implementation)
   */
  const undo = useCallback(() => {
    // TODO: Implement undo functionality
    console.warn('Undo functionality not yet implemented');
  }, []);

  /**
   * Redo last undone action (stubbed for future implementation)
   */
  const redo = useCallback(() => {
    // TODO: Implement redo functionality
    console.warn('Redo functionality not yet implemented');
  }, []);

  return {
    // State
    scriptText,
    scenes,
    shots,
    acceptedShots,
    rejectedShots,
    selectedSceneId,
    generationState,
    errorMessage,
    isMerging,
    mergeProgress,
    mergeResult,
    // Actions
    setScriptText,
    analyzeScript,
    selectScene,
    generateShotsForScene,
    acceptShot,
    rejectShot,
    mergeShots,
    reset,
    clearError,
    undo,
    redo,
  };
}

