import { UtmData } from '../utils/tracking';

export interface ProjectItem {
  id: string;
  name: string;
  city: string;
  category: "Usina de Investimento" | "Comercial" | "Rural" | "Residencial";
  authorizedImage?: string;
  powerKwp?: string;
  generationKwh?: string;
  year?: string;
  operationalStatus: string;
  description: string;
  isPendingValidation: boolean;
  validationNotice: string;
}

export interface SolutionItem {
  id: string;
  serviceKey:
    | "investimento"
    | "residencial"
    | "comercial"
    | "rural"
    | "projetos-instalacoes"
    | "manutencao"
    | "monitoramento"
    | "equipamentos";
  title: string;
  shortDescription: string;
  features: string[];
  iconName: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "Investimento" | "Projetos" | "Operacional" | "Contratual";
}

// Payload do Fluxo A: Investimento em Usinas Solares
export interface InvestmentLeadFormData {
  flowType: 'investimento';
  fullName: string;
  phone: string;
  email: string;
  cityState: string;
  investmentRange:
    | "ate-100k"
    | "100k-200k"
    | "200k-300k"
    | "acima-300k"
    | "conversar-antes";
  objective:
    | "conhecer-projetos"
    | "entender-modelo"
    | "solicitar-estudo"
    | "agendar-visita"
    | "falar-comercial";
  contactPreference: "whatsapp" | "telefone" | "email";
  lgpdConsent: boolean;
  website_hp?: string; // Honeypot antispam
}

// Payload do Fluxo B: Projeto Fotovoltaico
export interface SolarQuoteLeadFormData {
  flowType: 'orcamento-solar';
  fullName: string;
  phone: string;
  email: string;
  cityState: string;
  propertyType: "residencial" | "comercial" | "rural";
  billRange:
    | "ate-500"
    | "500-1500"
    | "1500-3000"
    | "3000-5000"
    | "acima-5000";
  serviceDesired:
    | "instalacao-solar"
    | "projeto-eletrico"
    | "manutencao"
    | "monitoramento"
    | "outros";
  additionalInfo?: string;
  lgpdConsent: boolean;
  website_hp?: string; // Honeypot antispam
}

// Resposta do endpoint /api/leads
export interface LeadSubmissionResponse {
  success: boolean;
  leadId: string;
  mode: 'webhook' | 'direct_whatsapp_fallback';
  message: string;
  whatsappUrl?: string;
  leadSummary?: {
    flow: string;
    name: string;
    city: string;
    phone: string;
    detail: string;
  };
}
