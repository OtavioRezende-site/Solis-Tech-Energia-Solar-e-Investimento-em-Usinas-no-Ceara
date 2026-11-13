import React from 'react';
import { Phone, MapPin, Clock, ArrowUp, Instagram, FileText } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO, NAV_LINKS } from '../../constants/company';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#091D2F] text-slate-300 pt-16 pb-12 border-t border-[#102D46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Coluna 1: Marca & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Desenvolvimento de soluções em energia solar, conectando tecnologia, engenharia e atendimento especializado às necessidades de cada projeto.
            </p>
            <div className="pt-1">
              <span className="inline-block text-xs font-semibold text-[#B8EF35] tracking-wide">
                &ldquo;{COMPANY_INFO.slogan}&rdquo;
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-400 pt-2">
              <p><strong className="text-slate-300 font-semibold">{COMPANY_INFO.legalName}</strong></p>
              <p className="tabular-nums">CNPJ {COMPANY_INFO.cnpj}</p>
            </div>

            {/* Redes Sociais Oficiais e Validadas */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={COMPANY_INFO.whatsappInvestmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#102D46] hover:bg-[#B8EF35] hover:text-[#091D2F] text-slate-200 flex items-center justify-center transition-colors"
                aria-label="WhatsApp da Solis Tech"
                title="WhatsApp Comercial (Joel Patricio)"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.instagramOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#102D46] hover:bg-[#B8EF35] hover:text-[#091D2F] text-slate-200 flex items-center justify-center transition-colors"
                aria-label="Instagram Oficial Solis Tech"
                title="@solis_tech (Instagram Oficial)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.instagramCariri}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#102D46] hover:bg-[#B8EF35] hover:text-[#091D2F] text-slate-200 flex items-center justify-center transition-colors"
                aria-label="Instagram Regional Cariri"
                title="@solis.tech_cariri (Instagram Regional)"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Navegação</h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#B8EF35] text-xs">›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Presença e Unidades no Ceará (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Unidades no Ceará</h3>

            <div className="space-y-3 text-xs leading-relaxed">
              {/* Unidade Comercial */}
              <div className="bg-[#102D46]/60 p-3.5 rounded-lg border border-slate-800">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#B8EF35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">
                      {COMPANY_INFO.units.commercial.brand}
                    </strong>
                    <span className="text-slate-300 block">{COMPANY_INFO.units.commercial.address}</span>
                    <span className="text-slate-400 text-[11px] block">{COMPANY_INFO.units.commercial.city} • {COMPANY_INFO.units.commercial.cep}</span>
                    <span className="text-[10px] text-[#B8EF35] block mt-1">Atendimento comercial presencial</span>
                  </div>
                </div>
              </div>

              {/* Matriz Cadastral */}
              <div className="bg-[#102D46]/60 p-3.5 rounded-lg border border-slate-800">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">
                      Matriz Cadastral (Iguatu)
                    </strong>
                    <span className="text-slate-300 block">{COMPANY_INFO.units.headquarters.address}</span>
                    <span className="text-slate-400 text-[11px] block">{COMPANY_INFO.units.headquarters.city} • {COMPANY_INFO.units.headquarters.cep}</span>
                    <span className="text-[10px] text-slate-400 italic block mt-1">Identificação cadastral da sociedade empresária</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 4: Canais de Atendimento (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Atendimento Comercial</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#B8EF35] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={COMPANY_INFO.whatsappInvestmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors block font-semibold text-white"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="text-slate-400 text-[11px]">Contato Comercial ({COMPANY_INFO.contactPerson})</span>
                </div>
              </li>
              <li className="flex items-start gap-2 pt-1 text-slate-400">
                <Clock className="w-4 h-4 text-[#B8EF35] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-medium">Unidade Cariri</span>
                  <span>{COMPANY_INFO.units.commercial.hours.weekdays}</span>
                  <span className="block">{COMPANY_INFO.units.commercial.hours.saturday}</span>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B8EF35] hover:bg-[#A3DC22] text-[#091D2F] font-bold text-xs rounded-xl transition-colors"
              >
                <span>Solicitar proposta comercial</span>
              </a>
            </div>
          </div>
        </div>

        {/* Linha inferior de copyright e legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Solis Tech ({COMPANY_INFO.legalName} • CNPJ {COMPANY_INFO.cnpj}). Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>Juazeiro do Norte & Iguatu, Ceará</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white p-1 transition-colors cursor-pointer"
              aria-label="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
