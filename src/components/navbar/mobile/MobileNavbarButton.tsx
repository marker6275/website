'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MobileNavbarButtonProps } from '@/types/components';

export function MobileNavbarButton({
  title,
  link,
  toggle,
}: MobileNavbarButtonProps) {
  const pathname = usePathname();

  const isActive = () => {
    if (link === '/') {
      return pathname === '/' || pathname === '';
    }

    const normalizedPathname = pathname.replace(/\/$/, '') || '/';
    const normalizedLink = link.replace(/\/$/, '') || '/';

    return (
      normalizedPathname === normalizedLink ||
      (normalizedPathname.startsWith(normalizedLink + '/') &&
        normalizedLink !== '/')
    );
  };

  return (
    <Link
      href={link}
      onClick={toggle}
      className={`relative flex items-center justify-center py-2 font-light rounded-md transition-all duration-200 ${
        isActive() ? 'bg-sky-500/10' : 'hover:bg-sky-500/5'
      }`}
    >
      <div
        className={`${
          isActive() ? 'text-slate-800' : 'text-slate-800 hover:text-sky-600'
        } w-full text-center`}
      >
        {title}
      </div>
    </Link>
  );
}
