import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Heading1, Lead } from '@/components/ui/typography';

export const Hero = () => {
  return (
    <section id="hero" className="flex min-h-screen items-center justify-center px-6 py-20">
      <Container size="lg" className="text-center">
        <Heading1 className="mb-6">
          Harsh Kankaria
        </Heading1>
        <p className="mb-6 text-xl text-zinc-400 sm:text-2xl">
          Co-founder | Ex-Zomato | IIT Delhi
        </p>
        <Lead className="mb-10">
          Building AI-powered products that solve real problems. Passionate about leveraging data-driven insights
          to create scalable solutions that make a meaningful impact.
        </Lead>
        <div className="flex items-center justify-center gap-x-6">
          <Button href="#projects" size="md">
            View My Work
          </Button>
          <Button href="#contact" variant="ghost" size="lg">
            Get In Touch <span aria-hidden="true">→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
};