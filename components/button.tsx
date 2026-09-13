"use client";
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none cursor-pointer select-none';

const variants: Record<Variant, string> = {
  primary:
    'border-2 border-teal bg-teal text-white px-7 py-3 shadow-md hover:scale-[1.03] hover:border-navy hover:bg-navy hover:text-white hover:shadow-xl active:scale-95 dark:border-teal dark:bg-teal dark:text-white dark:hover:border-mint dark:hover:bg-mint dark:hover:text-navy',
  secondary:
    'border-2 border-navy bg-white text-navy px-7 py-3 shadow-sm hover:scale-[1.03] hover:border-navy hover:bg-navy hover:text-white hover:shadow-lg active:scale-95 dark:border-mint dark:bg-[#121c33] dark:text-white dark:hover:border-mint dark:hover:bg-mint dark:hover:text-navy',
  ghost:
    'text-navy px-4 py-2 rounded-full hover:bg-teal/15 hover:text-teal dark:text-mint dark:hover:bg-mint/20 dark:hover:text-mint',
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; disabled?: never };

type ElementButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function Button(props: LinkButtonProps | ElementButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ('href' in rest && (rest as any).href) {
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

export default Button;