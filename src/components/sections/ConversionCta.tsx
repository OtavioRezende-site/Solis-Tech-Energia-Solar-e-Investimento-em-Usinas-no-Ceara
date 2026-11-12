import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, continuousViewport, buttonPrimaryMotion, buttonSecondaryMotion } from '../../utils/motion';

interface ConversionCtaProps {
  onSelectInterest?: (interest: string) => void;
}

export const ConversionCta: React.FC<ConversionCtaProps> = ({ onSelectInterest }) => {
  const handleInvestmentClick = () => {
    if (onSelectInterest) {
      onSelectInterest('usina-investimento');
    }
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = () => {
    if (onSelectInterest) {
      onSelectInterest('comercial');
    }
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="conversao" className="relative py-24 bg-[#102D46] text-white overflow-hidden scroll-mt-20">
      {/* Luz ambiente com pulso contínuo */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B8EF35]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="space-y-4"
        >
          <span className="inline-block text-xs font-bold tracking-widest text-[#B8EF35] uppercase">
            Atendimento Direto e Especializado
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-balance">
            Seu próximo projeto começa com uma conversa.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-pretty">
            Fale com a Solis Tech, apresente seu objetivo e descubra quais soluções podem fazer sentido para você.
          </p>
        </motion.div>

        {/* Dois Botões Específicos Mandatórios com Motion */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <motion.button
            type="button"
            onClick={handleInvestmentClick}
            {...buttonPrimaryMotion}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-lg cursor-pointer"
          >
            <span>Quero conhecer usinas para investimento</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            type="button"
            onClick={handleProjectClick}
            {...buttonSecondaryMotion}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors cursor-pointer"
          >
            <span>Solicitar orçamento solar</span>
          </motion.button>
        </motion.div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-300">
          <MessageCircle className="w-3.5 h-3.5 text-[#B8EF35]" />
          <span>Atendimento comercial via WhatsApp: {COMPANY_INFO.phone} (Joel Patricio)</span>
        </div>
      </div>
    </section>
  );
};
