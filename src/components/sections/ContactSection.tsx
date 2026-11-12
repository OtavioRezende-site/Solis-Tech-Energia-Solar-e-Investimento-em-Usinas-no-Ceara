import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Send,
  CheckCircle2,
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  TrendingUp,
  Sun,
  AlertCircle,
  Lock,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { maskPhone, unmaskPhone } from '../../utils/mask';
import { getOrCaptureUtmData, trackEvent } from '../../utils/tracking';
import { PrivacyPolicyModal } from '../common/PrivacyPolicyModal';
import { TermsModal } from '../common/TermsModal';
import { LeadSubmissionResponse } from '../../types';

// ==========================================
// Esquemas Zod para Validação no Frontend
// ==========================================

const investmentSchema = z.object({
  fullName: z.string().trim().min(3, 'Por favor, informe seu nome completo.'),
  phone: z
    .string()
    .trim()
    .refine((val) => unmaskPhone(val).length >= 10, 'Informe seu WhatsApp com DDD (mínimo 10 dígitos).'),
  email: z.string().trim().email('Informe um endereço de e-mail válido.'),
  cityState: z.string().trim().min(2, 'Informe sua cidade e estado no Ceará (ex: Juazeiro do Norte/CE).'),
  investmentRange: z.enum([
    'ate-100k',
    '100k-200k',
    '200k-300k',
    'acima-300k',
    'conversar-antes',
  ], { message: 'Selecione uma faixa para qualificação do atendimento.' }),
  objective: z.enum([
    'conhecer-projetos',
    'entender-modelo',
    'solicitar-estudo',
    'agendar-visita',
    'falar-comercial',
  ], { message: 'Selecione o seu objetivo principal.' }),
  contactPreference: z.enum(['whatsapp', 'telefone', 'email'], {
    message: 'Selecione a sua preferência de contato.',
  }),
  lgpdConsent: z.boolean().refine((val) => val === true, 'É necessário concordar com o tratamento dos dados.'),
  website_hp: z.string().optional(),
});

const quoteSchema = z.object({
  fullName: z.string().trim().min(3, 'Por favor, informe seu nome completo.'),
  phone: z
    .string()
    .trim()
    .refine((val) => unmaskPhone(val).length >= 10, 'Informe seu WhatsApp com DDD (mínimo 10 dígitos).'),
  email: z.string().trim().email('Informe um endereço de e-mail válido.'),
  cityState: z.string().trim().min(2, 'Informe sua cidade e estado (ex: Iguatu/CE).'),
  propertyType: z.enum(['residencial', 'comercial', 'rural'], {
    message: 'Selecione o tipo de imóvel.',
  }),
  billRange: z.enum([
    'ate-500',
    '500-1500',
    '1500-3000',
    '3000-5000',
    'acima-5000',
  ], { message: 'Selecione a faixa aproximada da sua conta de energia.' }),
  serviceDesired: z.enum([
    'instalacao-solar',
    'projeto-eletrico',
    'manutencao',
    'monitoramento',
    'outros',
  ], { message: 'Selecione o serviço desejado.' }),
  additionalInfo: z.string().max(800).optional(),
  lgpdConsent: z.boolean().refine((val) => val === true, 'É necessário concordar com o tratamento dos dados.'),
  website_hp: z.string().optional(),
});

type InvestmentFormData = z.infer<typeof investmentSchema>;
type QuoteFormData = z.infer<typeof quoteSchema>;

interface ContactSectionProps {
  selectedInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedInterest }) => {
  const [activeTab, setActiveTab] = useState<'investimento' | 'orcamento-solar'>('investimento');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<LeadSubmissionResponse | null>(null);
  const [submittedLeadData, setSubmittedLeadData] = useState<any>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Modais de conformidade LGPD
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Form do Fluxo A (Investimento)
  const formA = useForm<InvestmentFormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      cityState: '',
      investmentRange: 'conversar-antes',
      objective: 'conhecer-projetos',
      contactPreference: 'whatsapp',
      lgpdConsent: false,
      website_hp: '',
    },
  });

  // Form do Fluxo B (Orçamento Solar)
  const formB = useForm<QuoteFormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      cityState: '',
      propertyType: 'comercial',
      billRange: '1500-3000',
      serviceDesired: 'instalacao-solar',
      additionalInfo: '',
      lgpdConsent: false,
      website_hp: '',
    },
  });

  // Monitora interações do usuário vindas de botões da página
  useEffect(() => {
    if (!selectedInterest) return;

    if (selectedInterest === 'usina-investimento' || selectedInterest === 'investimento') {
      setActiveTab('investimento');
    } else {
      setActiveTab('orcamento-solar');
      if (selectedInterest === 'residencial') formB.setValue('propertyType', 'residencial');
      if (selectedInterest === 'comercial') formB.setValue('propertyType', 'comercial');
      if (selectedInterest === 'rural') formB.setValue('propertyType', 'rural');
      if (selectedInterest === 'projetos-instalacoes') formB.setValue('serviceDesired', 'projeto-eletrico');
      if (selectedInterest === 'manutencao') formB.setValue('serviceDesired', 'manutencao');
      if (selectedInterest === 'monitoramento') formB.setValue('serviceDesired', 'monitoramento');
    }
  }, [selectedInterest, formB]);

  // Handler para máscara de telefone
  const handlePhoneChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    formA.setValue('phone', maskPhone(e.target.value));
  };

  const handlePhoneChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    formB.setValue('phone', maskPhone(e.target.value));
  };

  // Submissão do Fluxo A: Investimento
  const onSubmitA = async (data: InvestmentFormData) => {
    setServerError(null);
    trackEvent('form_start', { form: 'investimento' });

    try {
      const utmData = getOrCaptureUtmData('investimento_usina');
      const payload = {
        flowType: 'investimento',
        ...data,
        utm: utmData,
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result: LeadSubmissionResponse = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Erro ao processar envio no servidor.');
      }

      // Evento generate_lead disparado APENAS após confirmação
      trackEvent('generate_lead', {
        flow: 'investimento',
        leadId: result.leadId,
        investmentRange: data.investmentRange,
        cityState: data.cityState,
      });

      setSubmissionResponse(result);
      setSubmittedLeadData({ flow: 'investimento', ...data });
      setIsSubmitted(true);
      formA.reset();
    } catch (err: any) {
      trackEvent('form_error', { form: 'investimento', error: err?.message });
      setServerError(err?.message || 'Falha na comunicação com o servidor.');
    }
  };

  // Submissão do Fluxo B: Orçamento Solar
  const onSubmitB = async (data: QuoteFormData) => {
    setServerError(null);
    trackEvent('form_start', { form: 'orcamento-solar' });

    try {
      const utmData = getOrCaptureUtmData('orcamento_solar');
      const payload = {
        flowType: 'orcamento-solar',
        ...data,
        utm: utmData,
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result: LeadSubmissionResponse = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Erro ao processar envio no servidor.');
      }

      // Evento generate_lead disparado APENAS após confirmação
      trackEvent('generate_lead', {
        flow: 'orcamento-solar',
        leadId: result.leadId,
        propertyType: data.propertyType,
        serviceDesired: data.serviceDesired,
      });

      setSubmissionResponse(result);
      setSubmittedLeadData({ flow: 'orcamento-solar', ...data });
      setIsSubmitted(true);
      formB.reset();
    } catch (err: any) {
      trackEvent('form_error', { form: 'orcamento-solar', error: err?.message });
      setServerError(err?.message || 'Falha na comunicação com o servidor.');
    }
  };

  // Constrói e abre a mensagem formatada para o WhatsApp comercial mediante ação voluntária do usuário
  const handleOpenWhatsAppFromSubmission = () => {
    if (!submittedLeadData) return;

    let text = '';
    if (submittedLeadData.flow === 'investimento') {
      const rangeMap: Record<string, string> = {
        'ate-100k': 'Até R$ 100 mil',
        '100k-200k': 'R$ 100 mil a R$ 200 mil',
        '200k-300k': 'R$ 200 mil a R$ 300 mil',
        'acima-300k': 'Acima de R$ 300 mil',
        'conversar-antes': 'Prefiro conversar antes',
      };
      const objectiveMap: Record<string, string> = {
        'conhecer-projetos': 'Conhecer projetos disponíveis',
        'entender-modelo': 'Entender o modelo de locação',
        'solicitar-estudo': 'Solicitar estudo',
        'agendar-visita': 'Agendar visita',
        'falar-comercial': 'Falar com o comercial',
      };

      text =
        `*Solicitação de Informações — Usinas para Investimento*\n\n` +
        `Olá, Joel! Conheci a Solis Tech pelo site e gostaria de receber informações sobre as usinas solares para investimento e o modelo de locação.\n\n` +
        `*Nome:* ${submittedLeadData.fullName}\n` +
        `*WhatsApp:* ${submittedLeadData.phone}\n` +
        `*E-mail:* ${submittedLeadData.email}\n` +
        `*Cidade/Estado:* ${submittedLeadData.cityState}\n` +
        `*Faixa Pretendida:* ${rangeMap[submittedLeadData.investmentRange] || submittedLeadData.investmentRange}\n` +
        `*Objetivo:* ${objectiveMap[submittedLeadData.objective] || submittedLeadData.objective}\n` +
        `*Preferência de contato:* ${submittedLeadData.contactPreference}`;
    } else {
      const propertyMap: Record<string, string> = {
        residencial: 'Residencial',
        comercial: 'Comercial',
        rural: 'Rural',
      };
      const billMap: Record<string, string> = {
        'ate-500': 'Até R$ 500/mês',
        '500-1500': 'R$ 500 a R$ 1.500/mês',
        '1500-3000': 'R$ 1.500 a R$ 3.000/mês',
        '3000-5000': 'R$ 3.000 a R$ 5.000/mês',
        'acima-5000': 'Acima de R$ 5.000/mês',
      };
      const serviceMap: Record<string, string> = {
        'instalacao-solar': 'Instalação solar',
        'projeto-eletrico': 'Projeto elétrico',
        manutencao: 'Manutenção',
        monitoramento: 'Monitoramento',
        outros: 'Outros',
      };

      text =
        `*Solicitação de Orçamento Solar — Solis Tech*\n\n` +
        `Olá! Conheci a Solis Tech pelo site e gostaria de solicitar um orçamento de energia solar.\n\n` +
        `*Nome:* ${submittedLeadData.fullName}\n` +
        `*WhatsApp:* ${submittedLeadData.phone}\n` +
        `*E-mail:* ${submittedLeadData.email}\n` +
        `*Cidade/Estado:* ${submittedLeadData.cityState}\n` +
        `*Tipo de Imóvel:* ${propertyMap[submittedLeadData.propertyType] || submittedLeadData.propertyType}\n` +
        `*Valor Médio da Conta:* ${billMap[submittedLeadData.billRange] || submittedLeadData.billRange}\n` +
        `*Serviço Desejado:* ${serviceMap[submittedLeadData.serviceDesired] || submittedLeadData.serviceDesired}\n` +
        (submittedLeadData.additionalInfo ? `*Informações Adicionais:* ${submittedLeadData.additionalInfo}` : '');
    }

    trackEvent('whatsapp_click', { action: 'post_submission_continuation' });
    window.open(COMPANY_INFO.whatsappCustomMessage(text), '_blank');
  };

  return (
    <section id="contato" className="py-20 lg:py-28 bg-[#F8FAFC] relative border-t border-[#E5EBF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Informações Comerciais & Canais Oficiais (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
              <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
              <span>Atendimento Comercial</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
              Qualifique sua demanda com nossa equipe especializada
            </h2>

            <p className="text-base text-[#526273] leading-relaxed">
              Dispomos de dois fluxos estruturados de atendimento: consultoria sobre usinas para investimento e locação no Ceará ou projetos fotovoltaicos sob medida para imóveis residenciais, comerciais e rurais.
            </p>

            {/* Cartões de Contato Validados */}
            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E5EBF0] shadow-2xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#102D46] text-[#B8EF35] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-[#102D46]">
                    WhatsApp Comercial ({COMPANY_INFO.contactPerson})
                  </strong>
                  <a
                    href={COMPANY_INFO.whatsappInvestmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#102D46] hover:underline font-semibold"
                  >
                    {COMPANY_INFO.phone} — Iniciar conversa
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5EBF0] shadow-2xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#102D46] text-[#B8EF35] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-[#102D46]">
                    Horário da Unidade Comercial Cariri
                  </strong>
                  <span className="text-xs text-[#526273] block">
                    {COMPANY_INFO.units.commercial.hours.weekdays}
                  </span>
                  <span className="text-xs text-[#526273] block">
                    {COMPANY_INFO.units.commercial.hours.saturday}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5EBF0] shadow-2xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#102D46] text-[#B8EF35] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-[#102D46]">
                    Atendimento Presencial
                  </strong>
                  <span className="text-xs text-[#526273] block">
                    {COMPANY_INFO.units.commercial.brand} — {COMPANY_INFO.units.commercial.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Aviso de Transparência LGPD */}
            <div className="p-4 rounded-xl bg-white border border-[#E5EBF0] text-xs text-[#526273] flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-[#102D46] shrink-0 mt-0.5" />
              <span>
                Seus dados serão tratados com segurança e confidencialidade nos termos da LGPD, exclusivamente para o contato comercial da Solis Tech.
              </span>
            </div>
          </div>

          {/* Coluna Direita: Os Dois Fluxos de Conversão (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-[#E5EBF0] shadow-sm">
            {/* Seletor de Fluxos com Tabs Acessíveis */}
            <div className="flex p-1.5 bg-[#F8FAFC] rounded-xl border border-[#E5EBF0] mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('investimento');
                  setIsSubmitted(false);
                  setServerError(null);
                }}
                className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'investimento'
                    ? 'bg-[#102D46] text-white shadow-xs'
                    : 'text-[#526273] hover:text-[#102D46]'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#B8EF35]" />
                <span>Usinas para Investimento</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('orcamento-solar');
                  setIsSubmitted(false);
                  setServerError(null);
                }}
                className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'orcamento-solar'
                    ? 'bg-[#102D46] text-white shadow-xs'
                    : 'text-[#526273] hover:text-[#102D46]'
                }`}
              >
                <Sun className="w-4 h-4 text-[#B8EF35]" />
                <span>Projeto Fotovoltaico</span>
              </button>
            </div>

            {/* Mensagem de Erro de Servidor */}
            {serverError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs mb-6 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Aviso de envio:</strong>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            {/* Tela de Sucesso Pós-Submissão */}
            {isSubmitted && submissionResponse ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#B8EF35]/20 text-[#102D46] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#102D46]" />
                </div>

                <h3 className="text-2xl font-extrabold text-[#102D46]">
                  Solicitação Registrada com Sucesso!
                </h3>

                <p className="text-sm text-[#526273] max-w-md mx-auto leading-relaxed">
                  {submissionResponse.message}
                </p>

                {/* Canal Imediato pelo WhatsApp */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] max-w-lg mx-auto text-left space-y-3 mt-4">
                  <span className="text-xs font-bold text-[#102D46] block uppercase tracking-wider">
                    Deseja agilizar o atendimento agora?
                  </span>
                  <p className="text-xs text-[#526273] leading-relaxed">
                    Você pode abrir uma conversa oficial no WhatsApp com <strong>Joel Patricio</strong> com todas as informações da sua solicitação pré-preenchidas.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppFromSubmission}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continuar conversa no WhatsApp</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmissionResponse(null);
                    }}
                    className="text-xs font-semibold text-[#526273] hover:text-[#102D46] underline cursor-pointer"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* =================================================== */}
                {/* FLUXO A: INVESTIMENTO EM USINAS SOLARES            */}
                {/* =================================================== */}
                {activeTab === 'investimento' && (
                  <form
                    onSubmit={formA.handleSubmit(onSubmitA)}
                    className="space-y-4"
                    noValidate
                    aria-label="Formulário de Investimento em Usinas Solares"
                  >
                    <div className="border-b border-[#E5EBF0] pb-3 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#102D46] block">
                        Fluxo de Investimento
                      </span>
                      <h3 className="text-lg font-bold text-[#102D46]">
                        Solicitar informações sobre usinas e modelo de locação
                      </h3>
                    </div>

                    {/* Campo Honeypot Oculto */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...formA.register('website_hp')}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Nome Completo */}
                    <div>
                      <label htmlFor="inv-fullName" className="block text-xs font-bold text-[#102D46] mb-1">
                        Nome Completo *
                      </label>
                      <input
                        id="inv-fullName"
                        type="text"
                        {...formA.register('fullName')}
                        placeholder="Ex: Carlos Eduardo de Oliveira"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                          formA.formState.errors.fullName ? 'border-red-500' : 'border-[#E5EBF0]'
                        }`}
                      />
                      {formA.formState.errors.fullName && (
                        <span className="text-xs text-red-600 mt-1 block">
                          {formA.formState.errors.fullName.message}
                        </span>
                      )}
                    </div>

                    {/* WhatsApp com DDD e E-mail */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inv-phone" className="block text-xs font-bold text-[#102D46] mb-1">
                          WhatsApp com DDD *
                        </label>
                        <input
                          id="inv-phone"
                          type="tel"
                          {...formA.register('phone')}
                          onChange={handlePhoneChangeA}
                          placeholder="(88) 99600-4445"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                            formA.formState.errors.phone ? 'border-red-500' : 'border-[#E5EBF0]'
                          }`}
                        />
                        {formA.formState.errors.phone && (
                          <span className="text-xs text-red-600 mt-1 block">
                            {formA.formState.errors.phone.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="inv-email" className="block text-xs font-bold text-[#102D46] mb-1">
                          E-mail *
                        </label>
                        <input
                          id="inv-email"
                          type="email"
                          {...formA.register('email')}
                          placeholder="seu.email@exemplo.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                            formA.formState.errors.email ? 'border-red-500' : 'border-[#E5EBF0]'
                          }`}
                        />
                        {formA.formState.errors.email && (
                          <span className="text-xs text-red-600 mt-1 block">
                            {formA.formState.errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cidade e Estado */}
                    <div>
                      <label htmlFor="inv-cityState" className="block text-xs font-bold text-[#102D46] mb-1">
                        Cidade e Estado *
                      </label>
                      <input
                        id="inv-cityState"
                        type="text"
                        {...formA.register('cityState')}
                        placeholder="Ex: Juazeiro do Norte/CE, Iguatu/CE, Fortaleza/CE..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                          formA.formState.errors.cityState ? 'border-red-500' : 'border-[#E5EBF0]'
                        }`}
                      />
                      {formA.formState.errors.cityState && (
                        <span className="text-xs text-red-600 mt-1 block">
                          {formA.formState.errors.cityState.message}
                        </span>
                      )}
                    </div>

                    {/* Faixa de Investimento Pretendida */}
                    <div>
                      <label htmlFor="inv-investmentRange" className="block text-xs font-bold text-[#102D46] mb-1">
                        Faixa de Investimento Pretendida *
                      </label>
                      <select
                        id="inv-investmentRange"
                        {...formA.register('investmentRange')}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all"
                      >
                        {COMPANY_INFO.qualification.investmentRanges.map((range) => (
                          <option key={range.id} value={range.id}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-[#526273] mt-1 italic">
                        *Essas faixas servem exclusivamente para qualificar o atendimento inicial. Não são tabela de preços nem confirmação de disponibilidade.
                      </p>
                    </div>

                    {/* Objetivo e Preferência de Contato */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inv-objective" className="block text-xs font-bold text-[#102D46] mb-1">
                          Objetivo Principal *
                        </label>
                        <select
                          id="inv-objective"
                          {...formA.register('objective')}
                          className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all"
                        >
                          {COMPANY_INFO.qualification.investmentObjectives.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                              {obj.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="inv-contactPreference" className="block text-xs font-bold text-[#102D46] mb-1">
                          Preferência de Contato *
                        </label>
                        <select
                          id="inv-contactPreference"
                          {...formA.register('contactPreference')}
                          className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all"
                        >
                          {COMPANY_INFO.qualification.contactPreferences.map((pref) => (
                            <option key={pref.id} value={pref.id}>
                              {pref.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Consentimento LGPD */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          {...formA.register('lgpdConsent')}
                          className="mt-1 w-4 h-4 rounded border-[#E5EBF0] text-[#102D46] focus:ring-[#102D46]"
                        />
                        <span className="text-xs text-[#526273] leading-relaxed">
                          Concordo com o tratamento dos meus dados para atendimento comercial e envio de informações nos termos da{' '}
                          <button
                            type="button"
                            onClick={() => setPrivacyModalOpen(true)}
                            className="text-[#102D46] font-bold underline hover:text-[#091D2F]"
                          >
                            Política de Privacidade
                          </button>{' '}
                          e{' '}
                          <button
                            type="button"
                            onClick={() => setTermsModalOpen(true)}
                            className="text-[#102D46] font-bold underline hover:text-[#091D2F]"
                          >
                            Termos de Uso
                          </button>
                          . *
                        </span>
                      </label>
                      {formA.formState.errors.lgpdConsent && (
                        <span className="text-xs text-red-600 mt-1 block">
                          {formA.formState.errors.lgpdConsent.message}
                        </span>
                      )}
                    </div>

                    {/* CTA Fluxo A */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={formA.formState.isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {formA.formState.isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processando solicitação...</span>
                          </>
                        ) : (
                          <>
                            <span>Solicitar informações sobre investimento</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* =================================================== */}
                {/* FLUXO B: PROJETO FOTOVOLTAICO                       */}
                {/* =================================================== */}
                {activeTab === 'orcamento-solar' && (
                  <form
                    onSubmit={formB.handleSubmit(onSubmitB)}
                    className="space-y-4"
                    noValidate
                    aria-label="Formulário de Orçamento de Energia Solar"
                  >
                    <div className="border-b border-[#E5EBF0] pb-3 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#102D46] block">
                        Fluxo de Projetos
                      </span>
                      <h3 className="text-lg font-bold text-[#102D46]">
                        Solicitar orçamento de energia solar para seu imóvel
                      </h3>
                    </div>

                    {/* Campo Honeypot Oculto */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...formB.register('website_hp')}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Nome Completo */}
                    <div>
                      <label htmlFor="quo-fullName" className="block text-xs font-bold text-[#102D46] mb-1">
                        Nome Completo *
                      </label>
                      <input
                        id="quo-fullName"
                        type="text"
                        {...formB.register('fullName')}
                        placeholder="Seu nome ou razão social"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                          formB.formState.errors.fullName ? 'border-red-500' : 'border-[#E5EBF0]'
                        }`}
                      />
                      {formB.formState.errors.fullName && (
                        <span className="text-xs text-red-600 mt-1 block">
                          {formB.formState.errors.fullName.message}
                        </span>
                      )}
                    </div>

                    {/* WhatsApp com DDD e E-mail */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="quo-phone" className="block text-xs font-bold text-[#102D46] mb-1">
                          WhatsApp com DDD *
                        </label>
                        <input
                          id="quo-phone"
                          type="tel"
                          {...formB.register('phone')}
                          onChange={handlePhoneChangeB}
                          placeholder="(88) 99600-4445"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                            formB.formState.errors.phone ? 'border-red-500' : 'border-[#E5EBF0]'
                          }`}
                        />
                        {formB.formState.errors.phone && (
                          <span className="text-xs text-red-600 mt-1 block">
                            {formB.formState.errors.phone.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="quo-email" className="block text-xs font-bold text-[#102D46] mb-1">
                          E-mail *
                        </label>
                        <input
                          id="quo-email"
                          type="email"
                          {...formB.register('email')}
                          placeholder="seu.email@exemplo.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                            formB.formState.errors.email ? 'border-red-500' : 'border-[#E5EBF0]'
                          }`}
                        />
                        {formB.formState.errors.email && (
                          <span className="text-xs text-red-600 mt-1 block">
                            {formB.formState.errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cidade e Estado */}
                    <div>
                      <label htmlFor="quo-cityState" className="block text-xs font-bold text-[#102D46] mb-1">
                        Cidade e Estado *
                      </label>
                      <input
                        id="quo-cityState"
                        type="text"
                        {...formB.register('cityState')}
                        placeholder="Ex: Juazeiro do Norte/CE, Crato/CE, Iguatu/CE..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all ${
                          formB.formState.errors.cityState ? 'border-red-500' : 'border-[#E5EBF0]'
                        }`}
                      />
                      {formB.formState.errors.cityState && (
                        <span className="text-xs text-red-600 mt-1 block">
                          {formB.formState.errors.cityState.message}
                        </span>
                      )}
                    </div>

                    {/* Tipo de Imóvel e Valor da Conta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="quo-propertyType" className="block text-xs font-bold text-[#102D46] mb-1">
                          Tipo de Imóvel *
                        </label>
                        <select
                          id="quo-propertyType"
                          {...formB.register('propertyType')}
                          className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all"
                        >
                          {COMPANY_INFO.qualification.propertyTypes.map((prop) => (
                            <option key={prop.id} value={prop.id}>
                              {prop.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="quo-billRange" className="block text-xs font-bold text-[#102D46] mb-1">
                          Valor Médio da Conta de Energia *
                        </label>
                        <select
                          id="quo-billRange"
                          {...formB.register('billRange')}
                          className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all"
                        >
                          {COMPANY_INFO.qualification.billRanges.map((bill) => (
                            <option key={bill.id} value={bill.id}>
                              {bill.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Serviço Desejado */}
                    <div>
                      <label htmlFor="quo-serviceDesired" className="block text-xs font-bold text-[#102D46] mb-1">
                        Serviço Desejado *
                      </label>
                      <select
                        id="quo-serviceDesired"
                        {...formB.register('serviceDesired')}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all"
                      >
                        {COMPANY_INFO.qualification.solarServices.map((srv) => (
                          <option key={srv.id} value={srv.id}>
                            {srv.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Informações Adicionais */}
                    <div>
                      <label htmlFor="quo-additionalInfo" className="block text-xs font-bold text-[#102D46] mb-1">
                        Informações Adicionais (Opcional)
                      </label>
                      <textarea
                        id="quo-additionalInfo"
                        rows={2}
                        {...formB.register('additionalInfo')}
                        placeholder="Detalhes sobre tipo de telhado, terreno, concessionária ou necessidade específica..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E5EBF0] text-sm text-[#102D46] bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#102D46] transition-all resize-none"
                      />
                    </div>

                    {/* Consentimento LGPD */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          {...formB.register('lgpdConsent')}
                          className="mt-1 w-4 h-4 rounded border-[#E5EBF0] text-[#102D46] focus:ring-[#102D46]"
                        />
                        <span className="text-xs text-[#526273] leading-relaxed">
                          Concordo com o tratamento dos meus dados para elaboração de orçamento e contato comercial nos termos da{' '}
                          <button
                            type="button"
                            onClick={() => setPrivacyModalOpen(true)}
                            className="text-[#102D46] font-bold underline hover:text-[#091D2F]"
                          >
                            Política de Privacidade
                          </button>{' '}
                          e{' '}
                          <button
                            type="button"
                            onClick={() => setTermsModalOpen(true)}
                            className="text-[#102D46] font-bold underline hover:text-[#091D2F]"
                          >
                            Termos de Uso
                          </button>
                          . *
                        </span>
                      </label>
                      {formB.formState.errors.lgpdConsent && (
                        <span className="text-xs text-red-600 mt-1 block">
                          {formB.formState.errors.lgpdConsent.message}
                        </span>
                      )}
                    </div>

                    {/* CTA Fluxo B */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={formB.formState.isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {formB.formState.isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processando solicitação...</span>
                          </>
                        ) : (
                          <>
                            <span>Solicitar meu orçamento</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modais de Conformidade */}
      <PrivacyPolicyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
    </section>
  );
};
