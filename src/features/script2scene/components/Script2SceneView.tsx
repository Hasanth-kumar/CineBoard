/**
 * File: Script2SceneView.tsx
 * Responsibility: Main orchestration component for Script2Scene feature
 * Orchestrates: Script input, scene breakdown list, metadata panel, shot preview modal, merge panel, and final preview
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScriptInputPanel from './ScriptInputPanel';
import SceneBreakdownList from './SceneBreakdownList';
import MetadataPanel from './MetadataPanel';
import ShotPreviewModal from './ShotPreviewModal';
import MergeShotsPanel from './MergeShotsPanel';
import FinalPreviewPlayer from './FinalPreviewPlayer';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import SceneCardSkeleton from './SceneCardSkeleton';
import { useSceneState } from '../hooks/useSceneState';
import type { Scene } from '../types';

export default function Script2SceneView() {
  // Use centralized state hook
  const {
    scriptText,
    scenes,
    shots,
    acceptedShots,
    selectedSceneId,
    generationState,
    errorMessage,
    isMerging,
    mergeProgress,
    mergeResult,
    setScriptText,
    analyzeScript,
    selectScene,
    generateShotsForScene,
    acceptShot,
    rejectShot,
    mergeShots,
    reset,
    clearError,
  } = useSceneState();

  // Local state for modal (which scene is being viewed in shot preview modal)
  const [modalSceneId, setModalSceneId] = useState<string | null>(null);

  // Auto-select first scene after analysis completes
  useEffect(() => {
    if (generationState === 'complete' && scenes.length > 0 && !selectedSceneId) {
      selectScene(scenes[0].id);
    }
  }, [generationState, scenes, selectedSceneId, selectScene]);

  const handleAnalyzeScript = async () => {
    await analyzeScript();
  };

  const handleSceneSelect = (sceneId: string) => {
    selectScene(sceneId);
  };

  const handleGenerateShots = async (sceneId: string) => {
    setModalSceneId(sceneId);
    // Generate shots for the scene if not already generated
    if (!shots[sceneId] || shots[sceneId].length === 0) {
      await generateShotsForScene(sceneId);
    }
  };

  const handleCloseModal = () => {
    setModalSceneId(null);
  };

  const handleReEdit = () => {
    // Reset merge result to go back to merge panel
    reset();
  };

  // Derived state
  const selectedScene = scenes.find((scene) => scene.id === selectedSceneId) || null;
  const modalScene = scenes.find((scene) => scene.id === modalSceneId) || null;
  const modalShots = modalSceneId ? (shots[modalSceneId] || []) : [];
  
  // Flatten shots for SceneBreakdownList (it expects Shot[] but hook provides Record<string, Shot[]>)
  const allShots = Object.values(shots).flat();
  
  // Determine if analyzing
  const isAnalyzing = generationState === 'analyzing';
  
  // Check if analysis has been attempted (not idle and not currently analyzing/generating)
  const hasAttemptedAnalysis = generationState !== 'idle' && generationState !== 'analyzing' && generationState !== 'generating';
  
  // Helper to handle error dismiss
  const handleDismissError = () => {
    // Reset to idle state when dismissing error
    reset();
  };
  
  // Helper to handle error retry
  const handleRetryError = async () => {
    if (scriptText.trim()) {
      await analyzeScript();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative min-h-[calc(100vh-4rem)] flex flex-col -m-6 p-6"
    >
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isAnalyzing && 'Analyzing script, please wait'}
        {generationState === 'generating' && 'Generating shots for scenes'}
        {generationState === 'complete' && scenes.length > 0 && `${scenes.length} scene${scenes.length !== 1 ? 's' : ''} generated`}
        {isMerging && `Merging ${acceptedShots.length} accepted shot${acceptedShots.length !== 1 ? 's' : ''}, ${Math.round(mergeProgress)}% complete`}
        {mergeResult && 'Merge complete, final preview ready'}
      </div>
      <div className="relative z-0 flex-1 space-y-6 md:space-y-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Script2Scene</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base">Transform scripts into visual scene concepts</p>
        </motion.div>


        {/* Conditional Rendering: Show FinalPreviewPlayer if mergeResult exists, otherwise show main workflow */}
        {mergeResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalPreviewPlayer
              mergeResult={mergeResult}
              scenes={scenes}
              onReEdit={handleReEdit}
            />
          </motion.div>
        ) : (
          <>
            {/* Error State - Show when generationState is 'error' */}
            {generationState === 'error' && errorMessage && (
              <ErrorState
                message={errorMessage}
                onRetry={handleRetryError}
                onDismiss={handleDismissError}
              />
            )}

            {/* Script Input Panel - Fixed positioned, centered initially, moves to bottom when typing */}
            <ScriptInputPanel
              scriptText={scriptText}
              isLoading={isAnalyzing}
              onScriptChange={setScriptText}
              onAnalyze={handleAnalyzeScript}
            />

            {/* Main Content - Only show if not in error state */}
            {generationState !== 'error' && (
              <div className={`space-y-6 md:space-y-8 ${(isAnalyzing || scenes.length > 0) ? 'pb-24' : ''}`}>
                  {/* Loading State: Show skeletons while analyzing */}
                  {isAnalyzing && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-4">
                        <span className="text-gradient">Scene Breakdown</span>
                      </h2>
                      <SceneCardSkeleton count={4} />
                    </div>
                  )}

                  {/* Scene Breakdown List - Show when not analyzing and has scenes or attempted analysis */}
                  {!isAnalyzing && (scenes.length > 0 || hasAttemptedAnalysis) && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-4">
                        <span className="text-gradient">Scene Breakdown</span>
                      </h2>
                      {/* Only show "no-scenes" if analysis was attempted */}
                      {scenes.length === 0 && hasAttemptedAnalysis ? (
                        <EmptyState
                          type="no-scenes"
                          onAction={handleAnalyzeScript}
                        />
                      ) : scenes.length > 0 ? (
                        <SceneBreakdownList
                          scenes={scenes}
                          shots={allShots}
                          onSceneSelect={handleSceneSelect}
                          onGenerateShots={handleGenerateShots}
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Empty State: No Shots for Selected Scene */}
                  {!isAnalyzing && selectedScene && scenes.length > 0 && (
                    <div>
                      {(() => {
                        const sceneShots = shots[selectedScene.id] || [];
                        if (sceneShots.length === 0) {
                          return (
                            <EmptyState
                              type="no-shots"
                              onAction={() => handleGenerateShots(selectedScene.id)}
                            />
                          );
                        }
                        return null;
                      })()}
                    </div>
                  )}

                  {/* Metadata Panel */}
                  {selectedScene && (
                    <div className="mb-12 md:mb-16">
                      <MetadataPanel
                        metadata={selectedScene.metadata || null}
                        sceneTitle={selectedScene.title}
                      />
                    </div>
                  )}

                  {/* Empty State: No Accepted Shots when trying to merge */}
                  {acceptedShots.length === 0 && !isMerging && scenes.length > 0 && allShots.length > 0 && (
                    <EmptyState
                      type="no-accepted-shots"
                      onAction={() => {
                        // User should review shots in the modal
                        if (scenes.length > 0) {
                          handleGenerateShots(scenes[0].id);
                        }
                      }}
                    />
                  )}

                  {/* Merge Error State - Show when merge fails (but not during generation errors) */}
                  {errorMessage && !isMerging && acceptedShots.length > 0 && generationState === 'complete' && (
                    <ErrorState
                      message={errorMessage}
                      onRetry={mergeShots}
                      onDismiss={clearError}
                    />
                  )}

                  {/* Merge Shots Panel - Show when there are accepted shots */}
                  {acceptedShots.length > 0 && !errorMessage && (
                    <MergeShotsPanel
                      acceptedShotsCount={acceptedShots.length}
                      onMerge={mergeShots}
                      isMerging={isMerging}
                      mergeProgress={mergeProgress}
                    />
                  )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Shot Preview Modal */}
      <ShotPreviewModal
        isOpen={modalSceneId !== null}
        scene={modalScene}
        shots={modalShots}
        onClose={handleCloseModal}
        onAccept={acceptShot}
        onReject={rejectShot}
        isGenerating={generationState === 'generating' && modalSceneId !== null}
      />
    </motion.div>
  );
}


