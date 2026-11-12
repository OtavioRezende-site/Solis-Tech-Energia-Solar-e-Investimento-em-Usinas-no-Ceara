import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { FaqItem } from '../../types';
import { fadeInUp, continuousViewport, smoothEase } from '../../utils/motion';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: "Investimento",
      question: "O que é uma usina solar voltada à locação?",
      answer:
        "É um empreendimento de geração de energia fotovoltaica (geralmente instalado em solo ou em ampla cobertura) estruturado para que sua capacidade ou os créditos de energia gerados sejam disponibilizados para locação a empresas ou consumidores que desejam reduzir seus custos elétricos. Trata-se de uma oportunidade de alocação de recursos em infraestrutura com modelo contratual específico.",
    },
    {
      category: "Investimento",
      question: "Como posso conhecer as condições de investimento?",
      answer:
        "O interessado pode entrar em contato diretamente com a equipe comercial da Solis Tech pelo formulário do site ou pelo WhatsApp. Apresentamos o modelo, explicamos as modalidades de projetos disponíveis e compartilhamos os parâmetros técnicos e documentais necessários para avaliação individual.",
    },
    {
      category: "Investimento",
      question: "Posso visitar uma usina antes de decidir?",
      answer:
        "Sim. A Solis Tech disponibiliza a possibilidade de agendamento de visita técnica e presencial às instalações para interessados qualificados que estejam em fase de análise e queiram conhecer de perto os equipamentos e a infraestrutura do projeto.",
    },
    {
      category: "Projetos",
      question: "A Solis Tech também realiza projetos para empresas?",
      answer:
        "Sim. Desenvolvemos soluções em energia solar para comércios, indústrias, galpões de logística, clínicas e escritórios, dimensionando sistemas que buscam otimizar a fatura de eletricidade e garantir previsibilidade orçamentária ao negócio.",
    },
    {
      category: "Projetos",
      question: "Vocês atendem propriedades rurais?",
      answer:
        "Sim. Atendemos fazendas, produtores agrícolas e empreendimentos do agronegócio no Ceará, avaliando demandas específicas como bombas de irrigação, câmaras de armazenamento e maquinários rurais.",
    },
    {
      category: "Projetos",
      question: "Como solicitar uma proposta de energia solar?",
      answer:
        "Basta preencher o formulário de contato nesta página informando seu município no Ceará, telefone de contato e o perfil do seu interesse (investimento, residencial, comercial ou rural). Nossa equipe entrará em contato para levantar os dados de consumo ou objetivos do projeto.",
    },
    {
      category: "Operacional",
      question: "Quem é responsável pela manutenção de uma usina?",
      answer:
        "As responsabilidades de operação, limpeza, monitoramento e manutenção (preventiva ou corretiva) precisam ser verificadas nas condições estabelecidas em cada contrato e no modelo acordado entre as partes para o respectivo empreendimento.",
    },
    {
      category: "Contratual",
      question: "Existe garantia de rendimento financeiro?",
      answer:
        "Não existe promessa ou garantia de rentabilidade fixa. Os resultados financeiros dependem estritamente das condições operacionais reais da usina, índices climáticos de irradiação, disponibilidade da rede de distribuição e dos termos contratuais firmados. Qualquer estimativa ou projeção requer análise individual de documentação e de suas premissas técnicas e econômicas.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
            <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
            <span>Perguntas Frequentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Esclareça suas dúvidas sobre usinas e projetos solares
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            Respostas diretas e transparentes sobre modelos de investimento, atendimento empresarial, rural e diretrizes contratuais.
          </p>
        </motion.div>

        {/* Acordeão com Animação Fluida AnimatePresence */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={false}
                whileHover={{ y: -2, transition: { duration: 0.2, ease: smoothEase } }}
                className="bg-white rounded-2xl border border-[#E5EBF0] overflow-hidden transition-colors shadow-2xs hover:shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-sm sm:text-base font-bold text-[#102D46] pr-2">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-[#102D46] text-[#B8EF35]'
                        : 'bg-slate-100 text-[#102D46]'
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
                      transition={{ duration: 0.3, ease: smoothEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#526273] leading-relaxed border-t border-slate-100 pt-4">
                        <p>{faq.answer}</p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#102D46]/60">
                          <span>Categoria:</span>
                          <span className="text-[#102D46]">{faq.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bloco de Ajuda Adicional */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="mt-12 text-center p-6 rounded-2xl bg-white border border-[#E5EBF0] shadow-2xs"
        >
          <p className="text-sm text-[#526273] mb-3">
            Precisa de orientação personalizada para o seu caso específico?
          </p>
          <motion.a
            href={COMPANY_INFO.whatsappCustomMessage(
              "Olá, Joel Patricio! Gostaria de esclarecer algumas dúvidas sobre as usinas solares da Solis Tech."
            )}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[#102D46] bg-slate-100 hover:bg-[#B8EF35] transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#102D46]" />
            <span>Falar com Joel Patricio no WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
