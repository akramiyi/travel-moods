import React, { useState, useEffect } from 'react';
import { VICE_CITY_CHEATS } from '../data/cyberData';
import { Gamepad2, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface ViceCityCheatsProps {
  onActivateCheat: (code: string, effect: string) => void;
}

export const ViceCityCheats: React.FC<ViceCityCheatsProps> = ({ onActivateCheat }) => {
  const [inputBuffer, setInputBuffer] = useState('');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Global key listener for cheat typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))) return;

      const char = e.key.toUpperCase();
      if (char.length === 1 && /[A-Z]/.test(char)) {
        retroAudio.playKeyClick();
        const nextBuffer = (inputBuffer + char).slice(-20);
        setInputBuffer(nextBuffer);

        // Check if any cheat code matches end of buffer
        VICE_CITY_CHEATS.forEach((cheat) => {
          if (nextBuffer.endsWith(cheat.code)) {
            retroAudio.playCheatActivatedSound();
            setActiveToast(`CHEAT ACTIVATED: ${cheat.code} - ${cheat.effect}`);
            onActivateCheat(cheat.code, cheat.effect);
            setTimeout(() => setActiveToast(null), 3500);
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputBuffer, onActivateCheat]);

  const handleManualCheat = (code: string, effect: string) => {
    retroAudio.playCheatActivatedSound();
    setActiveToast(`CHEAT ACTIVATED: ${code} - ${effect}`);
    onActivateCheat(code, effect);
    setTimeout(() => setActiveToast(null), 3500);
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[440px] bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-pink-500/40 shadow-2xl font-mono">
      {/* Vice City Header */}
      <div className="bg-gradient-to-r from-pink-700 via-fuchsia-700 to-purple-800 px-3 py-2 flex items-center justify-between border-b border-pink-400/30">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-amber-300" />
          <span className="font-extrabold text-sm text-amber-200 tracking-wider uppercase font-serif">
            GTA VICE CITY - CHEAT CODES 2005
          </span>
        </div>
        <span className="text-[10px] bg-black/40 text-pink-300 px-2 py-0.5 rounded border border-pink-500/30">
          PC-07 Gaming Mode
        </span>
      </div>

      {/* Activated Toast */}
      {activeToast && (
        <div className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-2 text-center animate-bounce shadow-lg flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 fill-current text-slate-950" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Typing Buffer Display */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Type anywhere on keyboard:</span>
        </div>
        <span className="text-cyan-300 font-bold tracking-widest bg-slate-950 px-2.5 py-1 rounded border border-cyan-500/30 min-w-[120px] text-right">
          {inputBuffer || 'WAITING...'}
        </span>
      </div>

      {/* Cheat List */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-slate-950/90">
        <p className="text-[11px] text-slate-400 mb-2 italic">
          Click any cheat below or type directly on keyboard:
        </p>
        {VICE_CITY_CHEATS.map((c) => (
          <div
            key={c.code}
            onClick={() => handleManualCheat(c.code, c.effect)}
            className="p-2.5 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-pink-500/50 rounded-lg flex items-center justify-between cursor-pointer transition-all group"
          >
            <div>
              <span className="text-amber-400 font-black text-sm tracking-wider group-hover:text-amber-300 block">
                {c.code}
              </span>
              <span className="text-xs text-slate-300">{c.effect}</span>
            </div>
            <button className="px-2.5 py-1 bg-pink-600/30 group-hover:bg-pink-600 text-pink-200 text-[10px] font-bold rounded border border-pink-500/40 transition-colors">
              ACTIVATE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
