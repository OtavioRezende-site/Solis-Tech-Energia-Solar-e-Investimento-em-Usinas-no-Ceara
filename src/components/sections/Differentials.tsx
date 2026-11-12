import React from 'react';
import { motion } from 'motion/react';
import { Users2, Layers2, Wrench, MapPin, FileCheck2, ArrowRight } from 'lucide-react';
import engineeringImg from '../../assets/images/solis_engineering_substation_1794505470306.jpg';
import { fadeInUp, staggerContainer, staggerItem, continuousViewport, buttonPrimaryMotion, smoothEase } from '../../utils/motion';

interface DifferentialsProps {
  onOpenContact?: () => void;
}

export const Differentials: React.FC<DifferentialsProps> = ({ onOpenContact }) => {
  const differentials = [
    {
      icon: Users2,
      title: "Atendimento comercial especializado",
      description:
        "Orientação próxima e direta para entender a real necessidade de cada cliente, seja investidor, empresário ou proprietário rural.",
    },
    {
      icon: Layers2,
      title: "Atuação com projetos solares de diferentes perfis",
      description:
        "Flexibilidade técnica para atender desde usinas de grande porte para locação até instalações residenciais, comerciais e do agronegócio.",
    },
    {
      icon: Wrench,
      title: "Serviços de instalação e manutenção",
      description:
        "Capacidade de acompanhar o projeto em sua totalidade, abrangendo montagem física, comissionamento elétrico e suporte técnico de manutenção preventiva e corretiva.",
    },
    {
      icon: MapPin,
      title: "Presença regional no Ceará",
      description:
        "Estrutura com unidade de atendimento comercial em Juazeiro do Norte (Região do Cariri) e matriz cadastral em Iguatu (Centro-Sul).",
    },
    {
      icon: FileCheck2,
      title: "Possibilidade de conhecer projetos e solicitar informações técnicas",
      description:
        "Transparência para disponibilizar documentações, dados descritivos e viabilizar visitas presenciais a projetos aos interessados qualificados.",
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
            <span>Transparência e Confiabilidade</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Cada projeto começa com uma decisão bem informada.
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            Priorizamos a clareza nas informações, o alinhamento de expectativas e o suporte técnico adequado para que cada etapa seja segura e compreensível.
          </p>
        </motion.div>

        {/* Layout Visual: Grade de 5 Diferenciais + Imagem Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Diferenciais em Cards com Stagger (7 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {differentials.map((diff, index) => {
              const Icon = diff.icon;
              const isFull = index === differentials.length - 1;

              return (
                <motion.div
                  key={diff.title}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: smoothEase } }}
                  className={`p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] hover:border-[#102D46]/40 transition-colors shadow-2xs hover:shadow-md flex flex-col justify-between ${
                    isFull ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5EBF0] flex items-center justify-center text-[#102D46] mb-4 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-[#102D46] mb-1.5 leading-snug">
                      {diff.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#526273] leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Imagem Técnica de Campo (5 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-5 relative flex flex-col"
          >
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#E5EBF0] h-full min-h-[360px] relative bg-slate-900 flex flex-col justify-end p-6 sm:p-8 group">
              <img
                src={engineeringImg}
                alt="Infraestrutura técnica de energia solar"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#091D2F] via-[#091D2F]/60 to-transparent" />

              <div className="relative z-10 text-white space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8EF35] block">
                  Engenharia e Campo
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  Compromisso com o rigor técnico em cada conexão.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trabalhamos com equipamentos de fornecedores estabelecidos e acompanhamos todas as etapas elétricas do projeto.
                </p>

                <div className="pt-2">
                  <motion.button
                    type="button"
                    onClick={handleCta}
                    {...buttonPrimaryMotion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer"
                  >
                    <span>Falar com a equipe técnica</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
