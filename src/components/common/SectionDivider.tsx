import React from 'react';

type DividerVariant =
  | 'navy-to-white'
  | 'white-to-gray'
  | 'gray-to-white'
  | 'gray-to-navy'
  | 'navy-to-gray'
  | 'white-to-navy';

interface SectionDividerProps {
  variant: DividerVariant;
  className?: string;
}

/**
 * Componente reutilizável para suavizar a transição entre seções de backgrounds contrastantes
 * evitando cortes horizontais bruscos com gradientes calculados.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ variant, className = '' }) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'navy-to-white':
        return 'bg-linear-to-b from-[#091D2F] to-[#FFFFFF]';
      case 'white-to-navy':
        return 'bg-linear-to-b from-[#FFFFFF] to-[#102D46]';
      case 'white-to-gray':
        return 'bg-linear-to-b from-[#FFFFFF] to-[#F8FAFC]';
      case 'gray-to-white':
        return 'bg-linear-to-b from-[#F8FAFC] to-[#FFFFFF]';
      case 'gray-to-navy':
        return 'bg-linear-to-b from-[#F8FAFC] to-[#102D46]';
      case 'navy-to-gray':
        return 'bg-linear-to-b from-[#102D46] to-[#F8FAFC]';
      default:
        return 'bg-linear-to-b from-transparent to-transparent';
    }
  };

  return (
    <div
      className={`w-full h-8 sm:h-12 pointer-events-none select-none ${getGradientClasses()} ${className}`}
      aria-hidden="true"
    />
  );
};
