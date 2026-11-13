import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  withLink?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export const BrandEmblem: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`relative shrink-0 ${sizeMap[size]} ${className} group`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="emblemShield" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1d4ed8" />
            <stop offset="50%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <linearGradient id="emblemGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#d97706" />
            <stop offset="50%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#fef08a" />
          </linearGradient>

          <linearGradient id="coachGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>

          <filter id="emblemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.4" />
          </filter>
        </defs>

        {/* Outer Squircle Container */}
        <rect
          x="6"
          y="6"
          width="108"
          height="108"
          rx="26"
          fill="url(#emblemShield)"
          stroke="rgba(255,255,255,0.25)"
          stroke-width="2"
          filter="url(#emblemGlow)"
        />

        {/* Beveled Golden Inset Rim */}
        <rect
          x="10"
          y="10"
          width="100"
          height="100"
          rx="22"
          fill="none"
          stroke="url(#emblemGold)"
          stroke-width="1.2"
          opacity="0.75"
        />

        {/* Aerodynamic Highway Ribbon */}
        <path
          d="M 16,84 C 36,94 84,94 104,84 C 92,76 60,78 16,84 Z"
          fill="url(#emblemGold)"
          opacity="0.35"
        />
        <path
          d="M 20,86 C 45,92 75,92 100,86"
          stroke="url(#emblemGold)"
          stroke-width="2.5"
          stroke-linecap="round"
          fill="none"
        />

        {/* Sleek Aerodynamic Coach Silhouette */}
        <path
          d="M 28,68 L 74,68 C 82,68 88,71 92,76 L 90,78 C 86,75 80,73 72,73 L 28,73 Z"
          fill="url(#coachGlow)"
          opacity="0.9"
        />
        {/* Windows */}
        <rect x="34" y="62" width="10" height="4" rx="1.5" fill="#ffffff" opacity="0.9" />
        <rect x="47" y="62" width="10" height="4" rx="1.5" fill="#ffffff" opacity="0.9" />
        <rect x="60" y="62" width="10" height="4" rx="1.5" fill="#ffffff" opacity="0.9" />
        <path d="M 73,62 L 81,62 C 84,62 86,63.5 87,66 L 73,66 Z" fill="#ffffff" opacity="0.9" />

        {/* 3 Golden Stars at Top Crest */}
        <g fill="url(#emblemGold)">
          {/* Center Star */}
          <path d="M 60,18 L 62,23 L 67,23 L 63,26 L 64.5,31 L 60,28 L 55.5,31 L 57,26 L 53,23 L 58,23 Z" />
          {/* Left Star */}
          <path d="M 44,22 L 45.5,25.5 L 49.5,25.5 L 46.5,27.5 L 47.5,31 L 44,29 L 40.5,31 L 41.5,27.5 L 38.5,25.5 L 42.5,25.5 Z" opacity="0.8" />
          {/* Right Star */}
          <path d="M 76,22 L 77.5,25.5 L 81.5,25.5 L 78.5,27.5 L 79.5,31 L 76,29 L 72.5,31 L 73.5,27.5 L 70.5,25.5 L 74.5,25.5 Z" opacity="0.8" />
        </g>

        {/* Central Bold Tamil Glyphic "மா" */}
        <text
          x="60"
          y="54"
          fontFamily="'Noto Sans Tamil', 'Mukta Malar', system-ui, sans-serif"
          fontWeight="900"
          fontSize="34"
          fill="#ffffff"
          textAnchor="middle"
          dominantBaseline="middle"
          filter="url(#emblemGlow)"
        >
          மா
        </text>
      </svg>
    </div>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  withLink = true,
  className = '',
  theme = 'dark',
}) => {
  const content = (
    <div className={`flex items-center space-x-3 group ${className}`}>
      <BrandEmblem size={size} />

      <div>
        <div className="flex items-center space-x-2 leading-none">
          <span
            className={`font-black font-tamil tracking-tight transition-colors ${
              size === 'sm'
                ? 'text-lg'
                : size === 'lg'
                ? 'text-3xl'
                : size === 'xl'
                ? 'text-4xl'
                : 'text-2xl'
            } ${theme === 'light' ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-sky-300'}`}
          >
            மாரியம்மன்
          </span>
          <span
            className={`font-black tracking-wider transition-colors ${
              size === 'sm'
                ? 'text-lg'
                : size === 'lg'
                ? 'text-3xl'
                : size === 'xl'
                ? 'text-4xl'
                : 'text-2xl'
            } ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}
          >
            TRAVELS
          </span>
        </div>

        {showTagline && (
          <p
            className={`text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center space-x-1.5 ${
              theme === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            <span className="text-amber-400">★</span>
            <span>Intercity Luxury Express</span>
            <span className="text-amber-400">★</span>
          </p>
        )}
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link to="/home" className="inline-block" title="மாரியம்மன் Travels — Home">
        {content}
      </Link>
    );
  }

  return content;
};

