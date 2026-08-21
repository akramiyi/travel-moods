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

import { generateMoodPlaylist } from './src/server/moodPlaylist';

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
            
            const geminiKey = process.env.GEMINI_API_KEY;
            const youtubeKey = process.env.YOUTUBE_API_KEY;
            
            const tracks = await generateMoodPlaylist(mood, place, geminiKey, youtubeKey);
            
            res.statusCode = 200;
            res.end(JSON.stringify({ tracks }));
          } catch (e: any) {
            console.error('[API Plugin Error]', e);
            if (e.message.includes('Server misconfiguration') || e.message.includes('Missing mood parameter')) {
              res.statusCode = 400;
            } else if (e.message.includes('No tracks found')) {
              res.statusCode = 404;
            } else {
              res.statusCode = 500;
            }
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
