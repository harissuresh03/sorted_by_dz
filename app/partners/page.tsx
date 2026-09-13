import { Reveal } from '@/components/reveal';
import { PartnersForm } from '@/components/partners-form';

const steps = [
  {
    title: 'Introduce your service',
    body: 'Tell DZ what you do, your service area, and anything a customer should know before booking.',
  },
  {
    title: 'DZ gets to know your work',
    body: 'A short conversation helps DZ understand where your service fits best among customer requests.',
  },
  {
    title: 'Considered for future requests',
    body: 'When a request matches what you offer, DZ may reach out with the details so you can respond directly.',
  },
];

export default function Partners() {
  return (
    <main className="min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
              For service providers
            </p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy dark:text-white md:text-7xl">
              Bring good work
              <br />
              into view.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/85 dark:text-white/90">
              If you offer a service and would like to be considered for future customer requests, tell
              DZ about your work. Sorted by DZ does not guarantee bookings — it helps put good, reliable
              providers in front of the right requests.
            </p>
          </Reveal>

          <div className="mt-14 grid items-stretch gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14">
            <div className="grid gap-6 md:h-full md:grid-rows-3">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <div className="h-full rounded-2xl border-2 border-teal/20 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal hover:shadow-xl dark:border-teal/30 dark:bg-[#121c33] dark:hover:border-mint">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-teal/30 bg-teal/10 font-mono text-xs font-bold text-teal dark:border-mint/30 dark:bg-mint/15 dark:text-mint">
                      0{i + 1}
                    </span>
                    <h3 className="mt-5 text-base font-bold text-navy dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-navy/85 dark:text-white/90">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <PartnersForm />
            </Reveal>
          </div>
        </section>
    </main>
  );
}
