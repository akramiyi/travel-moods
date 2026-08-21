import { generateMoodPlaylist } from '../src/server/moodPlaylist';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { mood, place } = req.body || {};
    
    try {
        const geminiKey = process.env.GEMINI_API_KEY;
        const youtubeKey = process.env.YOUTUBE_API_KEY;
        
        const tracks = await generateMoodPlaylist(mood, place, geminiKey, youtubeKey);
        return res.status(200).json({ tracks });
    } catch (error: any) {
        if (error.message.includes('Server misconfiguration') || error.message.includes('Missing mood parameter')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.message.includes('No tracks found')) {
            return res.status(404).json({ error: error.message });
        }
        console.error('[Mood Mix Error]', error);
        return res.status(500).json({ error: 'Failed to generate Mood Mix.', details: error.message });
    }
}
