import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading2, Muted } from '@/components/ui/typography';

export const Writing = () => {
  return (
    <Section id="writing">
      <Container size="md">
        <Heading2 className="mb-8">
          Writing
        </Heading2>
        <Muted className="text-center">
          Coming soon...
        </Muted>
      </Container>
    </Section>
  );
};