import React from 'react';
import { X, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091D2F]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-[#E5EBF0] max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden text-[#102D46]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5EBF0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#102D46]" />
            <h2 className="text-lg font-bold text-[#102D46]">Termos de Uso do Website Oficial</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fechar termos de uso"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#526273] leading-relaxed">
          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">1. Objeto e Caráter Informativo</h3>
            <p>
              Este website é mantido pela <strong>{COMPANY_INFO.legalName}</strong> (nome fantasia <strong>Solis Tech</strong>, CNPJ <strong>{COMPANY_INFO.cnpj}</strong>) com o propósito de apresentar institucionalmente suas atividades em energia solar, projetos de engenharia fotovoltaica e modelos de usinas para locação.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">2. Não Vinculação de Proposta Financeira</h3>
            <p>
              As informações, faixas de qualificação de investimento e descritivos técnicos disponibilizados no website possuem natureza preliminar e informativa. <strong>Não constituem oferta pública de valores mobiliários, garantia de rendimentos fixos, promessa de retorno financeiro ou tabela de preços obrigatória.</strong>
            </p>
            <p>
              Cada projeto de usina solar ou instalação fotovoltaica requer análise técnica individualizada de irradiação, topografia, parecer de acesso na concessionária de energia e celebração de instrumento contratual específico.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">3. Propriedade Intelectual e Dados</h3>
            <p>
              Os textos, marcas, identidade visual, layouts e códigos deste website são de titularidade da Solis Tech ou utilizados sob licença expressa, sendo vedada a reprodução desautorizada para fins comerciais.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">4. Legislação Aplicável e Foro</h3>
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, em especial pelo Marco Civil da Internet e pela Lei Geral de Proteção de Dados (LGPD). Fica eleito o Foro da Comarca de Juazeiro do Norte/CE para dirimir eventuais controvérsias.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E5EBF0] bg-[#F8FAFC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-[#102D46] text-white hover:bg-[#091D2F] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
