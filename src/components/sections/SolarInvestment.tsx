import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '../common/BrandIcons';
import investmentImg from '../../assets/images/solis_solar_investment_1794505469862.jpg';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, continuousViewport, buttonPrimaryMotion } from '../../utils/motion';

interface SolarInvestmentProps {
  onSelectInterest?: (interest: string) => void;
}

interface InvestmentTier {
  id: string;
  label: string;
  capitalNote: string;
  monthlyPotential: string;
  profile: string;
  summary: string;
  highlights: string[];
}

export const SolarInvestment: React.FC<SolarInvestmentProps> = ({ onSelectInterest }) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('usina-plena');

  const investmentTiers: InvestmentTier[] = [
    {
      id: 'entrada',
      label: 'Módulo Inicial',
      capitalNote: 'Alocação a partir de R$ 100 mil',
      monthlyPotential: 'Renda proporcional à potência instalada',
      profile: 'Investidores que buscam iniciar em energia solar com menor aporte e liquidez previsível.',
      summary:
        'Ideal para diversificar patrimônio saindo da renda fixa conservadora para um ativo gerador de caixa real com contratos de locação.',
      highlights: [
        'Substitui imóveis menores com menor custo de manutenção',
        'Operação e engenharia completa pela equipe Solis Tech',
        'Possibilidade de expansão modular futura',
      ],
    },
    {
      id: 'intermediario',
      label: 'Escala Comercial',
      capitalNote: 'Faixa de R$ 150 mil a R$ 250 mil',
      monthlyPotential: 'Fluxo mensal ampliado por locação empresarial',
      profile: 'Empresários e investidores que buscam receita mensal recorrente acima de aluguéis convencionais.',
      summary:
        'Projeto estruturado para atender empresas consumidoras do Ceará que buscam economia imediata na fatura de energia via aluguel de usina.',
      highlights: [
        'Contratos voltados a consumidores comerciais contínuos',
        'Sem despesas com reformas, condomínio ou vacância imobiliária',
        'Acompanhamento de desempenho e telemetria em tempo real',
      ],
    },
    {
      id: 'usina-plena',
      label: 'Usina Máximo ROI',
      capitalNote: 'Projetos completos de alto desempenho',
      monthlyPotential: 'Até R$ 6.300/mês em locação',
      profile: 'Investidores focados em máxima geração de renda passiva mensal e retorno acelerado do capital.',
      summary:
        'Enquanto construir uma casa do mesmo valor gera um aluguel modesto e lento, uma usina nesta faixa maximiza a produção no sol do Ceará para alcançar até R$ 6.300/mês.',
      highlights: [
        'Potencial de receita mensal de até R$ 6.300 conforme estudo técnico',
        'Payback e ROI projetados muito superiores à construção civil',
        'Visita presencial disponível às instalações da Solis Tech no Cariri',
      ],
    },
  ];

  const activeTier = investmentTiers.find((t) => t.id === selectedTierId) || investmentTiers[2];

  const pillars = [
    {
      num: '01',
      title: 'Você adquire o ativo gerador, não dor de cabeça com obra',
      description:
        'A Solis Tech entrega engenharia, homologação junto à distribuidora e montagem completa. Sem atraso de pedreiro, sem custo oculto de acabamento.',
    },
    {
      num: '02',
      title: 'Receita recorrente via locação da energia gerada',
      description:
        'A energia produzida pela sua usina é alugada para empresas no Ceará que já consomem eletricidade todo mês, transformando irradiação solar em fluxo financeiro.',
    },
    {
      num: '03',
      title: 'Transparência documental e visita presencial no Cariri',
      description:
        'Antes de aportar qualquer recurso, você analisa o estudo individualizado de ROI, documentação contratual e pode visitar usinas em operação com nossa equipe.',
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
    <section id="investimento" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Assimétrico */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14"
        >
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
              Modelo de Negócio &amp; ROI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Sua usina produzindo energia. O aluguel trabalhando pelo seu retorno.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-[#526273] leading-relaxed">
              Em vez de imobilizar patrimônio em alvenaria com retorno lento, invista em geração solar para locação, um ativo de alta demanda com receita mensal de até <strong className="text-[#102D46] tabular-nums">R$ 6.300/mês</strong>.
            </p>
          </div>
        </motion.div>

        {/* Split Principal: Fotografia de Usina + 3 Pilares em Lista Hairline (sem cards repetidos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-6 relative flex flex-col"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E5EBF0] aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-[400px] bg-slate-900 group">
              <img
                src={investmentImg}
                alt="Usina Solar Fotovoltaica para Investimento da Solis Tech"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#091D2F]/95 via-[#091D2F]/35 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1.5 sm:space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8EF35] block">
                  Ativo Real Produtivo · Ceará
                </span>
                <p className="text-base sm:text-xl font-bold leading-snug">
                  Retorno mensal projetado de até R$ 6.300 com locação de usinas.
                </p>
                <p className="text-xs text-slate-300">
                  Estudo financeiro detalhado e visita técnica agendados diretamente com o time comercial.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-6 flex flex-col justify-center divide-y divide-[#E5EBF0] border-y border-[#E5EBF0]"
          >
            {pillars.map((pillar) => (
              <div key={pillar.num} className="py-6 first:pt-5 last:pb-5 flex items-start gap-5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#102D46]/25 tabular-nums leading-none pt-1">
                  {pillar.num}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#102D46] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#526273] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Simulador / Explorador Interativo de Faixas de ROI (Substitui faixas estáticas) */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="rounded-2xl bg-[#102D46] text-white p-6 sm:p-8 lg:p-10 shadow-md"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/15">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B8EF35] block">
                Simule seu Perfil de Investimento
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Selecione uma faixa de projeto para ver como o modelo opera
              </h3>
            </div>

            {/* Controles Interativos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-1.5 p-1.5 rounded-xl bg-[#091D2F] border border-white/10 w-full lg:w-auto">
              {investmentTiers.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`px-3.5 py-2.5 sm:py-2 rounded-lg text-xs font-bold transition-colors text-center whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#B8EF35] text-[#091D2F]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#B8EF35] tabular-nums">
                  {activeTier.monthlyPotential}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  · {activeTier.capitalNote}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {activeTier.summary}
              </p>

              <p className="text-xs text-slate-300">
                <strong className="text-white">Perfil indicado.</strong> {activeTier.profile}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 border-t lg:border-t-0 lg:border-l border-white/15 pt-5 lg:pt-0 lg:pl-8">
                {activeTier.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8EF35] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:pl-8">
                <motion.button
                  type="button"
                  onClick={handleCtaClick}
                  {...buttonPrimaryMotion}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer"
                >
                  <span>Receber estudo deste modelo</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <a
                  href={COMPANY_INFO.whatsappInvestmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#B8EF35] shrink-0" />
                  <span>Falar com Joel Patricio</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
