import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading2, Muted } from '@/components/ui/typography';

const clientProjects = [
  {
    title: 'Client Website 1',
    description: 'Professional website built for a client in the healthcare industry.',
    image: '/images/client-1.jpg',
    link: '#',
  },
  {
    title: 'Client Website 2',
    description: 'E-commerce platform developed for a retail client.',
    image: '/images/client-2.jpg',
    link: '#',
  },
  {
    title: 'Client Website 3',
    description: 'Portfolio website created for a creative agency.',
    image: '/images/client-3.jpg',
    link: '#',
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
        <div className="relative">
          <div
            id="client-projects-container"
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            onScroll={handleScroll}
          >
            <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
              {clientProjects.map((project, index) => (
                <div key={project.title} className="group flex-shrink-0 w-80 scroll-snap-align-start">
                  <div className="aspect-video overflow-hidden rounded-lg bg-zinc-800 mb-3">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={320}
                      height={180}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{project.title}</h3>
                  <Muted className="mb-3 text-sm">{project.description}</Muted>
                  <Link
                    href={project.link}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    View Site →
                  </Link>
                </div>
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
      </Container>
    </Section>
  );
};