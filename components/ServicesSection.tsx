"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/lib/data';
import { useLanguage } from '@/components/language-provider';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeSlug, setActiveSlug] = useState<string>(categories[0]?.slug ?? '');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const activeCategory = categories.find(c => c.slug === activeSlug);

  const handleCategoryClick = (slug: string) => {
    setExpandedSlug(prev => (prev === slug ? null : slug));
    setActiveSlug(slug);
  };

  return (
    <section className="px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
            {t('What we do')}
          </p>
          <h2 className="display mt-3 max-w-2xl text-4xl font-bold leading-tight text-navy dark:text-white md:text-5xl">
            {t('Services provided.')}
          </h2>
          <p className="mt-4 max-w-xl text-lg font-medium text-navy/80 dark:text-white/90">
            {t('Hover to preview a category, click to explore the services inside.')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Column — Category List */}
          <nav className="w-full md:w-2/5 space-y-0">
            {categories.map((cat, idx) => {
              const isActive = cat.slug === activeSlug;
              const isExpanded = expandedSlug === cat.slug;
              return (
                <div key={cat.slug} className="border-b border-teal/20 last:border-b-0">
                  <button
                    className={`flex w-full items-center justify-between py-6 text-left transition-colors duration-200 ${
                      isActive ? 'text-teal dark:text-mint' : 'text-navy dark:text-white'
                    }`}
                    onMouseEnter={() => setActiveSlug(cat.slug)}
                    onFocus={() => setActiveSlug(cat.slug)}
                    onClick={() => handleCategoryClick(cat.slug)}
                    aria-expanded={isExpanded}
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-mono text-xs font-bold tracking-widest text-teal dark:text-mint">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-2xl font-bold leading-tight md:text-3xl">
                        {t(cat.name, true)}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`ml-4 flex-shrink-0 ${isActive ? 'text-teal dark:text-mint' : 'text-navy/40 dark:text-white/40'}`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.span>
                  </button>

                  {/* Inline services dropdown */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="services"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6">
                          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-teal dark:text-mint">
                            {t('Choose a service below:')}
                          </p>
                          <div className="flex flex-wrap gap-2.5">
                            {cat.items.map(service => (
                              <Link
                                key={service.slug}
                                href={`/contact?category=${cat.slug}&service=${service.slug}`}
                                className="flex items-center gap-2 rounded-full border-2 border-teal/30 bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition-all duration-200 hover:border-teal hover:bg-teal hover:text-white dark:border-teal/40 dark:bg-[#16273b] dark:text-white dark:hover:border-mint dark:hover:bg-teal dark:hover:text-white"
                              >
                                {t(service.name, true)}
                                <span className="text-teal font-bold dark:text-mint">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Column — Preview Card */}
          <div className="relative w-full md:w-3/5 h-80 md:h-[520px] rounded-[20px] overflow-hidden">
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <Image
                    src={activeCategory.imageUrl}
                    alt={t(activeCategory.name, true)}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-4xl md:text-5xl font-bold mb-3">{t(activeCategory.name, true)}</h3>
                    <p className="text-lg md:text-xl opacity-90 mb-4">{t(activeCategory.desc, true)}</p>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.tags?.map(tag => (
                        <span
                          key={tag}
                          className="bg-white/20 backdrop-blur-sm text-white font-medium text-xs px-3 py-1.5 rounded-full border border-white/30"
                        >
                          {t(tag, true)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

