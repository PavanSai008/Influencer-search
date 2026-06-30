# InfluenceHub — Influencer Search Dashboard

A modern influencer discovery application built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Zustand**.

## About the Project

This project is a polished rewrite of the starter influencer search assignment. It delivers a refined dashboard experience with platform filters, search, creator cards, detail pages, and a persistent selected-profile list.

The original starter was intentionally functional but incomplete. This version improves usability, styling, state management, and app reliability while maintaining the core influencer search flow.

## Changes Completed

### Recommended Checklist

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

## What Changed

- Migrated selected-profile state from React Context to `zustand`
- Rebuilt the dashboard and detail page UI with a modern card-based layout
- Added a platform filter bar and case-insensitive search
- Implemented full "Add to List" behavior with duplicate prevention
- Added saved profile panel and remove-from-list support
- Persisted selected profiles in `localStorage`
- Improved type safety across components and helper utilities
- Cleaned up component structure for better reusability
- Verified `npm run build` completes successfully

## How to Run

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

For production build:

```bash
npm run build
```

## Project Structure

- `src/App.tsx` — app routing and page shell
- `src/pages/SearchPage.tsx` — main search dashboard
- `src/pages/ProfileDetailPage.tsx` — profile detail view
- `src/components/` — reusable UI and layout components
- `src/store/useSelectedProfilesStore.ts` — Zustand state for saved profiles
- `src/utils/` — filtering, data loading, formatting helpers
- `src/assets/data/` — sample JSON search and profile data

## Tools & Libraries

- `react` / `react-dom`
- `react-router-dom` for routing
- `zustand` for app state management
- `tailwindcss` for styling
- `lucide-react` for icons

## Improvement Summary

The app has been updated from a basic starter project to a polished user-facing experience. Based on feature completion, UI refinement, state management improvements, and bug fixes, this implementation reflects roughly **90–95%** of the assignment goals.

## Notes

- The selected profile list is stored in browser `localStorage` and survives page refresh.
- The current design supports desktop and responsive layouts.
- Further enhancements could include animations, deeper accessibility refinements, and end-to-end tests.
