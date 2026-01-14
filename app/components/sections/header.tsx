'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  // { name: 'Writing', href: '#writing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Check client-projects first (map to projects nav item)
      const clientProjectsElement = document.getElementById('client-projects');
      if (clientProjectsElement) {
        const { offsetTop, offsetHeight } = clientProjectsElement;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection('projects');
          return;
        }
      }

      // Check main nav sections
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      
      // If no section is active (e.g., at the top before About), default to About
      setActiveSection('about');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80; // Account for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="backdrop-blur-md bg-white/20 border border-white/10 rounded-full px-4 py-3 shadow-lg shadow-black/10">
        <ul className="flex items-center gap-3">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.href.startsWith('#') ? (
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full',
                    activeSection === item.href.substring(1)
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full text-gray-400 hover:text-white hover:bg-white/5"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};