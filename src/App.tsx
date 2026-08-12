import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { retroAudio } from './utils/audio';
import travelHeroImage from './assets/images/travel_jeep_mountain_1786438872225.jpg';

export default function App() {
  // Mechanical typing sound on keydown
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))) return;
      retroAudio.playKeyClick();
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-red-500 selection:text-white overflow-hidden">
      {/* Full-Screen Cinematic Travel Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={travelHeroImage}
          alt="Aesthetic Travel Moods Mountain & Jeep Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 filter brightness-100 contrast-100"
        />
        {/* Soft Vignette Overlay for Title Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
      </div>

      {/* Top Header Navbar */}
      <Navbar
        onOpenMenu={() => {}}
        onOpenWorkstation={() => {}}
        onTriggerDialUp={() => {}}
        isConnectingDialUp={false}
        soundEnabled={true}
        setSoundEnabled={() => {}}
      />

      {/* Top Right Sky Title Display - No background box, clean text positioned on the right */}
      <main className="relative z-10 min-h-screen flex flex-col justify-start items-end pt-20 sm:pt-24 px-6 sm:px-16 text-right select-none pointer-events-none">
        <div className="space-y-1 pointer-events-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-normal text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] font-['Poppins',sans-serif] leading-none">
            सफर
          </h1>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-red-500 drop-shadow-[0_4px_25px_rgba(220,38,38,0.9)] font-['Poppins',sans-serif] leading-tight">
            ट्रैवल मूड्स
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono text-slate-100 tracking-widest uppercase opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            TRAVEL MOODS • ROAD TRIP RADIO
          </p>
        </div>
      </main>

      {/* Floating Glassmorphism Music Player */}
      <MusicPlayer />
    </div>
  );
}


