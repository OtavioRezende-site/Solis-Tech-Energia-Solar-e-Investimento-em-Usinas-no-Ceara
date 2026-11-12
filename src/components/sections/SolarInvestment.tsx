import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building, KeyRound, Compass, MessageCircle } from 'lucide-react';
import investmentImg from '../../assets/images/solis_solar_investment_1794505469862.jpg';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, buttonPrimaryMotion, smoothEase } from '../../utils/motion';

interface SolarInvestmentProps {
  onSelectInterest?: (interest: string) => void;
}

export const SolarInvestment: React.FC<SolarInvestmentProps> = ({ onSelectInterest }) => {
  const handleCtaClick = () => {
    if (onSelectInterest) {
      onSelectInterest('usina-investimento');
    }
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cards = [
    {
      icon: Building,
      title: "Investimento em infraestrutura solar",
      description:
        "Projetos estruturados em ativos reais de geração fotovoltaica, conectados ao sistema elétrico e dimensionados para operação contínua.",
    },
    {
      icon: KeyRound,
      title: "Modelo de locação a ser apresentado pela equipe",
      description:
        "Nossos consultores detalham a estrutura contratual, as modalidades de alocação de créditos e o funcionamento do modelo aos interessados.",
    },
    {
      icon: Compass,
      title: "Atendimento para estudo e visita à usina",
      description:
        "Possibilidade de agendar reunião técnica, solicitar documentação do projeto e alinhar visita presencial para conhecer as instalações.",
    },
  ];

  return (
    <section id="investimento" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho com Motion */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
            <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
            <span>Oportunidade Comercial • Usinas para Locação</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Conheça uma nova forma de investir em energia solar.
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            A Solis Tech apresenta projetos de usinas fotovoltaicas voltados à locação. Nossa equipe comercial pode explicar o modelo, apresentar as condições disponíveis e orientar os próximos passos para quem deseja conhecer essa oportunidade.
          </p>
        </motion.div>

        {/* Layout Visual: Fotografia com Overlay Profundo + 3 Cards com Stagger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          {/* Fotografia da Usina com Zoom Suave */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-6 relative flex flex-col"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E5EBF0] h-full min-h-[340px] bg-slate-900 group">
              <img
                src={investmentImg}
                alt="Usina Solar Fotovoltaica da Solis Tech"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#091D2F]/90 via-[#091D2F]/35 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8EF35] block">
                  Infraestrutura Fotovoltaica
                </span>
                <p className="text-sm font-semibold leading-snug">
                  Projetos de usinas de solo e geração compartilhada no Ceará.
                </p>
                <p className="text-xs text-slate-300">
                  Condições, características técnicas e modelos de locação apresentados sob consulta individual.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Os 3 Cards Explicativos com Stagger e Hover */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-6 flex flex-col justify-between gap-4"
          >
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: smoothEase } }}
                  className="p-6 rounded-2xl bg-white border border-[#E5EBF0] hover:border-[#102D46]/40 transition-colors shadow-2xs hover:shadow-md flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#102D46] text-[#B8EF35] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#102D46]">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-[#526273] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Faixa de Ação e CTA Principal */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5EBF0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-[#102D46]">
              Deseja conhecer os modelos de usinas para investimento?
            </h3>
            <p className="text-xs sm:text-sm text-[#526273]">
              Nossa equipe comercial está pronta para tirar dúvidas e apresentar as condições disponíveis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <motion.button
              type="button"
              onClick={handleCtaClick}
              {...buttonPrimaryMotion}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer shadow-xs"
            >
              <span>Quero conhecer as condições</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              href={COMPANY_INFO.whatsappInvestmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs text-[#102D46] bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#102D46]" />
              <span>Falar com Joel Patricio</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
