import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading3, Muted } from '@/components/ui/typography';

interface ProjectCardProps {
  title: string;
  problem: string;
  description: string;
  image: string;
  link?: string;
}

export const ProjectCard = ({
  title,
  problem,
  description,
  image,
  link = '#',
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden bg-zinc-800">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Heading3 className="mb-2">{title}</Heading3>
          <Muted className="mb-3 text-sm italic">{problem}</Muted>
          <Muted className="mb-4">{description}</Muted>
          <span className="text-sm font-medium text-white group-hover:text-zinc-300 transition-colors">
            View Project →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};