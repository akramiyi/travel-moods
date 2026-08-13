import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load .env.local for local development API keys
dotenv.config({ path: '.env.local' });

const cache = new Map<string, { data: any, expiry: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000;

// Custom plugin to mimic Vercel's API routes locally
const vercelApiPlugin = () => ({
  name: 'vercel-api-plugin',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/mood-playlist' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const { mood, place } = data;
            if (!mood) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing mood' }));
            }

            const cacheKey = place ? `${mood}-${place}` : mood;
            const cached = cache.get(cacheKey);
            if (cached && cached.expiry > Date.now()) {
              res.statusCode = 200;
              return res.end(JSON.stringify({ tracks: cached.data }));
            }

            const geminiKey = process.env.GEMINI_API_KEY;
            const youtubeKey = process.env.YOUTUBE_API_KEY;
            if (!geminiKey || !youtubeKey) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Missing API keys' }));
            }

            const ai = new GoogleGenAI({ apiKey: geminiKey });
            // Force the SDK to use our key instead of a globally injected GOOGLE_API_KEY
            if (process.env.GOOGLE_API_KEY) {
              process.env.GOOGLE_API_KEY = geminiKey;
            }
            let prompt = `I want to search YouTube for a playlist of songs that fit the mood: "${mood}". `;
            if (place) prompt += `The vibe should also match the location: "${place}". `;
            prompt += `Provide ONLY a single, highly effective YouTube search query string (e.g. "nostalgic 90s Bollywood road trip songs"). Do not include quotes. Keep it under 50 chars.`;

            const aiRes = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const searchQuery = aiRes.text?.trim().replace(/"/g, '') || `${mood} songs`;

            const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(searchQuery)}&type=video&videoEmbeddable=true&key=${youtubeKey}`;
            const ytRes = await fetch(ytUrl);
            if (!ytRes.ok) throw new Error(`YT API Error: ${ytRes.status}`);
            
            const ytData = await ytRes.json();
            const tracks = ytData.items.map((item: any, i: number) => ({
              id: `mood-${i}-${item.id.videoId}`,
              youtubeId: item.id.videoId,
              title: item.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'),
              artist: item.snippet.channelTitle,
              album: `${mood} Mix`,
              year: item.snippet.publishedAt.substring(0, 4),
              duration: '0:00',
              coverUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
              lyricsSnippet: ''
            }));

            if (tracks.length === 0) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: 'No tracks found' }));
            }

            cache.set(cacheKey, { data: tracks, expiry: Date.now() + CACHE_TTL });
            res.statusCode = 200;
            res.end(JSON.stringify({ tracks }));
          } catch (e: any) {
            console.error('[API Plugin Error]', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      next();
    });
  }
});

import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(), 
      vercelApiPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          name: 'Travel Moods',
          short_name: 'Travel Moods',
          description: 'AI-curated travel music for every mood',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
