import Image from 'next/image';
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
        <Heading3 className="mb-2">{title}</Heading3>
        <Muted className="mb-3 text-sm italic">{problem}</Muted>
        <Muted className="mb-4">{description}</Muted>
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