import { Reveal } from '@/components/reveal';
import { RequestForm } from '@/components/request-form';

export default function Contact() {
  return (
    <main className="grid-bg min-h-[72vh] px-5 py-24 md:px-10">
        <section className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">
              Sorted by DZ / contact
            </p>
            <h1 className="display mt-5 max-w-4xl text-5xl font-bold leading-tight text-navy md:text-7xl">
              Let&rsquo;s get it sorted.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Share the details and DZ will receive your enquiry by email. You can also take the same
              details to WhatsApp.
            </p>
          </Reveal>
          <RequestForm />
        </section>
    </main>
  );
}
