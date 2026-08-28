import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { config } from '@/lib/data';

const legalLinks = [
  ['/contact', 'Contact'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
] as const;

const contactItems = [
  { icon: Phone, label: '014-958 9631', href: 'tel:+60149589631' },
  { icon: Mail, label: config.email, href: `mailto:${config.email}` },
  //{ icon: Instagram, label: '@sortedbydz', href: 'https://instagram.com/sortedbydz' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy px-5 py-12 text-slate-300 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Link
            href="/"
            className="display text-2xl text-white transition-colors duration-300 hover:text-mint"
          >
            sorted <span className="text-mint">by dz</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            A personal service-connection platform, matching requests with the right provider across{' '}
            {config.area}.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          {contactItems.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2.5 text-slate-300 transition-colors duration-300 hover:text-mint"
            >
              <Icon size={16} className="text-mint" />
              {label}
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {legalLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-slate-300 transition-colors duration-300 hover:text-mint"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-5 flex max-w-7xl flex-col gap-1 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Sorted by DZ. A personal service-connection platform.</p>
        <p>Service availability depends on location and provider fit.</p>
      </div>
    </footer>
  );
}
