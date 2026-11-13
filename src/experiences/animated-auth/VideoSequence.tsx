import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, Play, RotateCcw } from 'lucide-react';

export type SequencePhase = 'arriving' | 'zooming' | 'window-ready' | 'authenticating' | 'departing' | 'complete';

interface VideoSequenceProps {
  phase: SequencePhase;
  onWindowReached: () => void;
  onDepartureComplete: () => void;
  isFormSubmitting: boolean;
}

export const VideoSequence: React.FC<VideoSequenceProps> = ({
  phase,
  onWindowReached,
  onDepartureComplete,
  isFormSubmitting,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(23);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const reachedWindowRef = useRef(false);

  // Constants for scene markers in the user-supplied 23.07s 4K video
  const WINDOW_PAUSE_TIME = 10.8;
  const DEPARTURE_END_TIME = 23.0;

  // Initialize playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 23);
      setIsVideoLoaded(true);
      // Attempt autoplay
      video.play().catch((err) => {
        console.warn('Autoplay prevented, awaiting user interaction:', err);
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Time tracking and boundary handling
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);

    // Pause when we reach the interior window scene
    if (phase !== 'departing' && phase !== 'complete' && !reachedWindowRef.current) {
      if (video.currentTime >= WINDOW_PAUSE_TIME) {
        video.pause();
        video.currentTime = WINDOW_PAUSE_TIME;
        reachedWindowRef.current = true;
        onWindowReached();
      }
    }

    // Check for departure sequence completion
    if (phase === 'departing') {
      if (video.currentTime >= DEPARTURE_END_TIME - 0.2 || video.ended) {
        onDepartureComplete();
      }
    }
  }, [phase, onWindowReached, onDepartureComplete]);

  // Handle phase transitions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (phase === 'departing') {
      // User successfully authenticated: resume video towards departure!
      if (video.currentTime < WINDOW_PAUSE_TIME) {
        video.currentTime = WINDOW_PAUSE_TIME;
      }
      video.play().catch(console.error);
    }
  }, [phase]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    reachedWindowRef.current = false;
    video.currentTime = 0;
    video.play().catch(console.error);
  };

  const handleSkip = () => {
    if (phase === 'departing') {
      onDepartureComplete();
    } else {
      const video = videoRef.current;
      if (video) {
        video.currentTime = WINDOW_PAUSE_TIME;
        video.pause();
      }
      reachedWindowRef.current = true;
      onWindowReached();
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950 select-none">
      {/* 4K Cinematic Sequence Video */}
      {!hasError ? (
        <video
          ref={videoRef}
          src="/videos/Travel_bus_Animation_compressed.mp4"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transform scale-[1.02]"
          muted={isMuted}
          playsInline
          autoPlay
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onError={() => {
            console.warn('Video failed to load');
            setHasError(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 flex items-center justify-center">
          <div className="text-center p-6 text-slate-400">
            <p className="text-lg font-semibold text-rose-400">Cinematic Background Active</p>
          </div>
        </div>
      )}

      {/* Atmospheric Overlays for cinematic mood */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60" />
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-40" />

      {/* Top Experience Status Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-400/30">
            <span className="font-bold text-lg font-tamil">மா</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold tracking-wide font-tamil text-base md:text-lg">
                மாரியம்மன் Travels
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-950/70 border border-blue-700/50 text-sky-300">
                Cinematic Boarding
              </span>
            </div>
            <p className="text-xs text-slate-300/80 hidden sm:block">
              {phase === 'arriving' && 'Step 1 of 4: Bus arriving at boarding station...'}
              {phase === 'zooming' && 'Step 2 of 4: Zooming in to passenger window...'}
              {phase === 'window-ready' && 'Step 3 of 4: Interior window view — Please sign in'}
              {phase === 'authenticating' && 'Verifying boarding pass...'}
              {phase === 'departing' && 'Step 4 of 4: Boarding confirmed! Bus departing...'}
            </p>
          </div>
        </div>

        {/* Cinematic Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 text-slate-200 border border-white/10 text-xs font-medium flex items-center space-x-1.5 backdrop-blur-md transition-all shadow-md active:scale-95"
          >
            {isMuted ? <VolumeX size={15} className="text-slate-400" /> : <Volume2 size={15} className="text-emerald-400" />}
            <span className="hidden md:inline">{isMuted ? 'Unmute' : 'Audio On'}</span>
          </button>

          {phase === 'window-ready' && (
            <button
              onClick={handleReplay}
              title="Replay Arrival Sequence"
              className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 text-slate-200 border border-white/10 text-xs font-medium flex items-center backdrop-blur-md transition-all shadow-md active:scale-95"
            >
              <RotateCcw size={15} />
            </button>
          )}

          <button
            onClick={handleSkip}
            className="px-3.5 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white border border-blue-400/30 text-xs font-medium flex items-center space-x-1.5 backdrop-blur-md transition-all shadow-lg shadow-blue-950/50 active:scale-95"
          >
            <span>{phase === 'departing' ? 'Skip to Website' : 'Skip Intro'}</span>
            <FastForward size={14} />
          </button>
        </div>
      </header>

      {/* Cinematic Phase Progress Indicator at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-md rounded-full h-1.5 p-0.5 border border-white/10 overflow-hidden shadow-lg">
          <div
            className="bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (currentTime / duration) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between w-full max-w-xl mt-2 text-[11px] text-slate-400/90 font-medium px-1">
          <span className={currentTime < 5.5 ? 'text-sky-400 font-semibold' : 'text-slate-500'}>1. Arrival</span>
          <span className={currentTime >= 5.5 && currentTime < 10.8 ? 'text-sky-400 font-semibold' : 'text-slate-500'}>2. Zoom In</span>
          <span className={currentTime >= 10.8 && currentTime < 12.0 ? 'text-blue-400 font-semibold' : 'text-slate-500'}>3. Passenger Window (Auth)</span>
          <span className={currentTime >= 12.0 ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>4. Departure</span>
        </div>
      </div>
    </div>
  );
};

