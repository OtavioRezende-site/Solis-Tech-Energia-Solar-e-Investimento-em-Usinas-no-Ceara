import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, buttonPrimaryMotion } from '../../utils/motion';

interface InvestmentJourneyProps {
  onSelectInterest?: (interest: string) => void;
}

export const InvestmentJourney: React.FC<InvestmentJourneyProps> = ({ onSelectInterest }) => {
  const steps = [
    {
      number: "01",
      title: "Alinhamento de capital",
      description:
        "Você informa a faixa de investimento pretendida e compara o potencial de retorno frente a outros ativos, como imóveis de aluguel.",
    },
    {
      number: "02",
      title: "Estudo de ROI e locação",
      description:
        "Nossa equipe apresenta os números do projeto, projeção de faturamento mensal (até R$ 6.300/mês conforme porte) e modelo contratual.",
    },
    {
      number: "03",
      title: "Visita técnica às usinas",
      description:
        "Você pode conhecer presencialmente as instalações no Cariri, avaliar equipamentos e conversar diretamente com nossa engenharia.",
    },
    {
      number: "04",
      title: "Implantação e receita mensal",
      description:
        "Com tudo aprovado, a Solis Tech executa a engenharia e conexão para sua usina operar e gerar receita recorrente.",
    },
  ];

  const handleCtaClick = () => {
    if (onSelectInterest) {
      onSelectInterest('usina-investimento');
    }
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="jornada" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
              Etapas do Investimento
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Da análise de viabilidade ao primeiro rendimento mensal.
            </h2>
          </div>

          <p className="text-base text-[#526273] max-w-md leading-relaxed">
            Processo estruturado, transparente e com validação documental completa antes de qualquer decisão de aporte.
          </p>
        </motion.div>

        {/* Timeline Editorial Horizontal (Zero caixas de cards — respiro visual limpo) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="relative mb-14"
        >
          {/* Linha conectora horizontal em desktop */}
          <div
            className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-[#E5EBF0]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="relative pl-6 lg:pl-0 border-l lg:border-l-0 border-[#E5EBF0] flex flex-col"
              >
                {/* Marcador numérico na linha */}
                <div className="flex items-center gap-3 mb-5 bg-white w-fit pr-4">
                  <span className="w-12 h-12 rounded-full bg-[#102D46] text-[#B8EF35] font-extrabold text-sm flex items-center justify-center tabular-nums shadow-xs">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#102D46] mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-[#526273] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Faixa de Transparência e Ação */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="pt-8 border-t border-[#E5EBF0] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-3 text-xs sm:text-sm text-[#526273] leading-relaxed max-w-3xl">
            <AlertCircle className="w-5 h-5 text-[#102D46] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#102D46]">Nota de transparência.</strong> O estudo prévio e a apresentação do modelo não equivalem à garantia de rentabilidade fixa. Toda análise considera porte do projeto, irradiação, disponibilidade técnica e premissas contratuais aplicáveis.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={handleCtaClick}
            {...buttonPrimaryMotion}
            className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer shadow-xs"
          >
            <span>Agendar análise de ROI</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
