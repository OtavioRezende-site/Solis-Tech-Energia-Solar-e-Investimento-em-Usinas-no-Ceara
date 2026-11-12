/**
 * SOLIS TECH - Sistema Global de Motion Design
 * Variantes de animação fluidas, naturais e reutilizáveis baseadas na biblioteca Motion.
 */

import { Variants } from 'motion/react';

// Transição padrão sofisticada (curva suave de estúdio premium)
export const smoothEase = [0.16, 1, 0.3, 1] as const;

// Configuração de viewport contínua (o motion reage sempre que entra no campo de visão, não apenas uma vez)
export const continuousViewport = {
  once: false,
  amount: 0.15,
};

// Fade-in suave com elevação vertical
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

// Fade-in simples
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
};

// Container para efeito Stagger em grupos de cards
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Animação individual para itens filhos de um grupo Stagger
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
};

// Microinteração para Cards interativos (hover e tap)
export const cardInteractive = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    transition: { duration: 0.25, ease: smoothEase },
  },
  hover: {
    y: -5,
    boxShadow: '0 12px 24px -8px rgba(16, 45, 70, 0.12)',
    transition: { duration: 0.25, ease: smoothEase },
  },
  tap: {
    scale: 0.99,
    transition: { duration: 0.15 },
  },
};

// Microinteração para Botões de Ação Primários (Verde-lima)
export const buttonPrimaryMotion = {
  whileHover: {
    scale: 1.02,
    boxShadow: '0 6px 20px -4px rgba(184, 239, 53, 0.45)',
    transition: { duration: 0.2, ease: smoothEase },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Microinteração para Botões Secundários
export const buttonSecondaryMotion = {
  whileHover: {
    scale: 1.02,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transition: { duration: 0.2, ease: smoothEase },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Animação contínua sutil de pulso de energia solar
export const energyPulseMotion: Variants = {
  initial: { opacity: 0.8, scale: 1 },
  animate: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.03, 1],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
