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
      <UploadSection
        isDragging={isDragging}
        fileInputRef={fileInputRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onFileSelect={handleFileSelect}
      />
    );
  }

  return (
    <>
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
    </>
  );
}
