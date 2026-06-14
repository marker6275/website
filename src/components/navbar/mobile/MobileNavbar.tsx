'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { title: 'HOME', link: '/' },
  { title: 'PROJECTS', link: '/projects' },
  { title: 'MUSIC', link: '/music' },
  { title: 'RESUME', link: '/resume' },
];

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const activeItem = navItems.find((item) => isActive(item.link));

  return (
    <div className="top-2 sticky z-50 px-3">
      <div
        className={`px-4 py-5 transition-all duration-300 ease-out ${
          scrolled || isOpen
            ? 'rounded-2xl border border-slate-200/70 bg-white/70 shadow-lg shadow-slate-900/5 backdrop-blur-xl'
            : 'rounded-2xl border border-transparent bg-slate-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="flex items-center w-28 justify-between">
              <Image
                src="/assets/logo.jpg"
                alt="Mark"
                width={32}
                height={32}
                className="rounded-md"
              />
              <h1 className="text-xl">Mark Li</h1>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <AnimatePresence initial={false}>
              {!isOpen && activeItem && (
                <motion.span
                  key={activeItem.link}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="text-xs font-light uppercase tracking-[0.2em] text-slate-400"
                >
                  {activeItem.title}
                </motion.span>
              )}
            </AnimatePresence>

            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              className="text-slate-800 transition-colors hover:text-sky-800 focus:outline-none"
            >
              <svg
                className="size-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  animate={{ d: isOpen ? 'M6 18L18 6' : 'M4 8h16' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  animate={{
                    d: isOpen ? 'M6 6l12 12' : 'M4 16h16',
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="overflow-hidden"
            >
              <ul className="mt-3 flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const active = isActive(item.link);
                  return (
                    <motion.li
                      key={item.link}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                    >
                      <Link
                        href={item.link}
                        onClick={toggleMenu}
                        className={`relative flex items-center justify-center rounded-xl py-2 transition-colors duration-200 ${
                          active
                            ? 'text-sky-800'
                            : 'text-slate-500 hover:text-sky-800'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mobile-nav-highlight"
                            className="absolute inset-0 rounded-xl bg-sky-800/10"
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 32,
                            }}
                          />
                        )}
                        <span className="relative z-10">{item.title}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
