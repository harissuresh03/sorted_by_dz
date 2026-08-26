import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white px-6 py-3 shadow-sm hover:bg-teal hover:shadow-lg hover:shadow-teal/25 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
  secondary:
    'border border-slate-300 text-navy px-6 py-3 bg-white/70 hover:border-teal hover:text-teal hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
  ghost: 'text-navy px-1 py-1 hover:text-teal underline-offset-4 hover:underline',
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: never };

type ElementButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkButtonProps | ElementButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ('href' in rest && rest.href) {
    const { href, ...anchorProps } = rest as LinkButtonProps;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
