import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, RotateCcw, Zap } from 'lucide-react';

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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.35); // 1.35x faster for ultra-smooth dynamic animation
  const reachedWindowRef = useRef(false);
  const durationRef = useRef(23.0);

  // Constants for scene markers in the user-supplied 23.07s 4K video
  const WINDOW_PAUSE_TIME = 10.8;
  const DEPARTURE_END_TIME = 23.0;

  // Set playback speed on video whenever it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Buffer video and initiate smooth playback without start stutter
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackSpeed;

    const handleCanPlay = () => {
      durationRef.current = video.duration || 23.0;
      setIsVideoLoaded(true);
      video.playbackRate = playbackSpeed;
      // Start playback smoothly once the initial frames are decoded in GPU buffer
      video.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    };

    // If already buffered enough
    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [playbackSpeed]);

  // High-performance time tracking avoiding React main-thread render stalls
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const time = video.currentTime;

    // Directly update DOM progress bar without triggering React virtual DOM diffing
    if (progressBarRef.current) {
      const pct = Math.min(100, (time / durationRef.current) * 100);
      progressBarRef.current.style.width = `${pct}%`;
    }

    // Step state changes only at major boundaries (drops re-renders from 300+ to 3)
    let newStep: 1 | 2 | 3 | 4 = 1;
    if (time >= 12.0) newStep = 4;
    else if (time >= 10.8) newStep = 3;
    else if (time >= 5.5) newStep = 2;

    setCurrentStep((prev) => (prev !== newStep ? newStep : prev));

    // Pause smoothly when we reach the interior window scene
    if (phase !== 'departing' && phase !== 'complete' && !reachedWindowRef.current) {
      if (time >= WINDOW_PAUSE_TIME) {
        video.pause();
        video.currentTime = WINDOW_PAUSE_TIME;
        reachedWindowRef.current = true;
        onWindowReached();
      }
    }

    // Check for departure sequence completion
    if (phase === 'departing') {
      if (time >= DEPARTURE_END_TIME - 0.2 || video.ended) {
        onDepartureComplete();
      }
    }
  }, [phase, onWindowReached, onDepartureComplete]);

  // Handle phase transitions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (phase === 'departing') {
      // User successfully authenticated: resume video smoothly towards departure!
      if (video.currentTime < WINDOW_PAUSE_TIME) {
        video.currentTime = WINDOW_PAUSE_TIME;
      }
      video.playbackRate = playbackSpeed;
      video.play().catch(console.error);
    }
  }, [phase, playbackSpeed]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleSpeed = () => {
    const nextSpeed = playbackSpeed === 1.35 ? 1.0 : playbackSpeed === 1.0 ? 1.5 : 1.35;
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    reachedWindowRef.current = false;
    video.currentTime = 0;
    video.playbackRate = playbackSpeed;
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
      {/* 4K Cinematic Sequence Video with GPU Hardware Acceleration */}
      {!hasError ? (
        <video
          ref={videoRef}
          src="/videos/Travel_bus_Animation_compressed.mp4"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transform-gpu translate-z-0 scale-[1.01] transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
          muted={isMuted}
          playsInline
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
              {currentStep === 1 && 'Step 1 of 4: Bus arriving at boarding station...'}
              {currentStep === 2 && 'Step 2 of 4: Zooming in to passenger window...'}
              {currentStep === 3 && 'Step 3 of 4: Interior window view — Please sign in'}
              {currentStep === 4 && 'Step 4 of 4: Boarding confirmed! Bus departing...'}
            </p>
          </div>
        </div>

        {/* Cinematic Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Speed Indicator & Toggle Button */}
          <button
            onClick={toggleSpeed}
            title="Toggle playback speed"
            className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-300 border border-white/10 text-xs font-bold flex items-center space-x-1.5 backdrop-blur-md transition-all shadow-md active:scale-95"
          >
            <Zap size={14} className="text-sky-400" />
            <span>{playbackSpeed}x Smooth</span>
          </button>

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
            ref={progressBarRef}
            className="bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-150"
            style={{ width: '0%' }}
          />
        </div>
        <div className="flex justify-between w-full max-w-xl mt-2 text-[11px] text-slate-400/90 font-medium px-1">
          <span className={currentStep === 1 ? 'text-sky-400 font-bold' : 'text-slate-500'}>1. Arrival</span>
          <span className={currentStep === 2 ? 'text-sky-400 font-bold' : 'text-slate-500'}>2. Zoom In</span>
          <span className={currentStep === 3 ? 'text-blue-400 font-bold' : 'text-slate-500'}>3. Passenger Window (Auth)</span>
          <span className={currentStep === 4 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>4. Departure</span>
        </div>
      </div>
    </div>
  );
};
