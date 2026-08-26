'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/services', label: 'Services' },
  { href: '/partners', label: 'Partner with us' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [howItWorksInView, setHowItWorksInView] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      setHowItWorksInView(false);
      return;
    }
    const el = document.getElementById('how-it-works');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHowItWorksInView(entry.isIntersecting),
      { rootMargin: '-40% 0px -40% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => (href.startsWith('/#') ? howItWorksInView : pathname === href);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-paper/85 px-5 backdrop-blur md:px-10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-1 text-2xl font-extrabold tracking-tight text-navy md:text-3xl"
        >
          <span>
            S<span className="display text-teal">orted</span>
          </span>
          <small className="font-mono text-[9px] uppercase tracking-widest text-slate-500">by</small>
          <strong className="display -ml-0.5 text-3xl leading-none text-teal md:text-4xl">DZ</strong>
        </Link>

        <nav className="hidden gap-8 text-sm font-bold text-slate-600 md:flex">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`group relative pb-1 transition-colors duration-300 ${
                  active ? 'text-teal' : 'hover:text-teal'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-teal transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal hover:shadow-lg hover:shadow-teal/25 active:translate-y-0 active:shadow-sm"
          >
            Make a request →
          </Link>
          <button onClick={() => setOpen(!open)} className="text-xl md:hidden" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-0 mb-4 grid gap-1 rounded bg-white p-4 shadow-xl md:hidden">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded px-2 py-2 font-bold transition-colors duration-300 ${
                  active ? 'bg-[#eff8f7] text-teal' : 'text-slate-700 hover:text-teal'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
