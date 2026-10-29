import React from 'react';

interface RtoCBrandLogoProps {
  variant?: 'icon' | 'lockup' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const RtoCBrandLogo: React.FC<RtoCBrandLogoProps> = ({
  variant = 'lockup',
  size = 'md',
  className = '',
}) => {
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
        <img
          src="/assets/aistudio/RtoC_Labs__Reason_to_Create_b6f2ad23.png"
          alt="RtoC LABS — Reason to Create"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div
        className={`relative ${iconDimensions[size]} rounded-xl overflow-hidden bg-[#071426] p-0.5 border border-slate-700/80 shadow-md flex items-center justify-center shrink-0 ${className}`}
      >
        <img
          src="/assets/rtoc_r_logo.png"
          alt="RtoC LABS R Logo"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Lockup variant: Iconic 'R' emblem + brand typography
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <div
        className={`relative ${iconDimensions[size]} rounded-xl overflow-hidden bg-[#071426] p-0.5 border border-slate-700/80 shadow-md group-hover:border-[#22D3EE]/50 transition-colors flex items-center justify-center shrink-0`}
      >
        <img
          src="/assets/rtoc_r_logo.png"
          alt="RtoC LABS R Logo"
          className="w-full h-full object-contain"
        />
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
