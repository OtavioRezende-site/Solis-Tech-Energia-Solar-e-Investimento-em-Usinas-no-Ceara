import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Users2, FileText, Eye, ArrowRight, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, buttonPrimaryMotion, smoothEase } from '../../utils/motion';

interface InvestmentJourneyProps {
  onSelectInterest?: (interest: string) => void;
}

export const InvestmentJourney: React.FC<InvestmentJourneyProps> = ({ onSelectInterest }) => {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Primeiro contato",
      description: "O interessado apresenta seu objetivo, perfil de investimento ou demanda energética para nossa equipe.",
    },
    {
      number: "02",
      icon: Users2,
      title: "Atendimento especializado",
      description: "Nossa equipe explica o modelo de usina, as características do setor e as opções disponíveis no momento.",
    },
    {
      number: "03",
      icon: FileText,
      title: "Estudo e documentação",
      description: "O interessado solicita informações técnicas, financeiras e contratuais detalhadas para avaliação individual.",
    },
    {
      number: "04",
      icon: Eye,
      title: "Conhecimento do projeto",
      description: "Possibilidade de agendar visita às instalações, tirar dúvidas com os responsáveis e discutir os próximos passos.",
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
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
            <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
            <span>Etapas Claras e Transparentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Da primeira conversa à análise do projeto.
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            Um processo estruturado para que você conheça cada detalhe técnico e comercial antes de qualquer tomada de decisão.
          </p>
        </motion.div>

        {/* 4 Etapas Conectadas Visualmente com Stagger e Hover */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-12"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={staggerItem}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: smoothEase } }}
                className="relative p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] hover:border-[#102D46]/40 transition-colors shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-[#102D46]/20 tabular-nums">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5EBF0] flex items-center justify-center text-[#102D46] shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#102D46] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#526273] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E5EBF0]/70 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Etapa {idx + 1} de 4</span>
                  {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-[#102D46]/40 hidden lg:block" />}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Aviso Regulatório e CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] space-y-4"
        >
          <div className="flex items-start gap-3 text-xs sm:text-sm text-[#526273] leading-relaxed">
            <AlertCircle className="w-5 h-5 text-[#102D46] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#102D46]">Nota de transparência:</strong> O estudo prévio e a apresentação do modelo não equivalem à garantia de aprovação cadastral, disponibilidade de projetos específicos ou garantia de retorno financeiro. Toda análise deve considerar os dados documentais e premissas contratuais aplicáveis.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5EBF0]">
            <span className="text-xs font-semibold text-[#102D46]">
              Pronto para conversar sobre o seu perfil de interesse?
            </span>

            <motion.button
              type="button"
              onClick={handleCtaClick}
              {...buttonPrimaryMotion}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer shadow-xs"
            >
              <span>Agendar conversa com a equipe</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
