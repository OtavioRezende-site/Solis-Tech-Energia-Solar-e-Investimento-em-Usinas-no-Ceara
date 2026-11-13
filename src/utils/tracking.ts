/**
 * Rastreamento e Analytics da SOLIS TECH
 * Captura de UTMs, referrer, landing page e disparador de eventos GA4 e Meta Pixel.
 */

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page: string;
  referrer: string;
  tipo_de_interesse?: string;
  captured_at: string;
}

// Chave para cache local de UTMs na sessão
const UTM_STORAGE_KEY = 'solis_tech_utm_data';

/**
 * Captura os parâmetros UTM da URL e dados de navegação, persistindo na sessão.
 */
export function getOrCaptureUtmData(currentInterest?: string): UtmData {
  if (typeof window === 'undefined') {
    return {
      landing_page: '',
      referrer: '',
      tipo_de_interesse: currentInterest,
      captured_at: new Date().toISOString(),
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  let parsedStored: Partial<UtmData> = {};

  if (stored) {
    try {
      parsedStored = JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  const utmData: UtmData = {
    utm_source: urlParams.get('utm_source') || parsedStored.utm_source || undefined,
    utm_medium: urlParams.get('utm_medium') || parsedStored.utm_medium || undefined,
    utm_campaign: urlParams.get('utm_campaign') || parsedStored.utm_campaign || undefined,
    utm_content: urlParams.get('utm_content') || parsedStored.utm_content || undefined,
    utm_term: urlParams.get('utm_term') || parsedStored.utm_term || undefined,
    landing_page: parsedStored.landing_page || window.location.pathname + window.location.search,
    referrer: parsedStored.referrer || document.referrer || 'direct',
    tipo_de_interesse: currentInterest || parsedStored.tipo_de_interesse || undefined,
    captured_at: parsedStored.captured_at || new Date().toISOString(),
  };

  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  } catch {
    // ignore
  }

  return utmData;
}

export type TrackingEventType =
  | 'page_view'
  | 'whatsapp_click'
  | 'phone_call_click'
  | 'investment_cta_click'
  | 'quote_cta_click'
  | 'form_start'
  | 'generate_lead'
  | 'form_error'
  | 'map_click'
  | 'visit_request_click';

// Controle de duplicação para eventos únicos por sessão/ação
const firedEvents = new Set<string>();

/**
 * Dispara evento para GA4 e Meta Pixel caso configurados no ambiente.
 */
export function trackEvent(
  event: TrackingEventType,
  params?: Record<string, any>,
  allowDuplicate = true
) {
  if (typeof window === 'undefined') return;

  const dedupKey = `${event}_${JSON.stringify(params || {})}`;
  if (!allowDuplicate && firedEvents.has(dedupKey)) {
    return;
  }
  firedEvents.add(dedupKey);

  const utm = getOrCaptureUtmData();
  const eventPayload = {
    ...params,
    utm_source: utm.utm_source,
    utm_campaign: utm.utm_campaign,
    landing_page: utm.landing_page,
    timestamp: new Date().toISOString(),
  };

  // Google Analytics 4 (gtag)
  if (typeof (window as any).gtag === 'function') {
    try {
      (window as any).gtag('event', event, eventPayload);
    } catch (err) {
      console.debug('[Analytics] Falha ao enviar para GA4:', err);
    }
  }

  // Meta Pixel (fbq)
  if (typeof (window as any).fbq === 'function') {
    try {
      if (event === 'generate_lead') {
        (window as any).fbq('track', 'Lead', eventPayload);
      } else if (event === 'page_view') {
        (window as any).fbq('track', 'PageView');
      } else {
        (window as any).fbq('trackCustom', event, eventPayload);
      }
    } catch (err) {
      console.debug('[Analytics] Falha ao enviar para Meta Pixel:', err);
    }
  }

  // Log de desenvolvimento seguro
  if (import.meta.env?.DEV) {
    console.debug(`[TrackEvent: ${event}]`, eventPayload);
  }
}
