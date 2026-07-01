# InfluenceHub — Influencer Search Dashboard

A modern influencer discovery application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Zustand**.

## Features

- Landing page with a clean call-to-action and direct navigation to the search dashboard
- Full influencer search experience with instant filtering and platform selection
- Creator cards with quick overview, platform badges, and call-to-action buttons
- Profile detail page with extended influencer metrics and deep profile navigation
- Saved profile list with add/remove support and duplicate prevention
- Persistent selected profiles stored in `localStorage`
- Responsive topbar and mobile sidebar menu for easy navigation on small screens
- Desktop home button and mobile home redirect integrated on all pages except landing
- GitHub Pages deployment configured with a Vite base path and route basename
- State management handled via `zustand` for predictable, centralized UI state
- Clean folder structure and reusable component architecture

## Completed Tasks

- [x] Fix current runtime bugs
- [x] Fix profile detail route loader
- [x] Fix search filter behavior
- [x] Redesign UI/UX for dashboard and detail page
- [x] Replace Context with Zustand
- [x] Implement Add to List / selected profiles
- [x] Add persistence for selected list
- [x] Refactor and improve types
- [x] Validate performance and build
- [x] Document changes in README

## Feature Details

### Landing Page

The app starts with a polished landing page designed for assignment presentation. The landing page includes a "Start for Free" button that navigates directly to the main search dashboard.

### Search Dashboard

The main search page allows users to browse influencer profiles across platforms. Users can:

- search by creator name or keyword
- filter by platform
- view cards showing follower count, engagement metrics, and platform details
- navigate to profile detail pages from each card

### Creator Cards and Platform Filters

Each creator card is built to display key influencer attributes clearly. Platform filters allow the user to refine results by network, improving discoverability for specific campaign needs.

### Profile Detail Page

The profile detail page provides more comprehensive information for a selected influencer, including profile metrics and additional data loaded from the sample dataset.

### Saved Profiles and Persistence

Users can save profiles to a selected list from the search dashboard. The selected list:

- prevents duplicate entries
- supports removing saved profiles
- persists across page refreshes using `localStorage`

### Responsive Navigation

A responsive navigation experience has been added for mobile screens. The app includes:

- a sliding menu that reveals the sidebar on mobile
- a home button in desktop topbar navigation
- home navigation on all pages except the landing page

### Routing and Deployment

The project uses `react-router-dom` for client-side routing. GitHub Pages deployment is supported with:

- `vite.config.ts` configured with a repo-specific `base`
- `BrowserRouter` using `basename` for the `/Influencer-search` path
- GitHub Actions workflow for build and deploy to Pages

### State Management

The selected-profile flow is managed with `zustand`, replacing the previous context-based state. This makes app state easier to maintain and extends cleanly across multiple pages.

## How to Run

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the app in your browser:

```bash
http://localhost:5173
```

Build for production:

```bash
npm run build
```

## Project Structure

- `src/App.tsx` — routing configuration and app shell
- `src/main.tsx` — React app entry point
- `src/pages/LandingPage.tsx` — landing page UI and CTA flow
- `src/pages/SearchPage.tsx` — main dashboard and search interface
- `src/pages/ProfileDetailPage.tsx` — detailed influencer profile view
- `src/pages/TrendingPage.tsx` — trending content page
- `src/pages/AISuggestionsPage.tsx` — AI suggestions page
- `src/pages/ActiveCampaignsPage.tsx` — active campaigns page
- `src/pages/AnalyticsPage.tsx` — analytics overview page
- `src/pages/SavedListPage.tsx` — saved profiles and list management
- `src/components/` — reusable layout and presentational components
- `src/store/useSelectedProfilesStore.ts` — Zustand store for selected profiles
- `src/utils/` — helpers for filtering, formatting, and data loading
- `src/assets/data/` — sample profile and search data

## Tech Stack

- `react` / `react-dom`
- `react-router-dom`
- `zustand`
- `tailwindcss`
- `vite`
- `lucide-react`
- `typescript`

## Deployment

This app is configured for GitHub Pages deployment. The build and deploy workflow includes:

- production build via `npm run build`
- GitHub Pages artifact upload
- pages deployment via `actions/deploy-pages`

## Notes

- The saved profile list is persistent and survives refreshes.
- The app supports desktop and responsive mobile layouts.
- The codebase is organized for clarity and future extension.
- Further improvement ideas include animations, accessibility refinement, and end-to-end tests.
