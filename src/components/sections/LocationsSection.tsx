import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, MessageCircle, Search } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { trackEvent } from '../../utils/tracking';
import { fadeInUp, continuousViewport, smoothEase } from '../../utils/motion';

export const LocationsSection: React.FC = () => {
  const handleMapClick = (platform: 'google_maps' | 'waze' | 'iguatu_search') => {
    trackEvent('map_click', { platform, destination: 'unidade_cariri' });
  };

  return (
    <section id="unidades" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={continuousViewport}
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#102D46]">
            <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
            <span>Estrutura e Presença no Ceará</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102D46] tracking-tight leading-tight text-balance">
            Unidade comercial no Cariri e matriz cadastral em Iguatu
          </h2>

          <p className="text-base sm:text-lg text-[#526273] leading-relaxed">
            Consulte os dados oficiais de atendimento presencial em Juazeiro do Norte e informações da sede cadastrada.
          </p>
        </motion.div>

        {/* Grade de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Unidade Comercial Cariri (7 cols com Mapa e 3 Ações) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-[#102D46] text-[#B8EF35]">
                  {COMPANY_INFO.units.commercial.brand}
                </span>
                <span className="text-xs font-semibold text-[#102D46]">
                  Atendimento Comercial Presencial
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#102D46]">
                  {COMPANY_INFO.units.commercial.title}
                </h3>
                <p className="text-sm font-medium text-[#102D46] mt-1">
                  {COMPANY_INFO.units.commercial.fullAddress}
                </p>
                <p className="text-xs text-[#526273] mt-1">
                  {COMPANY_INFO.units.commercial.description}
                </p>
              </div>

              {/* Horários Oficiais Divulgados */}
              <div className="p-4 rounded-xl bg-white border border-[#E5EBF0] space-y-2 text-xs text-[#526273]">
                <div className="flex items-center gap-2 text-[#102D46] font-bold pb-1 border-b border-slate-100">
                  <Clock className="w-4 h-4 text-[#102D46]" />
                  <span>Horários de Atendimento da Unidade Cariri:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div>
                    <span className="font-semibold text-[#102D46] block">Dias úteis:</span>
                    <span>{COMPANY_INFO.units.commercial.hours.weekdays}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#102D46] block">Sábado:</span>
                    <span>{COMPANY_INFO.units.commercial.hours.saturday}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#102D46] block">Domingo:</span>
                    <span>{COMPANY_INFO.units.commercial.hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Telefone Oficial */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102D46]">
                <Phone className="w-4 h-4 text-[#102D46]" />
                <span>Telefone / WhatsApp Comercial: {COMPANY_INFO.phone} ({COMPANY_INFO.contactPerson})</span>
              </div>

              {/* Iframe de Mapa Responsivo com Carregamento Lazy */}
              <div className="rounded-xl overflow-hidden border border-[#E5EBF0] aspect-16/9 w-full bg-slate-100 relative shadow-2xs">
                <iframe
                  title="Localização Solis Tech Cariri - Rua Engenheiro José Walter, 895, Triângulo, Juazeiro do Norte/CE"
                  src="https://maps.google.com/maps?q=Rua%20Engenheiro%20Jos%C3%A9%20Walter%20895%20Triangulo%20Juazeiro%20do%20Norte%20CE&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Três Botões Oficiais Mandatórios com Microinterações Motion */}
            <div className="pt-6 mt-6 border-t border-[#E5EBF0] flex flex-wrap items-center gap-3">
              <motion.a
                href={COMPANY_INFO.units.commercial.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleMapClick('google_maps')}
                whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors cursor-pointer"
              >
                <span>Ver no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href={COMPANY_INFO.units.commercial.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleMapClick('waze')}
                whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-[#102D46] bg-white border border-[#E5EBF0] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#102D46]" />
                <span>Abrir no Waze</span>
              </motion.a>

              <motion.a
                href={COMPANY_INFO.whatsappCustomMessage(
                  "Olá! Gostaria de falar com a Unidade Comercial Cariri da Solis Tech em Juazeiro do Norte."
                )}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-[#102D46] bg-white border border-[#E5EBF0] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#102D46]" />
                <span>Falar com a unidade</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Matriz Cadastral - Iguatu */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={continuousViewport}
            className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EBF0] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-200 text-[#102D46]">
                  Matriz Cadastral
                </span>
                <span className="text-xs text-[#526273]">
                  Registro CNPJ
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#102D46]">
                  {COMPANY_INFO.units.headquarters.title}
                </h3>
                <p className="text-sm font-semibold text-[#102D46] mt-1">
                  {COMPANY_INFO.units.headquarters.fullAddress}
                </p>
                <p className="text-xs text-[#526273] mt-2 leading-relaxed">
                  {COMPANY_INFO.units.headquarters.description}
                </p>
              </div>

              {/* Nota de Esclarecimento sobre Iguatu */}
              <div className="p-4 rounded-xl bg-white border border-[#E5EBF0] space-y-2 text-xs text-[#526273]">
                <strong className="block text-[#102D46] font-semibold">
                  Informação importante sobre a sede:
                </strong>
                <p className="leading-relaxed">
                  Este endereço corresponde estritamente à matriz cadastral da sociedade empresária ({COMPANY_INFO.legalName}) perante a Receita Federal do Brasil.
                </p>
                <p className="text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2">
                  Atendimento presencial a clientes e reuniões comerciais ocorrem na Unidade Comercial Cariri em Juazeiro do Norte.
                </p>
              </div>
            </div>

            {/* Botão de Localização por Busca de Endereço */}
            <div className="pt-6 mt-6 border-t border-[#E5EBF0]">
              <motion.a
                href={COMPANY_INFO.units.headquarters.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleMapClick('iguatu_search')}
                whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs text-[#102D46] bg-white border border-[#E5EBF0] hover:bg-slate-100 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Ver localização cadastral no mapa</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
