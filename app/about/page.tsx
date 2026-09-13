import Image from 'next/image';
import { Reveal } from '@/components/reveal';
import Button from '@/components/button';

const values = [
  {
    title: 'One point of contact',
    body: 'Start with one clear conversation instead of a dozen open tabs and unanswered messages.',
  },
  {
    title: 'Built around your need',
    body: 'Choose from our service areas, or make a request that is entirely your own.',
  },
  {
    title: 'Considered connections',
    body: 'DZ helps bring your request and suitable provider options closer together.',
  },
];

export default function About() {
  return (
    <main>
      {/* Intro */}
      <section className="px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
              The thought behind DZ
            </p>
            <h1 className="display mt-5 text-6xl font-bold leading-[.95] tracking-tight text-navy dark:text-white md:text-7xl">
              Less searching.
              <br />
              <i className="text-teal dark:text-mint">More getting on with it.</i>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-navy/85 dark:text-white/90">
              Sorted by DZ is a simple place to begin when you need a service and do not want the
              search to become another task on your list.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-teal/20 shadow-md">
              <Image
                src="https://picsum.photos/seed/sorted-dz-about-1/900/700"
                alt="Placeholder — to be replaced with a real photo"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2 md:items-center">
          <Reveal className="order-2 md:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-teal/20 shadow-md">
              <Image
                src="https://picsum.photos/seed/sorted-dz-about-2/900/700"
                alt="Placeholder — to be replaced with a real photo"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2" delay={120}>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">Our story</p>
            <h2 className="display mt-4 text-4xl font-bold leading-tight text-navy dark:text-white">
              Started with one simple idea.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-navy/85 dark:text-white/90">
              We listen to what you need, then help make a suitable connection. The idea is
              intentionally straightforward: many services, one convenient point of contact.
            </p>
            <p className="mt-4 max-w-md text-base leading-7 text-navy/85 dark:text-white/90">
              Sorted by DZ does not provide every service directly — we help make introductions
              between customer needs and independent service providers, and stay close to the request
              until it finds the right fit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">Why Sorted by DZ</p>
            <h2 className="display mt-4 max-w-2xl text-4xl font-bold leading-tight text-navy dark:text-white">
              Because finding help should feel lighter.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-2xl border-2 border-teal/20 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal hover:shadow-xl dark:border-teal/30 dark:bg-[#121c33] dark:hover:border-mint">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-teal/30 bg-teal/10 font-mono text-xs font-bold text-teal dark:border-mint/30 dark:bg-mint/15 dark:text-mint">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-navy/85 dark:text-white/90">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">A look around</p>
            <h2 className="display mt-4 max-w-2xl text-4xl font-bold leading-tight text-navy dark:text-white">
              Placeholder gallery
            </h2>
            <p className="mt-4 max-w-xl text-navy/85 dark:text-white/90">
              These images are placeholders and will be swapped for real photos of DZ and the work
              behind the scenes.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[3, 4, 5, 6].map((seed, i) => (
              <Reveal key={seed} delay={i * 70}>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-teal/20 shadow-sm">
                  <Image
                    src={`https://picsum.photos/seed/sorted-dz-about-${seed}/500/500`}
                    alt="Placeholder — to be replaced with a real photo"
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 md:px-10">
        <Reveal>
          <div className="mx-auto max-w-7xl rounded-3xl border-2 border-teal/25 bg-[#eff8f7] px-8 py-16 text-center shadow-lg dark:border-mint/30 dark:bg-[#121c33] md:px-16">
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
              Start the conversation
            </p>
            <h2 className="display mt-4 text-4xl font-bold text-navy dark:text-white md:text-5xl">
              Tell DZ what you need.
            </h2>
            <Button href="/contact" className="mt-8">
              Make a request ↗
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
