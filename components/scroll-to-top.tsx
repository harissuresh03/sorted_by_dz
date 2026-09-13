'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 cursor-pointer place-items-center rounded-full border-2 border-teal bg-teal text-white shadow-lg transition-all duration-200 hover:scale-110 hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 dark:border-teal dark:bg-teal dark:text-white dark:hover:border-mint dark:hover:bg-mint dark:hover:text-navy md:bottom-8 md:right-8"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.8} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
