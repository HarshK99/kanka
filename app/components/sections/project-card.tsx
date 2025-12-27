import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heading3, Muted } from '@/components/ui/typography';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

export const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  link = '#',
}: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden bg-zinc-800">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Heading3 className="mb-3">{title}</Heading3>
        <Muted className="mb-4">{description}</Muted>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <Link
          href={link}
          className="text-sm font-medium text-white hover:text-zinc-300 transition-colors"
        >
          View Project →
        </Link>
      </CardContent>
    </Card>
  );
};