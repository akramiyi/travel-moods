import React, { useState } from 'react';
import { OrkutScrap } from '../types';
import { INITIAL_ORKUT_SCRAPS } from '../data/cyberData';
import { Star, Heart, Send, Sparkles, User, MessageSquare } from 'lucide-react';
import { retroAudio } from '../utils/audio';

export const OrkutScraps: React.FC = () => {
  const [scraps, setScraps] = useState<OrkutScrap[]>(INITIAL_ORKUT_SCRAPS);
  const [authorName, setAuthorName] = useState('');
  const [scrapText, setScrapText] = useState('');
  const [coolRating, setCoolRating] = useState(100);

  const handleAddScrap = () => {
    if (!scrapText.trim()) return;
    retroAudio.playXPNotification();

    const newScrap: OrkutScrap = {
      id: Date.now().toString(),
      author: authorName.trim() || 'Anonymous_2007',
      time: 'Just Now',
      message: scrapText,
      fansCount: Math.floor(Math.random() * 50) + 10,
    };

    setScraps([newScrap, ...scraps]);
    setScrapText('');
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[440px] bg-sky-950/90 text-slate-100 rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl font-sans">
      {/* Orkut Banner Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 px-3 py-2 flex items-center justify-between border-b border-pink-400/30">
        <div className="flex items-center gap-2">
          <span className="font-serif font-black text-lg text-white tracking-wider">orkut</span>
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded font-mono">
            AKR@M's Profile
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-pink-200">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span className="font-mono text-[11px]">Cool: {coolRating}%</span>
        </div>
      </div>

      {/* Orkut Badges Bar */}
      <div className="bg-slate-900/90 px-3 py-2 border-b border-cyan-500/20 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-[11px]">Badges:</span>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 text-[10px] font-bold">
            ⭐ Cool (100%)
          </span>
          <span className="bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded border border-pink-500/30 text-[10px] font-bold">
            💖 Sexy (95%)
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px] font-bold">
            😎 Trustworthy
          </span>
        </div>
        <button
          onClick={() => {
            retroAudio.playXPNotification();
            setCoolRating((prev) => Math.min(100, prev + 1));
          }}
          className="text-[10px] font-mono text-cyan-300 hover:underline"
        >
          + Add Star Fan
        </button>
      </div>

      {/* Write Scrap Box */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your Orkut Name (e.g. Rahul_Cool007)"
            className="w-1/3 bg-slate-950 text-white text-xs px-2.5 py-1 rounded border border-cyan-500/30 focus:outline-none focus:border-cyan-400 font-mono"
          />
          <input
            type="text"
            value={scrapText}
            onChange={(e) => setScrapText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddScrap()}
            placeholder="Write a nostalgic Orkut scrap message..."
            className="flex-1 bg-slate-950 text-white text-xs px-2.5 py-1 rounded border border-cyan-500/30 focus:outline-none focus:border-cyan-400 font-sans"
          />
          <button
            onClick={handleAddScrap}
            className="px-3 py-1 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded border border-pink-400 flex items-center gap-1 shrink-0"
          >
            <Send className="w-3 h-3" />
            <span>Scrap</span>
          </button>
        </div>
      </div>

      {/* Scraps List */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-950/80">
        {scraps.map((s) => (
          <div key={s.id} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs leading-relaxed">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-800">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-pink-400" />
                <span>{s.author}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{s.time}</span>
            </div>
            <p className="text-slate-200">{s.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
