import { GoogleGenAI } from '@google/genai';

// In-memory cache stub 
// > [!IMPORTANT] 
// > Replace this with Vercel KV or Upstash Redis in a real production environment
// > to persist cache across serverless invocations and protect your YouTube API quota.
const cache = new Map<string, { data: any, expiry: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function generateMoodPlaylist(mood: string, place: string | undefined, geminiKey: string | undefined, youtubeKey: string | undefined) {
    if (!mood) {
        throw new Error('Missing mood parameter.');
    }

    const cacheKey = place ? `${mood}-${place}` : mood;
    
    // 1. Check Cache
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
        console.log(`[Cache Hit] Returning cached playlist for ${cacheKey}`);
        return cached.data;
    }

    if (!geminiKey || !youtubeKey) {
        throw new Error('Server misconfiguration: Missing API keys.');
    }

    // 2. Gemini Query Generation
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    
    // Force the SDK to use our key instead of a globally injected GOOGLE_API_KEY
    if (process.env.GOOGLE_API_KEY) {
        process.env.GOOGLE_API_KEY = geminiKey;
    }

    let prompt = `I want to search YouTube for a playlist of songs that fit the mood: "${mood}". `;
    if (place) {
        prompt += `The vibe should also match the location: "${place}". `;
    }
    prompt += `Provide ONLY a single, highly effective YouTube search query string (e.g. "nostalgic 90s Bollywood road trip songs slow tempo"). Do not include quotes, explanations, or video IDs. Keep it under 50 characters.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    const searchQuery = response.text?.trim().replace(/"/g, '') || `${mood} songs`;
    console.log(`[Gemini] Generated search query: "${searchQuery}"`);

    // 3. YouTube Data API Call
    const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(searchQuery)}&type=video&videoEmbeddable=true&key=${youtubeKey}`;
    
    const ytRes = await fetch(ytUrl);
    if (!ytRes.ok) {
        const errText = await ytRes.text();
        throw new Error(`YouTube API error: ${ytRes.status} ${errText}`);
    }
    
    const ytData = await ytRes.json();
    
    // 4. Normalize to Track[]
    const tracks = ytData.items.map((item: any, index: number) => ({
        id: `mood-${index}-${item.id.videoId}`,
        youtubeId: item.id.videoId,
        // Decode HTML entities commonly found in YouTube titles
        title: item.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'),
        artist: item.snippet.channelTitle,
        album: `${mood} Mix`,
        year: item.snippet.publishedAt.substring(0, 4),
        duration: '0:00', // Note: Duration requires an extra videos.list call which costs quota
        coverUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        lyricsSnippet: ''
    }));

    if (tracks.length === 0) {
        throw new Error('No tracks found for this mood.');
    }

    // 5. Update Cache
    cache.set(cacheKey, { data: tracks, expiry: Date.now() + CACHE_TTL });

    return tracks;
}
