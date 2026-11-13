import React from 'react';
import { ADMIN_CONFIG } from '../../constants/adminConfig';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  officialLogoUrl?: string;
  showText?: boolean;
}

/**
 * Componente oficial de logotipo da SOLIS TECH.
 * Integra o emblema oficial original (sol em corona e módulos solares em perspectiva)
 * em harmonia com a tipografia corporativa SOLIS TECH.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
  officialLogoUrl,
  showText = true,
}) => {
  const isLight = variant === 'light';
  const logoSrc = officialLogoUrl || ADMIN_CONFIG.officialLogoUrl || '/images/logo-solis-official.png';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 font-bold tracking-tight select-none ${className}`}>
      {/* Emblema Oficial Original da Solis Tech */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={logoSrc}
          alt="Solis Tech - Logotipo Oficial"
          className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full ring-1 ring-[#B8EF35]/40 shadow-xs transition-transform duration-200 hover:scale-105"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-xl sm:text-[22px] tracking-tight font-extrabold ${
                isLight ? 'text-white' : 'text-[#102D46]'
              }`}
            >
              SOLIS
            </span>
            <span
              className={`text-[11px] sm:text-xs tracking-widest font-bold px-1.5 py-0.5 rounded ${
                isLight
                  ? 'bg-[#B8EF35] text-[#091D2F]'
                  : 'bg-[#102D46] text-[#B8EF35]'
              }`}
            >
              TECH
            </span>
          </div>
          <span
            className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
              isLight ? 'text-slate-300' : 'text-[#526273]'
            }`}
          >
            Energia Solar
          </span>
        </div>
      )}
    </div>
  );
};
