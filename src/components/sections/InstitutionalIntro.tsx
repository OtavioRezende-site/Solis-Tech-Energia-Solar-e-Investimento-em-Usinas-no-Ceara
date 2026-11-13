import React from 'react';
import { motion } from 'motion/react';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { fadeInUp, continuousViewport, buttonPrimaryMotion } from '../../utils/motion';

export const InstitutionalIntro: React.FC = () => {
  const comparisonRows = [
    {
      criterion: "Rendimento mensal estimado",
      solarPlant: "Até R$ 6.300/mês em locação de energia conforme porte da usina",
      realEstate: "Retorno tradicional entre 0,4% e 0,6% ao mês sobre o capital",
    },
    {
      criterion: "Velocidade para gerar caixa",
      solarPlant: "Implantação e conexão planejadas para iniciar o faturamento rápido",
      realEstate: "Meses de obra, acabamentos, habite-se e espera por inquilino",
    },
    {
      criterion: "Vacância e inadimplência",
      solarPlant: "Demanda contínua de energia por empresas no Ceará via contratos",
      realEstate: "Risco de imóvel fechado, IPTU, condomínio e desgaste com inquilinos",
    },
    {
      criterion: "Manutenção do patrimônio",
      solarPlant: "Equipamentos industriais de longa vida útil e gestão técnica Solis Tech",
      realEstate: "Reformas recorrentes, pintura, infiltrações e depreciação física",
    },
    {
      criterion: "Liquidez operacional",
      solarPlant: "Ativo gerador de crédito energético essencial para comércios e indústrias",
      realEstate: "Capital imobilizado em alvenaria com alto custo de transação",
    },
  ];

  const handleGoToInvestment = () => {
    const el = document.getElementById('investimento');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="apresentacao" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Tese de Investimento (5 cols) — Editorial limpo sem cards */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
              Comparativo de Rentabilidade
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#102D46] tracking-tight leading-[1.12] text-balance">
              Por que investidores estão trocando casas para alugar por usinas solares.
            </h2>

            <p className="text-base text-[#526273] leading-relaxed">
              Quem constrói uma casa ou sala comercial para locação imobiliza capital alto, enfrenta meses de obra e ainda convive com vacância, reformas e retorno mensal reduzido.
            </p>

            <p className="text-base text-[#526273] leading-relaxed">
              Na <strong className="text-[#102D46]">Solis Tech</strong>, o seu capital é direcionado para um ativo produtivo real, uma usina fotovoltaica estruturada para gerar energia e produzir receita mensal por locação com potencial de ROI muito superior ao modelo imobiliário tradicional.
            </p>

            <div className="pt-2">
              <motion.button
                type="button"
                onClick={handleGoToInvestment}
                {...buttonPrimaryMotion}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer shadow-xs"
              >
                <span>Analisar o modelo de retorno</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="pt-6 border-t border-[#E5EBF0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#526273]">
              <span className="italic font-medium text-[#102D46]">
                &ldquo;{COMPANY_INFO.slogan}&rdquo;
              </span>
              <span>Juazeiro do Norte &amp; Iguatu · CE</span>
            </div>
          </motion.div>

          {/* Coluna Direita: Tabela Comparativa Arquitetural com divisores hairline (7 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-[#E5EBF0] bg-[#F8FAFC] overflow-hidden">
              {/* Cabeçalho Mobile */}
              <div className="sm:hidden bg-[#102D46] text-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                <span className="text-[#B8EF35]">Usina Solis Tech</span>
                <span className="text-slate-300 text-[11px] font-semibold">vs. Imóvel</span>
              </div>

              {/* Cabeçalho Desktop/Tablet */}
              <div className="hidden sm:grid grid-cols-12 bg-[#102D46] text-white px-7 py-4 text-xs font-bold uppercase tracking-wider">
                <div className="col-span-4 text-slate-300">Critério de ROI</div>
                <div className="col-span-4 text-[#B8EF35]">
                  Usina Solar Solis Tech
                </div>
                <div className="col-span-4 text-slate-300">
                  Construir Casa para Aluguel
                </div>
              </div>

              {/* Linhas Comparativas */}
              <div className="divide-y divide-[#E5EBF0] bg-white">
                {comparisonRows.map((row) => (
                  <div
                    key={row.criterion}
                    className="grid grid-cols-12 gap-3.5 sm:gap-3 px-5 sm:px-7 py-5 items-start hover:bg-[#F8FAFC]/70 transition-colors"
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <h3 className="text-sm font-bold text-[#102D46]">{row.criterion}</h3>
                    </div>

                    <div className="col-span-12 sm:col-span-4 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#B8EF35]/25 text-[#091D2F] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <div className="space-y-0.5">
                        <span className="sm:hidden block text-[10px] font-bold uppercase tracking-wider text-[#102D46]/70">
                          Usina Solar Solis Tech
                        </span>
                        <p className="text-xs sm:text-[13px] font-semibold text-[#102D46] leading-relaxed tabular-nums">
                          {row.solarPlant}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-12 sm:col-span-4 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Minus className="w-3 h-3" />
                      </span>
                      <div className="space-y-0.5">
                        <span className="sm:hidden block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Construir Casa para Aluguel
                        </span>
                        <p className="text-xs sm:text-[13px] text-[#526273] leading-relaxed tabular-nums">
                          {row.realEstate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#526273] mt-3 leading-relaxed">
              *Comparativo referencial de modelo de negócios. O retorno projetado varia de acordo com o porte da usina escolhida, irradiação solar e condições contratuais apresentadas no estudo técnico.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
