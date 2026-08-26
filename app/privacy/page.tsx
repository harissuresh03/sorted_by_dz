import { Reveal } from '@/components/reveal';

export default function Privacy() {
  return (
    <main className="grid-bg min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">Legal</p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy md:text-7xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-slate-500">Last updated: August 2026</p>
          </Reveal>

          <Reveal delay={100}>
            <article className="mt-10 space-y-6 text-slate-600">
              <div>
                <h2 className="text-xl font-bold text-navy">How we handle your information</h2>
                <p className="mt-3">
                  Sorted by DZ helps connect customer needs with independent service providers.
                  Information you choose to share through WhatsApp or the enquiry form is used to
                  understand your request and communicate with you.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">Third-party services</h2>
                <p className="mt-3">
                  WhatsApp is a third-party service governed by its own policies. Links to providers may
                  lead to third-party sites outside our control.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">Contact</h2>
                <p className="mt-3">Questions about privacy can be sent to hello@sortedbydz.com.</p>
              </div>
            </article>
          </Reveal>
        </section>
    </main>
  );
}
