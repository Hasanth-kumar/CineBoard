/**
 * File: script-data.ts
 * Responsibility: Mock data generators for script analysis, creating deterministic scene breakdowns from script text
 */

import type { Scene } from '../types';

/**
 * Seed data arrays for consistent, realistic cinematic metadata
 */
const LIGHTING_STYLES = [
  'Natural Daylight',
  'Warm Golden Hour',
  'Cool Blue Twilight',
  'Dramatic High Contrast',
  'Soft Diffused',
  'Neon Urban',
  'Candlelit Intimate',
  'Harsh Fluorescent',
] as const;

const ENVIRONMENTS = [
  'Urban Street',
  'Modern Office',
  'Cozy Apartment',
  'Rustic Cafe',
  'Desert Highway',
  'Mountain Vista',
  'Underground Bunker',
  'Luxury Penthouse',
  'Abandoned Warehouse',
  'Beach at Sunset',
  'Rainy Cityscape',
  'Forest Clearing',
] as const;

const AMBIENCE_OPTIONS = [
  'Distant Traffic',
  'Crowd Murmur',
  'Rain on Windows',
  'Wind Through Trees',
  'Crackling Fire',
  'Ocean Waves',
  'City Ambience',
  'Birds Chirping',
  'Mechanical Hum',
  'Footsteps on Gravel',
  'Distant Sirens',
  'Quiet Tension',
  'Jazz Music Faint',
  'Electronic Beats',
] as const;

const CAMERA_DIRECTIONS = [
  'Wide Establishing Shot',
  'Medium Two-Shot',
  'Close-Up',
  'Over-the-Shoulder',
  'Low Angle',
  'High Angle',
  'Dutch Angle',
  'Tracking Shot',
  'Static Frame',
  'Handheld Intimate',
] as const;

const TONES = [
  'Tense',
  'Melancholic',
  'Hopeful',
  'Mysterious',
  'Intimate',
  'Epic',
  'Gritty',
  'Ethereal',
  'Urgent',
  'Contemplative',
] as const;

/**
 * Simple hash function to generate deterministic values from text
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Selects an item from an array deterministically based on a seed
 */
function selectFromArray<T>(array: readonly T[], seed: number, index: number): T {
  return array[(seed + index) % array.length];
}

/**
 * Parses script text to extract scene markers and segments
 */
function parseScriptSegments(scriptText: string): string[] {
  const trimmed = scriptText.trim();
  if (!trimmed) return [];

  // Try to find scene markers (INT./EXT., location, time)
  const sceneMarkerRegex = /(?:INT\.|EXT\.|INT\/EXT\.)[\s\S]*?(?=(?:INT\.|EXT\.|INT\/EXT\.|$))/gi;
  const matches = trimmed.match(sceneMarkerRegex);

  if (matches && matches.length > 0) {
    return matches.map((match) => match.trim());
  }

  // Fallback: split by double line breaks or paragraphs
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  if (paragraphs.length > 0) {
    return paragraphs;
  }

  // Last resort: split by single line breaks
  return trimmed.split('\n').filter((line) => line.trim().length > 0);
}

/**
 * Generates a scene title from script segment
 */
function generateSceneTitle(segment: string, index: number): string {
  const firstLine = segment.split('\n')[0].trim();
  
  // Try to extract location from scene marker
  const locationMatch = firstLine.match(/(?:INT\.|EXT\.|INT\/EXT\.)\s*(.+?)(?:\s*-\s*|$)/i);
  if (locationMatch && locationMatch[1]) {
    return locationMatch[1].trim();
  }

  // Try to extract from first meaningful line
  const words = firstLine.split(/\s+/).slice(0, 4);
  if (words.length > 0) {
    return words.join(' ');
  }

  return `Scene ${index + 1}`;
}

/**
 * Generates a scene description from script segment
 */
function generateSceneDescription(segment: string): string {
  const lines = segment.split('\n').filter((line) => {
    const trimmed = line.trim();
    // Skip scene markers, character names (all caps), and transitions
    return (
      trimmed.length > 0 &&
      !trimmed.match(/^(INT\.|EXT\.|INT\/EXT\.|FADE|CUT|DISSOLVE)/i) &&
      !trimmed.match(/^[A-Z\s]+$/g) &&
      trimmed.length > 20
    );
  });

  if (lines.length > 0) {
    const description = lines.slice(0, 3).join(' ').trim();
    return description.length > 200 ? description.substring(0, 200) + '...' : description;
  }

  return segment.substring(0, 150).trim() + (segment.length > 150 ? '...' : '');
}

/**
 * Generates mock scenes from script text deterministically
 */
export function generateMockScenes(scriptText: string): Scene[] {
  if (!scriptText || scriptText.trim().length === 0) {
    return [];
  }

  const segments = parseScriptSegments(scriptText);
  const scriptHash = simpleHash(scriptText);
  
  // Determine number of scenes (3-8 based on script length)
  const segmentCount = segments.length;
  const sceneCount = Math.min(Math.max(3, Math.ceil(segmentCount / 2)), 8);

  const scenes: Scene[] = [];

  for (let i = 0; i < sceneCount; i++) {
    const segmentIndex = Math.floor((i / sceneCount) * segmentCount);
    const segment = segments[segmentIndex] || segments[0] || scriptText;
    const sceneSeed = scriptHash + i;

    // Generate metadata deterministically
    const lightingStyle = selectFromArray(LIGHTING_STYLES, sceneSeed, 0);
    const environment = selectFromArray(ENVIRONMENTS, sceneSeed, 1);
    const cameraDirection = selectFromArray(CAMERA_DIRECTIONS, sceneSeed, 2);
    const tone = selectFromArray(TONES, sceneSeed, 3);

    // Generate 2-4 ambience items
    const ambienceCount = 2 + ((sceneSeed + 4) % 3); // 2, 3, or 4
    const ambience: string[] = [];
    for (let j = 0; j < ambienceCount; j++) {
      const ambienceItem = selectFromArray(AMBIENCE_OPTIONS, sceneSeed, 5 + j);
      if (!ambience.includes(ambienceItem)) {
        ambience.push(ambienceItem);
      }
    }

    const title = generateSceneTitle(segment, i);
    const description = generateSceneDescription(segment);
    const setting = environment;

    scenes.push({
      id: `scene-${i + 1}`,
      title,
      description,
      setting,
      metadata: {
        environment,
        lightingStyle,
        ambience,
        cameraDirection,
        tone,
      },
      order: i + 1,
    });
  }

  return scenes;
}

/**
 * Returns seed scenes for initial empty state demos
 */
export function getSeedScenes(): Scene[] {
  return [
    {
      id: 'scene-1',
      title: 'Opening Sequence',
      description: 'A wide establishing shot reveals the city at dawn. The camera slowly pushes in as morning light breaks over the skyline.',
      setting: 'Urban Street',
      metadata: {
        environment: 'Urban Street',
        lightingStyle: 'Natural Daylight',
        ambience: ['Distant Traffic', 'City Ambience', 'Birds Chirping'],
        cameraDirection: 'Wide Establishing Shot',
        tone: 'Hopeful',
      },
      order: 1,
    },
    {
      id: 'scene-2',
      title: 'The Meeting',
      description: 'Two characters sit across from each other in a dimly lit cafe. The conversation grows tense as secrets are revealed.',
      setting: 'Rustic Cafe',
      metadata: {
        environment: 'Rustic Cafe',
        lightingStyle: 'Warm Golden Hour',
        ambience: ['Crowd Murmur', 'Jazz Music Faint'],
        cameraDirection: 'Medium Two-Shot',
        tone: 'Tense',
      },
      order: 2,
    },
    {
      id: 'scene-3',
      title: 'The Chase',
      description: 'A high-speed pursuit through narrow alleys. Handheld camera work captures the urgency and chaos of the moment.',
      setting: 'Urban Street',
      metadata: {
        environment: 'Urban Street',
        lightingStyle: 'Neon Urban',
        ambience: ['Distant Sirens', 'Footsteps on Gravel', 'Mechanical Hum'],
        cameraDirection: 'Handheld Intimate',
        tone: 'Urgent',
      },
      order: 3,
    },
  ];
}






