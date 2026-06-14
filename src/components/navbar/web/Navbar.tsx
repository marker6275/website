'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getSearchLink } from '@/utils';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { title: 'HOME', link: '/' },
  { title: 'PROJECTS', link: '/projects' },
  { title: 'MUSIC', link: '/music' },
  { title: 'RESUME', link: '/resume' },
];

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleMouseEnter() {
    openTimer.current = setTimeout(() => {
      setShowSearch(true);
    }, 3000);
  }

  function handleMouseLeave() {
    if (!showSearch) {
      if (openTimer.current) {
        clearTimeout(openTimer.current);
      }
      setShowSearch(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const searchLink = getSearchLink(searchQuery);
      if (searchLink) {
        router.push(`${searchLink}`);
      }
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const isActive = (link: string) => {
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
    <div className="sticky top-2 z-50 px-4">
      <div
        className={`flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? 'mt-3 rounded-2xl border border-slate-200/70 bg-white/70 px-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl'
            : 'mt-0 rounded-none border border-transparent bg-slate-50 px-1'
        }`}
      >
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/logo.jpg"
              alt="Mark"
              width={40}
              height={40}
              className={`rounded-full m-3 transition-all duration-300 hover:animate-pulse ${
                scrolled ? 'size-10' : 'size-12'
              }`}
              onClick={() => {
                window.location.href = '/';
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          <AnimatePresence>
            {showSearch && (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  className="focus:outline-none bg-gray-100/50 rounded-md p-2 ml-1"
                  onKeyDown={handleKeyDown}
                  placeholder="How did you find this?"
                  value={searchQuery}
                  onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    setSearchQuery(e.currentTarget.value)
                  }
                />
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <nav
          className="flex items-stretch"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item) => {
            const active = isActive(item.link);
            return (
              <Link
                key={item.link}
                href={item.link}
                onMouseEnter={() => setHovered(item.link)}
                className={`relative flex items-center justify-center px-8 text-lg transition-colors duration-200 ${
                  active || hovered === item.link
                    ? 'text-sky-800'
                    : 'text-slate-500 hover:text-sky-800'
                } ${scrolled ? 'py-4' : 'py-5'}`}
              >
                {/* Active state: plain CSS so it rides the bar's transition
                    without an independent framer animation on navigation. */}
                {active && (
                  <>
                    <span className="absolute inset-1 rounded-xl bg-sky-800/10" />
                    <span className="absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-sky-800" />
                  </>
                )}
                {hovered === item.link && !active && (
                  <motion.span
                    layoutId={`nav-hover-${scrolled}`}
                    className="absolute inset-1 rounded-xl bg-sky-800/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
