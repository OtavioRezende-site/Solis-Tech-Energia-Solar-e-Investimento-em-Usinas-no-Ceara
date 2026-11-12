import React from 'react';
import { ADMIN_CONFIG } from '../../constants/adminConfig';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  officialLogoUrl?: string;
}

/**
 * Componente oficial provisório da Solis Tech.
 * Projetado para suportar arquivo oficial de logotipo quando disponibilizado,
 * mantendo uma marca textual elegante e refinada por padrão.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
  officialLogoUrl,
}) => {
  const isLight = variant === 'light';
  const effectiveLogoUrl = officialLogoUrl || ADMIN_CONFIG.officialLogoUrl;

  if (effectiveLogoUrl) {
    return (
      <img
        src={effectiveLogoUrl}
        alt="Solis Tech - Energia Solar"
        className={`h-8 md:h-10 w-auto object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Símbolo geométrico de engenharia e sol */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
          isLight
            ? 'bg-[#B8EF35] text-[#091D2F]'
            : 'bg-[#102D46] text-[#B8EF35]'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Célula solar angularizada com feixe de luz */}
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-xl tracking-tight font-extrabold ${
              isLight ? 'text-white' : 'text-[#102D46]'
            }`}
          >
            SOLIS
          </span>
          <span
            className={`text-xl tracking-wider font-semibold ${
              isLight ? 'text-[#B8EF35]' : 'text-[#B8EF35] bg-[#102D46] px-1 py-0.5 rounded text-xs tracking-widest'
            }`}
          >
            TECH
          </span>
        </div>
        <span
          className={`text-[9px] tracking-widest uppercase font-medium mt-0.5 ${
            isLight ? 'text-slate-300' : 'text-[#526273]'
          }`}
        >
          Energia Solar
        </span>
      </div>
    </div>
  );
};
