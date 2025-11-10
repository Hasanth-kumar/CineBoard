/**
 * File: TeaserEvaluatorView.tsx
 * Responsibility: Main container component for the teaser evaluator feature
 * Orchestrates: File upload, evaluation display, comparison view, and suggestions
 */

'use client';

import { useTeaserUpload } from '../hooks/useTeaserUpload';
import { useAutoApplyFix } from '../hooks/useAutoApplyFix';
import { getMockFeedbackCards, getMockSuggestions } from '../utils/teaser-data';
import UploadSection from './UploadSection';
import EvaluationView from './EvaluationView';
import ComparisonView from './ComparisonView';
import SuggestionsSection from './SuggestionsSection';

export default function TeaserEvaluatorView() {
  const {
    file,
    isDragging,
    videoUrl,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleClick,
  } = useTeaserUpload();

  const { 
    isApplyingFix, 
    showToast, 
    showComparison,
    handleAutoApplyFix,
    handleAcceptChanges,
    handleRevert,
  } = useAutoApplyFix();

  const feedbackCards = getMockFeedbackCards();
  const suggestions = getMockSuggestions();

  if (!file) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col -m-6 p-6">
        {/* Background animation is now global in AppShell */}
        <div className="relative z-0 flex-1">
          <UploadSection
            isDragging={isDragging}
            fileInputRef={fileInputRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            onFileSelect={handleFileSelect}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col -m-6 p-6">
      {/* Background animation is now global in AppShell */}
      <div className="relative z-0 flex-1 space-y-6 md:space-y-8">
        {showComparison ? (
          <ComparisonView 
            videoUrl={videoUrl} 
            onAcceptChanges={handleAcceptChanges}
            onRevert={handleRevert}
          />
        ) : (
          <EvaluationView videoUrl={videoUrl} feedbackCards={feedbackCards} />
        )}
        <SuggestionsSection
          suggestions={suggestions}
          isApplyingFix={isApplyingFix}
          showToast={showToast}
          onAutoApplyFix={handleAutoApplyFix}
        />
      </div>
    </div>
  );
}
