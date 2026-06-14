'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { name: 'About', href: '/#about' },
  { name: 'Work', href: '/#projects' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

const SCROLL_OFFSET = 10;

export const Header = () => {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string | null>(null);

  // Smooth scroll on home page when hash changes
  useEffect(() => {
    if (pathname !== '/') return;
    if (!window.location.hash) return;

    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - SCROLL_OFFSET,
      behavior: 'smooth',
    });
  }, [pathname]);

  // Track active section on scroll (home page only)
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = NAV_ITEMS
      .filter(item => item.href.startsWith('/#'))
      .map(item => {
        const id = item.href.replace('/#', '');
        return { id, el: document.getElementById(id) };
      })
      .filter(s => s.el);

    const onScroll = () => {
      const scrollY = window.scrollY + SCROLL_OFFSET;

      for (const { id, el } of sections) {
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
          setActiveHash(id);
          return;
        }
      }

      setActiveHash(null);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-fit">
      <nav
        className="backdrop-blur-[12px] bg-white/5 rounded-full px-3 py-2 sm:px-4 sm:py-3"
        style={{ border: '0.5px solid rgba(255,255,255,0.1)' }}
      >
        <ul className="flex items-center gap-1 sm:gap-3">
          {NAV_ITEMS.map(item => {
            const isSection = item.href.startsWith('/#');
            const sectionId = isSection ? item.href.replace('/#', '') : null;

            const isActive = isSection
              ? pathname === '/' && activeHash === sectionId
              : pathname === item.href;

            const isMobileHidden = item.name === 'Contact';

            return (
              <li key={item.name} className={isMobileHidden ? 'hidden sm:block' : ''}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    'px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm font-medium rounded-full transition-all duration-200',
                    isActive
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
