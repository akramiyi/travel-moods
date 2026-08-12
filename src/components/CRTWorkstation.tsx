import React, { useState } from 'react';
import { YahooMessenger } from './YahooMessenger';
import { OrkutScraps } from './OrkutScraps';
import { MSPaint } from './MSPaint';
import { ViceCityCheats } from './ViceCityCheats';
import { MessageSquare, Star, Palette, Gamepad2, Download, Monitor, Zap, Power, Disc } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface CRTWorkstationProps {
  crtScanlines: boolean;
  onActivateCheat: (code: string, effect: string) => void;
}

export const CRTWorkstation: React.FC<CRTWorkstationProps> = ({ crtScanlines, onActivateCheat }) => {
  const [activeTab, setActiveTab] = useState<'yahoo' | 'orkut' | 'paint' | 'cheats' | 'limewire'>('yahoo');
  const [isShaking, setIsShaking] = useState(false);
  const [isDegaussing, setIsDegaussing] = useState(false);
  const [limewireProgress, setLimewireProgress] = useState(94);

  const triggerBuzzAnimation = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 800);
  };

  const handleDegaussClick = () => {
    retroAudio.playCRTDegauss();
    setIsDegaussing(true);
    setTimeout(() => setIsDegaussing(false), 1200);
  };

  return (
    <div className="relative max-w-5xl mx-auto my-4 sm:my-6">
      {/* Outer Retro CRT Enclosure */}
      <div
        className={`relative bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-slate-200 ${
          isShaking ? 'animate-[bounce_0.15s_infinite]' : ''
        }`}
      >
        {/* Top CRT Monitor Brand Sticker */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-xs text-slate-800 tracking-wider uppercase">
              SAMSUNG SyncMaster 793s • CRT 17"
            </span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
              PENTIUM 4 INSIDE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-700">
            <span>Refresh: 85Hz</span>
            <span>•</span>
            <span>Res: 1024x768</span>
          </div>
        </div>

        {/* CRT Screen Frame */}
        <div className="relative bg-slate-950 rounded-2xl p-2 sm:p-3 border-8 border-slate-900 shadow-inner overflow-hidden">
          {/* CRT Screen Glow & Curvature Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-20" />

          {/* Optional Scanlines Effect */}
          {crtScanlines && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-30 opacity-70" />
          )}

          {/* Degauss Distortion Flash */}
          {isDegaussing && (
            <div className="absolute inset-0 bg-cyan-400/40 mix-blend-overlay z-40 animate-ping pointer-events-none" />
          )}

          {/* Desktop Wallpaper Header Bar (Windows XP Style) */}
          <div className="relative z-10 bg-slate-900/90 border-b border-cyan-500/30 p-2 rounded-t-xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  setActiveTab('yahoo');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  activeTab === 'yahoo'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                <span>Yahoo! Messenger</span>
              </button>

              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  setActiveTab('orkut');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  activeTab === 'orkut'
                    ? 'bg-pink-600 text-white border-pink-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-pink-300" />
                <span>Orkut Scraps</span>
              </button>

              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  setActiveTab('paint');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  activeTab === 'paint'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-cyan-300" />
                <span>MS Paint</span>
              </button>

              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  setActiveTab('cheats');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  activeTab === 'cheats'
                    ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Vice City Cheats</span>
              </button>

              <button
                onClick={() => {
                  retroAudio.playKeyClick();
                  setActiveTab('limewire');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  activeTab === 'limewire'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5 text-emerald-300" />
                <span>Limewire (99%)</span>
              </button>
            </div>
          </div>

          {/* Active Screen Tab Render */}
          <div className="relative z-10 p-2 sm:p-3 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[420px] rounded-b-xl">
            {activeTab === 'yahoo' && (
              <YahooMessenger onTriggerBuzzAnimation={triggerBuzzAnimation} />
            )}

            {activeTab === 'orkut' && <OrkutScraps />}

            {activeTab === 'paint' && <MSPaint />}

            {activeTab === 'cheats' && (
              <ViceCityCheats onActivateCheat={onActivateCheat} />
            )}

            {activeTab === 'limewire' && (
              <div className="p-4 sm:p-6 bg-slate-900 rounded-xl border border-emerald-500/40 font-mono text-slate-200 h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Disc className="w-6 h-6 text-emerald-400 animate-spin" />
                      <span className="font-extrabold text-base text-emerald-300">
                        LimeWire PRO 4.12 - MP3 Downloader
                      </span>
                    </div>
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      P2P Network Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-cyan-300 font-bold">woh_lamhe_atif_aslam_128kbps.mp3</span>
                        <span className="text-emerald-400 font-bold">{limewireProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${limewireProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>Speed: 28.4 KB/s</span>
                        <span>Size: 4.82 MB / 5.12 MB</span>
                        <span>Sources: 14</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 opacity-60">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">gta_vc_crack_no_cd.exe</span>
                        <span className="text-amber-400">Paused (Needs CD Key)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[45%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <span>Searching BSNL P2P Nodes...</span>
                  <button
                    onClick={() => setLimewireProgress((prev) => (prev >= 100 ? 50 : prev + 2))}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded text-xs"
                  >
                    Boost Download Speed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lower CRT Bezel Controls & LED */}
        <div className="mt-4 pt-3 border-t border-slate-400/50 flex items-center justify-between px-2 text-slate-800 font-mono">
          <div className="flex items-center gap-3">
            {/* Power LED Indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Power ON</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDegaussClick}
              className="px-2.5 py-1 rounded bg-slate-300 hover:bg-slate-200 text-slate-900 border border-slate-400 text-xs font-bold shadow-sm"
              title="CRT Degauss Coil"
            >
              DEGAUSS
            </button>
            <button
              onClick={() => retroAudio.playKeyClick()}
              className="px-2 py-1 rounded bg-slate-300 hover:bg-slate-200 text-slate-900 border border-slate-400 text-xs font-bold"
            >
              MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
