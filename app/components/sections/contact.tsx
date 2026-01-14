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
         I enjoy connecting with founders, leaders, and technologists to explore ideas, partnerships, and shared learning. If you’re building, thinking, or experimenting in tech and want to exchange perspectives, I’d love to connect.
        </Muted>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="mailto:harshkankaria9@gmail.com" size="lg">
            Send Email
          </Button>
          <Button href="https://linkedin.com/in/harshkankaria9" variant="secondary" size="lg">
            LinkedIn
          </Button>
          <Button href="https://github.com/HarshK99" variant="secondary" size="lg">
            GitHub
          </Button>
          <Button href="https://profile.wavelink.co.in/profile/cf285639-b067-4b81-8486-c9aa499f9d65" size="lg">
            Wave Link Profile
          </Button>
        </div>
      </Container>
    </Section>
  );
};