import React, { useState } from 'react';

interface RtoCBrandLogoProps {
  variant?: 'icon' | 'lockup' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Crisp Vector SVG Fallback of the iconic RtoC 'R' monogram
export const RtoCSVGLogo: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="rtocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F0FF" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#071426" />
    {/* Stylized R Shape */}
    <path
      d="M26 22H54C64 22 72 29 72 39C72 48 64 54 54 54H40V78H26V22Z"
      fill="url(#rtocGrad)"
    />
    <path
      d="M40 34H52C56.5 34 60 36.5 60 40C60 43.5 56.5 46 52 46H40V34Z"
      fill="#071426"
    />
    <path
      d="M48 50L68 78H52L36 54H48Z"
      fill="#00F0FF"
    />
  </svg>
);

export const RtoCBrandLogo: React.FC<RtoCBrandLogoProps> = ({
  variant = 'lockup',
  size = 'md',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Dimensions
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (variant === 'full') {
    return (
      <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-700/60 bg-[#071426] ${className}`}>
        {!hasError ? (
          <img
            src="/assets/aistudio/RtoC_Labs__Reason_to_Create_b6f2ad23.png"
            alt="RtoC LABS — Reason to Create"
            className="w-full h-auto object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="p-8 text-center bg-gradient-to-br from-[#071426] to-[#0B1F3A] flex flex-col items-center justify-center gap-3">
            <RtoCSVGLogo className="w-16 h-16" />
            <h2 className="text-2xl font-bold text-white tracking-tight">RtoC <span className="text-[#22D3EE]">LABS</span></h2>
            <p className="text-xs text-[#22D3EE] font-semibold uppercase tracking-wider">Reason to Create</p>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div
        className={`relative ${iconDimensions[size]} rounded-xl overflow-hidden bg-[#071426] p-0.5 border border-slate-700/80 shadow-md flex items-center justify-center shrink-0 ${className}`}
      >
        {!hasError ? (
          <img
            src="/assets/rtoc_r_logo.png"
            alt="RtoC LABS R Logo"
            className="w-full h-full object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <RtoCSVGLogo className="w-full h-full" />
        )}
      </div>
    );
  }

  // Lockup variant: Iconic 'R' emblem + brand typography
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <div
        className={`relative ${iconDimensions[size]} rounded-xl overflow-hidden bg-[#071426] p-0.5 border border-slate-700/80 shadow-md group-hover:border-[#22D3EE]/50 transition-colors flex items-center justify-center shrink-0`}
      >
        {!hasError ? (
          <img
            src="/assets/rtoc_r_logo.png"
            alt="RtoC LABS R Logo"
            className="w-full h-full object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <RtoCSVGLogo className="w-full h-full" />
        )}
      </div>

      <div className="flex flex-col text-left">
        <span className="text-xl font-bold tracking-tight text-white font-heading leading-tight whitespace-nowrap">
          RtoC <span className="text-[#22D3EE]">LABS</span>
        </span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Reason to Create
        </span>
      </div>
    </div>
  );
};

