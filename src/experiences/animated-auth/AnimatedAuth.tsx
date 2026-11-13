import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { VideoSequence, SequencePhase } from './VideoSequence';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { animateFormEntrance, animateFormExit } from './animations';
import { useAuth } from '../../auth/AuthContext';
import { ArrowRight, Compass } from 'lucide-react';

interface AnimatedAuthProps {
  initialMode?: 'login' | 'register';
}

export const AnimatedAuth: React.FC<AnimatedAuthProps> = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [phase, setPhase] = useState<SequencePhase>('arriving');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Sync mode with route if needed
  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else {
      setMode('login');
    }
  }, [location.pathname]);

  // When the video sequence reaches the passenger window (~10.8s)
  const handleWindowReached = () => {
    setPhase('window-ready');
    // Animate form entrance smoothly with GSAP
    setTimeout(() => {
      animateFormEntrance(formContainerRef.current);
    }, 50);
  };

  // When login is submitted
  const handleLoginSubmit = async (emailOrPhone: string, password?: string) => {
    setIsFormSubmitting(true);
    setPhase('authenticating');
    try {
      const ok = await login(emailOrPhone, password);
      if (ok) {
        setIsSuccess(true);
        // Play departure sequence
        setTimeout(() => {
          animateFormExit(formContainerRef.current, () => {
            setPhase('departing');
          });
        }, 900);
      }
    } catch (e) {
      setPhase('window-ready');
      setIsFormSubmitting(false);
      throw e;
    }
  };

  // When registration is submitted
  const handleRegisterSubmit = async (name: string, email: string, phone: string, password?: string) => {
    setIsFormSubmitting(true);
    setPhase('authenticating');
    try {
      const ok = await register(name, email, phone, password);
      if (ok) {
        setIsSuccess(true);
        // Play departure sequence
        setTimeout(() => {
          animateFormExit(formContainerRef.current, () => {
            setPhase('departing');
          });
        }, 900);
      }
    } catch (e) {
      setPhase('window-ready');
      setIsFormSubmitting(false);
      throw e;
    }
  };

  // Departure sequence completed -> navigate to home & completely unmount!
  const handleDepartureComplete = () => {
    setPhase('complete');
    const target = (location.state as any)?.from?.pathname || '/home';
    navigate(target, { replace: true });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans">
      {/* 1. Cinematic Video Player */}
      <VideoSequence
        phase={phase}
        onWindowReached={handleWindowReached}
        onDepartureComplete={handleDepartureComplete}
        isFormSubmitting={isFormSubmitting}
      />

      {/* Direct Bypass Link to Explore Travel Website */}
      <div className="absolute top-20 right-4 sm:right-6 z-30 pointer-events-auto">
        <Link
          to="/home"
          className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-300 border border-white/10 text-xs font-bold flex items-center space-x-1.5 backdrop-blur-md transition-all shadow-xl active:scale-95"
        >
          <Compass size={14} className="text-sky-400" />
          <span>Explore Website Directly</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* 2. Interactive React HTML/CSS Form over the Window Scene */}
      {(phase === 'window-ready' || phase === 'authenticating') && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 pointer-events-auto">
          <div ref={formContainerRef} className="w-full max-w-md">
            {mode === 'login' ? (
              <LoginForm
                onSuccess={handleLoginSubmit}
                onSwitchToRegister={() => {
                  setMode('register');
                  navigate('/register', { replace: true });
                }}
                isLoading={isFormSubmitting}
                isSuccess={isSuccess}
              />
            ) : (
              <RegisterForm
                onSuccess={handleRegisterSubmit}
                onSwitchToLogin={() => {
                  setMode('login');
                  navigate('/login', { replace: true });
                }}
                isLoading={isFormSubmitting}
                isSuccess={isSuccess}
              />
            )}
          </div>
        </div>
      )}

      {/* Cinematic Departure Banner Caption during final scene */}
      {phase === 'departing' && (
        <div className="absolute inset-x-0 bottom-16 z-30 flex justify-center px-4 pointer-events-none animate-fade-in">
          <div className="bg-slate-950/85 backdrop-blur-md border border-blue-500/40 px-6 py-3 rounded-2xl shadow-2xl text-center max-w-lg">
            <p className="text-sky-300 font-bold font-tamil text-sm md:text-base">
              உலகம் ஒரு புத்தகம் — ஒவ்வொரு பக்கத்தையும் பயணியுங்கள்!
            </p>
            <p className="text-xs text-slate-300 font-medium tracking-wide mt-0.5">
              The world is a book – Explore every page. Have a safe journey with மாரியம்மன் Travels!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
