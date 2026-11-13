/**
 * SOLIS TECH - Configuração Administrativa e Pendências de Conteúdo
 * 
 * Este arquivo centraliza todas as configurações que dependem de validação
 * comercial, assets definitivos ou credenciais de produção.
 * 
 * Substitua os valores abaixo conforme os materiais oficiais forem disponibilizados.
 */

export interface SolisTechAdminConfig {
  // 1. Assets Visuais Oficiais
  officialLogoUrl: string | null; // Ex: "/images/logo-solis-tech-oficial.svg"
  heroVideoUrl: string; // Ex: "/videos/solis-hero.mp4"
  heroPosterUrl: string; // Ex: "/images/hero-poster.webp"
  
  // 2. Domínio e URLs Canônicas
  canonicalDomain: string; // "https://solistech.com.br"
  
  // 3. Comunicação e E-mails Oficiais
  officialCommercialEmail: string | null; // Defina após validação de titularidade da caixa postal
  dpoContact: {
    name: string;
    email: string | null;
    channelNotice: string;
  };

  // 4. Endereço Comercial em Iguatu (Pendente de Confirmação de Atendimento Presencial)
  iguatuCommercialPresenceConfirmed: boolean;
  iguatuCommercialAddress: string | null;

  // 5. Integração de Leads e CRM
  leadsWebhookUrl: string; // Pode ser injetado via LEADS_WEBHOOK_URL no .env

  // 6. Rastreamento e Analytics
  analytics: {
    ga4MeasurementId: string; // Pode ser injetado via VITE_GA4_MEASUREMENT_ID no .env
    metaPixelId: string; // Pode ser injetado via VITE_META_PIXEL_ID no .env
  };

  // 7. Dados Financeiros e Rentabilidade
  // REGRA: Somente preencher após validação documental e contratual formal
  allowFinancialProjectionsDisplay: boolean;
}

export const ADMIN_CONFIG: SolisTechAdminConfig = {
  // 1. Logotipo oficial da Solis Tech
  officialLogoUrl: "./images/logo-solis-official.png",
  
  // 2. Vídeo e Poster do Hero
  heroVideoUrl: "./videos/solis-hero.mp4",
  heroPosterUrl: "./images/hero-poster.webp",

  // 3. Domínio Canônico
  canonicalDomain: "https://solistech.com.br",

  // 4. E-mail e DPO
  officialCommercialEmail: null, // Pendente de validação formal de caixa postal
  dpoContact: {
    name: "Encarregado de Proteção de Dados (DPO)",
    email: null, // Preencher antes da veiculação de mídia institucional massiva
    channelNotice: "Atendimento provisório realizado pelo canal comercial oficial (88) 99600-4445",
  },

  // 5. Atendimento Presencial em Iguatu
  iguatuCommercialPresenceConfirmed: false,
  iguatuCommercialAddress: null,

  // 6. Webhook de Leads
  leadsWebhookUrl: "",

  // 7. Analytics
  analytics: {
    ga4MeasurementId: "",
    metaPixelId: "",
  },

  // 8. Trava de segurança para dados de rentabilidade
  allowFinancialProjectionsDisplay: false,
};
