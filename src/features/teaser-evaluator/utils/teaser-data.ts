/**
 * File: teaser-data.ts
 * Responsibility: Mock data for teaser evaluation feedback cards
 */

export interface FeedbackCard {
  id: string;
  title: string;
  content: string | number;
  type: 'text' | 'rating' | 'list';
  icon?: string;
}

export interface Suggestion {
  id: string;
  text: string;
  category: string;
}

export const getMockFeedbackCards = (): FeedbackCard[] => [
  {
    id: 'scene-summary',
    title: 'Scene Summary',
    content: 'The teaser opens with a dramatic landscape shot transitioning into close-ups of the protagonist. Key moments include an emotional confrontation scene and a climactic action sequence.',
    type: 'text',
  },
  {
    id: 'emotional-tone',
    title: 'Emotional Tone',
    content: 'High tension with moments of vulnerability. The pacing builds from contemplative to intense, creating an emotional rollercoaster.',
    type: 'text',
  },
  {
    id: 'visual-composition',
    title: 'Visual Composition',
    content: 8.5,
    type: 'rating',
  },
  {
    id: 'pacing',
    title: 'Pacing',
    content: 'Excellent rhythm with well-timed cuts. The acceleration toward the climax maintains viewer engagement throughout.',
    type: 'text',
  },
  {
    id: 'audio-balance',
    title: 'Audio Balance',
    content: 7.8,
    type: 'rating',
  },
  {
    id: 'engagement-rating',
    title: 'Engagement Rating',
    content: 9.2,
    type: 'rating',
  },
  {
    id: 'scene-highlights',
    title: 'Scene Highlights',
    content: 'Opening landscape (0:00-0:05), Emotional close-up (0:12-0:18), Action climax (0:35-0:45)',
    type: 'text',
  },
];

export const getMockSuggestions = (): Suggestion[] => [
  { id: '1', text: 'Enhance color grading in opening scene', category: 'Visual' },
  { id: '2', text: 'Adjust audio levels for dialogue clarity', category: 'Audio' },
  { id: '3', text: 'Tighten cuts between 0:20-0:30', category: 'Pacing' },
  { id: '4', text: 'Add subtle background music fade', category: 'Audio' },
  { id: '5', text: 'Increase contrast in action sequence', category: 'Visual' },
  { id: '6', text: 'Optimize for mobile viewing', category: 'Format' },
];

