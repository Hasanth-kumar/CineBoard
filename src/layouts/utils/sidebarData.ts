/**
 * File: sidebarData.ts
 * Responsibility: Provides navigation configuration data for the sidebar component.
 */

import { 
  LayoutDashboard, 
  Film, 
  Sparkles, 
  Clapperboard, 
  FolderOpen, 
  Settings,
  LucideIcon
} from 'lucide-react';

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const getSidebarItems = (): SidebarItem[] => [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Film, label: 'Projects', href: '/projects' },
  { icon: Sparkles, label: 'Teaser Evaluator', href: '/teaser-evaluator' },
  { icon: Clapperboard, label: 'Script2Scene', href: '/script2scene' },
  { icon: FolderOpen, label: 'Assets', href: '/assets' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

