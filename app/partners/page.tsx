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
    <main className="grid-bg min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">
              For service providers
            </p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy md:text-7xl">
              Bring good work
              <br />
              into view.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              If you offer a service and would like to be considered for future customer requests, tell
              DZ about your work. Sorted by DZ does not guarantee bookings — it helps put good, reliable
              providers in front of the right requests.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="h-full rounded-lg border border-teal/15 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-teal/25 bg-[#eff8f7] font-mono text-xs text-teal">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 text-base font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <PartnersForm />
          </Reveal>
        </section>
    </main>
  );
}
