import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading2 } from '@/components/ui/typography';
import { ProjectCard } from './project-card';

const projects = [
  {
    title: 'AccountX',
    problem: 'Digital marketing firms struggle with complex accounting workflows and client billing.',
    description: 'Accounting web app designed specifically for digital marketing firms to streamline financial operations and client management.',
    image: '/images/accountx.png',
    link: 'https://accountx.paperthoughts.in/',
  },
  
  {
    title: 'Wave Link',
    problem: 'Small and medium enterprises lack professional online presence and struggle with digital marketing.',
    description: 'Comprehensive digital presence solution for SMEs including websites, social media management, and marketing tools.',
    image: '/images/wavelink.png',
    link: 'https://wavelink.co.in/',
  },
  {
    title: 'Toastmasters Voting Platform',
    problem: 'Manual voting and evaluation processes in Toastmasters meetings are time-consuming and error-prone.',
    description: 'Digital voting platform for Toastmasters clubs to conduct evaluations and voting seamlessly during meetings.',
    image: '/images/toastmasters.png',
    link: 'https://toastmasters-poster.vercel.app/voting/admin/dashboard',
  },
  {
    title: 'Whisp',
    problem: 'Book lovers struggle to organize and retain key insights from their reading.',
    description: 'AI-powered note-taking app for books that helps users capture, organize, and retrieve key insights from their reading.',
    image: '/images/whisp.png',
    link: 'https://whisp-sand.vercel.app/',
  },
  {
    title: 'Mannat - Coming Soon',
    problem: 'People want a meaningful way to express wishes and connect with positive intentions.',
    description: 'A platform where users can throw their wishes to the universe and receive blessings from the community.',
    image: '/images/mannat.png',
    link: '#',
  },
];

export const Projects = () => {
  return (
    <Section id="projects" background="muted">
      <Container size="lg">
        <Heading2 className="mb-16 text-center">
          Personal Projects
        </Heading2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  );
};