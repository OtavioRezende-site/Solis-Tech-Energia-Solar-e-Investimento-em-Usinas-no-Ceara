import React from 'react';
import { motion } from 'motion/react';
import { Sun, Cpu, Users, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, smoothEase } from '../../utils/motion';

export const InstitutionalIntro: React.FC = () => {
  const pillars = [
    {
      icon: Sun,
      title: "Soluções fotovoltaicas",
      description:
        "Projetos dimensionados para o perfil de consumo e espaço de cada imóvel ou usina, utilizando tecnologia solar de alto rendimento.",
    },
    {
      icon: Cpu,
      title: "Projetos elétricos",
      description:
        "Desenvolvimento de projetos de engenharia, integração com a rede de distribuição e conformidade técnica com as normas vigentes.",
    },
    {
      icon: Users,
      title: "Atendimento especializado",
      description:
        "Equipe dedicada para orientar investidores, empresários e proprietários desde o primeiro contato até a entrega do projeto.",
    },
    {
      icon: MapPin,
      title: "Presença no Ceará",
      description:
        "Atuação regional com unidade comercial no Cariri (Juazeiro do Norte) e matriz cadastral em Iguatu, facilitando a proximidade.",
    },
  ];

  return (
    <section id="apresentacao" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Editorial com Motion */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
            <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
            <span>Apresentação Institucional</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Energia inteligente para novos projetos e oportunidades.
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            A Solis Tech atua no desenvolvimento de soluções em energia solar, conectando tecnologia, engenharia e atendimento especializado às necessidades de cada projeto.
          </p>
        </motion.div>

        {/* 4 Destaques Principais Estruturados com Stagger e Hover Fluido */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={staggerItem}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: smoothEase } }}
                className="group p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] hover:border-[#102D46]/40 transition-colors shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5EBF0] flex items-center justify-center text-[#102D46] group-hover:bg-[#102D46] group-hover:text-[#B8EF35] transition-colors mb-5 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#102D46] mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#526273] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E5EBF0]/80">
                  <span className="text-[11px] font-semibold text-[#102D46] flex items-center gap-1 group-hover:text-[#091D2F]">
                    <span>Atuação Solis Tech</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Citação Institucional */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-sm font-medium text-[#102D46] italic">
            &ldquo;{COMPANY_INFO.slogan}&rdquo;
          </p>
          <span className="text-xs text-[#526273]">
            Solis Tech • {COMPANY_INFO.legalName}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
