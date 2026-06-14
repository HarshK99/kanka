import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Heading1, Lead } from '@/components/ui/typography';
import { TypewriterSubtitle } from '@/components/ui/typewriter-subtitle';
import { LogoStrip } from '@/components/ui/logo-strip';

export const Hero = () => {
  return (
    <section id="about" className="relative flex min-h-screen items-end md:items-center px-6 pb-12 md:pb-10">

      {/* Mobile: full-bleed background image */}
      <img
        src="/images/hero.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
      />
      {/* Mobile: gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent md:hidden" />

      <Container size="lg" className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:gap-16">

          {/* Text */}
          <div className="w-full md:w-[60%] text-center md:text-left">
            <Heading1 className="mb-4 text-3xl sm:text-5xl">
              Harsh Kankaria
            </Heading1>
            <TypewriterSubtitle />
            <Lead className="hidden md:block mb-10">
              Building AI-powered products that solve real problems. Passionate about leveraging data-driven insights
              to create scalable solutions that make a meaningful impact.
            </Lead>
            <div className="flex items-center justify-center md:justify-start gap-x-6">
              <Button href="#projects" size="md" className="py-5">
                View My Work
              </Button>
              <Button href="#contact" variant="ghost" size="lg">
                Get In Touch <span aria-hidden="true">→</span>
              </Button>
            </div>
            <LogoStrip className="md:items-start" />
          </div>

          {/* Desktop-only image column */}
          <div className="hidden md:flex w-full md:w-[40%] justify-end">
            <img
              src="/images/hero.png"
              alt="Harsh Kankaria"
              className="w-full md:max-h-[600px] object-cover object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.15))',
              }}
            />
          </div>

        </div>
      </Container>
    </section>
  );
};
