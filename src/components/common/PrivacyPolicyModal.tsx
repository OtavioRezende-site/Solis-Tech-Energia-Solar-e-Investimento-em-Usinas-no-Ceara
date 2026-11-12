import React from 'react';
import { X, ShieldCheck, Lock, AlertTriangle, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
        {/* Header do Modal */}
        <div className="px-6 py-4 border-b border-[#E5EBF0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#102D46]" />
            <h2 className="text-lg font-bold text-[#102D46]">Política de Privacidade e Proteção de Dados</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fechar política de privacidade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com rolagem */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#526273] leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Configuração pré-publicação:</strong>
              <span>
                Os canais formais do Encarregado pelo Tratamento de Dados Pessoais (DPO) e endereço eletrônico definitivo de privacidade devem ser validados pela administração da Solis Tech antes da veiculação de campanhas massivas.
              </span>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">1. Identificação do Controlador</h3>
            <p>
              A <strong>SOLIS TECH</strong>, razão social <strong>{COMPANY_INFO.legalName}</strong>, inscrita no CNPJ sob o nº <strong>{COMPANY_INFO.cnpj}</strong>, com matriz cadastral em Iguatu/CE e unidade comercial em Juazeiro do Norte/CE, atua como controladora dos dados pessoais coletados por meio deste website oficial.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">2. Dados Coletados</h3>
            <p>Coletamos exclusivamente as informações necessárias para qualificação de atendimento:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Dados de identificação e contato:</strong> Nome completo, número de WhatsApp/telefone com DDD, endereço de e-mail, cidade e estado.</li>
              <li><strong>Dados de perfil de interesse:</strong> Faixa de investimento pretendida (Fluxo de Investimento), objetivo com usina solar, tipo de imóvel (residencial, comercial ou rural), valor médio da fatura energética e serviço desejado.</li>
              <li><strong>Dados de navegação e campanha:</strong> Parâmetros de URL (UTM source, medium, campaign), página de entrada e dados técnicos de conexão para fins de segurança (IP de origem e data/hora).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">3. Finalidade e Base Legal (LGPD)</h3>
            <p>
              O tratamento de dados é realizado com fundamento no <strong>Consentimento do Titular (art. 7º, I da Lei 13.709/2018 - LGPD)</strong> e em <strong>Procedimentos Preliminares relacionados a contrato a pedido do titular (art. 7º, V)</strong>, visando:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Retornar o contato para apresentação do modelo de usinas solares para investimento e locação;</li>
              <li>Elaborar estudos de viabilidade técnica e orçamentos de sistemas fotovoltaicos sob demanda;</li>
              <li>Agendar reuniões comerciais presenciais na Unidade Cariri ou virtuais;</li>
              <li>Prevenir fraudes e envios abusivos automatizados através de rate limiting e mecanismos antispam.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">4. Compartilhamento e Integrações Seguras</h3>
            <p>
              Os dados coletados podem ser transmitidos de forma criptografada para o sistema de gestão comercial configurado pelo controlador (ex: webhook para CRM, n8n, Make) ou direcionados para atendimento oficial no WhatsApp sob a ação do próprio usuário. Não comercializamos, alugamos ou compartilhamos dados pessoais com terceiros para fins alheios ao atendimento solicitado.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">5. Direitos do Titular</h3>
            <p>
              Nos termos do art. 18 da LGPD, você possui o direito de confirmar a existência de tratamento, acessar seus dados, solicitar a correção de dados incompletos ou inexatos, requerer a anonimização ou exclusão de dados desnecessários e revogar seu consentimento a qualquer momento.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#102D46]">6. Contato do Encarregado (DPO)</h3>
            <p>
              Para exercer seus direitos de privacidade, utilize o canal de atendimento oficial da empresa:
            </p>
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E5EBF0] text-xs">
              <p><strong>Encarregado de Dados (DPO):</strong> [Canal a ser preenchido antes da publicação oficial]</p>
              <p><strong>Telefone / WhatsApp Comercial:</strong> {COMPANY_INFO.phone}</p>
              <p><strong>Unidade Comercial:</strong> {COMPANY_INFO.units.commercial.fullAddress}</p>
            </div>
          </section>
        </div>

        {/* Footer do Modal */}
        <div className="px-6 py-3 border-t border-[#E5EBF0] bg-[#F8FAFC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-[#102D46] text-white hover:bg-[#091D2F] transition-colors cursor-pointer"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
