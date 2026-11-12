import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ShieldCheck, TrendingUp, SunMedium } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { smoothEase, buttonPrimaryMotion, buttonSecondaryMotion } from '../../utils/motion';
import heroFallbackImg from '../../assets/images/solis_hero_solar_farm_1794505468745.jpg';

import { ADMIN_CONFIG } from '../../constants/adminConfig';

export const HeroSection: React.FC = () => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced && videoRef.current) {
      videoRef.current.pause();
    }
  }, [prefersReduced]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Variantes de entrada coordenadas do Hero
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: smoothEase,
      },
    },
  };

  return (
    <section
      id="inicio"
      aria-label="Apresentação principal da Solis Tech"
      className="relative min-h-[92svh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#091D2F] scroll-mt-20"
    >
      {/* Background Layer: Vídeo com fallback inteligente */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden select-none">
        {!videoError && !prefersReduced ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={ADMIN_CONFIG.heroPosterUrl}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={ADMIN_CONFIG.heroVideoUrl} type="video/mp4" />
          </video>
        ) : null}

        {/* Fallback de imagem de alta resolução */}
        {(!isVideoLoaded || videoError || prefersReduced) && (
          <img
            src={heroFallbackImg}
            alt="Usina de Energia Solar da Solis Tech no Ceará"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-102 transition-transform duration-1000 ease-out"
          />
        )}

        {/* Camadas de Overlay Escuro com gradiente direcional refinado */}
        <div className="absolute inset-0 bg-linear-to-r from-[#091D2F]/95 via-[#091D2F]/80 to-[#102D46]/60" />
        <div className="absolute inset-0 bg-linear-to-t from-[#091D2F] via-transparent to-[#091D2F]/70" />

        {/* Efeito sutil de malha de radiação solar */}
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#B8EF35_1px,transparent_1px)] [background-size:28px_28px]"
          aria-hidden="true"
        />

        {/* Efeito de luz ambiente solar */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#B8EF35]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Conteúdo Principal do Hero com Motion Stagger */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-6 text-left"
        >
          {/* Eyebrow institucional */}
          <motion.div variants={heroItemVariants} className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#B8EF35] rounded-full" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#B8EF35] uppercase">
              {COMPANY_INFO.eyebrow}
            </p>
          </motion.div>

          {/* Headline Principal */}
          <motion.h1
            variants={heroItemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight text-balance"
          >
            {COMPANY_INFO.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl text-pretty"
          >
            {COMPANY_INFO.subheadline}
          </motion.p>

          {/* Destaques rápidos de credibilidade */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-1"
          >
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#B8EF35]" />
              <span>Alta rentabilidade em locação</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B8EF35]" />
              <span>Engenharia e homologação própria</span>
            </div>
            <div className="flex items-center gap-1.5">
              <SunMedium className="w-4 h-4 text-[#B8EF35]" />
              <span>Atuação Juazeiro do Norte & Iguatu</span>
            </div>
          </motion.div>

          {/* Bloco de Ações / CTAs com Microinterações */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 sm:pt-6"
          >
            <motion.button
              type="button"
              onClick={() => handleScrollTo('investimento')}
              {...buttonPrimaryMotion}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm sm:text-base font-bold text-[#091D2F] bg-[#B8EF35] hover:bg-[#A3DC22] transition-colors shadow-lg cursor-pointer focus:outline-hidden focus-visible:ring-3 focus-visible:ring-[#B8EF35]"
            >
              <span>Conhecer oportunidades de investimento</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => handleScrollTo('contato')}
              {...buttonSecondaryMotion}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xs transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Solicitar um projeto solar</span>
            </motion.button>
          </motion.div>

          {/* Slogan Institucional */}
          <motion.div variants={heroItemVariants} className="pt-4 border-t border-white/10">
            <p className="text-xs sm:text-sm text-slate-300 italic">
              &ldquo;{COMPANY_INFO.slogan}&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador discreto e animado para explorar a página */}
      <motion.button
        type="button"
        onClick={() => handleScrollTo('apresentacao')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors p-2 rounded-lg cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35]"
        aria-label="Rolar para a apresentação institucional"
      >
        <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400">
          Explorar
        </span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#B8EF35]" />
        </motion.div>
      </motion.button>
    </section>
  );
};
