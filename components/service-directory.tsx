'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { categories } from '@/lib/data';
import { useLanguage } from '@/components/language-provider';

export default function ServiceDirectory() {
  const { t } = useLanguage();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [hoveredExploreSlug, setHoveredExploreSlug] = useState<string | null>(null);
  const expandedCardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!expandedSlug) return;

    const frame = window.requestAnimationFrame(() => {
      expandedCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [expandedSlug]);

  return (
    <div className="mt-14 grid items-start gap-6">
      {categories.map((category) => {
        const isExpanded = expandedSlug === category.slug;

        const toggleCategory = () => {
          setExpandedSlug(isExpanded ? null : category.slug);
        };

        return (
        <article
          key={category.slug}
          ref={isExpanded ? expandedCardRef : undefined}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          onClick={toggleCategory}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleCategory();
            }
          }}
          className="group grid overflow-hidden rounded-[24px] border border-teal/20 bg-white/80 shadow-[0_18px_50px_rgba(11,19,43,0.08)] transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[minmax(250px,36%)_1fr] dark:border-teal/30 dark:bg-[#101b30]/90"
        >
          <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
            <Image
              src={category.imageUrl}
              alt={t(category.name, true)}
              fill
              sizes="(min-width: 768px) 36vw, 100vw"
              className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-110 group-hover:blur-[2px]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/45 to-transparent px-6 pb-6 pt-16 md:px-8 md:pb-8">
              <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                {t(category.name, true)}
              </h2>
            </div>
          </div>

          <div className="flex min-h-[260px] flex-col p-6 md:p-8">
            <p className="mt-3 max-w-md text-base leading-7 text-navy/70 dark:text-white/75">
              {t(category.desc, true)}
            </p>
            <div className="mt-auto flex justify-end pt-5">
              <span
                className="inline-flex items-center gap-2 text-sm font-bold text-teal transition-colors hover:text-navy dark:text-mint dark:hover:text-white"
                onMouseEnter={() => setHoveredExploreSlug(category.slug)}
                onMouseLeave={() => setHoveredExploreSlug(null)}
              >
                {t('Explore category')}
                <motion.span
                  animate={
                    hoveredExploreSlug === category.slug
                      ? { x: [0, 3, -2, 3, 0], rotate: [0, 8, -8, 8, 0] }
                      : { x: 0, rotate: 0 }
                  }
                  transition={{ duration: 0.45 }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </motion.span>
              </span>
            </div>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="mt-6 rounded-2xl border border-teal/15 bg-[#eff8f7] p-5 pt-5 dark:border-teal/25 dark:bg-[#16273b]">
                  <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.16em] text-teal dark:text-mint">
                    {t('Choose a service')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/contact?category=${category.slug}&service=${service.slug}`}
                        onClick={(event) => event.stopPropagation()}
                        className="rounded-full border border-teal/25 px-3 py-2 text-sm font-bold text-navy transition-colors hover:border-teal hover:bg-teal hover:text-white dark:border-teal/40 dark:text-white dark:hover:border-mint dark:hover:bg-teal"
                      >
                        {t(service.name, true)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        );
      })}
    </div>
  );
}
