'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PartyPopper,
  Music,
  Megaphone,
  Home,
  Car,
  GraduationCap,
  Plane,
  type LucideIcon,
} from 'lucide-react';
import { categories } from '@/lib/data';

const icons: Record<string, LucideIcon> = {
  'events-and-weddings': PartyPopper,
  nightlife: Music,
  'marketing-and-digital': Megaphone,
  'home-and-moving': Home,
  automotive: Car,
  'personal-and-learning': GraduationCap,
  travel: Plane,
};

export function ServiceExplorer() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category, index) => {
        const expanded = open === category.slug;
        const Icon = icons[category.slug];
        return (
          <article
            key={category.slug}
            className={`overflow-hidden rounded-lg border bg-white transition-all duration-300 ${
              expanded
                ? 'border-teal shadow-xl'
                : 'border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg'
            }`}
          >
            <button
              onClick={() => setOpen(expanded ? null : category.slug)}
              className="flex w-full items-start justify-between gap-4 p-6 text-left"
              aria-expanded={expanded}
            >
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-teal/25 bg-[#eff8f7] text-teal">
                  {Icon && <Icon size={20} strokeWidth={2} />}
                </span>
                <span>
                  <small className="font-mono text-[10px] tracking-widest text-teal">
                    0{index + 1}
                  </small>
                  <strong className="mt-1 block text-xl text-navy">{category.name}</strong>
                  <span className="mt-2 block max-w-md text-sm text-slate-500">{category.desc}</span>
                  <span className="mt-2 block text-xs font-bold uppercase tracking-wide text-teal">
                    {category.items.length} services
                  </span>
                </span>
              </div>
              <motion.span
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/25 text-lg text-teal"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-100 bg-slate-50/70 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Choose a service
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {category.items.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/contact?category=${category.slug}&service=${service.slug}`}
                          className="rounded border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy transition-colors duration-300 hover:border-teal hover:text-teal"
                        >
                          {service.name} <span className="float-right text-teal">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
