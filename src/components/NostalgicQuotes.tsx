import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { NOSTALGIC_QUOTES } from '../data/cyberData';
import { ChevronLeft, ChevronRight, MessageSquare, Sparkles, Volume2 } from 'lucide-react';
import { retroAudio } from '../utils/audio';

export const NostalgicQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentQuote = NOSTALGIC_QUOTES[currentIndex];

  const handleNext = () => {
    retroAudio.playKeyClick();
    setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
  };

  const handlePrev = () => {
    retroAudio.playKeyClick();
    setCurrentIndex((prev) => (prev - 1 + NOSTALGIC_QUOTES.length) % NOSTALGIC_QUOTES.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md transition-all hover:border-cyan-400/50"
    >
      {/* Background Retro Grid Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <MessageSquare className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              2000s Cyber Memory #{currentQuote.id} / {NOSTALGIC_QUOTES.length}
            </span>
            <span className="text-xs text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mt-0.5">
              {currentQuote.tag}
            </span>
          </div>
        </div>

        {/* Center Main Quote Display */}
        <div className="flex-1 transition-all duration-500 ease-in-out">
          <p className="text-slate-100 font-medium text-base sm:text-lg italic leading-relaxed text-balance">
            "{currentQuote.text}"
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs font-mono text-cyan-300">
            <span className="font-semibold">{currentQuote.speaker}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">circa {currentQuote.year}</span>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            id="prev-quote-btn"
            onClick={handlePrev}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
            title="Previous Memory"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-500 min-w-[2.5rem] text-center">
            {currentIndex + 1}/{NOSTALGIC_QUOTES.length}
          </span>
          <button
            id="next-quote-btn"
            onClick={handleNext}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
            title="Next Memory"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
