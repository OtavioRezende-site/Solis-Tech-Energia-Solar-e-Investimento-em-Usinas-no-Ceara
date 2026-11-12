import React from 'react';
import { motion } from 'motion/react';
import { Building2, FileText, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, continuousViewport, smoothEase } from '../../utils/motion';

export const AboutCompany: React.FC = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Coluna Esquerda: Texto Institucional Oficial (7 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
              <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
              <span>Sobre a Solis Tech</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Tecnologia, engenharia e energia para construir o futuro.
            </h2>

            <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
              A Solis Tech atua no setor de energia solar com soluções para diferentes necessidades, de sistemas fotovoltaicos a projetos voltados a investimento. Com matriz cadastrada em Iguatu e presença comercial em Juazeiro do Norte, mantém canais de atendimento para clientes interessados em conhecer suas soluções.
            </p>

            {/* Presença Territorial Declarada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2, ease: smoothEase } }}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-2 text-[#102D46]">
                  <MapPin className="w-4 h-4 text-[#102D46]" />
                  <h3 className="text-sm font-bold">Presença Comercial</h3>
                </div>
                <strong className="block text-sm text-[#102D46]">{COMPANY_INFO.units.commercial.brand}</strong>
                <p className="text-xs text-[#526273] mt-1">{COMPANY_INFO.units.commercial.address}</p>
                <p className="text-xs text-[#526273]">{COMPANY_INFO.units.commercial.city}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2, ease: smoothEase } }}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-2 text-[#102D46]">
                  <Building2 className="w-4 h-4 text-[#102D46]" />
                  <h3 className="text-sm font-bold">Matriz Cadastral</h3>
                </div>
                <strong className="block text-sm text-[#102D46]">{COMPANY_INFO.legalName}</strong>
                <p className="text-xs text-[#526273] mt-1">{COMPANY_INFO.units.headquarters.address}</p>
                <p className="text-xs text-[#526273]">{COMPANY_INFO.units.headquarters.city}</p>
              </motion.div>
            </div>

            {/* Slogan */}
            <div className="p-5 rounded-2xl bg-[#102D46] text-white flex items-center gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#B8EF35] text-[#091D2F] flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#B8EF35] block">
                  Compromisso Institucional
                </span>
                <p className="text-base font-bold italic">
                  &ldquo;{COMPANY_INFO.slogan}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Dados Cadastrais Oficiais (5 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] space-y-4 shadow-2xs">
              <h3 className="text-base font-bold text-[#102D46] flex items-center gap-2 pb-2 border-b border-[#E5EBF0]">
                <FileText className="w-4 h-4 text-[#102D46]" />
                <span>Dados Cadastrais Oficiais</span>
              </h3>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">Razão Social</span>
                  <strong className="text-sm text-[#102D46] font-semibold">{COMPANY_INFO.legalName}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">CNPJ</span>
                  <strong className="text-sm text-[#102D46] font-semibold tabular-nums">{COMPANY_INFO.cnpj}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">Data de Abertura Cadastrada</span>
                  <strong className="text-sm text-[#102D46] font-semibold tabular-nums flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#102D46]" />
                    {COMPANY_INFO.foundingDate}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold">Matriz Cadastral</span>
                  <span className="text-xs text-[#526273] block mt-0.5">
                    {COMPANY_INFO.units.headquarters.fullAddress}
                  </span>
                  <span className="text-[10px] text-slate-400 italic block mt-0.5">
                    *Identificação estritamente cadastral da sociedade empresária.
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5EBF0]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8EF35] shrink-0" />
                <p className="text-xs text-[#526273] leading-relaxed">
                  Canais comerciais ativos para atender investidores e clientes em Juazeiro do Norte e em toda a região do Ceará.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
