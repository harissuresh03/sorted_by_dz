'use client';

import Link from 'next/link';
import { motion, useScroll, useSpring } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  ListChecks,
  MousePointerClick,
  Send,
  Search,
  ClipboardList,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/reveal';

const steps: { title: string; tagline: string; icon: LucideIcon; body: string }[] = [
  {
    title: 'Choose',
    tagline: 'Tell DZ your goal',
    icon: ListChecks,
    body: 'Start with a category, or simply describe what you need in your own words. No complicated forms or confusing jargon.',
  },
  {
    title: 'Select',
    tagline: 'Pick your match',
    icon: MousePointerClick,
    body: 'Add the exact service that feels closest to your request, or let us know if you need something bespoke.',
  },
  {
    title: 'Submit',
    tagline: 'Quick & direct',
    icon: Send,
    body: 'Send DZ your details by email or WhatsApp — whichever is easiest and fastest for your schedule.',
  },
  {
    title: 'Source',
    tagline: 'Curated connections',
    icon: Search,
    body: 'DZ considers the right provider fit for your specific request based on reliability, quality, and location.',
  },
  {
    title: 'Options',
    tagline: 'Transparent comparison',
    icon: ClipboardList,
    body: 'You receive suitable provider options to look through, evaluate, and compare without pressure.',
  },
  {
    title: 'Confirm',
    tagline: 'Job sorted',
    icon: CheckCircle2,
    body: 'Choose what works best for you, then take it from there directly with your selected provider.',
  },
];

function StepCard({
  step,
  i,
  align,
}: {
  step: (typeof steps)[0];
  i: number;
  align: 'left' | 'right';
}) {
  const Icon = step.icon;
  return (
    <div
      className={`rounded-2xl border-2 border-teal/20 bg-white p-9 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-xl dark:border-teal/30 dark:bg-[#121c33] dark:hover:border-mint ${
        align === 'left' ? 'text-right' : 'text-left'
      }`}
    >
      {/* Icon + tagline row */}
      <div
        className={`mb-4 flex items-center gap-3 ${
          align === 'left' ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-teal/20 bg-teal/10 text-teal dark:border-mint/30 dark:bg-mint/15 dark:text-mint">
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal dark:text-mint">
          {step.tagline}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-navy dark:text-white">{step.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-navy/80 dark:text-white/80">{step.body}</p>
    </div>
  );
}

export function HowItWorksCards() {
  const desktopTimelineRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const desktopNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [desktopLineBounds, setDesktopLineBounds] = useState({ top: 0, bottom: 0 });
  const [mobileLineBounds, setMobileLineBounds] = useState({ top: 0, bottom: 0 });
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopTimelineRef,
    offset: ['start 70%', 'end 35%'],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ['start 70%', 'end 35%'],
  });
  const desktopLineProgress = useSpring(desktopProgress, { stiffness: 100, damping: 30 });
  const mobileLineProgress = useSpring(mobileProgress, { stiffness: 100, damping: 30 });

  useLayoutEffect(() => {
    const measureLine = (
      timeline: HTMLDivElement | null,
      nodes: (HTMLDivElement | null)[],
      setBounds: (bounds: { top: number; bottom: number }) => void,
    ) => {
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (!timeline || !firstNode || !lastNode) return;

      const timelineRect = timeline.getBoundingClientRect();
      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      const top = firstRect.top + firstRect.height / 2 - timelineRect.top;
      const lastCenter = lastRect.top + lastRect.height / 2 - timelineRect.top;

      setBounds({ top, bottom: Math.max(0, timelineRect.height - lastCenter) });
    };

    const measureAllLines = () => {
      measureLine(desktopTimelineRef.current, desktopNodesRef.current, setDesktopLineBounds);
      measureLine(mobileTimelineRef.current, mobileNodesRef.current, setMobileLineBounds);
    };

    measureAllLines();
    window.addEventListener('resize', measureAllLines);
    return () => window.removeEventListener('resize', measureAllLines);
  }, []);

  return (
    <section id="how-it-works" className="scroll-mt-24 px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Reveal>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
              A quick guide
            </p>
            <h2 className="display mt-3 max-w-2xl text-4xl font-bold leading-tight text-navy dark:text-white md:text-5xl">
              How Sorted by DZ works.
            </h2>
            <p className="mt-4 max-w-xl text-lg font-medium text-navy/80 dark:text-white/90">
              Six simple steps, from telling DZ what you need to confirming the provider you like.
            </p>
          </div>
        </Reveal>

        {/* ── Desktop: alternating zigzag timeline ── */}
        <div ref={desktopTimelineRef} className="relative mt-16 hidden md:block">
          {/* Static track and scroll-driven progress line */}
          <div
            className="absolute left-1/2 w-1 -translate-x-1/2 bg-teal/15 dark:bg-mint/15"
            style={{ top: desktopLineBounds.top, bottom: desktopLineBounds.bottom }}
          />
          <motion.div
            className="absolute left-1/2 w-1.5 origin-top -translate-x-1/2 bg-teal/60 dark:bg-mint/60"
            style={{ top: desktopLineBounds.top, bottom: desktopLineBounds.bottom, scaleY: desktopLineProgress }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <div key={step.title} className="grid grid-cols-[1fr_96px_1fr] items-center gap-8">
                  {/* Left slot */}
                  <div className="flex justify-end">
                    {!isRight && (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.25 }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                        className="w-full max-w-[500px]"
                      >
                        <StepCard step={step} i={i} align="left" />
                      </motion.div>
                    )}
                  </div>

                  {/* Centre node */}
                  <div className="flex justify-center">
                    <div
                      ref={(node) => {
                        desktopNodesRef.current[i] = node;
                      }}
                      className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-teal font-mono text-sm font-bold text-white shadow-lg shadow-teal/30 dark:bg-mint dark:text-navy dark:shadow-mint/20"
                    >
                      0{i + 1}
                    </div>
                  </div>

                  {/* Right slot */}
                  <div>
                    {isRight && (
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.25 }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                        className="w-full max-w-[500px]"
                      >
                        <StepCard step={step} i={i} align="right" />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: left-aligned vertical timeline ── */}
        <div ref={mobileTimelineRef} className="relative mt-12 md:hidden">
          {/* Static track and scroll-driven progress line */}
          <div
            className="absolute left-5 w-1 -translate-x-1/2 bg-teal/15 dark:bg-mint/15"
            style={{ top: mobileLineBounds.top, bottom: mobileLineBounds.bottom }}
          />
          <motion.div
            className="absolute left-5 w-1.5 origin-top -translate-x-1/2 bg-teal/60 dark:bg-mint/60"
            style={{ top: mobileLineBounds.top, bottom: mobileLineBounds.bottom, scaleY: mobileLineProgress }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex gap-5 pl-1">
                  {/* Circle node */}
                  <div
                    ref={(node) => {
                      mobileNodesRef.current[i] = node;
                    }}
                    className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal font-mono text-xs font-bold text-white shadow-md dark:bg-mint dark:text-navy"
                  >
                    0{i + 1}
                  </div>
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                    className="flex-1 pb-2 pt-1"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <Icon size={14} className="text-teal dark:text-mint" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal dark:text-mint">
                        {step.tagline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy dark:text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy/80 dark:text-white/80">
                      {step.body}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA banner ── */}
        <Reveal>
          <div className="mt-20 flex flex-col items-center gap-4 rounded-2xl border-2 border-teal/20 bg-teal/5 px-8 py-12 text-center dark:border-teal/30 dark:bg-teal/10">
            <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-teal dark:text-mint">
              Ready to get started?
            </p>
            <h3 className="text-3xl font-bold text-navy dark:text-white md:text-4xl">
              Tell DZ what you need.
            </h3>
            <p className="max-w-md text-base font-medium text-navy/75 dark:text-white/80">
              No sign-up, no back-and-forth — just tell us what you&apos;re looking for and we&apos;ll take it from there.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-teal px-8 py-3.5 font-bold text-white shadow-lg shadow-teal/25 transition-all duration-200 hover:scale-105 hover:bg-navy dark:hover:bg-mint dark:hover:text-navy"
            >
              Make a request →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
