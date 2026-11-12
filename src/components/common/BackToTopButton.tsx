import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1, backgroundColor: '#102D46', color: '#B8EF35' }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-28 md:bottom-22 right-4 sm:right-6 z-30 w-10 h-10 rounded-full bg-white text-[#102D46] shadow-md border border-[#E5EBF0] flex items-center justify-center cursor-pointer transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B8EF35]"
          aria-label="Voltar ao topo da página"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
