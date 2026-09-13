'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Music,
  Megaphone,
  Home,
  type LucideIcon,
} from 'lucide-react';
import { categories } from '@/lib/data';

const icons: Record<string, LucideIcon> = {
  nightlife: Music,
  'marketing-and-digital': Megaphone,
  'home-and-moving': Home,
};

export function ServiceExplorer() {
  const [open, setOpen] = useState<string | null>(categories[0]?.slug ?? null);

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category, index) => {
        const expanded = open === category.slug;
        const Icon = icons[category.slug];
        return (
          <article
            key={category.slug}
            className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
              expanded
                ? 'border-teal bg-white shadow-xl dark:border-mint dark:bg-[#121c33]'
                : 'border-teal/20 bg-white shadow-md hover:-translate-y-1 hover:border-teal hover:shadow-lg dark:border-teal/30 dark:bg-[#121c33] dark:hover:border-mint'
            }`}
          >
            <button
              onClick={() => setOpen(expanded ? null : category.slug)}
              className="flex w-full cursor-pointer items-start justify-between gap-4 p-6 text-left"
              aria-expanded={expanded}
            >
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-teal/30 bg-teal/10 text-teal dark:border-mint/40 dark:bg-mint/15 dark:text-mint">
                  {Icon && <Icon size={22} strokeWidth={2.2} />}
                </span>
                <span>
                  <small className="font-mono text-xs font-bold tracking-widest text-teal dark:text-mint">
                    0{index + 1}
                  </small>
                  <strong className="mt-1 block text-xl font-bold text-navy dark:text-white">{category.name}</strong>
                  <span className="mt-2 block max-w-md text-sm font-medium text-navy/80 dark:text-white/85">{category.desc}</span>
                  <span className="mt-3 inline-block rounded-full bg-teal/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-teal dark:bg-mint/15 dark:text-mint">
                    {category.items.length} services available
                  </span>
                </span>
              </div>
              <motion.span
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-teal bg-teal/10 text-xl font-bold text-teal dark:border-mint dark:bg-mint/15 dark:text-mint"
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
                  <div className="border-t-2 border-teal/15 bg-teal/5 p-5 dark:border-teal/30 dark:bg-[#0d1627]">
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-teal dark:text-mint">
                      Choose a service below:
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {category.items.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/contact?category=${category.slug}&service=${service.slug}`}
                          className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-teal/30 bg-white px-4 py-3.5 text-sm font-bold text-navy shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-navy hover:bg-navy hover:text-white hover:shadow-md dark:border-teal/40 dark:bg-[#16273b] dark:text-white dark:hover:border-mint dark:hover:bg-teal dark:hover:text-white"
                        >
                          <span>{service.name}</span>
                          <span className="text-teal font-bold text-base transition-transform group-hover:translate-x-1 dark:text-mint">→</span>
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
