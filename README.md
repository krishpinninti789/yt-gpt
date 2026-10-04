# Vidora

> **Watch. Explore. Understand.**

Vidora is a modern, YouTube-inspired video platform built with **Next.js App Router**, **React**, **TypeScript**, **Tailwind CSS**, **Firebase**, and the **YouTube Data API v3**.

The project is being built as a production-style application to understand and implement real-world frontend engineering concepts such as server/client component architecture, API integration, authentication, Firestore data modeling, infinite scrolling, URL-driven state, CI/CD, GitHub Rulesets, Git hooks, and AI-powered video experiences.

---

## Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [Home Feed](#home-feed)
- [Categories](#categories)
- [Infinite Scrolling](#infinite-scrolling)
- [Watch Page](#watch-page)
- [Vidora AI](#vidora-ai)
- [Related Videos](#related-videos)
- [Search](#search)
- [Search Filters](#search-filters)
- [Authentication](#authentication)
- [Watch History](#watch-history)
- [Firebase Firestore](#firebase-firestore)
- [PWA](#pwa)
- [Next.js Server and Client Architecture](#nextjs-server-and-client-architecture)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Git Workflow](#git-workflow)
- [Husky](#husky)
- [GitHub Actions CI](#github-actions-ci)
- [GitHub Ruleset](#github-ruleset)
- [Deployment](#deployment)
- [Security](#security)
- [Engineering Concepts](#engineering-concepts)
- [Roadmap](#roadmap)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

# Overview

Vidora started as a YouTube clone project and progressively evolved into a full-stack learning project.

The application uses the **YouTube Data API** for video discovery and **Firebase** for authentication and user-specific watch history.

The main goal is to build a realistic application while learning how different parts of a production web application work together.

The current application supports:

- Popular video discovery
- Video categories
- Infinite scrolling
- Video watch pages
- Related videos
- Video search
- Search filters
- Google authentication
- User watch history
- History deletion
- PWA support
- GitHub Actions CI
- GitHub branch protection through Rulesets
- Local Git hooks using Husky
- AI-powered video Q&A

Vidora AI is now implemented as the first AI-powered feature of the application.

---

# Current Status

| Area | Status |
|---|---|
| Project setup | Completed |
| Vidora branding | Completed |
| Home feed | Completed |
| Video categories | Completed |
| Home infinite scrolling | Completed |
| Watch page | Completed |
| Related videos | Completed |
| Related video infinite scrolling | Completed |
| Search | Completed |
| Search infinite scrolling | Completed |
| Search filters | Completed |
| Google Authentication | Completed |
| Firebase Firestore | Completed |
| Watch History | Completed |
| Remove history item | Completed |
| Clear history | Completed |
| PWA setup | Completed |
| GitHub Actions CI | Completed |
| GitHub Ruleset | Completed |
| Husky | In progress |
| Vidora AI V1 | Completed |
| Production transcript integration | In progress |
| Watch Later | Planned |
| Likes | Planned |
| Subscriptions | Planned |
| Shorts | Planned |

---

# Features

## Home Feed

The home page displays popular YouTube videos using the YouTube Data API.

The home feed supports:

- Popular videos
- Responsive video grid
- Video thumbnails
- Video title
- Channel information
- View count
- Published date
- Category filtering
- Infinite scrolling

The initial data is fetched on the server and additional pages are loaded as the user scrolls.

---

## Video Categories

Vidora provides a horizontal category navigation bar.

Current categories:

- All
- Film & Animation
- Autos & Vehicles
- Music
- Pets & Animals
- Sports
- Travel & Events
- Gaming
- People & Blogs
- Comedy
- Entertainment
- News & Politics
- Howto & Style
- Education
- Science & Technology

Category configuration and YouTube category IDs are maintained separately.

---

## Infinite Scrolling

Vidora uses YouTube's `nextPageToken` mechanism for pagination.

The browser's `IntersectionObserver` API detects when the user approaches the end of the current list.

```text
Initial Server Request
        ↓
First Page of Videos
        ↓
Render Video Grid
        ↓
User Scrolls
        ↓
IntersectionObserver
        ↓
Sentinel Becomes Visible
        ↓
Request Next Page
        ↓
YouTube nextPageToken
        ↓
Append New Videos
```

The observer uses a `rootMargin` so the next request can begin before the user reaches the exact bottom.

---

## Category Pagination Reset

Changing categories resets the infinite-scroll state.

The selected category is used as the identity of the infinite-list component so the previous category's pagination state is not reused.

```tsx
<InfiniteVideoList
  key={categoryId ?? "all"}
  ...
/>
```

---

# Watch Page

Each video has a dynamic watch page:

```text
/watch/[videoId]
```

The watch page renders:

- Video player
- Video information
- Video description
- Related videos

The watch route has its own layout so it can provide a different navigation experience from the main browsing pages.

---

# Video Player

The watch page uses a YouTube embedded player.

```tsx
<iframe
  src={`https://www.youtube.com/embed/${videoId}`}
  title="YouTube video player"
  allowFullScreen
/>
```

The player is placed inside a responsive 16:9 aspect-ratio container.

---

# Video Information

The watch page displays information from the YouTube API response, including:

- Title
- Channel title
- View count
- Published date
- Description

The watch page separates these responsibilities into individual components.

---


# Vidora AI

Vidora AI is an AI-powered video understanding feature available on the Watch page.

Users can ask questions about the current video and receive answers generated from the video's transcript.

## Vidora AI V1

The first version supports:

- Asking questions about a video
- Generating answers from the video transcript
- Loading states
- Error states
- Transcript availability handling
- Server-side AI processing

Example questions:

- What is this video about?
- Summarize this video.
- What are the key concepts explained?
- Explain the main topic in simple terms.
- What technologies are used in this video?

## Vidora AI Architecture

```text
Watch Page
     ↓
Vidora AI UI
     ↓
POST /api/ai/ask
     ↓
Transcript Provider
     ↓
Video Transcript
     ↓
Google Gemini
     ↓
AI Response
     ↓
Vidora AI UI
```

The AI API key and transcript provider credentials remain server-side and are never exposed to the browser.

## AI API

```text
POST /api/ai/ask
```

Request:

```json
{
  "videoId": "youtube-video-id",
  "question": "What is this video about?"
}
```

The API:

1. Receives the video ID and user question.
2. Retrieves the video transcript.
3. Builds a context-aware prompt.
4. Sends the transcript and question to Gemini.
5. Returns the generated response.

Example response:

```json
{
  "success": true,
  "response": "This video explains...",
  "interactionId": "..."
}
```

## Gemini Integration

Vidora AI uses the Google Gemini Interactions API for generating responses.

Gemini is accessed only from the server.

```text
Client
   ↓
/api/ai/ask
   ↓
Gemini
```

The Gemini API key is stored in:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The key must never be exposed using the `NEXT_PUBLIC_` prefix.

## Transcript Integration

Vidora AI requires a transcript to understand a video.

Transcript retrieval is abstracted behind:

```ts
getVideoTranscript(videoId)
```

The initial implementation uses `youtube-transcript` and works locally. Production transcript retrieval is being moved to a hosted provider because direct transcript requests can behave differently from Vercel's server environment.

Supadata has been selected as the hosted production transcript provider.

```text
Video ID
   ↓
Supadata
   ↓
Transcript
   ↓
Gemini
```

The provider key is stored server-side:

```env
SUPADATA_API_KEY=your_supadata_api_key
```

Keeping transcript retrieval behind `getVideoTranscript()` allows the provider to be replaced later without changing the AI API or UI.

---

# Related Videos

Related videos are fetched using the YouTube `search.list` endpoint.

The search is based on information from the current video, including its title and category.

The current video is filtered from the returned results.

```text
Current Video
     ↓
Title + Category
     ↓
YouTube search.list
     ↓
Related Results
     ↓
Remove Current Video
     ↓
Render Related Videos
```

Related videos support infinite scrolling.

---

# Search

Vidora provides video search functionality.

The flow is:

```text
SearchBar
    ↓
router.push()
    ↓
/search?q=nextjs
    ↓
Search Page
    ↓
/api/videos/search
    ↓
getSearchVideos()
    ↓
YouTube search.list
    ↓
Search Results
```

The search page reads URL parameters using `useSearchParams()`.

Example:

```text
/search?q=nextjs
```

---

# Search Filters

Search supports filters for:

### Upload Date

- Any time
- Today
- This week
- This month
- This year

### Duration

- Any duration
- Short
- Medium
- Long

### Order

- Relevance
- Date
- View count
- Rating

Example:

```text
/search?q=nextjs&uploadDate=week&order=relevance
```

Filter state is stored in the URL so it can be shared, bookmarked, refreshed, and navigated with browser back/forward controls.

---

# Authentication

Vidora uses **Firebase Authentication**.

Google authentication is currently supported.

The authentication flow is:

```text
User
  ↓
Google Sign-In
  ↓
Firebase Authentication
  ↓
Firebase User
  ↓
onAuthStateChanged()
  ↓
useAuth()
  ↓
Application
```

The reusable `useAuth` hook exposes:

```ts
type UseAuthReturn = {
  user: User | null;
  loading: boolean;
};
```

---

# Watch History

Authenticated users automatically have videos added to their watch history.

The watch page includes a client-side `HistoryTracker` because authentication state is available through the client-side Firebase auth listener.

Flow:

```text
Watch Page
    ↓
HistoryTracker
    ↓
useAuth()
    ↓
Authenticated User?
    ↓
addToHistory()
    ↓
Firestore
```

If the user is not authenticated, the history operation is skipped.

---

# Firestore Data Model

Watch history is stored under each authenticated user:

```text
users
└── {userId}
    └── history
        ├── {videoId}
        ├── {videoId}
        └── {videoId}
```

The video ID is used as the document ID.

A history document contains:

```ts
{
  videoId,
  title,
  thumbnail,
  channelId,
  channelTitle,
  watchedAt
}
```

`watchedAt` uses Firebase `serverTimestamp()`.

History is queried in descending `watchedAt` order so the most recently watched videos appear first.

---

# History Management

The history page supports:

- Viewing watched videos
- Removing an individual video
- Clearing the complete history

The page owns the history state and mutation handlers.

The UI is separated into:

```text
History Page
    ↓
HistoryVideoList
    ↓
HistoryVideoCard
    ↓
Remove Action
```

A separate clear-history action handles deletion of the entire collection's documents.

---

# Firestore Security Rules

History access is restricted so an authenticated user can only access their own history.

The rule is conceptually:

```text
match /users/{userId}/history/{videoId} {
  allow read, write: if request.auth != null
                    && request.auth.uid == userId;
}
```

This prevents one authenticated user from reading or modifying another user's history through Firestore.

---

# History Delete Modal

The history UI includes a confirmation modal for destructive deletion.

The modal supports:

- Confirm
- Cancel
- Click outside to close

The modal content stops click propagation so clicks inside the modal do not trigger the backdrop's close handler.

---

# PWA

Vidora includes Progressive Web App support.

The application uses the Next.js App Router manifest convention:

```text
app/manifest.webmanifest
```

PWA icons are stored in:

```text
public/
├── android-chrome-192x192.png
└── android-chrome-512x512.png
```

The PWA uses a dark theme with:

```json
{
  "theme_color": "#000000",
  "background_color": "#000000"
}
```

---

# Next.js Architecture

One of the main goals of Vidora is understanding the boundary between Server Components and Client Components.

## Server Components

Server Components are used where browser-side interactivity is not required.

Examples:

- Initial home-feed data
- Initial watch-page data
- Initial related-video data
- Server-rendered page content

The watch page is a Server Component and receives the dynamic route parameter:

```ts
params: Promise<{ videoId: string }>
```

The server fetches the initial video data before rendering the page.

---

## Client Components

Client Components are used where browser APIs, state, or user interaction are required.

Examples:

- Search bar
- Authentication state
- Infinite scrolling
- IntersectionObserver
- History tracker
- History interactions
- Sidebar interactions
- Search filters

These components use:

```tsx
"use client";
```

---

# Why Both Server and Client Components?

The application follows the principle:

```text
Server Component
      ↓
Initial data / rendering
      ↓
Client Component
      ↓
Browser interaction
      ↓
Additional requests / state updates
```

For example, the first set of videos can be fetched on the server, while subsequent pages require browser-side interaction and are loaded by the Client Component.

---

# Route Structure

Current major routes:

```text
/
├── Home
│
├── /watch/[videoId]
│   └── Watch page
│
├── /search
│   └── Search results
│
└── /history
    └── Watch history
```

API routes:

```text
/api/videos
/api/videos/related
/api/videos/search
```

---

# Application Structure

```text
app/
├── api/
│   └── videos/
│       ├── route.ts
│       ├── related/
│       │   └── route.ts
│       └── search/
│           └── route.ts
│
├── components/
│   ├── AppShell
│   ├── Header
│   ├── Sidebar
│   ├── SearchBar
│   ├── VideoCard
│   ├── VideoCategoryBar
│   ├── VideoContainer
│   ├── InfiniteVideoList
│   ├── NetworkStatus
│   └── watch/
│       ├── VideoPlayer
│       ├── VideoInfo
│       ├── VideoDescription
│       ├── RelatedVideos
│       └── HistoryTracker
│
├── history/
│   └── page.tsx
│
├── search/
│   └── page.tsx
│
├── watch/
│   └── [videoId]/
│       ├── layout.tsx
│       └── page.tsx
│
├── (main)/
│   ├── layout.tsx
│   └── page.tsx
│
├── favicon.ico
├── icon.png
├── apple-icon.png
├── manifest.webmanifest
└── layout.tsx
```

Supporting code:

```text
actions/
├── videos.action.ts
└── history.action.ts

hooks/
└── useAuth.ts

utils/
├── ai/
│   └── gemini.ts
├── youtube/
│   └── transcript.ts
├── config/
│   └── firebase/
├── constants/
└── types/
```

---

# YouTube API Integration

The application uses the YouTube Data API v3.

Base URL:

```text
https://www.googleapis.com/youtube/v3
```

The API key is stored in:

```text
YOUTUBE_API_KEY
```

---

# Home Videos API

The home feed uses the YouTube `videos.list` endpoint.

The current request uses parameters such as:

```text
part=snippet,contentDetails,statistics
chart=mostPopular
regionCode=IN
maxResults=20
```

When a category is selected:

```text
videoCategoryId
```

is added.

Pagination uses:

```text
pageToken
```

---

# Search API

Search uses the YouTube `search.list` endpoint.

The request contains values such as:

```text
part=snippet
q
type=video
regionCode=IN
maxResults
pageToken
```

Search filters can additionally map to YouTube parameters such as:

```text
publishedAfter
videoDuration
order
```

---

# API Routes

The application exposes Next.js Route Handlers:

```text
app/api/videos/route.ts
app/api/videos/related/route.ts
app/api/videos/search/route.ts
app/api/ai/ask/route.ts
```

These provide an internal application API boundary for client-side requests that need additional YouTube data.

---

# Actions

Data-fetching and Firestore operations are separated into action modules.

```text
actions/videos.action.ts
actions/history.action.ts
```

`videos.action.ts` contains YouTube-related data operations.

`history.action.ts` contains Firestore history operations such as:

```text
addToHistory()
getHistory()
removeFromHistory()
clearHistory()
```

---

# Environment Variables

Create a `.env.local` file in the project root.

```env
YOUTUBE_API_KEY=your_youtube_api_key

GEMINI_API_KEY=your_gemini_api_key

SUPADATA_API_KEY=your_supadata_api_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

Never commit `.env.local` or secret API keys to Git.

---

# Getting Started

## Prerequisites

Install:

- Node.js
- pnpm
- Git

The project currently uses Node.js 22 locally.

---

## Clone the Repository

```bash
git clone <your-repository-url>
```

```bash
cd vidora
```

---

## Install Dependencies

```bash
pnpm install
```

---

## Configure Environment Variables

Create:

```text
.env.local
```

and add the required YouTube and Firebase configuration values.

---

## Run Development Server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# Available Scripts

## Development

```bash
pnpm dev
```

Starts the Next.js development server.

## Lint

```bash
pnpm lint
```

Runs ESLint.

## Build

```bash
pnpm build
```

Creates a production build.

## Production Start

```bash
pnpm start
```

Starts the production Next.js server.

---

# Git Workflow

The project currently uses `master` as the main protected branch.

The intended development flow is:

```text
Create feature branch
        ↓
Develop
        ↓
Run local checks
        ↓
Commit
        ↓
Push
        ↓
Create Pull Request
        ↓
GitHub Actions CI
        ↓
Required checks pass
        ↓
Merge
        ↓
master
        ↓
Vercel
```

Direct changes to `master` are protected through GitHub Rulesets.

---

# Husky

Husky is used for local Git hooks.

The purpose of Husky is to catch issues before code reaches GitHub.

The intended flow is:

```text
git commit
     ↓
Husky pre-commit
     ↓
Lint
     ↓
Commit
```

And:

```text
git push
     ↓
Husky pre-push
     ↓
Lint
     ↓
Build
     ↓
Push
```

Husky provides local validation, but it does not replace remote CI.

---

# GitHub Actions CI

Vidora uses GitHub Actions for Continuous Integration.

Workflow:

```text
.github/workflows/ci.yml
```

Current CI workflow:

```yaml
name: CI

on:
  push:
    branches:
      - master

  pull_request:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build
```

---

# CI Workflow

The CI workflow performs:

```text
Checkout repository
        ↓
Setup pnpm
        ↓
Setup Node.js
        ↓
Install dependencies
        ↓
Lint
        ↓
Build
```

The workflow uses:

```bash
pnpm install --frozen-lockfile
```

so CI installs dependencies according to the committed `pnpm-lock.yaml`.

The current GitHub Actions job is:

```text
build
```

The job contains separate steps for:

```text
Lint
Build
```

---

# GitHub Ruleset

The `master` branch is protected using a GitHub Ruleset.

Current protection includes:

- Pull request required
- Required CI status check
- Force pushes blocked
- Branch deletion blocked

The required status check is the GitHub Actions job:

```text
build
```

This ensures that code cannot be merged into the protected branch without passing the required CI check.

---

# Husky vs GitHub Actions vs Rulesets

These tools have different responsibilities.

### Husky

Local validation:

```text
Developer machine
      ↓
Git Hook
      ↓
Lint / Build
```

### GitHub Actions

Remote CI:

```text
GitHub
   ↓
Actions Runner
   ↓
Lint / Build
```

### GitHub Ruleset

Repository enforcement:

```text
Pull Request
      ↓
Required Checks
      ↓
Ruleset
      ↓
Merge allowed
```

Together:

```text
Developer
    ↓
Husky
    ↓
Git Push
    ↓
GitHub Actions
    ↓
Ruleset
    ↓
master
```

---

# Deployment

Vidora is deployed using Vercel.

The production flow is:

```text
Feature Branch
      ↓
Pull Request
      ↓
GitHub Actions
      ↓
CI
      ↓
Ruleset
      ↓
Merge to master
      ↓
Vercel
      ↓
Production
```

Production environment variables must be configured separately in Vercel.

Server-only production variables include:

```text
YOUTUBE_API_KEY
GEMINI_API_KEY
SUPADATA_API_KEY
```

These must never use the `NEXT_PUBLIC_` prefix.

---

# Firebase Production Configuration

For Google authentication to work in production, the deployed domain must be configured in Firebase Authentication's authorized domains.

Firebase environment variables must also be added to the Vercel project.

After changing production environment variables, a new deployment is required so the updated configuration is applied.

---

# Security

## Environment Variables

API keys and configuration values are managed through environment variables.

Local secrets belong in:

```text
.env.local
```

and should not be committed.

---

## Firestore Rules

Firestore access is protected using Firebase Security Rules.

Users are restricted to their own history:

```text
request.auth.uid == userId
```

---

## Client Firebase Configuration

Firebase browser configuration values using the `NEXT_PUBLIC_` prefix are required by the client SDK.

These values are not a replacement for Firestore authorization.

Firestore Security Rules enforce access control.

---

# UI and UX

Vidora uses a dark-first interface.

The application includes:

- Sticky header
- Sticky category bar
- Responsive sidebar
- Responsive video grid
- Responsive watch page
- Skeleton loading states
- Infinite scrolling
- Responsive video player
- Mobile-friendly layouts

The primary theme uses near-black surfaces with subtle borders.

---

# Loading States

Asynchronous video lists use skeleton components.

Skeleton states are used for:

- Home video grid
- Related videos
- Search results

This prevents the UI from appearing empty while data is being loaded.

---

# Error Handling

External API responses are checked before processing.

Example:

```ts
if (!response.ok) {
  throw new Error("Failed to fetch YouTube videos");
}
```

During development, API error responses can also be logged to help diagnose YouTube API failures.

---

# Metadata and Branding

Application name:

```text
Vidora
```

Tagline:

```text
Watch. Explore. Understand.
```

The application uses Next.js metadata and App Router file conventions for application branding.

---

# Engineering Concepts Practiced

Vidora is intentionally being developed as an engineering learning project.

## Next.js

- App Router
- Server Components
- Client Components
- Dynamic routes
- Nested layouts
- Route Handlers
- Suspense
- `useParams`
- `useSearchParams`
- `usePathname`
- `useRouter`

## React

- Component composition
- Hooks
- `useState`
- `useEffect`
- `useRef`
- `useCallback`
- Client-side state
- Browser APIs

## TypeScript

- API response types
- Component prop types
- Type aliases
- Interfaces
- Strongly typed application utilities

## APIs

- REST APIs
- URL query parameters
- `URLSearchParams`
- Pagination
- `nextPageToken`
- API error handling
- Next.js Route Handlers

## AI

- Transcript-based AI
- Server-side Gemini integration
- Gemini Interactions API
- Prompt construction
- AI response handling
- External transcript providers
- AI-powered video Q&A

## Firebase

- Google Authentication
- Authentication state
- Firestore
- Subcollections
- Security Rules
- Server timestamps

## Browser APIs

- IntersectionObserver
- URL state
- Browser navigation
- PWA manifest

## Git and DevOps

- Git branching
- Pull requests
- Git hooks
- Husky
- GitHub Actions
- Continuous Integration
- GitHub Rulesets
- Branch protection
- Vercel deployment

---

# Roadmap

## Completed

- [x] Project setup
- [x] Vidora branding
- [x] Header
- [x] Sidebar
- [x] Category navigation
- [x] YouTube API integration
- [x] Home feed
- [x] Category filtering
- [x] Home infinite scrolling
- [x] Watch page
- [x] Video player
- [x] Video information
- [x] Video description
- [x] Related videos
- [x] Related video infinite scrolling
- [x] Search
- [x] Search infinite scrolling
- [x] Search filters
- [x] Google Authentication
- [x] Firebase integration
- [x] Firestore integration
- [x] Watch History
- [x] Remove history item
- [x] Clear history
- [x] Firestore Security Rules
- [x] PWA setup
- [x] GitHub Actions CI
- [x] GitHub Ruleset

## In Progress

- [ ] Husky pre-commit workflow
- [ ] Husky pre-push workflow
- [ ] Production transcript integration

## Vidora AI

- [x] Vidora AI UI
- [x] Ask questions about videos
- [x] Transcript retrieval
- [x] Gemini integration
- [x] Server-side AI API
- [x] Loading states
- [x] Error handling
- [ ] Production transcript optimization
- [ ] Improved AI response formatting
- [ ] Conversation history
- [ ] Long transcript handling
- [ ] Timestamp-aware answers
- [ ] AI-powered video search

## Future Features

- [ ] Watch Later
- [ ] Likes
- [ ] Subscriptions
- [ ] User profile
- [ ] Shorts
- [ ] Personalized features

## Future Engineering Work

- [ ] Advanced caching
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Monitoring
- [ ] Error tracking
- [ ] Advanced CI/CD
- [ ] Production infrastructure improvements

---

# Project Goal

The purpose of Vidora is not simply to recreate YouTube's UI.

The project is being developed to understand how a modern production web application is designed and operated.

The learning progression is:

```text
Frontend
   ↓
API Integration
   ↓
Authentication
   ↓
Database
   ↓
Browser APIs
   ↓
Performance
   ↓
Git Workflow
   ↓
CI
   ↓
Repository Protection
   ↓
Deployment
   ↓
AI Integration
```

Each feature is implemented incrementally so the underlying engineering concepts can be understood rather than simply copied.

---

# Author

## Krishnavamsi Pinninti

Software Engineer

Vidora is a personal project focused on learning, experimentation, and building production-style web application architecture using modern web technologies.

---

# License

This project is intended primarily for learning, experimentation, and portfolio purposes.
