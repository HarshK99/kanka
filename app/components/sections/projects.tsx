import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Heading2 } from '@/components/ui/typography';
import { ProjectCard } from './project-card';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
    image: 'https://via.placeholder.com/600x400/333/fff?text=Project+1',
    technologies: ['Next.js', 'TypeScript', 'Stripe'],
    link: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://via.placeholder.com/600x400/333/fff?text=Project+2',
    technologies: ['React', 'Node.js', 'Socket.io'],
    link: '#',
  },
  {
    title: 'AI-Powered Chatbot',
    description: 'An intelligent chatbot built with OpenAI\'s API, featuring natural language processing and integration with various platforms.',
    image: 'https://via.placeholder.com/600x400/333/fff?text=Project+3',
    technologies: ['Python', 'FastAPI', 'OpenAI'],
    link: '#',
  },
];

export const Projects = () => {
  return (
    <Section id="projects" background="muted">
      <Container size="lg">
        <Heading2 className="mb-16 text-center">
          Featured Projects
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