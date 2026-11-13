import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Limite de payload estrito para segurança (máximo 50kb)
app.use(express.json({ limit: '50kb' }));

// Rate limiter básico em memória por IP (máximo 15 requisições por 5 minutos)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Esquemas Zod para validação server-side
const investmentLeadServerSchema = z.object({
  flowType: z.literal('investimento'),
  fullName: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres').max(120),
  phone: z.string().trim().min(10, 'Telefone com DDD inválido').max(25),
  email: z.string().trim().email('E-mail inválido').max(120),
  cityState: z.string().trim().min(2, 'Cidade e estado obrigatórios').max(100),
  investmentRange: z.enum([
    'ate-100k',
    '100k-200k',
    '200k-300k',
    'acima-300k',
    'conversar-antes',
  ]),
  objective: z.enum([
    'conhecer-projetos',
    'entender-modelo',
    'solicitar-estudo',
    'agendar-visita',
    'falar-comercial',
  ]),
  contactPreference: z.enum(['whatsapp', 'telefone', 'email']),
  lgpdConsent: z.boolean().refine((val) => val === true, 'Consentimento LGPD obrigatório'),
  website_hp: z.string().optional(), // Honeypot antispam
  utm: z.record(z.string(), z.any()).optional(),
});

const quoteLeadServerSchema = z.object({
  flowType: z.literal('orcamento-solar'),
  fullName: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres').max(120),
  phone: z.string().trim().min(10, 'Telefone com DDD inválido').max(25),
  email: z.string().trim().email('E-mail inválido').max(120),
  cityState: z.string().trim().min(2, 'Cidade e estado obrigatórios').max(100),
  propertyType: z.enum(['residencial', 'comercial', 'rural']),
  billRange: z.enum([
    'ate-500',
    '500-1500',
    '1500-3000',
    '3000-5000',
    'acima-5000',
  ]),
  serviceDesired: z.enum([
    'instalacao-solar',
    'projeto-eletrico',
    'manutencao',
    'monitoramento',
    'outros',
  ]),
  additionalInfo: z.string().max(800).optional(),
  lgpdConsent: z.boolean().refine((val) => val === true, 'Consentimento LGPD obrigatório'),
  website_hp: z.string().optional(), // Honeypot antispam
  utm: z.record(z.string(), z.any()).optional(),
});

// Endpoint de integridade e status de configuração
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    webhookConfigured: Boolean(process.env.LEADS_WEBHOOK_URL && process.env.LEADS_WEBHOOK_URL.trim() !== ''),
  });
});

// Endpoint seguro para recebimento e despacho de leads
app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    
    // Verificação de Rate Limit
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        message: 'Muitas solicitações enviadas recentemente. Por favor, aguarde alguns minutos ou fale diretamente no WhatsApp.',
      });
    }

    const body = req.body || {};

    // Proteção antispam Honeypot: se o campo invisível estiver preenchido, descarta silenciosamente
    if (body.website_hp && String(body.website_hp).trim().length > 0) {
      return res.status(200).json({
        success: true,
        leadId: 'hp_' + Date.now(),
        mode: 'webhook',
        message: 'Solicitação recebida com sucesso.',
      });
    }

    const flowType = body.flowType;
    let validatedData: any;

    if (flowType === 'investimento') {
      const parsed = investmentLeadServerSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          errors: parsed.error.flatten().fieldErrors,
          message: 'Por favor, confira os dados preenchidos no formulário de investimento.',
        });
      }
      validatedData = parsed.data;
    } else if (flowType === 'orcamento-solar') {
      const parsed = quoteLeadServerSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          errors: parsed.error.flatten().fieldErrors,
          message: 'Por favor, confira os dados preenchidos no formulário de orçamento solar.',
        });
      }
      validatedData = parsed.data;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Tipo de formulário não especificado ou inválido.',
      });
    }

    const leadId = `solis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    const webhookPayload = {
      leadId,
      timestamp,
      flowType: validatedData.flowType,
      lead: {
        fullName: validatedData.fullName,
        phone: validatedData.phone,
        email: validatedData.email,
        cityState: validatedData.cityState,
        ...(validatedData.flowType === 'investimento'
          ? {
              investmentRange: validatedData.investmentRange,
              objective: validatedData.objective,
              contactPreference: validatedData.contactPreference,
            }
          : {
              propertyType: validatedData.propertyType,
              billRange: validatedData.billRange,
              serviceDesired: validatedData.serviceDesired,
              additionalInfo: validatedData.additionalInfo || '',
            }),
      },
      origin: {
        userAgent: req.headers['user-agent'] || '',
        utm: validatedData.utm || {},
      },
    };

    const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim();

    // Caso o webhook esteja configurado por variável de ambiente
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Solis-Lead-Source': 'official-website',
          },
          body: JSON.stringify(webhookPayload),
          signal: AbortSignal.timeout(6000), // timeout de 6s
        });

        if (webhookResponse.ok) {
          return res.status(200).json({
            success: true,
            leadId,
            mode: 'webhook',
            message: 'Lead registrado com sucesso e encaminhado ao sistema comercial.',
          });
        }
      } catch (webhookErr) {
        // Log seguro no servidor sem expor dados pessoais
        console.error('[Webhook Forwarding Error]: Falha na entrega ao webhook externo');
      }
    }

    // Se o webhook não estiver configurado ou falhar, reportar com transparência o status e oferecer o canal WhatsApp
    return res.status(200).json({
      success: true,
      leadId,
      mode: 'direct_whatsapp_fallback',
      configured: Boolean(webhookUrl && webhookUrl.startsWith('http')),
      message: webhookUrl
        ? 'Os dados foram validados no servidor. Devido a uma instabilidade no webhook, você pode continuar diretamente pelo WhatsApp.'
        : 'Integração de webhook externo não configurada (defina LEADS_WEBHOOK_URL). Seus dados foram validados e estão prontos para envio direto via WhatsApp.',
    });
  } catch (err: any) {
    console.error('[Leads API Error]:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: 'Ocorreu um erro interno no servidor ao processar o formulário. Por favor, utilize o contato via WhatsApp.',
    });
  }
});

// Servir pasta public diretamente pelo Express para suporte completo a HTTP 206 (Range requests para vídeo)
app.use(express.static(path.resolve(__dirname, 'public')));

// Setup Vite dev server ou arquivos estáticos de produção
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Solis Tech Server] Rodando na porta ${port}`);
  });
}

startServer();
