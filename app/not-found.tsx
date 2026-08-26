import { Button } from '@/components/button';

export default function NotFound() {
  return (
    <main className="grid-bg flex min-h-[72vh] items-center px-5 py-24 md:px-10">
      <section className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">404</p>
        <h1 className="display mt-5 text-5xl font-bold leading-tight text-navy md:text-6xl">
          This page isn&rsquo;t sorted yet.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Try heading back home, or explore what
          we can help with.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            Explore services
          </Button>
        </div>
      </section>
    </main>
  );
}
