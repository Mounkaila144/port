# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website built with Next.js 15, React 19, and Tailwind CSS v4. It features a single-page application with smooth animations, interactive project filtering, and bilingual support (French/English).

**Key Features:**
- Portfolio sections: Profile, Skills, Projects, Companies
- Advanced project filtering system (by type, tags, search)
- Framer Motion animations including 3D tilt effects on cards
- Bilingual interface with runtime language switching
- Dark theme with gradient overlays
- Fully responsive design

## Development Commands

### Running the Application
```bash
# Development server with Turbopack (faster builds)
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start
```

**Note:** This project uses Next.js 15 with Turbopack enabled by default (via `--turbopack` flag in package.json scripts).

### Development Server
- Runs on http://localhost:3000 by default
- Uses Turbopack for faster HMR and builds
- No separate test or lint commands configured

## Architecture & Code Organization

### Tech Stack
- **Framework:** Next.js 15 with App Router
- **React:** v19.1.0 (latest with React Compiler support)
- **TypeScript:** Strict mode enabled
- **Styling:** Tailwind CSS v4 (latest major version)
- **Animations:** Framer Motion v12
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React

### Directory Structure
```
app/
  ├── page.tsx          # Main portfolio page (all sections)
  ├── layout.tsx        # Root layout with metadata
  └── globals.css       # Global styles and CSS variables

components/
  ├── ui/               # Shadcn UI components (badge, button, card, dialog, input, separator, tabs)
  └── [unused shared/sections folders exist but not imported]

lib/
  ├── translations.ts   # Bilingual content (fr/en)
  ├── utils.ts          # cn() utility for className merging
  ├── types.ts          # Type definitions
  └── data.ts           # Data models
```

### Key Patterns

#### Single-Page Architecture
All portfolio content is in `app/page.tsx` as a single component (~968 lines). This includes:
- Profile, skills, projects, and companies data (lines 38-139)
- Custom hooks (useTilt for 3D card effects, lines 226-248)
- Sub-components (ProjectCard, FilterBar, ProjectDialog, etc.)
- Main Portfolio component with state management

**Data Location:** All content is defined as constants at the top of `app/page.tsx`:
- `profile` - Personal information (lines 38-48)
- `skillGroups` - Technologies organized by category (lines 50-100)
- `companies` - Work experience (lines 102-139)
- `projects` - Project portfolio (lines 141-220)

#### Translation System
Translations are managed in `lib/translations.ts`:
- Runtime language switching via React state
- Deep nested structure for project/company descriptions
- Uses TypeScript for type-safe translation keys
- Access via `translations[language]` object

#### Component Patterns
- **Client-side only:** Uses `"use client"` directive (no Server Components used)
- **Framer Motion:** AnimatePresence for enter/exit animations, motion components for effects
- **Tabs Navigation:** Radix UI Tabs for section switching (Profile/Skills/Projects/Companies)
- **Dialog System:** Radix UI Dialog for project detail modals

#### Styling Approach
- **CSS Variables:** Theme defined in `app/globals.css` (HSL color system)
- **Utility-first:** All styling via Tailwind classes
- **Responsive:** Mobile-first with sm:/md:/lg: breakpoints
- **cn() utility:** Merges Tailwind classes using clsx + tailwind-merge

### State Management
All state is local React state (useState) in the main Portfolio component:
- `query` - Search filter text
- `activeKind` - Project type filter (Tous/Entreprise/Freelance/Personnel)
- `selectedTags` - Technology tag filters
- `opened` - Currently opened project dialog
- `tab` - Active section (profil/skills/projects/companies)
- `language` - Current UI language (fr/en)

### Custom Hooks
**useTilt (lines 226-248):** Creates 3D tilt effect on project cards
- Listens to mouse movement over card elements
- Calculates rotation based on cursor position
- Applies transform via inline styles
- Resets on mouse leave

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` maps to root directory
- JSX: preserve (transformed by Next.js)
- Module resolution: bundler

## Customization Guide

### Updating Portfolio Content
All content is in `app/page.tsx`. Edit these constants:

**Profile Info (lines 38-48):**
```typescript
const profile = {
  name: "Your Name",
  role: "Your Title",
  photo: "/image/profile.jpeg",  // or external URL
  location: "City, Country",
  email: "your@email.com",
  phone: "+XXX XXXXXXXX",
  github: "https://github.com/username",
};
```

**Skills (lines 50-100):**
- Organized in `skillGroups` array by category
- Each item has `name` and `icon` (DevIcon CDN URLs)
- Categories: Langages, Frameworks, UI/Design, Databases, Outils

**Companies (lines 102-139):**
- Each entry needs `id`, `name`, `role`, `years`, `logo`, `desc`, `site`
- `site: "#"` if no website available
- Update matching translations in `lib/translations.ts` under `companyDescriptions`

**Projects (lines 141-220):**
- Required fields: `id`, `title`, `company`, `kind`, `year`, `cover`, `description`, `tags`, `links`
- `kind` must be: "Entreprise", "Freelance", or "Personnel"
- `links.site` and `links.repo` use "#" for unavailable
- Update matching translations in `lib/translations.ts` under `projectDetails`

### Adding Translations
Edit `lib/translations.ts`:
1. Add keys to both `fr` and `en` objects
2. Access in components via `t.yourKey` where `t = translations[language]`
3. For nested translations (projects/companies), update `projectDetails` or `companyDescriptions` objects

### SEO/Metadata
Edit `app/layout.tsx` (lines 15-18):
```typescript
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your Description",
};
```

### Styling Changes
**Theme Colors:** Edit CSS variables in `app/globals.css` (lines ~20-60)
- Uses HSL format for colors
- Separate light/dark themes (dark is primary)

**Animations:** Modify Framer Motion props in `app/page.tsx`:
- Card entrance animations (lines 273-288)
- Profile section animations (lines 639-782)
- Background gradient animations (lines 961-966)

## Important Notes

### Next.js 15 Specifics
- Uses stable App Router (no Pages directory)
- Turbopack enabled by default for dev and build
- React 19 with async Server Components support (though this project uses client-only)
- Image optimization available but not used (uses img tags with external URLs)

### Unused/Legacy Code
The following exist but are not imported/used:
- `components/shared/` folder (GradientBackground, Navbar, Footer, SectionTitle components)
- `components/sections/` folder (HeroSection component)
- `lib/types.ts` and `lib/data.ts` files

All active code is in `app/page.tsx` with inline components.

### External Dependencies
- **DevIcons CDN:** Used for technology icons (https://cdn.jsdelivr.net/gh/devicons/devicon/)
- **Unsplash:** Used for placeholder images (company logos, project covers)

### Windows-Specific
This is a Windows development environment (`win32` platform). File paths use Windows format but Next.js handles cross-platform compatibility.

## Common Tasks

### Adding a New Project
1. Add project object to `projects` array in `app/page.tsx` (lines 141-220)
2. Add translations in `lib/translations.ts` under both `fr.projectDetails` and `en.projectDetails`
3. Use consistent `id` naming: "type-name" (e.g., "freelance-myproject")
4. Ensure all tags exist in other projects or add new ones

### Adding a New Skill Category
1. Add new object to `skillGroups` array (lines 50-100)
2. Follow structure: `{ title: "Category", items: [{ name, icon }] }`
3. Icons should be from DevIcons CDN for consistency
4. Translation: Add English mapping in Skills TabsContent (lines 793-797)

### Changing Language System
- Current: Runtime switching via state (client-side only)
- To add more languages: Update `Language` type in `lib/translations.ts` and add translation objects

### Performance Optimization
- Consider lazy loading project images if portfolio grows large
- Project filtering is client-side; optimize if project count exceeds ~50
- Framer Motion animations can be reduced with `prefers-reduced-motion` media query