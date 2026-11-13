import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Ícone exato do WhatsApp (anel contornado com cauda inferior esquerda e telefone sólido interno),
 * utilizando a paleta de cores da Solis Tech via currentColor.
 */
export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    {/* Anel externo do balão com cauda inferior esquerda */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.88.53 3.72 1.52 5.31L2.02 22l4.89-1.53a9.92 9.92 0 0 0 5.13 1.44c5.5 0 9.96-4.46 9.96-9.95C22 6.46 17.54 2 12.04 2Zm0 18.11a8.13 8.13 0 0 1-4.38-1.28l-.31-.2-2.93.81.86-2.85-.21-.33a8.13 8.13 0 0 1-1.19-4.3c0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16s-3.66 8.15-8.16 8.15Z"
    />
    {/* Monofone sólido interno centralizado */}
    <path
      transform="translate(0 -0.35)"
      d="M16.51 14.32c-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.17.25-.63.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.24-.01-.38.11-.5.11-.11.24-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.04s.88 2.37 1 2.53c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.4.52.59.19 1.13.16 1.55.1.48-.07 1.45-.59 1.65-1.16.21-.57.21-1.06.15-1.17-.07-.1-.23-.16-.47-.29Z"
    />
  </svg>
);

/**
 * Ícone exato do Google Maps (pino facetado oficial) estilizado na paleta Solis Tech.
 */
export const GoogleMapsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* Corpo principal do pino */}
    <path
      d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.04 5.83 11.24 7.05 12.48a.63.63 0 0 0 .9 0C13.67 20.74 19.5 14.54 19.5 9.5 19.5 5.36 16.14 2 12 2Z"
      fill="#091D2F"
    />
    {/* Faceta superior direita em azul Solis Tech */}
    <path
      d="M12 2c2.52 0 4.75 1.25 6.1 3.16L12 12.2V2Z"
      fill="#1A4971"
    />
    {/* Faceta inferior esquerda em contraste suave */}
    <path
      d="M6.4 14.3 12 9.5l-4.48-5.1A7.47 7.47 0 0 0 4.5 9.5c0 1.72.73 3.4 1.9 4.8Z"
      fill="#102D46"
    />
    {/* Faceta inferior em destaque verde-lima da marca */}
    <path
      d="M12 12.2 18.1 5.16A7.46 7.46 0 0 1 19.5 9.5c0 2.66-1.52 5.47-3.28 7.82L12 12.2Z"
      fill="#276394"
    />
    {/* Círculo interno oficial do pino */}
    <circle cx="12" cy="9.5" r="3" fill="#FFFFFF" />
  </svg>
);

/**
 * Ícone exato do Waze (balão com rodas e sorriso característico) estilizado na paleta Solis Tech.
 */
export const WazeIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* Corpo do personagem Waze */}
    <path
      d="M13.2 3.2c4.48 0 7.8 3.05 7.8 7.05 0 3.74-2.74 6.75-6.95 7.15H7.28c-1.82 0-3.36-.88-4.22-2.25-.23-.37.02-.85.46-.88.96-.06 1.75-.62 1.97-1.45.22-.81.08-1.64.26-2.85C6.3 6.2 9.18 3.2 13.2 3.2Z"
      fill="#FFFFFF"
      stroke="#102D46"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Rodas */}
    <circle cx="8.6" cy="19.3" r="1.95" fill="#102D46" />
    <circle cx="8.6" cy="19.3" r="0.65" fill="#B8EF35" />
    <circle cx="15.8" cy="19.3" r="1.95" fill="#102D46" />
    <circle cx="15.8" cy="19.3" r="0.65" fill="#B8EF35" />
    {/* Olhos */}
    <circle cx="11.3" cy="9.4" r="1.05" fill="#102D46" />
    <circle cx="15.7" cy="9.4" r="1.05" fill="#102D46" />
    {/* Sorriso clássico */}
    <path
      d="M10.7 12.3c.65 1.18 1.88 1.85 3.18 1.72 1-.1 1.84-.67 2.34-1.52"
      stroke="#102D46"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
