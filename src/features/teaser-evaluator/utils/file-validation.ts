/**
 * File: file-validation.ts
 * Responsibility: File validation utilities for teaser uploads
 */

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB
const ALLOWED_TYPES = ['video/mp4', 'video/quicktime'];

export function validateTeaserFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Please upload a valid MP4 or MOV file' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size exceeds 200MB limit' };
  }

  return { isValid: true };
}






