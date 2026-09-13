import Button from '@/components/button';   // ✅ correct

export default function NotFound() {
  return (
    <main className="flex min-h-[72vh] items-center px-5 py-24 md:px-10">
      <section className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">404</p>
        <h1 className="display mt-5 text-5xl font-bold leading-tight text-navy dark:text-white md:text-6xl">
          This page isn&rsquo;t sorted yet.
        </h1>
        <p className="mt-6 text-lg leading-8 text-navy/85 dark:text-white/90">
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
