import React, { useState, useEffect } from 'react';
import { Wifi, Radio, ExternalLink, Sparkles, Monitor, DollarSign, Volume2, VolumeX } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).toLowerCase()
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-8 py-3 sm:py-4 flex flex-wrap sm:flex-nowrap items-center justify-between text-white font-sans pointer-events-auto bg-gradient-to-b from-black/60 to-transparent gap-y-2">
      {/* Top Left: Live Clock */}
      <div className="order-1 flex items-center gap-1.5 sm:gap-3">
        <span className="font-mono text-sm sm:text-base font-bold text-slate-200 tracking-wider whitespace-nowrap">
          {timeString || '2:07 pm'}
        </span>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      </div>



      {/* Top Right: Spotify, YT Music */}
      <div className="order-2 sm:order-3 flex items-center gap-1.5 sm:gap-4 text-xs font-medium">
        {/* Spotify & YT Music Links */}
        <a
          href="https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold">Spotify</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>

        {/* YouTube Music Link */}
        <a
          href="https://music.youtube.com/playlist?list=PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30 transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="font-semibold">YT Music</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      </div>
    </header>
  );
};

