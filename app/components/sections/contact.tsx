import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Heading2, Muted } from '@/components/ui/typography';

export const Contact = () => {
  return (
    <Section id="contact">
      <Container size="sm" className="text-center">
        <Heading2 className="mb-8">
          Let&apos;s Connect
        </Heading2>
        <Muted className="mb-12">
          I&apos;m always interested in new opportunities and collaborations.
          Whether you have a project in mind or just want to chat about technology,
          feel free to reach out.
        </Muted>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="mailto:harshkankaria9@gmail.com" size="lg">
            Send Email
          </Button>
          <Button href="https://linkedin.com/in/harshkankaria9" variant="secondary" size="lg">
            LinkedIn
          </Button>
          <Button href="https://github.com/HarshK99" variant="secondary" size="lg">
            GitHub
          </Button>
        </div>
      </Container>
    </Section>
  );
};