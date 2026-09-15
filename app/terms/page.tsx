'use client';

import { Reveal } from '@/components/reveal';
import { useLanguage } from '@/components/language-provider';

export default function Terms() {
  const { t } = useLanguage();

  return (
    <main className="min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">{t('Legal')}</p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy dark:text-white md:text-7xl">
              {t('Terms & Conditions')}
            </h1>
            <p className="mt-6 font-mono text-xs font-semibold text-teal dark:text-mint">{t('Last updated: August 2026')}</p>
          </Reveal>

          <Reveal delay={100}>
            <article className="mt-10 space-y-6 text-navy/85 dark:text-white/90">
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('Our role')}</h2>
                <p className="mt-3">
                  {t('Sorted by DZ helps connect customer requests with independent service providers. We are not the provider of every listed service and do not guarantee availability, quotes, timing, outcomes, or a particular provider fit.')}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('Your request')}</h2>
                <p className="mt-3">
                  {t('Please give accurate, lawful information. A request is an invitation to explore options; it is not a confirmed booking or contract with DZ or any provider.')}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('Provider arrangements')}</h2>
                <p className="mt-3">
                  {t('Any agreement, payment, scope, timing, or service arrangement between you and a provider is made directly with that provider. Please satisfy yourself about each provider before proceeding.')}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy dark:text-white">{t('Changes')}</h2>
                <p className="mt-3">
                  {t('These terms may be updated from time to time. Using the website after an update means you accept the current version.')}
                </p>
              </div>
            </article>
          </Reveal>
        </section>
    </main>
  );
}
