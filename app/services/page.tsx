import { Reveal } from '@/components/reveal';
import { ServiceExplorer } from '@/components/service-explorer';

export default function Services() {
  return (
    <main className="min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">
              The service directory
            </p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy md:text-7xl">
              What can we help
              <br />
              you sort?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Start with the kind of help you need, then choose the exact service when you are ready. If
              your request isn&rsquo;t listed, that&rsquo;s okay too — reach out and DZ will help figure
              out the right fit.
            </p>
          </Reveal>
          <ServiceExplorer />
        </section>
    </main>
  );
}
