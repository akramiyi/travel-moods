<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e5077e80-e690-4dfd-b4fd-0fa4d6c924eb

## Run Locally

**Prerequisites:**  Node.js


## Features
- Dynamic mobile wallpapers
- Curated Bollywood retro playlist
- 🎵 **New: Mood Mix** - AI-powered dynamic playlists based on your vibe! Uses Gemini and YouTube Data API.

## Setup
1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and add your `GEMINI_API_KEY` and `YOUTUBE_API_KEY`.
   - *Note: Mood Mix relies on the YouTube Data API v3 which has a quota limit of 10,000 units/day. The app uses caching to minimize quota usage, but for production, consider setting up a persistent KV store (e.g. Vercel KV or Upstash).*
4. Run `npm run dev`
