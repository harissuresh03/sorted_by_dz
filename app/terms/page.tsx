import { Reveal } from '@/components/reveal';

export default function Terms() {
  return (
    <main className="grid-bg min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">Legal</p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy md:text-7xl">
              Terms & Conditions
            </h1>
            <p className="mt-6 text-slate-500">Last updated: August 2026</p>
          </Reveal>

          <Reveal delay={100}>
            <article className="mt-10 space-y-6 text-slate-600">
              <div>
                <h2 className="text-xl font-bold text-navy">Our role</h2>
                <p className="mt-3">
                  Sorted by DZ helps connect customer requests with independent service providers. We are
                  not the provider of every listed service and do not guarantee availability, quotes,
                  timing, outcomes, or a particular provider fit.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">Your request</h2>
                <p className="mt-3">
                  Please give accurate, lawful information. A request is an invitation to explore
                  options; it is not a confirmed booking or contract with DZ or any provider.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">Provider arrangements</h2>
                <p className="mt-3">
                  Any agreement, payment, scope, timing, or service arrangement between you and a
                  provider is made directly with that provider. Please satisfy yourself about each
                  provider before proceeding.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">Changes</h2>
                <p className="mt-3">
                  These terms may be updated from time to time. Using the website after an update means
                  you accept the current version.
                </p>
              </div>
            </article>
          </Reveal>
        </section>
    </main>
  );
}
