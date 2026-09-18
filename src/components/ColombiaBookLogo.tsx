import React from 'react';

interface ColombiaBookLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Logo oficial del SAT-Deserción:
 * Contorno vectorial heráldico y geográfico de Colombia con un libro abierto en el centro,
 * siguiendo la paleta institucional DANE (Vinotinto #8B1538, Oro #F59E0B y Negro).
 */
export const ColombiaBookLogo: React.FC<ColombiaBookLogoProps> = ({
  className = '',
  size = 40,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#8B1538] via-[#680e28] to-black p-1.5 shadow-lg border border-[#8B1538]/50 overflow-hidden group"
        style={{ width: size, height: size }}
      >
        {/* Subtle background radial glow */}
        <div className="absolute inset-0 bg-radial from-[#8B1538]/40 to-transparent opacity-60 pointer-events-none" />

        {/* SVG Outline of Colombia with Open Book in Center */}
        <svg 
          viewBox="0 0 100 110" 
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Colombia geographic outline silhouette */}
          <path
            d="
              M 52,6
              C 56,8 60,11 63,16
              C 65,19 63,22 59,25
              C 55,27 52,30 52,34
              C 53,38 56,41 62,44
              C 68,47 74,48 78,52
              C 83,56 82,62 76,66
              C 72,69 68,72 65,77
              C 62,82 60,88 56,95
              C 54,99 50,103 48,102
              C 46,101 44,95 44,90
              C 43,84 39,81 35,78
              C 30,76 25,75 22,70
              C 19,65 19,59 23,54
              C 26,50 27,45 25,41
              C 23,37 20,33 24,28
              C 27,24 32,22 36,20
              C 40,18 43,14 46,10
              Z
            "
            fill="#121216"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-colors group-hover:stroke-amber-300"
          />

          {/* Internal gradient fill / subtle contour lines of Colombia */}
          <path
            d="
              M 52,6
              C 56,8 60,11 63,16
              C 65,19 63,22 59,25
              C 55,27 52,30 52,34
              C 53,38 56,41 62,44
              C 68,47 74,48 78,52
              C 83,56 82,62 76,66
              C 72,69 68,72 65,77
              C 62,82 60,88 56,95
              C 54,99 50,103 48,102
              C 46,101 44,95 44,90
              C 43,84 39,81 35,78
              C 30,76 25,75 22,70
              C 19,65 19,59 23,54
              C 26,50 27,45 25,41
              C 23,37 20,33 24,28
              C 27,24 32,22 36,20
              C 40,18 43,14 46,10
              Z
            "
            fill="url(#colombiaGrad)"
            opacity="0.85"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="colombiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B1538" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#4a081a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1a0409" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="bookPageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>

          {/* Open Book in the center of Colombia */}
          <g transform="translate(48, 52) scale(0.95)" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {/* Book base / Spine glow */}
            <circle cx="0" cy="0" r="14" fill="#8B1538" opacity="0.6" />

            {/* Left page */}
            <path
              d="M 0,2 C -4,-1 -11,-1 -14,2 L -14,-9 C -11,-12 -4,-12 0,-9 Z"
              fill="url(#bookPageGrad)"
              stroke="#b45309"
              strokeWidth="1"
            />
            {/* Right page */}
            <path
              d="M 0,2 C 4,-1 11,-1 14,2 L 14,-9 C 11,-12 4,-12 0,-9 Z"
              fill="url(#bookPageGrad)"
              stroke="#b45309"
              strokeWidth="1"
            />

            {/* Book spine line */}
            <line x1="0" y1="-9" x2="0" y2="3" stroke="#8B1538" strokeWidth="1.5" strokeLinecap="round" />

            {/* Left page lines */}
            <line x1="-11" y1="-6" x2="-3" y2="-6" stroke="#8B1538" strokeWidth="0.8" opacity="0.7" />
            <line x1="-11" y1="-3" x2="-3" y2="-3" stroke="#8B1538" strokeWidth="0.8" opacity="0.7" />
            <line x1="-11" y1="0" x2="-5" y2="0" stroke="#8B1538" strokeWidth="0.8" opacity="0.7" />

            {/* Right page lines */}
            <line x1="3" y1="-6" x2="11" y2="-6" stroke="#8B1538" strokeWidth="0.8" opacity="0.7" />
            <line x1="3" y1="-3" x2="11" y2="-3" stroke="#8B1538" strokeWidth="0.8" opacity="0.7" />
            <line x1="3" y1="0" x2="9" y2="0" stroke="#8B1538" strokeWidth="0.8" opacity="0.7" />

            {/* Bookmark ribbon */}
            <path
              d="M 0,2 L 2,8 L 0,6.5 L -2,8 Z"
              fill="#f59e0b"
            />
          </g>

          {/* San Andrés y Providencia mini indicator in the upper-left corner */}
          <circle cx="16" cy="12" r="1.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.5" />
          <circle cx="18" cy="8" r="1" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.5" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-tight text-white font-mono">
              DANE <span className="text-amber-400 font-sans">•</span> SAT
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#8B1538] text-white uppercase tracking-wider">
              COLOMBIA
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-medium">
            Alerta Temprana de Deserción
          </span>
        </div>
      )}
    </div>
  );
};
