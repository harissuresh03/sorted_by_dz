'use client';

import { Reveal } from '@/components/reveal';
import { useLanguage } from '@/components/language-provider';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <main className="min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">{t('Legal')}</p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy dark:text-white md:text-7xl">
              {t('Privacy Policy')}
            </h1>
            <p className="mt-6 font-mono text-xs font-semibold text-teal dark:text-mint">{t('Last updated: August 2026')}</p>
          </Reveal>

          <Reveal delay={100}>
            <article className="mt-10 space-y-6 text-navy/85 dark:text-white/90">
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('How we handle your information')}</h2>
                <p className="mt-3">
                  {t('Sorted by DZ helps connect customer needs with independent service providers. Information you choose to share through WhatsApp or the enquiry form is used to understand your request and communicate with you.')}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('Third-party services')}</h2>
                <p className="mt-3">
                  {t('WhatsApp is a third-party service governed by its own policies. Links to providers may lead to third-party sites outside our control.')}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('Contact')}</h2>
                <p className="mt-3">{t('Questions about privacy can be sent to arwinmxdz@gmail.com.')}</p>
              </div>
            </article>
          </Reveal>
        </section>
    </main>
  );
}
