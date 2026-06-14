import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Heading1, Lead } from '@/components/ui/typography';
import { TypewriterSubtitle } from '@/components/ui/typewriter-subtitle';
import { LogoStrip } from '@/components/ui/logo-strip';

export const Hero = () => {
  return (
    <section id="about" className="flex min-h-screen items-center px-6 pb-10">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">

          {/* Text — 60% */}
          <div className="w-full md:w-[60%] text-center md:text-left">
            <Heading1 className="mb-6">
              Harsh Kankaria
            </Heading1>
            <TypewriterSubtitle />
            <Lead className="mb-10 md:px-0 px-2">
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

          {/* Image — 40% */}
          <div className="w-full md:w-[40%] flex justify-center md:justify-end">
            <img
              src="/images/hero.png"
              alt="Harsh Kankaria"
              className="w-full max-w-[280px] md:max-w-none md:max-h-[600px] object-cover object-top"
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
