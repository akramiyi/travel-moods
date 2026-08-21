import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      if (localStorage.getItem('pwa-prompt-dismissed') === 'true') {
        return;
      }
      
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] sm:w-auto max-w-md">
      {/* Container matches Astra L9 screenshot aesthetic: dark bg, neon cyan accents */}
      <div className="bg-[#0a1922]/95 backdrop-blur-xl border border-cyan-500/30 rounded-full p-2 flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-[slideInUp_0.5s_ease-out]">
        
        <div className="flex items-center gap-3 pl-3 pr-2">
          <Download className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-200 font-medium text-sm tracking-wide">
            Install Travel Moods?
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleInstallClick}
            className="bg-[#d4f82a] hover:bg-[#bce019] text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors shadow-[0_0_10px_rgba(212,248,42,0.3)] ml-2"
          >
            INSTALL
          </button>
          
          <button
            onClick={() => {
              setIsVisible(false);
              localStorage.setItem('pwa-prompt-dismissed', 'true');
            }}
            className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
