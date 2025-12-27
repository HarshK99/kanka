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
            I&apos;m a full stack developer with a passion for creating meaningful digital experiences.
            My journey started with a curiosity about how things work under the hood, leading me
            to dive deep into web technologies, from frontend frameworks to backend architectures.
          </Paragraph>
          <Paragraph className="mt-6">
            What drives me is the challenge of solving complex problems with elegant solutions.
            I believe in writing clean, maintainable code and staying up-to-date with the latest
            technologies while understanding their fundamentals. Beyond coding, I&apos;m fascinated by
            the philosophy of software design and how it impacts user experience.
          </Paragraph>
          <Paragraph className="mt-6">
            When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open
            source projects, or sharing knowledge with the developer community. I value collaboration,
            continuous learning, and the impact that well-crafted software can have on people&apos;s lives.
          </Paragraph>
        </div>
      </Container>
    </Section>
  );
};