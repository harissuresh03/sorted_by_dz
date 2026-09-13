'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/#how-it-works', label: 'How it works' },
  // { href: '/services', label: 'Services' }, // removed from nav
  { href: '/partners', label: 'Partner with us' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [howItWorksInView, setHowItWorksInView] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleHowItWorksClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (pathname !== '/') return;

    const section = document.getElementById('how-it-works');
    if (!section) return;

    event.preventDefault();
    window.history.pushState(null, '', '/#how-it-works');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header
      className={`sticky top-0 z-50 border-b px-5 transition-colors duration-300 md:px-10 ${
        isScrolled
          ? 'border-white/25 bg-white/35 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0b132b]/35'
          : 'border-teal/15 bg-paper dark:border-teal/30 dark:bg-[#0b132b]'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-1 text-2xl font-extrabold tracking-tight text-navy dark:text-white md:text-3xl"
        >
          <span>
            S<span className="display text-teal dark:text-mint">orted</span>
          </span>
          <small className="font-mono text-[9px] uppercase tracking-widest text-teal dark:text-mint">by</small>
          <strong className="display -ml-0.5 text-3xl leading-none text-teal dark:text-mint md:text-4xl">DZ</strong>
        </Link>

        <nav className="hidden gap-8 text-sm font-bold text-navy dark:text-white md:flex">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={href === '/#how-it-works' ? handleHowItWorksClick : undefined}
                className={`group relative pb-1 transition-colors duration-300 ${
                  active ? 'text-teal dark:text-mint' : 'hover:text-teal dark:hover:text-mint'
                }`}
              >
                {label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-teal dark:bg-mint transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-teal bg-white text-teal shadow-sm transition-all duration-200 hover:scale-105 hover:bg-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 dark:border-mint dark:bg-[#121c33] dark:text-mint dark:hover:bg-mint dark:hover:text-navy"
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            <ThemeIcon size={17} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <Link
            href="/contact"
            className="cursor-pointer rounded-full border-2 border-teal bg-teal px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:border-navy hover:bg-navy active:scale-95 dark:border-teal dark:bg-teal dark:hover:border-mint dark:hover:bg-mint dark:hover:text-navy"
          >
            Make a request →
          </Link>
          <button onClick={() => setOpen(!open)} className="text-xl text-navy dark:text-white md:hidden" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-0 mb-4 grid gap-1 rounded-2xl border-2 border-teal/20 bg-white p-4 shadow-xl dark:border-teal/30 dark:bg-[#121c33] md:hidden">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                onClickCapture={href === '/#how-it-works' ? handleHowItWorksClick : undefined}
                className={`rounded-lg px-3 py-2.5 font-bold transition-colors duration-200 ${
                  active
                    ? 'bg-teal/15 text-teal dark:bg-mint/20 dark:text-mint'
                    : 'text-navy hover:bg-teal/10 hover:text-teal dark:text-white dark:hover:bg-mint/10 dark:hover:text-mint'
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
