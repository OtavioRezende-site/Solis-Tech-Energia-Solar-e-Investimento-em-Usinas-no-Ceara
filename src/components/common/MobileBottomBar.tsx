import React, { useState, useEffect } from 'react';
import { TrendingUp, SunMedium } from 'lucide-react';
import { trackEvent } from '../../utils/tracking';

interface MobileBottomBarProps {
  onSelectFlow: (flow: 'investimento' | 'orcamento-solar') => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onSelectFlow }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById('contato');
      const footerEl = document.querySelector('footer');

      // Exibe após 350px de rolagem
      if (scrollY < 350) {
        setIsVisible(false);
        return;
      }

      // Oculta se o usuário estiver dentro ou próximo da seção de contato ou do rodapé
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        if (contactRect.top <= window.innerHeight * 0.7 && contactRect.bottom >= 0) {
          setIsVisible(false);
          return;
        }
      }

      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        if (footerRect.top <= window.innerHeight) {
          setIsVisible(false);
          return;
        }
      }

      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleClick = (flow: 'investimento' | 'orcamento-solar') => {
    trackEvent(flow === 'investimento' ? 'investment_cta_click' : 'quote_cta_click', {
      source: 'mobile_bottom_bar',
    });
    onSelectFlow(flow);
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Ações rápidas mobile"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E5EBF0] shadow-lg p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => handleClick('investimento')}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#102D46] text-[#B8EF35] font-bold text-xs shadow-xs active:scale-98 transition-transform cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Investir em usinas</span>
        </button>

        <button
          type="button"
          onClick={() => handleClick('orcamento-solar')}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#B8EF35] text-[#091D2F] font-bold text-xs shadow-xs active:scale-98 transition-transform cursor-pointer"
        >
          <SunMedium className="w-3.5 h-3.5" />
          <span>Pedir orçamento</span>
        </button>
      </div>
    </aside>
  );
};
