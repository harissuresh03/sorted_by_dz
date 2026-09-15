'use client';

import { Reveal } from '@/components/reveal';
import { RequestForm } from '@/components/request-form';
import { useLanguage } from '@/components/language-provider';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <main className="min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
            <Reveal>
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
                  {t('Sorted by DZ / contact')}
                </p>
                <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy dark:text-white md:text-7xl">
                  {t('Let’s get it sorted.')}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/85 dark:text-white/90">
                  {t('Share the details and DZ will receive your enquiry by email. You can also take the same details to WhatsApp.')}
                </p>
              </div>
            </Reveal>
            <RequestForm />
          </div>
        </section>
    </main>
  );
}
