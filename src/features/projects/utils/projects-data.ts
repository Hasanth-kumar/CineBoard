/**
 * File: projects-data.ts
 * Responsibility: Provides mock data utilities for project listings and project-related data structures.
 */

export interface Project {
  id: number;
  title: string;
  status: string;
  progress: number;
}

export const getProjects = (): Project[] => [
  { id: 1, title: 'Cinematic Trailer', status: 'In Progress', progress: 75 },
  { id: 2, title: 'Product Demo', status: 'Rendering', progress: 45 },
  { id: 3, title: 'Brand Story', status: 'Draft', progress: 20 },
];


