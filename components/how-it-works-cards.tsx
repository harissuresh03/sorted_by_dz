'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ListChecks,
  MousePointerClick,
  Send,
  Search,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Reveal } from '@/components/reveal';

const steps = [
  {
    title: 'Choose',
    icon: ListChecks,
    body: 'Start with a category, or simply describe what you need in your own words.',
  },
  {
    title: 'Select',
    icon: MousePointerClick,
    body: 'Add the exact service that feels closest to your request.',
  },
  {
    title: 'Submit',
    icon: Send,
    body: 'Send DZ your details by email or WhatsApp — whichever is easier for you.',
  },
  {
    title: 'Source',
    icon: Search,
    body: 'DZ considers the right provider fit for your specific request.',
  },
  {
    title: 'Options',
    icon: ClipboardList,
    body: 'You receive suitable provider options to look through and compare.',
  },
  {
    title: 'Confirm',
    icon: CheckCircle2,
    body: 'Choose what works for you, then take it from there directly with the provider.',
  },
];

export function HowItWorksCards() {
  // Pins this entire block (heading + card viewport) so the heading stays
  // visible for the whole duration of the horizontal scroll.
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ctx: any;
    let cancelled = false;

    (async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !pinRef.current || !viewportRef.current || !trackRef.current) return;

      ctx = gsap.context(() => {
        const track = trackRef.current!;
        const viewport = viewportRef.current!;
        const scrollAmount = () => Math.max(track.scrollWidth - viewport.offsetWidth, 0);

        gsap.to(track, {
          x: () => -scrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${scrollAmount()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, pinRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert?.();
    };
  }, []);

  return (
    <div id="how-it-works" ref={pinRef} className="scroll-mt-24 px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-teal">A quick guide</p>
          <h2 className="display mt-4 max-w-2xl text-5xl font-bold leading-tight text-navy">
            How Sorted by DZ works.
          </h2>
          <p className="mt-5 max-w-xl text-slate-600">
            Six simple steps, from telling DZ what you need to confirming the provider you like. Keep
            scrolling to move through the guide.
          </p>
        </Reveal>

        <div ref={viewportRef} className="relative mt-14 overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-6 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex w-[82vw] shrink-0 flex-col justify-between rounded-lg border border-teal/15 bg-white p-8 shadow-sm sm:w-[420px] md:w-[520px] md:p-10"
                >
                  <div>
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-teal/25 bg-[#eff8f7] text-teal">
                      <Icon size={24} strokeWidth={2} />
                    </span>
                    <p className="mt-8 font-mono text-xs uppercase tracking-widest text-teal">
                      Step 0{i + 1}
                    </p>
                    <b className="mt-2 block text-3xl text-navy">{step.title}</b>
                    <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-widest text-teal">
          Scroll to continue
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ArrowRight size={16} />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
