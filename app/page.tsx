import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/button';
import { HowItWorksCards } from '@/components/how-it-works-cards';
import { getFeaturedServices } from '@/lib/data';

export default function Home() {
  const featured = getFeaturedServices();

  return (
    <main className="grid-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">
              A better way to find help · sorted by <strong>DZ</strong>
            </p>
            <h1 className="display mt-5 text-6xl font-bold leading-[.9] tracking-tight text-navy md:text-8xl">
              Need it?
              <br />
              <i className="text-teal">DZ gets it</i>
              <br />
              sorted.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-slate-600">
              Tell DZ what you need. We help connect you with suitable service providers, without the
              endless searching.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact">Tell DZ what you need →</Button>
              <Button href="/services" variant="secondary">
                Explore services
              </Button>
            </div>
          </div>
          <div className="relative aspect-square max-h-[490px]">
            <div className="absolute inset-[12%] rounded-full border border-teal/30 shadow-[0_0_0_55px_rgba(45,212,191,.06),0_0_0_110px_rgba(45,212,191,.04)]" />
            <div className="absolute left-[42%] top-[43%] h-8 w-8 rounded-full bg-mint shadow-[0_0_35px_10px_rgba(45,212,191,.5)]" />
            {Array.from({ length: 13 }, (_, i) => (
              <span
                key={i}
                className="absolute h-3 w-3 rounded-full border border-teal bg-white"
                style={{ left: `${10 + (i * 31) % 82}%`, top: `${12 + (i * 47) % 76}%` }}
              />
            ))}
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 500 500">
              <path d="M70 90 255 220 400 95 415 365 135 390 255 220" fill="none" stroke="#0f766e" />
            </svg>
          </div>
        </div>
      </section>

      {/* How it works — guide (header + horizontal card scroll, self-contained) */}
      <HowItWorksCards />

      {/* Featured services */}
      <section className="px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">
                  A place to start
                </p>
                <h2 className="display mt-4 max-w-2xl text-5xl font-bold leading-tight text-navy">
                  Featured services
                </h2>
              </div>
              <Button href="/services" variant="secondary">
                Explore services →
              </Button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60}>
                <Link
                  href={`/contact?category=${service.categorySlug}&service=${service.slug}`}
                  className="group flex h-full flex-col justify-between rounded-lg border border-teal/15 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-xl"
                >
                  <div>
                    <p className="font-mono text-xs text-teal">0{i + 1}</p>
                    <p className="mt-6 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      {service.categoryName}
                    </p>
                    <p className="mt-2 text-2xl font-bold leading-tight text-navy">{service.name}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-teal">
                    Request this service
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
