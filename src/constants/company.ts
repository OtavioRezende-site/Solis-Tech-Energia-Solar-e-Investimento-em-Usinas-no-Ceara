/**
 * SOLIS TECH - Informações e Constantes Oficiais Validadas
 * Centralização rigorosa dos dados cadastrais, comerciais, de atendimento e infraestrutura de qualificação.
 */

export const COMPANY_INFO = {
  name: "Solis Tech",
  legalName: "T R Lima Comércio e Serviços Ltda.",
  cnpj: "45.286.061/0001-03",
  foundingDate: "14/02/2022",
  slogan: "Com a Solis, o sol trabalha por você!",
  eyebrow: "ENERGIA SOLAR • TECNOLOGIA • INVESTIMENTO",
  headline: "Transforme a energia do sol em novas oportunidades.",
  subheadline:
    "Conheça as soluções da Solis Tech em energia solar e descubra projetos de usinas voltados à locação, com atendimento especializado no Ceará.",
  
  // Mensagens oficiais padronizadas para WhatsApp
  whatsappMessages: {
    investment:
      "Olá, Joel! Conheci a Solis Tech pelo site e gostaria de receber informações sobre as usinas solares para investimento e o modelo de locação.",
    quote:
      "Olá! Conheci a Solis Tech pelo site e gostaria de solicitar um orçamento de energia solar.",
  },

  // Contato Comercial Principal & Equipe Comercial
  phone: "(88) 99600-4445",
  phoneRaw: "5588996004445",
  contactPerson: "Joel Patricio", // Contato principal para investimento e atendimento inicial
  whatsappUrl: "https://wa.me/5588996004445",
  whatsappInvestmentUrl: `https://wa.me/5588996004445?text=${encodeURIComponent(
    "Olá, Joel! Conheci a Solis Tech pelo site e gostaria de receber informações sobre as usinas solares para investimento e o modelo de locação."
  )}`,
  whatsappQuoteUrl: `https://wa.me/5588996004445?text=${encodeURIComponent(
    "Olá! Conheci a Solis Tech pelo site e gostaria de solicitar um orçamento de energia solar."
  )}`,
  whatsappCustomMessage: (text: string) =>
    `https://wa.me/5588996004445?text=${encodeURIComponent(text)}`,

  // Diretório da equipe comercial para eventual atribuição futura (sem roteamento randômico)
  teamDirectory: {
    joel: { name: "Joel Patricio", role: "Investimento & Comercial Principal", phone: "5588996004445" },
    junior: { name: "Júnior", role: "Consultor Comercial", phone: "5588999753027" },
    giselle: { name: "Giselle", role: "Consultora Comercial", phone: "5588988441002" },
    marlon: { name: "Marlon", role: "Consultor Comercial", phone: "5588981092825" },
    suporte: { name: "Suporte", role: "Atendimento Técnico e Operações", phone: "5588982275247" },
  },

  // Unidades oficiais com dados verificados
  units: {
    commercial: {
      brand: "Solis Tech Cariri",
      title: "Unidade Comercial Cariri",
      city: "Juazeiro do Norte/CE",
      address: "Rua Engenheiro José Walter, 895, Triângulo",
      cep: "CEP 63040-830",
      fullAddress: "Rua Engenheiro José Walter, 895, Triângulo, Juazeiro do Norte/CE, CEP 63040-830",
      hours: {
        weekdays: "Segunda a sexta, 8h às 18h",
        saturday: "Sábado, 8h às 12h",
        sunday: "Domingo, fechado",
      },
      googleMapsUrl: "https://www.google.com/maps?cid=11337420422163747178",
      wazeUrl: "https://waze.com/ul?q=Rua%20Engenheiro%20Jos%C3%A9%20Walter%20895%20Juazeiro%20do%20Norte",
      description: "Escritório de atendimento comercial, apresentação de modelos de usinas e alinhamento de novos projetos.",
    },
    headquarters: {
      title: "Matriz Cadastral",
      city: "Iguatu/CE",
      address: "Rua João Vicente Alves, 931, João Paulo II",
      cep: "CEP 63508-770",
      fullAddress: "Rua João Vicente Alves, 931, João Paulo II, Iguatu/CE, CEP 63508-770",
      googleMapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Joao+Vicente+Alves+931+Iguatu+CE",
      description: "Endereço registrado na Receita Federal como matriz cadastral da sociedade empresária.",
      notice: "Identificação estritamente cadastral da pessoa jurídica. Sem atendimento presencial confirmado.",
    },
  },

  // Redes Sociais Oficiais Validadas
  social: {
    instagramOfficial: "https://www.instagram.com/solis_tech/",
    instagramCariri: "https://www.instagram.com/solis.tech_cariri/",
  },

  // Opções de Qualificação para os Formulários
  qualification: {
    investmentRanges: [
      { id: "ate-100k", label: "Até R$ 100 mil" },
      { id: "100k-200k", label: "R$ 100 mil a R$ 200 mil" },
      { id: "200k-300k", label: "R$ 200 mil a R$ 300 mil" },
      { id: "acima-300k", label: "Acima de R$ 300 mil" },
      { id: "conversar-antes", label: "Prefiro conversar antes" },
    ],
    investmentObjectives: [
      { id: "conhecer-projetos", label: "Conhecer projetos disponíveis" },
      { id: "entender-modelo", label: "Entender o modelo de locação" },
      { id: "solicitar-estudo", label: "Solicitar estudo" },
      { id: "agendar-visita", label: "Agendar visita" },
      { id: "falar-comercial", label: "Falar com o comercial" },
    ],
    contactPreferences: [
      { id: "whatsapp", label: "WhatsApp" },
      { id: "telefone", label: "Ligação telefônica" },
      { id: "email", label: "E-mail" },
    ],
    propertyTypes: [
      { id: "residencial", label: "Residencial" },
      { id: "comercial", label: "Comercial" },
      { id: "rural", label: "Rural" },
    ],
    billRanges: [
      { id: "ate-500", label: "Até R$ 500/mês" },
      { id: "500-1500", label: "R$ 500 a R$ 1.500/mês" },
      { id: "1500-3000", label: "R$ 1.500 a R$ 3.000/mês" },
      { id: "3000-5000", label: "R$ 3.000 a R$ 5.000/mês" },
      { id: "acima-5000", label: "Acima de R$ 5.000/mês" },
    ],
    solarServices: [
      { id: "instalacao-solar", label: "Instalação solar" },
      { id: "projeto-eletrico", label: "Projeto elétrico" },
      { id: "manutencao", label: "Manutenção" },
      { id: "monitoramento", label: "Monitoramento" },
      { id: "outros", label: "Outros" },
    ],
  },
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Investimento Solar", href: "#investimento" },
  { label: "Jornada", href: "#jornada" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Portfólio", href: "#projetos" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;
