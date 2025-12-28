'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  // { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100; // Offset for header

      let foundActive = false;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            foundActive = true;
            break;
          }
        }
      }
      
      // If no section is active (e.g., at the top before About), default to About
      if (!foundActive) {
        setActiveSection('about');
      }
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
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};