import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { trackEvent } from '../../utils/tracking';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exibe dica contextual após alguns segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!hasScrolled) {
    return null;
  }

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      source: 'floating_button',
      contact: COMPANY_INFO.contactPerson,
    });
  };

  return (
    <aside
      aria-label="Canal de atendimento direto no WhatsApp"
      className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-40 flex items-end gap-3"
    >
      {/* Tooltip com fechamento */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#102D46] px-4 py-2.5 rounded-xl shadow-lg border border-[#E5EBF0] text-xs font-semibold animate-in fade-in slide-in-from-right duration-200">
          <span>Fale com <strong>{COMPANY_INFO.contactPerson}</strong> sobre usinas e projetos</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Botão de ação WhatsApp */}
      <a
        href={COMPANY_INFO.whatsappInvestmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#102D46] text-[#B8EF35] hover:bg-[#091D2F] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#B8EF35]"
        aria-label={`Falar com ${COMPANY_INFO.contactPerson} da Solis Tech no WhatsApp`}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />
        <span className="sr-only">Atendimento Comercial no WhatsApp: {COMPANY_INFO.phone}</span>
      </a>
    </aside>
  );
};
