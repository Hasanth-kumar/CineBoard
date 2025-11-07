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
├── app/                     # Next.js App Router (routes only)
│   ├── assets/             # Assets management page
│   ├── projects/           # Projects page
│   ├── profile/            # User profile page
│   ├── script2scene/       # Script-to-scene generator
│   ├── settings/           # Settings page
│   ├── teaser-evaluator/   # AI teaser evaluation tool
│   ├── globals.css         # Global styles with Tailwind utilities
│   ├── layout.tsx          # Root layout with AppShell
│   ├── template.tsx        # Page transition wrapper
│   └── page.tsx            # Dashboard (home page)
├── src/
│   ├── features/           # Feature-specific code
│   │   ├── dashboard/     # Dashboard feature
│   │   │   ├── components/ # Dashboard UI components
│   │   │   ├── hooks/      # Dashboard hooks
│   │   │   ├── utils/      # Dashboard utilities
│   │   │   └── services/   # Dashboard services
│   │   ├── projects/      # Projects feature
│   │   ├── assets/         # Assets feature
│   │   ├── profile/        # Profile feature
│   │   ├── script2scene/   # Script2Scene feature
│   │   ├── settings/       # Settings feature
│   │   └── teaserEvaluator/ # Teaser Evaluator feature
│   ├── components/         # Shared UI components
│   │   └── GlassCard.tsx   # Glassmorphic card component
│   ├── layouts/            # Layout components
│   │   ├── AppShell.tsx    # Main app shell wrapper
│   │   ├── Navigation.tsx  # Original navigation (legacy)
│   │   ├── PageTransition.tsx # Page transition animations
│   │   ├── Sidebar.tsx     # Collapsible sidebar navigation
│   │   ├── TopNavigation.tsx # Top navigation bar
│   │   └── index.ts        # Component exports
│   └── lib/                # API clients, integrations
├── public/                 # Static assets
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

## Design System
The application features a cinematic glassmorphic design with:
- **Glass effect:** Semi-transparent backgrounds with backdrop blur
- **Gradient text:** Teal to purple gradient for headings
- **Smooth animations:** Framer Motion for page transitions and interactions
- **Premium feel:** Dark gradients, soft glows, and elegant spacing
- **Active state glow:** Teal→purple glow effect on active sidebar items with layoutId transitions

## App Shell
The application uses a consistent shell layout:
- **Top Navigation:** Glassmorphic header with branding, notifications, and user profile
- **Collapsible Sidebar:** Expandable navigation with icons and labels
  - Dashboard
  - Projects
  - Teaser Evaluator (AI-powered video analysis)
  - Script2Scene (Script to visual scene generator)
  - Assets (Media library management)
  - Settings
- **Main Content Area:** Scrollable content area for page-specific content

## Custom Tailwind Utilities
- `.glass` - Glassmorphic background effect
- `.glass-hover` - Hover state for glass components
- `.text-gradient` - Gradient text from accent-teal to accent-purple

## Development
- **Dev Server:** Runs on port 5000 (bound to 0.0.0.0 for network access)
- **Commands:**
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run start` - Start production server

## Architecture
The project follows a feature-based architecture with clear separation of concerns:
- **Routes** (`app/`): Minimal page components that only handle routing and composition
- **Features** (`src/features/`): Self-contained feature modules with components, hooks, utils, and services
- **Shared Components** (`src/components/`): Reusable UI components used across features
- **Layouts** (`src/layouts/`): App shell and layout components
- **Lib** (`src/lib/`): API clients and external integrations

Each feature follows the Single Responsibility Principle and is independently testable.

## Recent Changes
- **Nov 5, 2025:** Initial project setup with Next.js 16, Tailwind CSS 4, Framer Motion, and Lucide-react
- **Nov 5, 2025:** Created base layout components (GlassCard, Navigation, PageTransition)
- **Nov 5, 2025:** Configured custom Tailwind theme with cinematic colors and gradients using @theme directive
- **Nov 5, 2025:** Built AppShell with TopNavigation, collapsible Sidebar, and main content area
- **Nov 5, 2025:** Implemented all main pages: Dashboard, Projects, Teaser Evaluator, Script2Scene, Assets, Settings
- **Nov 5, 2025:** Added active state glow effects and smooth sidebar expand/collapse animations
- **Nov 7, 2025:** Refactored project structure to feature-based architecture following Single Responsibility Principle

