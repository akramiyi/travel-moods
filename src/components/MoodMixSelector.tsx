import React, { useState } from 'react';
import { Track } from '../types';
import { Sparkles, Loader2, CloudRain, Sunrise, Moon, Flame } from 'lucide-react';

const MOOD_PRESETS = [
  { id: 'nostalgic', label: 'Nostalgic 90s', icon: <Sparkles size={16} /> },
  { id: 'rainy', label: 'Monsoon Vibes', icon: <CloudRain size={16} /> },
  { id: 'sunset', label: 'Sunset Drive', icon: <Sunrise size={16} /> },
  { id: 'latenight', label: 'Late Night Chill', icon: <Moon size={16} /> },
  { id: 'energy', label: 'High Energy', icon: <Flame size={16} /> },
];

interface MoodMixSelectorProps {
  onPlaylistGenerated: (tracks: Track[], moodName: string) => void;
  onFallback: () => void;
}

export const MoodMixSelector: React.FC<MoodMixSelectorProps> = ({ onPlaylistGenerated, onFallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [place, setPlace] = useState('');

  const handleMoodSelect = async (moodId: string, moodLabel: string) => {
    setIsLoading(true);
    setActiveMood(moodId);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/mood-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: moodLabel, place: place.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to generate mood mix');
      }

      const data = await response.json();

      if (data.tracks && data.tracks.length > 0) {
        onPlaylistGenerated(data.tracks, `Mood Mix: ${moodLabel}`);
      } else {
        throw new Error('No tracks found');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Mood Mix unavailable soory . Playing curated hit .');
      onFallback();
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 mb-2 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-red-400" />
          AI Mood Mix
        </h3>
        {isLoading && <Loader2 size={16} className="text-red-400 animate-spin" />}
      </div>

      <input
        type="text"
        placeholder="Where are you? (Optional)"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 transition-colors mb-1"
        disabled={isLoading}
      />

      <div className="flex flex-wrap gap-2">
        {MOOD_PRESETS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id, mood.label)}
            disabled={isLoading}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${activeMood === mood.id
                ? 'bg-red-500/80 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {mood.icon}
            {mood.label}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="text-xs text-red-400 font-mono mt-1 animate-pulse">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
