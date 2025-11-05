# CineBoard AI

**Created:** November 5, 2025

## Overview
CineBoard AI is a cinematic single-page application (SPA) built with Next.js 14+ App Router, featuring a premium glassmorphic design aesthetic inspired by platforms like Runway and ElevenLabs. The application uses Framer Motion for smooth animations and Lucide-react for iconography.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide-react
- **Runtime:** Node.js 20

## Custom Theme
- **Accent Teal:** `#00FFC6`
- **Accent Purple:** `#A020F0`
- **Background Gradient:** Linear gradient from `#0b0b0f` to `#13131a`

## Project Structure
```
.
├── app/                  # Next.js App Router
│   ├── globals.css      # Global styles with Tailwind utilities
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/
│   └── layout/          # Base layout components
│       ├── GlassCard.tsx       # Glassmorphic card component
│       ├── Navigation.tsx      # Top navigation bar
│       ├── PageTransition.tsx  # Page transition wrapper
│       └── index.ts           # Component exports
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.ts       # Next.js configuration
```

## Design System
The application features a cinematic glassmorphic design with:
- **Glass effect:** Semi-transparent backgrounds with backdrop blur
- **Gradient text:** Teal to purple gradient for headings
- **Smooth animations:** Framer Motion for page transitions and interactions
- **Premium feel:** Dark gradients, soft glows, and elegant spacing

## Custom Tailwind Utilities
- `.glass` - Glassmorphic background effect
- `.glass-hover` - Hover state for glass components
- `.text-gradient` - Gradient text from accent-teal to accent-purple

## Development
- **Dev Server:** Runs on port 5000 (bound to 0.0.0.0 for Replit)
- **Commands:**
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run start` - Start production server

## Recent Changes
- **Nov 5, 2025:** Initial project setup with Next.js, Tailwind CSS, Framer Motion, and Lucide-react
- **Nov 5, 2025:** Created base layout components (GlassCard, Navigation, PageTransition)
- **Nov 5, 2025:** Configured custom Tailwind theme with cinematic colors and gradients
