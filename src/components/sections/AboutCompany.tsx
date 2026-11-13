import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, continuousViewport } from '../../utils/motion';

export const AboutCompany: React.FC = () => {
  const corporateRows = [
    { label: 'Razão Social', value: COMPANY_INFO.legalName },
    { label: 'CNPJ', value: COMPANY_INFO.cnpj, tabular: true },
    { label: 'Data de Abertura', value: COMPANY_INFO.foundingDate, tabular: true },
    {
      label: 'Unidade Comercial',
      value: `${COMPANY_INFO.units.commercial.brand}, ${COMPANY_INFO.units.commercial.fullAddress}`,
    },
    {
      label: 'Matriz Cadastral',
      value: `${COMPANY_INFO.units.headquarters.fullAddress} (identificação cadastral RFB)`,
    },
  ];

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Texto Institucional Editorial (6 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
              Sobre a Solis Tech
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Engenharia sólida para sustentar seu retorno no Ceará.
            </h2>

            <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
              A <strong className="text-[#102D46]">Solis Tech</strong> desenvolve e estrutura projetos de usinas solares voltadas a investimento e locação, além de atender demandas corporativas e rurais de geração fotovoltaica.
            </p>

            <p className="text-base text-[#526273] leading-relaxed">
              Com presença comercial ativa em Juazeiro do Norte (Região do Cariri) e matriz cadastrada em Iguatu, oferecemos atendimento próximo para que cada investidor avalie contratos, infraestrutura e projeções financeiras com segurança jurídica e técnica.
            </p>

            <div className="pt-6 border-t border-[#E5EBF0] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#102D46] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-base font-bold text-[#102D46] italic">
                  &ldquo;{COMPANY_INFO.slogan}&rdquo;
                </p>
                <p className="text-xs text-[#526273]">
                  Atendimento presencial na Unidade Comercial Cariri e suporte direto em todo o estado do Ceará.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Coluna Direita: Ficha Cadastral Limpa em Linhas Hairline (6 cols — zero cards aninhados) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] p-6 sm:p-8">
              <div className="pb-4 mb-2 border-b border-[#E5EBF0] flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#102D46]">
                  Ficha Cadastral &amp; Governança
                </h3>
                <span className="text-xs font-medium text-[#526273]">
                  Dados Oficiais
                </span>
              </div>

              <dl className="divide-y divide-[#E5EBF0]">
                {corporateRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                  >
                    <dt className="sm:col-span-4 text-xs font-bold uppercase tracking-wider text-[#526273]">
                      {row.label}
                    </dt>
                    <dd
                      className={`sm:col-span-8 text-sm font-semibold text-[#102D46] leading-relaxed break-words ${
                        row.tabular ? 'tabular-nums' : ''
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
