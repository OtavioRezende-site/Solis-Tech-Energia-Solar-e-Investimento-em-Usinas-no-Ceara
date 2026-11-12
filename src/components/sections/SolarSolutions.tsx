import React from 'react';
import { motion } from 'motion/react';
import {
  Building,
  Home,
  Building2,
  Tractor,
  Cpu,
  Wrench,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SolutionItem } from '../../types';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, smoothEase } from '../../utils/motion';

interface SolarSolutionsProps {
  onSelectInterest?: (interest: string) => void;
}

export const SolarSolutions: React.FC<SolarSolutionsProps> = ({ onSelectInterest }) => {
  const solutions: SolutionItem[] = [
    {
      id: "usinas-investimento",
      serviceKey: "investimento",
      title: "Usinas solares para investimento",
      badge: "Destaque Comercial",
      shortDescription:
        "Projetos fotovoltaicos de solo e geração compartilhada estruturados para locação, voltados a investidores que buscam ativos de infraestrutura.",
      features: [
        "Apresentação do modelo de locação",
        "Estudo de documentação técnica e contratual",
        "Possibilidade de visita à usina",
      ],
      iconName: "Building",
    },
    {
      id: "solar-residencial",
      serviceKey: "residencial",
      title: "Energia solar residencial",
      shortDescription:
        "Sistemas dimensionados para residências urbanas e condomínios fechados, reduzindo o custo mensal de energia com valorização patrimonial.",
      features: [
        "Estudo de sombreamento e área de telhado",
        "Módulos fotovoltaicos de alta eficiência",
        "Homologação completa junto à Enel-CE",
      ],
      iconName: "Home",
    },
    {
      id: "solar-comercial",
      serviceKey: "comercial",
      title: "Energia solar comercial",
      shortDescription:
        "Soluções para comércios, clínicas, escritórios, galpões e supermercados que buscam diminuir custos fixos com previsibilidade energética.",
      features: [
        "Dimensionamento para curvas de consumo comercial",
        "Instalação sem interrupção das atividades",
        "Linhas de financiamento para pessoas jurídicas",
      ],
      iconName: "Building2",
    },
    {
      id: "solar-rural",
      serviceKey: "rural",
      title: "Energia solar rural",
      shortDescription:
        "Sistemas desenvolvidos para propriedades agrícolas, irrigação, granjas, ordenhas mecânicas e beneficiamento rural no Ceará.",
      features: [
        "Projetos compatíveis com bombas d'água e motores",
        "Adequação às características do semiárido",
        "Orientação técnica para atendimento no campo",
      ],
      iconName: "Tractor",
    },
    {
      id: "projetos-instalacoes",
      serviceKey: "projetos-instalacoes",
      title: "Projetos elétricos e instalações fotovoltaicas",
      shortDescription:
        "Engenharia elétrica executiva, projetos de subestação, diagramas unifilares e montagem de estruturas de solo ou fixações em cobertura.",
      features: [
        "Engenharia em conformidade com as normas ABNT",
        "Montagem por equipe técnica especializada",
        "Comissionamento rigoroso de segurança",
      ],
      iconName: "Cpu",
    },
    {
      id: "manutencao",
      serviceKey: "manutencao",
      title: "Manutenção preventiva e corretiva",
      shortDescription:
        "Serviços especializados de limpeza técnica de painéis, reaperto de conexões, testes de isolamento e reparos em inversores e cabeamento.",
      features: [
        "Lavagem técnica adequada para preservar garantias",
        "Inspeções termográficas e elétricas",
        "Planos periódicos sob medida para cada usina",
      ],
      iconName: "Wrench",
    },
    {
      id: "monitoramento",
      serviceKey: "monitoramento",
      title: "Monitoramento de sistemas",
      shortDescription:
        "Acompanhamento do desempenho diário de geração por telemetria e relatórios, permitindo agir com rapidez diante de oscilações de rede.",
      features: [
        "Acesso aos dados de geração em tempo real",
        "Diagnóstico ágil de falhas e alarmes de rede",
        "Controle de performance do gerador solar",
      ],
      iconName: "Activity",
    },
    {
      id: "equipamentos",
      serviceKey: "equipamentos",
      title: "Painéis solares e soluções em equipamentos",
      shortDescription:
        "Orientação e fornecimento de componentes fotovoltaicos, módulos, inversores string, microinversores e estruturas metálicas de alta durabilidade.",
      features: [
        "Equipamentos com certificação e garantia de fábrica",
        "Estruturas em alumínio ou aço galvanizado",
        "Seleção tecnológica adequada ao clima cearense",
      ],
      iconName: "Layers",
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Building":
        return Building;
      case "Home":
        return Home;
      case "Building2":
        return Building2;
      case "Tractor":
        return Tractor;
      case "Cpu":
        return Cpu;
      case "Wrench":
        return Wrench;
      case "Activity":
        return Activity;
      default:
        return Layers;
    }
  };

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
            <span>Nossas Soluções</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Soluções completas em energia solar para diferentes perfis e necessidades.
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            Desde usinas voltadas a investimento e locação até sistemas de geração própria para residências, comércios e propriedades rurais no Ceará.
          </p>
        </motion.div>

        {/* Grade com os 8 Serviços Solicitados com Motion Stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {solutions.map((item) => {
            const Icon = getIcon(item.iconName);
            const isHighlight = item.serviceKey === "investimento";

            return (
              <motion.div
                key={item.id}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: smoothEase } }}
                className={`relative p-6 sm:p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isHighlight
                    ? 'bg-[#102D46] text-white border-[#102D46] shadow-md md:col-span-2 lg:col-span-2'
                    : 'bg-white text-[#102D46] border-[#E5EBF0] hover:border-[#102D46]/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isHighlight
                          ? 'bg-[#B8EF35] text-[#091D2F]'
                          : 'bg-[#F8FAFC] text-[#102D46] border border-[#E5EBF0]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-[#B8EF35] text-[#091D2F]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-lg font-bold mb-2 leading-snug ${
                      isHighlight ? 'text-white' : 'text-[#102D46]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isHighlight ? 'text-slate-200' : 'text-[#526273]'
                    }`}
                  >
                    {item.shortDescription}
                  </p>

                  <ul className="space-y-1.5 text-xs mb-6">
                    {item.features.map((feat) => (
                      <li
                        key={feat}
                        className={`flex items-center gap-2 ${
                          isHighlight ? 'text-slate-300' : 'text-[#526273]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHighlight ? 'bg-[#B8EF35]' : 'bg-[#102D46]'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 border-t ${isHighlight ? 'border-slate-700' : 'border-[#E5EBF0]'}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectService(item.serviceKey)}
                    className={`group/btn inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isHighlight
                        ? 'text-[#B8EF35] hover:text-white'
                        : 'text-[#102D46] hover:text-[#091D2F]'
                    }`}
                  >
                    <span>Saiba mais e solicite informações</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
