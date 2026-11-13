import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { ProjectItem } from '../../types';
import { fadeInUp, continuousViewport } from '../../utils/motion';

export const ProjectsPortfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projectsData: ProjectItem[] = [
    {
      id: "ref-1",
      name: "Fazenda Recreio",
      city: "Sousa / PB",
      category: "Rural",
      operationalStatus: "Em validação cadastral",
      description:
        "Referência de projeto de geração solar para atendimento rural e operações agrícolas no semiárido paraibano.",
      isPendingValidation: true,
      validationNotice: "Dados técnicos de potência e imagens autorizadas em processo de validação documental.",
    },
    {
      id: "ref-2",
      name: "Kari Móveis Planejados",
      city: "Juazeiro do Norte / CE",
      category: "Comercial",
      operationalStatus: "Em validação cadastral",
      description:
        "Referência de sistema fotovoltaico para otimização de despesas elétricas em operação comercial e industrial no Cariri.",
      isPendingValidation: true,
      validationNotice: "Aguardando conferência final de potência homologada e autorização de divulgação.",
    },
    {
      id: "ref-3",
      name: "Empresa Caminho da Paz",
      city: "Iguatu / CE",
      category: "Comercial",
      operationalStatus: "Em validação cadastral",
      description:
        "Referência de atendimento empresarial no polo Centro Sul cearense para infraestrutura de geração fotovoltaica.",
      isPendingValidation: true,
      validationNotice: "Em fase de compilação da ficha técnica executiva e termo de autorização institucional.",
    },
    {
      id: "ref-4",
      name: "Fazenda Lua",
      city: "Orós / CE",
      category: "Rural",
      operationalStatus: "Em validação cadastral",
      description:
        "Referência para atendimento de propriedades do agronegócio, sistemas de bombeamento e força na região de Orós.",
      isPendingValidation: true,
      validationNotice: "Aguardando validação final de indicadores operacionais e registros fotográficos autorizados.",
    },
  ];

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase() === filter);

  return (
    <section id="projetos" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6"
        >
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
              Referências Regionais
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Atuação comprovada no Cariri, Centro Sul e semiárido.
            </h2>
            <p className="text-base text-[#526273] leading-relaxed">
              Diretório de referências comerciais e rurais atendidas pela Solis Tech, com catalogação transparente de registros.
            </p>
          </div>

          {/* Filtros funcionais */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-white rounded-xl border border-[#E5EBF0] self-start lg:self-end">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-[#102D46] text-white'
                  : 'text-[#526273] hover:text-[#102D46]'
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setFilter('comercial')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'comercial'
                  ? 'bg-[#102D46] text-white'
                  : 'text-[#526273] hover:text-[#102D46]'
              }`}
            >
              Comerciais
            </button>
            <button
              type="button"
              onClick={() => setFilter('rural')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'rural'
                  ? 'bg-[#102D46] text-white'
                  : 'text-[#526273] hover:text-[#102D46]'
              }`}
            >
              Rurais
            </button>
          </div>
        </motion.div>

        {/* Diretório Arquitetural em Linhas (Substitui a grade de 4 cards cinzas idênticos) */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="bg-white rounded-2xl border border-[#E5EBF0] divide-y divide-[#E5EBF0] overflow-hidden"
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="p-6 sm:px-8 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center hover:bg-[#F8FAFC]/80 transition-colors"
            >
              {/* Nome e Localização */}
              <div className="lg:col-span-4 space-y-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#526273]">
                  <span className="font-bold text-[#102D46] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#102D46]" />
                    {project.city}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#102D46]">
                  {project.name}
                </h3>
              </div>

              {/* Descrição & Status */}
              <div className="lg:col-span-5 space-y-1">
                <p className="text-sm text-[#526273] leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs text-slate-400">
                  {project.validationNotice}
                </p>
              </div>

              {/* Ação */}
              <div className="lg:col-span-3 lg:text-right">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#102D46] hover:text-[#091D2F] underline decoration-[#B8EF35] decoration-2 underline-offset-4 whitespace-nowrap"
                >
                  <span>Solicitar estudo equivalente</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Nota discreta de governança técnica */}
        <div className="mt-5 flex items-start gap-2.5 text-xs text-[#526273]">
          <ShieldAlert className="w-4 h-4 text-[#102D46] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#102D46]">Transparência de registros.</strong> Dados detalhados de potência (kWp) e geração acumulada são apresentados durante a reunião técnica mediante autorização formal de cada cliente.
          </p>
        </div>
      </div>
    </section>
  );
};
