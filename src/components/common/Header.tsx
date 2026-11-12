import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO, NAV_LINKS } from '../../constants/company';
import { trackEvent } from '../../utils/tracking';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Detect active section based on scroll position
      const sections = NAV_LINKS.map((link) => link.href.replace('#', ''));
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E5EBF0] py-3'
            : 'bg-linear-to-b from-[#091D2F]/85 via-[#091D2F]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 lg:gap-8">
            {/* Zona 1: Marca Institucional */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#inicio');
              }}
              className="group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35] rounded-md transition-opacity"
              aria-label="Solis Tech - Início"
            >
              <BrandLogo variant={isScrolled ? 'dark' : 'light'} />
            </a>

            {/* Zona 2: Links de navegação desktop com indicador animado Motion */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`relative px-3 py-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35] ${
                      isScrolled
                        ? isActive
                          ? 'text-[#102D46]'
                          : 'text-[#526273] hover:text-[#102D46]'
                        : isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeHeaderPill"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className={`absolute inset-0 rounded-lg ${
                          isScrolled ? 'bg-slate-100' : 'bg-white/15'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zona 3: Ação Principal e WhatsApp */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* WhatsApp direto */}
              <a
                href={COMPANY_INFO.whatsappInvestmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'header' })}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35] ${
                  isScrolled
                    ? 'text-[#102D46] hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
                title="Atendimento Comercial no WhatsApp (Joel Patricio)"
              >
                <MessageCircle className="w-4 h-4 text-[#B8EF35]" />
                <span className="hidden xl:inline">{COMPANY_INFO.phone}</span>
              </a>

              {/* Botão de Destaque com microinteração Motion */}
              <motion.a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contato');
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-xs hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35] whitespace-nowrap cursor-pointer"
              >
                <span>Falar com um especialista</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>

              {/* Botão Hambúrguer Mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35] cursor-pointer ${
                  isScrolled
                    ? 'text-[#102D46] hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menu principal"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile com AnimatePresence e transição spring fluida */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#091D2F]/80 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Gaveta do Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-18 inset-x-4 max-h-[82vh] bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border border-[#E5EBF0]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5EBF0]">
                  <BrandLogo variant="dark" />
                  <span className="text-xs text-[#526273] font-medium">Ceará • Brasil</span>
                </div>

                <nav className="flex flex-col space-y-1 pt-1">
                  {NAV_LINKS.map((link) => {
                    const sectionId = link.href.replace('#', '');
                    const isActive = activeSection === sectionId;

                    return (
                      <button
                        key={link.href}
                        type="button"
                        onClick={() => handleLinkClick(link.href)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#102D46] text-white'
                            : 'text-[#102D46] hover:bg-slate-50'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#B8EF35]" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-5 border-t border-[#E5EBF0] space-y-2.5 mt-4">
                <button
                  type="button"
                  onClick={() => handleLinkClick('#contato')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-xs cursor-pointer"
                >
                  <span>Falar com um especialista</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={COMPANY_INFO.whatsappInvestmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-[#102D46] bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#102D46]" />
                  <span>WhatsApp: {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
