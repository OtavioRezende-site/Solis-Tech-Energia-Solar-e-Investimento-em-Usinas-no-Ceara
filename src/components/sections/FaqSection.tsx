import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '../common/BrandIcons';
import { COMPANY_INFO } from '../../constants/company';
import { FaqItem } from '../../types';
import { fadeInUp, continuousViewport, smoothEase } from '../../utils/motion';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: "Investimento",
      question: "Como funciona o retorno de até R$ 6.300 por mês em uma usina solar?",
      answer:
        "Ao investir em uma usina fotovoltaica estruturada pela Solis Tech, a energia gerada é disponibilizada em modelo de locação para empresas consumidoras. Conforme a capacidade instalada da usina e os termos contratuais do estudo apresentado pela equipe, a receita mensal com aluguel da energia pode alcançar até R$ 6.300/mês.",
    },
    {
      category: "Investimento",
      question: "Por que investir em usina solar é mais rentável do que construir casa para alugar?",
      answer:
        "Na construção civil para aluguel residencial, o capital fica preso por meses durante a obra e costuma render cerca de 0,4% a 0,6% ao mês, além de custos com IPTU, reformas e risco de vacância. Na usina solar, o ativo entra em operação rapidamente, atende uma demanda essencial (energia elétrica empresarial) e oferece potencial de retorno mensal superior sobre o capital alocado.",
    },
    {
      category: "Investimento",
      question: "Posso visitar uma usina e analisar os números antes de investir?",
      answer:
        "Sim. Os interessados qualificados podem solicitar o estudo completo de ROI, revisar os parâmetros técnicos e contratuais e agendar visita presencial com nossa equipe na Unidade Comercial Cariri em Juazeiro do Norte.",
    },
    {
      category: "Operacional",
      question: "Preciso me preocupar com inquilino ou manutenção da usina?",
      answer:
        "Não no formato de obra ou gestão imobiliária tradicional. As atribuições de operação, monitoramento por telemetria, limpeza técnica e manutenção preventiva/corretiva são estruturadas conforme o contrato de cada usina, com suporte direto da engenharia da Solis Tech.",
    },
    {
      category: "Projetos",
      question: "A Solis Tech também atende empresas e propriedades rurais para redução de conta?",
      answer:
        "Sim. Além das usinas para investidores, projetamos e instalamos sistemas fotovoltaicos próprios para comércios, indústrias, clínicas, fazendas e projetos de irrigação no Ceará.",
    },
    {
      category: "Contratual",
      question: "As projeções de retorno financeiro são garantidas sem análise prévia?",
      answer:
        "Não. Todo investimento envolve análise individualizada de projeto. Os resultados efetivos dependem da capacidade da usina adquirida, irradiação solar local, disponibilidade da distribuidora e termos firmados em contrato, todos detalhados transparentemente antes de qualquer assinatura.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Intro + Contato Direto (4 cols) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-4 space-y-5 lg:sticky lg:top-28"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#102D46] block">
              Perguntas Frequentes
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Dúvidas sobre ROI, locação e segurança do investimento.
            </h2>

            <p className="text-sm sm:text-base text-[#526273] leading-relaxed">
              Respostas objetivas sobre como funciona a rentabilidade das usinas solares e as etapas de análise com nossa equipe.
            </p>

            <div className="pt-4 border-t border-[#E5EBF0]">
              <p className="text-xs text-[#526273] mb-3">
                Quer analisar números para a sua faixa de capital?
              </p>
              <a
                href={COMPANY_INFO.whatsappInvestmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-3 rounded-xl font-bold text-xs text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Falar com Joel Patricio no WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Coluna Direita: Acordeão Limpo em Divisores Hairline */}
          <div className="lg:col-span-8 divide-y divide-[#E5EBF0] border-y border-[#E5EBF0] bg-white rounded-2xl border px-5 sm:px-8">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question} className="py-1">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35]"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#102D46] pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: smoothEase }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#102D46] text-[#B8EF35]'
                          : 'bg-[#F8FAFC] text-[#102D46]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: smoothEase }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-sm text-[#526273] leading-relaxed space-y-2">
                          <p>{faq.answer}</p>
                          <div className="text-[11px] font-medium text-slate-400">
                            Tema · {faq.category}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
