'use client';

import Button from '@/components/button';
import { HowItWorksCards } from '@/components/how-it-works-cards';
import ServicesSection from '@/components/ServicesSection';
import { useLanguage } from '@/components/language-provider';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">
              {t('A better way to find help · sorted by DZ')}
            </p>
            <h1 className="display mt-5 text-6xl font-bold leading-[.9] tracking-tight text-navy md:text-8xl">
              Need it?
              <br />
              <i className="text-teal">DZ gets it</i>
              <br />
              sorted.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-navy/85 dark:text-white/90">
              {t('Tell DZ what you need. We help connect you with suitable service providers, without the endless searching.')}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact">{t('Tell DZ what you need →')}</Button>
              <Button href="/services" variant="secondary">
                {t('Explore services')}
              </Button>
            </div>
          </div>
          <div
            aria-label={t('Hero image placeholder')}
            className="flex aspect-square max-h-[490px] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-teal/30 bg-teal/5 dark:border-mint/35 dark:bg-teal/10"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal/70 dark:text-mint/70">
              {t('Add image here')}
            </span>
          </div>
        </div>
      </section>

      {/* How it works — guide (header + horizontal card scroll, self-contained) */}
      <HowItWorksCards />

      <ServicesSection />
    </main>
  );
}
