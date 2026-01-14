import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading2, Paragraph } from '@/components/ui/typography';

export const About = () => {
  return (
    <Section id="about">
      <Container size="md">
        <Heading2 className="mb-12">
          About Me
        </Heading2>
        <div className="prose prose-lg prose-invert max-w-none">
          <Paragraph className="text-justify">
            I’m a product and data-focused founder who enjoys building and shipping AI-powered products that solve real problems. My journey spans engineering at Zomato to co-founding ventures, with a consistent focus on the intersection of technology, data, and user experience.

          </Paragraph>
          <Paragraph className="mt-6 text-justify">

            I’m driven by creating tangible impact through thoughtful product thinking, data-driven decisions, and scalable systems. Beyond building, I enjoy sharing ideas, mentoring, and exploring emerging technologies with people who are equally curious about what’s next.
          </Paragraph>
        </div>
      </Container>
    </Section>
  );
};