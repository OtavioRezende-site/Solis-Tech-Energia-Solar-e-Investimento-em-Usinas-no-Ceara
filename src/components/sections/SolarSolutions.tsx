import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { SolutionItem } from '../../types';
import { fadeInUp, continuousViewport, buttonPrimaryMotion, smoothEase } from '../../utils/motion';

interface SolarSolutionsProps {
  onSelectInterest?: (interest: string) => void;
}

export const SolarSolutions: React.FC<SolarSolutionsProps> = ({ onSelectInterest }) => {
  const secondarySolutions: SolutionItem[] = [
    {
      id: "solar-comercial",
      serviceKey: "comercial",
      title: "Energia solar para empresas e comércios",
      shortDescription:
        "Redução expressiva no custo fixo operacional de supermercados, clínicas, indústrias e galpões logísticos, elevando a margem líquida do negócio.",
      features: [
        "Dimensionamento para curvas de demanda comercial e industrial",
        "Instalação planejada sem paralisar a operação da empresa",
        "Acompanhamento completo de homologação junto à distribuidora",
      ],
      iconName: "Building2",
    },
    {
      id: "solar-rural",
      serviceKey: "rural",
      title: "Agronegócio e propriedades rurais",
      shortDescription:
        "Sistemas robustos para fazendas, projetos de irrigação, granjas e beneficiamento rural no semiárido cearense, reduzindo o custo energético da produção.",
      features: [
        "Compatibilidade com motores, bombas d'água e pivôs de irrigação",
        "Engenharia dimensionada para altas temperaturas do Ceará",
        "Suporte técnico regional no Cariri e Centro Sul",
      ],
      iconName: "Tractor",
    },
    {
      id: "projetos-instalacoes",
      serviceKey: "projetos-instalacoes",
      title: "Engenharia elétrica e implantação turnkey",
      shortDescription:
        "Elaboração de projetos executivos, subestações, diagramas unifilares e montagem completa de usinas de solo ou grandes coberturas.",
      features: [
        "Conformidade integral com normas ABNT e concessionárias",
        "Equipe técnica própria para execução e comissionamento",
        "Documentação técnica completa para análise do investidor",
      ],
      iconName: "Cpu",
    },
    {
      id: "manutencao",
      serviceKey: "manutencao",
      title: "Operação e manutenção (O&M) de usinas",
      shortDescription:
        "Preservação máxima da geração mensal do seu ativo com limpeza técnica de módulos, inspeções termográficas e manutenção preventiva ou corretiva.",
      features: [
        "Protocolo técnico que preserva a eficiência e garantias de fábrica",
        "Inspeções elétricas e reaperto preventivo de conexões",
        "Planos periódicos para manter a receita da usina previsível",
      ],
      iconName: "Wrench",
    },
    {
      id: "monitoramento",
      serviceKey: "monitoramento",
      title: "Monitoramento e telemetria de geração",
      shortDescription:
        "Controle contínuo do desempenho da usina e diagnóstico rápido de oscilações de rede para proteger o retorno financeiro mês a mês.",
      features: [
        "Acompanhamento em tempo real da energia injetada na rede",
        "Alertas imediatos para atuação rápida da engenharia",
        "Relatórios claros de performance operacional",
      ],
      iconName: "Activity",
    },
    {
      id: "solar-residencial",
      serviceKey: "residencial",
      title: "Projetos residenciais de alto padrão",
      shortDescription:
        "Sistemas fotovoltaicos personalizados para residências e condomínios que buscam autonomia energética e valorização do imóvel.",
      features: [
        "Estudo detalhado de irradiação e layout arquitetônico",
        "Equipamentos certificados de primeira linha",
        "Homologação completa na Enel Ceará",
      ],
      iconName: "Home",
    },
    {
      id: "equipamentos",
      serviceKey: "equipamentos",
      title: "Especificação de módulos, inversores e estruturas",
      shortDescription:
        "Seleção tecnológica criteriosa de painéis, inversores e estruturas metálicas de solo ou telhado voltada à longevidade do patrimônio.",
      features: [
        "Fornecedores consolidados com garantias estendidas",
        "Estruturas em aço galvanizado ou alumínio de alta resistência",
        "Dimensionamento focado em durabilidade e ROI de longo prazo",
      ],
      iconName: "Layers",
    },
  ];

  const [activeId, setActiveId] = useState<string>(secondarySolutions[0].id);
  const activeService = secondarySolutions.find((s) => s.id === activeId) || secondarySolutions[0];

  const handleSelectService = (serviceKey: string) => {
    if (onSelectInterest) {
      onSelectInterest(serviceKey);
    }
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solucoes" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Cabeçalho */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
            Portfólio de Soluções Solis Tech
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Do ativo de renda passiva à engenharia energética completa.
          </h2>
          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            Nosso foco principal são as usinas solares para investimento e locação, complementado por toda a estrutura de engenharia, O&amp;M e projetos corporativos no Ceará.
          </p>
        </motion.div>

        {/* Destaque Principal (Âncora Única — Foco em Investimento & ROI) */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="rounded-2xl bg-[#102D46] text-white p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-md"
        >
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8EF35] block">
              Foco Principal · Modelo de Negócio
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight text-balance">
              Usinas Solares para Investimento e Locação
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Estrutura desenhada para investidores que querem transformar capital em fluxo de caixa mensal de até <strong className="text-white tabular-nums">R$ 6.300/mês</strong>, com retorno muito superior à construção de imóveis para aluguel e zero preocupação operacional.
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 space-y-5">
            <ul className="space-y-2.5 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#B8EF35] shrink-0 mt-0.5" />
                <span>Estudo detalhado de ROI e payback antes da decisão</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#B8EF35] shrink-0 mt-0.5" />
                <span>Modelo de locação estruturado para empresas no Ceará</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#B8EF35] shrink-0 mt-0.5" />
                <span>Visita técnica presencial às usinas no Cariri</span>
              </li>
            </ul>

            <motion.button
              type="button"
              onClick={() => handleSelectService('investimento')}
              {...buttonPrimaryMotion}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer"
            >
              <span>Solicitar estudo de usina para investimento</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Índice Interativo de Serviços Complementares */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4"
        >
          {/* Lista Numerada Clicável à Esquerda (com expansão inline no mobile) */}
          <div className="lg:col-span-6 divide-y divide-[#E5EBF0] border-y border-[#E5EBF0]">
            {secondarySolutions.map((item, idx) => {
              const isSelected = item.id === activeId;
              const numLabel = String(idx + 1).padStart(2, '0');

              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-expanded={isSelected}
                    className={`w-full text-left py-4 px-3 sm:px-4 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#102D46]'
                        : 'hover:bg-white/60 text-[#526273] hover:text-[#102D46]'
                    }`}
                  >
                    <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                      <span
                        className={`text-xs font-bold tabular-nums shrink-0 ${
                          isSelected ? 'text-[#102D46]' : 'text-slate-400'
                        }`}
                      >
                        {numLabel}.
                      </span>
                      <span
                        className={`text-sm sm:text-base font-bold leading-snug ${
                          isSelected ? 'text-[#102D46]' : 'text-[#102D46]/80'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-[#102D46] rotate-90 lg:rotate-0 lg:translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </button>

                  {/* Detalhe Inline Exclusivo Mobile (< lg) para leitura imediata sem rolagem */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: smoothEase }}
                        className="lg:hidden overflow-hidden bg-white px-4 pb-5 pt-1 space-y-4"
                      >
                        <p className="text-sm text-[#526273] leading-relaxed">
                          {item.shortDescription}
                        </p>
                        <ul className="space-y-2.5 pt-3 border-t border-[#E5EBF0]">
                          {item.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#102D46]">
                              <span className="w-5 h-5 rounded-full bg-[#B8EF35]/30 text-[#091D2F] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => handleSelectService(item.serviceKey)}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#102D46] hover:text-[#091D2F] underline decoration-[#B8EF35] decoration-2 underline-offset-4 cursor-pointer"
                          >
                            <span>Solicitar atendimento para este perfil</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Painel de Detalhes Dinâmico à Direita (Desktop lg+) */}
          <div className="hidden lg:block lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: smoothEase }}
                className="bg-white rounded-2xl border border-[#E5EBF0] p-7 sm:p-9 space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#526273] block">
                    Engenharia &amp; Projetos Solis Tech
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#102D46] leading-snug">
                    {activeService.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#526273] leading-relaxed">
                  {activeService.shortDescription}
                </p>

                <ul className="space-y-3 pt-4 border-t border-[#E5EBF0]">
                  {activeService.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-[#102D46]">
                      <span className="w-5 h-5 rounded-full bg-[#B8EF35]/30 text-[#091D2F] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#E5EBF0]">
                  <button
                    type="button"
                    onClick={() => handleSelectService(activeService.serviceKey)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#102D46] hover:text-[#091D2F] underline decoration-[#B8EF35] decoration-2 underline-offset-4 cursor-pointer"
                  >
                    <span>Solicitar atendimento para este perfil</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
