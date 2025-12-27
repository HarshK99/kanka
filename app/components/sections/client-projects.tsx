'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading2, Muted } from '@/components/ui/typography';

const clientProjects = [
  {
    title: 'Flywall',
    description: 'Flywall by North East Fiber supplies high-quality uPVC profiles.',
    image: '/images/flywall.png',
    link: 'https://flywall.in/',
  },
  {
    title: 'JNC Group',
    description: 'News and Books Publishers dealing in educational and career related books',
    image: '/images/jncnews.png',
    link: 'https://jncnews.in/',
  },
  {
    title: 'JBE Compressors',
    description: 'Leading dealers in compressor spares and services.',
    image: '/images/compressors.png',
    link: 'https://compressorspares.co/',
  },
];

export const ClientProjects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSlide = (index: number) => {
    const container = document.getElementById('client-projects-container');
    if (container) {
      const cardWidth = 336; // w-80 = 320px + gap 16px = 336px
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const handleScroll = () => {
    const container = document.getElementById('client-projects-container');
    if (container) {
      const cardWidth = 336;
      const scrollLeft = container.scrollLeft;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    }
  };

  return (
    <Section id="client-projects">
      <Container size="lg">
        <Heading2 className="mb-8 text-center">
          Client Work
        </Heading2>
        {clientProjects.length <= 3 ? (
          <div className="flex justify-around gap-4">
            {clientProjects.map((project, index) => (
              <Link
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-80 block"
              >
                <div className="aspect-video overflow-hidden rounded-lg bg-zinc-800 mb-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-zinc-300 transition-colors">{project.title}</h3>
                <Muted className="mb-3 text-sm">{project.description}</Muted>
                <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  View Site →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div
              id="client-projects-container"
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              onScroll={handleScroll}
            >
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {clientProjects.map((project, index) => (
                  <Link
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-shrink-0 w-80 scroll-snap-align-start block"
                  >
                    <div className="aspect-video overflow-hidden rounded-lg bg-zinc-800 mb-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-zinc-300 transition-colors">{project.title}</h3>
                    <Muted className="mb-3 text-sm">{project.description}</Muted>
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                      View Site →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {clientProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-zinc-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};