import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import engineeringImg from '../../assets/images/solis_engineering_substation_1794505470306.jpg';
import { fadeInUp, continuousViewport, buttonPrimaryMotion } from '../../utils/motion';

interface DifferentialsProps {
  onOpenContact?: () => void;
}

export const Differentials: React.FC<DifferentialsProps> = ({ onOpenContact }) => {
  const differentials = [
    {
      num: '01',
      title: 'Foco em rentabilidade e previsibilidade de caixa',
      description:
        'Estruturamos projetos voltados a retorno sobre o capital (ROI), mostrando em números por que a locação solar supera o aluguel imobiliário convencional.',
    },
    {
      num: '02',
      title: 'Ativo produtivo sem dor de cabeça com obra ou inquilino',
      description:
        'Diferente de construir casas para alugar, você não lida com atrasos de reforma, vacância residencial, IPTU ou desgaste estrutural do imóvel.',
    },
    {
      num: '03',
      title: 'Engenharia própria, homologação e O&M integrado',
      description:
        'Acompanhamento completo do projeto executivo à conexão elétrica, com planos de manutenção e telemetria para proteger o rendimento mensal.',
    },
    {
      num: '04',
      title: 'Presença regional consolidada no Ceará',
      description:
        'Unidade comercial ativa em Juazeiro do Norte (Cariri) e matriz cadastral em Iguatu, garantindo atendimento presencial próximo e ágil.',
    },
    {
      num: '05',
      title: 'Transparência documental e visita técnica às usinas',
      description:
        'Disponibilizamos estudos técnicos, condições contratuais e agendamento de visita presencial para que você valide o ativo antes de investir.',
    },
  ];

  const handleCta = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      const el = document.getElementById('contato');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="diferenciais" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Coluna Esquerda: Cabeçalho + Lista Editorial Numerada (7 cols — sem caixas de card) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-7 flex flex-col justify-between space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
                Segurança para o Investidor
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
                Solidez técnica para transformar sol em renda recorrente.
              </h2>
              <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
                Cada usina nasce de uma decisão financeira embasada em engenharia, dados reais de geração e suporte regional próximo.
              </p>
            </div>

            <div className="divide-y divide-[#E5EBF0] border-y border-[#E5EBF0]">
              {differentials.map((diff) => (
                <div key={diff.num} className="py-5 flex items-start gap-5">
                  <span className="text-sm font-extrabold text-[#102D46]/40 tabular-nums pt-0.5 shrink-0">
                    {diff.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#102D46] leading-snug">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-[#526273] leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coluna Direita: Fotografia Técnica Full-Height (5 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-5 relative flex flex-col"
          >
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#E5EBF0] h-full min-h-[360px] sm:min-h-[400px] relative bg-slate-900 flex flex-col justify-end p-6 sm:p-9 group">
              <img
                src={engineeringImg}
                alt="Subestação e engenharia técnica de usina solar da Solis Tech"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#091D2F] via-[#091D2F]/55 to-transparent" />

              <div className="relative z-10 text-white space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B8EF35] block">
                  Engenharia &amp; Campo
                </span>
                <h3 className="text-2xl font-bold leading-snug">
                  Infraestrutura projetada para performar por décadas.
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Equipamentos homologados, montagem especializada e acompanhamento próximo para proteger a rentabilidade do seu investimento.
                </p>

                <div className="pt-2">
                  <motion.button
                    type="button"
                    onClick={handleCta}
                    {...buttonPrimaryMotion}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer"
                  >
                    <span>Agendar conversa com o comercial</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
