import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
  showText?: boolean;
  textSize?: string;
  textColor?: string;
  subtitleColor?: string;
  vertical?: boolean;
}

export function JoselinLogoSymbol({ className = "w-8 h-8", color = "#9B655E" }: { className?: string; color?: string }) {
  return (
    <img 
      src="/logojoselin.png" 
      alt="Joselin Logo" 
      className={className + " object-contain"} 
    />
  );
}

export default function BrandLogo({ 
  className = "h-12", 
  color = "#9B655E", 
  showText = true,
  textSize = "text-xl",
  textColor = "text-stone-900",
  subtitleColor = "text-stone-500",
  vertical = false
}: LogoProps) {
  if (vertical) {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        <JoselinLogoSymbol className="w-16 h-16" color={color} />
        <div className="flex flex-col items-center">
          <span 
            style={{ fontFamily: '"Biennale Book", "Plus Jakarta Sans", "Outfit", sans-serif' }}
            className={`font-display font-medium tracking-tight leading-none ${textSize} ${textColor}`}
          >
            Joselin
          </span>
          <span className={`text-[9px] uppercase tracking-[0.25em] mt-1.5 font-sans font-bold ${subtitleColor}`}>
            Next Level Training
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <JoselinLogoSymbol className="w-10 h-10 shrink-0" color={color} />
      {showText && (
        <div className="flex flex-col">
          <span 
            style={{ fontFamily: '"Biennale Book", "Plus Jakarta Sans", "Outfit", sans-serif' }}
            className={`font-display font-medium tracking-tight leading-none ${textSize} ${textColor}`}
          >
            Joselin
          </span>
          <span className={`text-[8px] uppercase tracking-[0.22em] mt-1 font-sans font-bold ${subtitleColor}`}>
            Next Level Training
          </span>
        </div>
      )}
    </div>
  );
}
