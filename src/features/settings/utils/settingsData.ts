/**
 * File: settingsData.ts
 * Responsibility: Provides mock data utilities for application settings and configuration options.
 */

import { Bell, Lock, Palette, Globe, LucideIcon } from 'lucide-react';

export interface Setting {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const getSettings = (): Setting[] => [
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Manage your notification preferences',
    color: 'text-accent-teal',
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    description: 'Control your privacy and security settings',
    color: 'text-accent-purple',
  },
  {
    icon: Palette,
    title: 'Appearance',
    description: 'Customize the look and feel',
    color: 'text-accent-teal',
  },
  {
    icon: Globe,
    title: 'Language & Region',
    description: 'Set your language and regional preferences',
    color: 'text-accent-purple',
  },
];


