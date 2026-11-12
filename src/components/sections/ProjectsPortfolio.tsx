import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, smoothEase } from '../../utils/motion';

export const ProjectsPortfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projectsData: ProjectItem[] = [
    {
      id: "ref-1",
      name: "Fazenda Recreio",
      city: "Sousa / PB",
      category: "Rural",
      operationalStatus: "Em levantamento cadastral",
      description:
        "Referência de projeto de geração solar para atendimento rural no semiárido paraibano.",
      isPendingValidation: true,
      validationNotice: "Referência documental divulgada anteriormente pela marca, com dados técnicos e autorização de imagem em processo de validação formal.",
    },
    {
      id: "ref-2",
      name: "Kari Móveis Planejados",
      city: "Juazeiro do Norte / CE",
      category: "Comercial",
      operationalStatus: "Em levantamento cadastral",
      description:
        "Referência de sistema fotovoltaico para redução de despesas elétricas em empresa do setor moveleiro no Cariri.",
      isPendingValidation: true,
      validationNotice: "Referência citada em comunicações preliminares da marca, aguardando validação de potência homologada e autorização de divulgação.",
    },
    {
      id: "ref-3",
      name: "Empresa Caminho da Paz",
      city: "Iguatu / CE",
      category: "Comercial",
      operationalStatus: "Em levantamento cadastral",
      description:
        "Referência de atendimento no polo Centro-Sul cearense para fornecimento e infraestrutura de energia fotovoltaica.",
      isPendingValidation: true,
      validationNotice: "Em fase de compilação de ficha técnica de engenharia e autorização de publicação institucional.",
    },
    {
      id: "ref-4",
      name: "Fazenda Lua",
      city: "Orós / CE",
      category: "Rural",
      operationalStatus: "Em levantamento cadastral",
      description:
        "Referência para atendimento de propriedades do agronegócio e sistemas de bombeamento e força na região de Orós.",
      isPendingValidation: true,
      validationNotice: "Projeto referenciado pela marca, aguardando validação de dados operacionais e registros fotográficos autorizados.",
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
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
              <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
              <span>Galeria de Referências</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Projetos e referências de atuação regional
            </h2>

            <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
              Estrutura preparada para catalogação dos cases reais atendidos pela Solis Tech no Ceará e estados vizinhos.
            </p>
          </div>

          {/* Filtros funcionais */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E5EBF0] self-start lg:self-end shadow-2xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#102D46] text-white shadow-xs'
                  : 'text-[#526273] hover:text-[#102D46]'
              }`}
            >
              Todas as Referências
            </button>
            <button
              type="button"
              onClick={() => setFilter('comercial')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'comercial'
                  ? 'bg-[#102D46] text-white shadow-xs'
                  : 'text-[#526273] hover:text-[#102D46]'
              }`}
            >
              Comerciais
            </button>
            <button
              type="button"
              onClick={() => setFilter('rural')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'rural'
                  ? 'bg-[#102D46] text-white shadow-xs'
                  : 'text-[#526273] hover:text-[#102D46]'
              }`}
            >
              Rurais
            </button>
          </div>
        </motion.div>

        {/* Nota de Governança */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3"
        >
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Nota de conformidade cadastral e técnica:</strong>
            <span>
              Em compromisso com a transparência e integridade das informações, os cases abaixo representam referências citadas em histórico comercial. Os dados de potência (kWp), geração acumulada e fotografias in loco serão publicados após a devida conclusão das autorizações de divulgação e conferência técnica dos registros.
            </span>
          </div>
        </motion.div>

        {/* Grade de Cards com Motion */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: smoothEase } }}
                className="bg-white rounded-2xl border border-[#E5EBF0] overflow-hidden hover:border-[#102D46]/40 transition-colors flex flex-col justify-between shadow-2xs hover:shadow-lg"
              >
                <div>
                  {/* Placeholder Visual com Identificação Clara */}
                  <div className="aspect-16/10 bg-linear-to-br from-[#102D46]/10 via-[#F8FAFC] to-[#E5EBF0] p-6 flex flex-col items-center justify-center text-center border-b border-[#E5EBF0] relative">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5EBF0] flex items-center justify-center text-[#102D46] mb-2 shadow-2xs">
                      <Sparkles className="w-5 h-5 text-[#102D46]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#102D46] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Imagem sob validação
                    </span>

                    <span className="absolute top-3 right-3 text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Em validação
                    </span>
                  </div>

                  {/* Conteúdo do Projeto */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#526273]">
                      <MapPin className="w-3.5 h-3.5 text-[#102D46]" />
                      <span>{project.city}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#102D46] leading-snug">
                      {project.name}
                    </h3>

                    <p className="text-xs text-[#526273] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                        Status de Validação
                      </span>
                      <p className="text-[11px] text-[#526273] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5EBF0] leading-relaxed">
                        {project.validationNotice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ação */}
                <div className="p-6 pt-0">
                  <a
                    href="#contato"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-[#102D46] bg-slate-100 hover:bg-[#B8EF35] hover:text-[#091D2F] transition-colors"
                  >
                    <span>Solicitar estudo para seu imóvel</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
