/**
 * File: scene.ts
 * Responsibility: Type definitions for Script2Scene feature including scenes, shots, metadata, and state management
 */

/**
 * Metadata associated with a scene, describing its visual and atmospheric characteristics
 */
export interface SceneMetadata {
  /** The environment or location where the scene takes place */
  environment: string;
  /** The lighting style used in the scene (e.g., "natural", "dramatic", "soft") */
  lightingStyle: string;
  /** Array of ambient elements that contribute to the scene's atmosphere */
  ambience: string[];
  /** The camera direction or angle for the scene */
  cameraDirection: string;
  /** The overall tone or mood of the scene */
  tone: string;
}

/**
 * Represents a scene extracted from a script, containing descriptive information and metadata
 */
export interface Scene {
  /** Unique identifier for the scene */
  id: string;
  /** Title or name of the scene */
  title: string;
  /** Detailed description of what happens in the scene */
  description: string;
  /** The setting or location of the scene */
  setting: string;
  /** Visual and atmospheric metadata for the scene */
  metadata: SceneMetadata;
  /** Order of the scene in the sequence */
  order: number;
}

/**
 * Represents a generated shot (image or video) associated with a scene
 */
export interface Shot {
  /** Unique identifier for the shot */
  id: string;
  /** ID of the scene this shot belongs to */
  sceneId: string;
  /** Type of media: image or video */
  type: 'image' | 'video';
  /** URL to preview the generated shot */
  previewUrl: string;
  /** Current status of the shot in the review workflow */
  status: 'pending' | 'accepted' | 'rejected';
  /** Optional additional metadata for the shot */
  metadata?: Record<string, any>;
}

/**
 * State of the scene generation process
 */
export type GenerationState = 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';

/**
 * Result of merging multiple scenes into a single output
 */
export interface MergeResult {
  /** Whether the merge operation was successful */
  success: boolean;
  /** URL to preview the merged output */
  previewUrl: string;
  /** Array of scene IDs that were merged */
  sceneIds: string[];
  /** Total duration of the merged output in seconds (optional) */
  totalDuration?: number;
}






