/**
 * SOLIS TECH - Site Oficial
 * Refinamento Visual, Motion Design Contínuo e Transições Suaves entre Seções (Prompt 4).
 */

import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { SectionDivider } from './components/common/SectionDivider';
import { HeroSection } from './components/sections/HeroSection';
import { InstitutionalIntro } from './components/sections/InstitutionalIntro';
import { SolarInvestment } from './components/sections/SolarInvestment';
import { InvestmentJourney } from './components/sections/InvestmentJourney';
import { SolarSolutions } from './components/sections/SolarSolutions';
import { Differentials } from './components/sections/Differentials';
import { ProjectsPortfolio } from './components/sections/ProjectsPortfolio';
import { AboutCompany } from './components/sections/AboutCompany';
import { FaqSection } from './components/sections/FaqSection';
import { ConversionCta } from './components/sections/ConversionCta';
import { LocationsSection } from './components/sections/LocationsSection';
import { ContactSection } from './components/sections/ContactSection';

export default function App() {
  const [selectedInterest, setSelectedInterest] = useState<string>('usina-investimento');

  const handleSelectInterest = (interest: string) => {
    setSelectedInterest(interest);
  };

  const handleSelectMobileFlow = (flow: 'investimento' | 'orcamento-solar') => {
    setSelectedInterest(flow === 'investimento' ? 'usina-investimento' : 'comercial');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#102D46] selection:bg-[#B8EF35] selection:text-[#091D2F] font-sans antialiased overflow-x-clip">
      {/* Header Fixo com indicador animado Motion */}
      <Header />

      {/* Conteúdo Principal com as 12 seções conectadas por gradientes suaves */}
      <main className="flex-1 w-full">
        {/* 1. Hero com vídeo e poster */}
        <HeroSection />

        {/* Transição suave do Hero (Azul escuro) para Apresentação (Branco) */}
        <SectionDivider variant="navy-to-white" />

        {/* 2. Apresentação institucional */}
        <InstitutionalIntro />

        {/* Transição suave de Apresentação (Branco) para Investimento (Cinza suave) */}
        <SectionDivider variant="white-to-gray" />

        {/* 3. Investimento em usinas solares (Maior destaque comercial) */}
        <SolarInvestment onSelectInterest={handleSelectInterest} />

        {/* Transição suave de Investimento (Cinza suave) para Jornada (Branco) */}
        <SectionDivider variant="gray-to-white" />

        {/* 4. Como funciona a jornada de investimento */}
        <InvestmentJourney onSelectInterest={handleSelectInterest} />

        {/* Transição suave de Jornada (Branco) para Soluções (Cinza suave) */}
        <SectionDivider variant="white-to-gray" />

        {/* 5. Soluções de energia solar */}
        <SolarSolutions onSelectInterest={handleSelectInterest} />

        {/* Transição suave de Soluções (Cinza suave) para Diferenciais (Branco) */}
        <SectionDivider variant="gray-to-white" />

        {/* 6. Diferenciais da Solis Tech */}
        <Differentials onOpenContact={() => handleSelectInterest('comercial')} />

        {/* Transição suave de Diferenciais (Branco) para Projetos (Cinza suave) */}
        <SectionDivider variant="white-to-gray" />

        {/* 7. Projetos e portfólio de referências */}
        <ProjectsPortfolio />

        {/* Transição suave de Projetos (Cinza suave) para Sobre a Empresa (Branco) */}
        <SectionDivider variant="gray-to-white" />

        {/* 8. Sobre a empresa */}
        <AboutCompany />

        {/* Transição suave de Sobre (Branco) para FAQ (Cinza suave) */}
        <SectionDivider variant="white-to-gray" />

        {/* 9. Perguntas frequentes (FAQ) */}
        <FaqSection />

        {/* Transição suave de FAQ (Cinza suave) para CTA Final (Azul-marinho) */}
        <SectionDivider variant="gray-to-navy" />

        {/* 10. CTA de conversão final */}
        <ConversionCta onSelectInterest={handleSelectInterest} />

        {/* Transição suave de CTA Final (Azul-marinho) para Unidades (Branco) */}
        <SectionDivider variant="navy-to-white" />

        {/* 11. Unidades e localização */}
        <LocationsSection />

        {/* Transição suave de Unidades (Branco) para Contato (Cinza suave) */}
        <SectionDivider variant="white-to-gray" />

        {/* 12. Formulário de contato com os dois fluxos de qualificação (Fluxo A e B) */}
        <ContactSection selectedInterest={selectedInterest} />

        {/* Transição suave de Contato (Cinza suave) para Rodapé (Azul escuro) */}
        <SectionDivider variant="gray-to-navy" />
      </main>

      {/* 13. Footer institucional */}
      <Footer />

      {/* Barra fixa inferior mobile */}
      <MobileBottomBar onSelectFlow={handleSelectMobileFlow} />

      {/* Botão flutuante de WhatsApp comercial */}
      <WhatsAppButton />
    </div>
  );
}
