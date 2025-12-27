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
          <Paragraph>
            I&apos;m a product and data guy who loves building and shipping products that solve real problems using AI.
            My journey spans from engineering at Zomato to co-founding ventures, always focusing on the intersection
            of technology, data, and user experience.
          </Paragraph>
          <Paragraph className="mt-6">
            What drives me is creating solutions that make a tangible impact. I believe in leveraging data-driven insights
            and AI capabilities to build products that not only work well but solve meaningful problems for users.
            My approach combines technical expertise with product thinking to deliver scalable, user-centric solutions.
          </Paragraph>
          <Paragraph className="mt-6">
            Beyond building products, I&apos;m passionate about sharing knowledge and contributing to the tech community.
            Whether it&apos;s mentoring startups, speaking at events, or exploring emerging AI technologies,
            I&apos;m always excited about the next challenge and the potential to create something transformative.
          </Paragraph>
        </div>
      </Container>
    </Section>
  );
};