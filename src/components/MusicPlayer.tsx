import React, { useState, useEffect, useRef } from 'react';
import { TRACK_LIST } from '../data/cyberData';
import { Play, Pause, SkipBack, SkipForward, Disc, ListMusic, Volume2, X, Shuffle, Timer, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { retroAudio } from '../utils/audio';
import { xaliPlaylist } from '../data/xaliPlaylist';
import { MoodMixSelector } from './MoodMixSelector';
import { Track } from '../types';

const xaliTracks = xaliPlaylist.map((t: any, idx: number) => ({
  id: `xali-${idx}`,
  youtubeId: t.id,
  title: t.title,
  artist: t.artist,
  album: 'X@li Playlist',
  year: '2026',
  duration: '0:00',
  coverUrl: `https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`,
  lyricsSnippet: ''
}));

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const AuroraBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-900/10 blur-[100px] animate-aurora" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] animate-aurora" style={{ animationDelay: '-5s' }} />
    <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-indigo-900/10 blur-[90px] animate-aurora" style={{ animationDelay: '-10s' }} />
  </div>
);

const MagicDust = ({ isPlaying }: { isPlaying: boolean }) => {
  if (!isPlaying) return null;
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute bottom-full left-0 right-0 h-32 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;
        const size = 2 + Math.random() * 3;
        return (
          <div
            key={i}
            className="absolute bottom-0 bg-red-400 rounded-full animate-float-up blur-[1px]"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              boxShadow: '0 0 8px rgba(248,113,113,0.8)'
            }}
          />
        );
      })}
    </div>
  );
};

interface MusicPlayerProps {
  onTrackChange?: (index: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onTrackChange, onPlayStateChange }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(TRACK_LIST);
  const [currentPlaylistName, setCurrentPlaylistName] = useState('default');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTracklist, setShowTracklist] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Premium Features States
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [sleepTimerDisplay, setSleepTimerDisplay] = useState('');
  const [playHistory, setPlayHistory] = useState<any[]>([]);

  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const sleepTimerIntervalRef = useRef<number | null>(null);
  const onStateChangeRef = useRef<any>(null);
  const handleKeyDownRef = useRef<any>(null);
  const currentTrack = currentPlaylist[currentTrackIndex] || currentPlaylist[0];

  useEffect(() => {
    if (onTrackChange) {
      onTrackChange(currentTrackIndex);
    }
  }, [currentTrackIndex, onTrackChange]);

  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  onStateChangeRef.current = (e: any) => {
    if (e.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setPlayHistory(prev => [currentTrack, ...prev].slice(0, 20)); // Keep last 20
    }
    if (e.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
    if (e.data === window.YT.PlayerState.ENDED) {
      goToTrack('next', true);
    }
  };

  // Initialize YouTube Iframe Player (Fully Hidden)
  useEffect(() => {
    function createPlayer() {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('hidden-yt-player', {
        videoId: currentPlaylist[0].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(100);
            setPlayerReady(true);
          },
          onStateChange: (e: any) => {
            if (onStateChangeRef.current) {
              onStateChangeRef.current(e);
            }
          },
          onError: (e: any) => {
            console.error('[YouTube Player Error]', e.data);
            goToTrack('next', true); // Auto-skip broken tracks
          }
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Poll progress and time updates while playing
  useEffect(() => {
    if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    
    if (isPlaying && playerReady) {
      progressIntervalRef.current = window.setInterval(() => {
        const p = playerRef.current;
        if (p?.getCurrentTime && p?.getDuration) {
          const current = p.getCurrentTime();
          const total = p.getDuration();
          setCurrentTime(current);
          setDuration(total);
          if (total > 0) {
            setProgress((current / total) * 100);
          }
        }
      }, 250);
    }
    
    return () => {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, playerReady]);

  // Sleep Timer Logic
  const startSleepTimer = (minutes: number) => {
    if (sleepTimerIntervalRef.current) window.clearInterval(sleepTimerIntervalRef.current);
    if (minutes === 0) {
      setSleepTimer(null);
      setSleepTimerDisplay('');
      return;
    }
    setSleepTimer(Date.now() + minutes * 60000);
  };

  useEffect(() => {
    if (!sleepTimer) {
      if (sleepTimerIntervalRef.current) window.clearInterval(sleepTimerIntervalRef.current);
      return;
    }

    sleepTimerIntervalRef.current = window.setInterval(() => {
      const remaining = sleepTimer - Date.now();
      if (remaining <= 0) {
        if (playerRef.current) playerRef.current.pauseVideo();
        setIsPlaying(false);
        setSleepTimer(null);
        setSleepTimerDisplay('');
        if (sleepTimerIntervalRef.current) window.clearInterval(sleepTimerIntervalRef.current);
      } else {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setSleepTimerDisplay(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    }, 1000);

    return () => {
      if (sleepTimerIntervalRef.current) window.clearInterval(sleepTimerIntervalRef.current);
    };
  }, [sleepTimer]);

  const goToTrack = (direction: 'next' | 'prev' | number, autoplay: boolean) => {
    setProgress(0);
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => {
      let nextIdx: number;
      const playlist = currentPlaylist;
      
      if (direction === 'next') {
        if (isShuffle) {
          nextIdx = Math.floor(Math.random() * playlist.length);
        } else {
          nextIdx = (prev + 1) % playlist.length;
        }
      }
      else if (direction === 'prev') {
        nextIdx = (prev - 1 + playlist.length) % playlist.length;
      }
      else {
        nextIdx = direction;
      }

      const p = playerRef.current;
      if (p && playerReady) {
        if (autoplay) {
          p.loadVideoById(currentPlaylist[nextIdx].youtubeId);
          setIsPlaying(true);
        } else {
          p.cueVideoById(currentPlaylist[nextIdx].youtubeId);
          setIsPlaying(false);
        }
      }
      return nextIdx;
    });
  };

  const handleStartAudio = () => {
    retroAudio.playKeyClick();
    setHasUserInteracted(true);
    if (playerRef.current && playerReady) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePlaylistSwitch = (playlistName: string, customTracks?: Track[]) => {
    if (customTracks) {
      setCurrentPlaylistName(playlistName);
      setCurrentPlaylist(customTracks);
      setCurrentTrackIndex(0);
      if (playerRef.current && playerReady) {
        playerRef.current.loadVideoById(customTracks[0].youtubeId);
        setIsPlaying(true);
      }
      return;
    }

    setCurrentPlaylistName(playlistName);
    const newPlaylist = playlistName === 'xali' ? xaliTracks : TRACK_LIST;
    setCurrentPlaylist(newPlaylist);
    setCurrentTrackIndex(0);
    
    if (playerRef.current && playerReady) {
      playerRef.current.loadVideoById(newPlaylist[0].youtubeId);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    retroAudio.playKeyClick();
    if (!hasUserInteracted) setHasUserInteracted(true);
    const p = playerRef.current;
    if (p && playerReady) {
      if (isPlaying) p.pauseVideo();
      else p.playVideo();
    }
  };

  handleKeyDownRef.current = (e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))) return;
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        handlePlayPause();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToTrack('next', true);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        goToTrack('prev', true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (playerRef.current) {
          const currentVol = playerRef.current.getVolume();
          playerRef.current.setVolume(Math.min(100, currentVol + 10));
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (playerRef.current) {
          const currentVol = playerRef.current.getVolume();
          playerRef.current.setVolume(Math.max(0, currentVol - 10));
        }
        break;
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (handleKeyDownRef.current) handleKeyDownRef.current(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNext = () => {
    retroAudio.playKeyClick();
    setHasUserInteracted(true);
    goToTrack('next', true);
  };

  const handlePrev = () => {
    retroAudio.playKeyClick();
    setHasUserInteracted(true);
    goToTrack('prev', true);
  };

  const handleSelectTrack = (idx: number) => {
    retroAudio.playKeyClick();
    setHasUserInteracted(true);
    goToTrack(idx, true);
    setShowTracklist(false);
  };

  const handleSeek = (newPct: number) => {
    setProgress(newPct);
    const p = playerRef.current;
    if (p && playerReady && duration > 0) {
      const seekSeconds = (newPct / 100) * duration;
      p.seekTo(seekSeconds, true);
      setCurrentTime(seekSeconds);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <AuroraBackground />
      {/* Invisible YouTube Player Container */}
      <div className="fixed -left-[9999px] -top-[9999px] w-1 h-1 opacity-0 pointer-events-none z-0">
        <div id="hidden-yt-player"></div>
      </div>

      {/* Floating Playlist Drawer */}
      {showTracklist && (
        <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-8 sm:w-96 max-h-[420px] bg-slate-950/90 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl z-50 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-sm">
              <ListMusic className="w-4 h-4" />
              <span>Playlist ({currentPlaylist.length})</span>
            </div>
            <button onClick={() => setShowTracklist(false)} className="p-1 rounded text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="py-3 flex gap-2 shrink-0">
            <button 
              onClick={() => handlePlaylistSwitch('default')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-mono border transition-all ${currentPlaylistName === 'default' ? 'bg-red-950/80 border-red-500 text-red-200' : 'border-slate-800 text-slate-400 hover:bg-slate-900'}`}
            >
              Default
            </button>
            <button 
              onClick={() => handlePlaylistSwitch('xali')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-mono border transition-all ${currentPlaylistName === 'xali' ? 'bg-red-950/80 border-red-500 text-red-200' : 'border-slate-800 text-slate-400 hover:bg-slate-900'}`}
            >
              x@li
            </button>
          </div>

          <MoodMixSelector 
            onPlaylistGenerated={(tracks, moodName) => handlePlaylistSwitch(moodName, tracks)}
            onFallback={() => handlePlaylistSwitch('default')}
          />

          <div className="space-y-1.5 overflow-y-auto pr-1 mt-2">
            {currentPlaylist.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => handleSelectTrack(idx)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  idx === currentTrackIndex
                    ? 'bg-red-950/80 border-red-500 text-red-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500 min-w-[18px]">{idx + 1}.</span>
                  <div>
                    <h4 className="font-bold text-xs line-clamp-1">{t.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{t.artist}</p>
                  </div>
                </div>
                {idx === currentTrackIndex && isPlaying && (
                  <Disc className="w-4 h-4 text-red-400 animate-spin shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Glassmorphic Container for Badges and Music Bar */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[98%] sm:w-[80%] max-w-2xl z-40 flex flex-col gap-2">
        
        {/* Brand Logo & Online Status (Moved from Navbar) */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-1.5 bg-cyan-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-[10px] sm:text-xs font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="font-bold text-cyan-300 tracking-wider">@akramiyi</span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg text-[10px] sm:text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-slate-300 font-medium whitespace-nowrap">37 online</span>
          </div>
        </div>

        {/* Music Bar */}
        <div className="bg-gradient-to-r from-[#4a3b32]/95 to-[#933d35]/95 backdrop-blur-xl border border-white/10 rounded-full p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-0.5 sm:gap-5 text-white transition-all duration-500 w-full">
          
          {/* LEFT: Album Art */}
          <div className="flex-shrink-0 relative">
            {isPlaying && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-50" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-30" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              </>
            )}
            <div
              onClick={() => setShowTracklist(!showTracklist)}
              className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 sm:border-4 border-[#5b4a40] cursor-pointer shadow-lg group z-10"
            >
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                <Disc className="w-6 h-6 text-white/80" />
              </div>
            </div>
          </div>

          {/* MIDDLE: Track Info & Progress */}
          <div className="flex-1 flex flex-col justify-center min-w-0 pr-2">
            <div className="relative">
              <MagicDust isPlaying={isPlaying} />
              <h3 className="font-bold text-[13px] sm:text-base truncate font-sans text-white tracking-wide leading-tight">
                {currentTrack.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-white/70 font-sans truncate mb-1.5">{currentTrack.artist}</p>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="relative w-full flex items-center h-4 cursor-pointer group">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden relative">
                  <div className="bg-white/90 h-full rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
                </div>
                <div
                  className="absolute w-3 h-3 bg-white rounded-full shadow-md pointer-events-none transition-transform group-hover:scale-125"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-white/60 select-none">
                {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : currentTrack.duration}
              </div>
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="flex items-center gap-0.5 sm:gap-5 flex-shrink-0 pr-1 sm:pr-4">
            {!hasUserInteracted && (
              <button
                onClick={handleStartAudio}
                className="hidden md:flex px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-mono font-bold text-xs animate-pulse shadow-lg items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>PLAY</span>
              </button>
            )}

            <button onClick={handlePrev} className="p-1 sm:p-0 text-white/70 hover:text-white transition-transform active:scale-90" title="Previous Song">
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform mx-1 sm:mx-0 shrink-0"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-1" />}
            </button>

            <button onClick={handleNext} className="p-1 sm:p-0 text-white/70 hover:text-white transition-transform active:scale-90" title="Next Song">
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>
            
            {/* Secondary Controls */}
            <div className="flex items-center gap-1 sm:gap-3 pl-1 sm:pl-2 border-l border-white/20 ml-1 sm:ml-2">
              <button 
                onClick={() => setIsShuffle(!isShuffle)} 
                className={`hidden sm:block transition-transform active:scale-90 ${isShuffle ? 'text-white' : 'text-white/40 hover:text-white/70'}`} 
                title="Shuffle"
              >
                <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button onClick={() => setShowTracklist(!showTracklist)} className="p-1 sm:p-0 text-white/70 hover:text-white transition-transform active:scale-90" title="Toggle Playlist">
                <ListMusic className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
