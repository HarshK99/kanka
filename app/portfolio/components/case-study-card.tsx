import { Heading3, Paragraph } from '@/components/ui/typography';
import { BulletList } from './bullet-list';
import { TagList } from './tag-list';

export interface CaseStudyData {
  tag: string;
  title: string;
  problem: string;
  approach: string;
  impact: string[];
  tags: string[];
}

function ColSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</p>
      {children}
    </div>
  );
}

export function CaseStudyCard({ tag, title, problem, approach, impact, tags }: CaseStudyData) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/60 p-8 md:p-10">
      <span className="mb-4 inline-block text-xs uppercase tracking-widest text-zinc-500">{tag}</span>
      <Heading3 className="mb-6 text-2xl font-bold text-white">{title}</Heading3>
      <div className="grid gap-8 md:grid-cols-3">
        <ColSection label="Problem">
          <Paragraph className="text-sm leading-7 text-zinc-300">{problem}</Paragraph>
        </ColSection>
        <ColSection label="Approach">
          <Paragraph className="text-sm leading-7 text-zinc-300">{approach}</Paragraph>
        </ColSection>
        <ColSection label="Impact">
          <BulletList items={impact} dotColor="bg-white" />
        </ColSection>
      </div>
      <TagList tags={tags} variant="secondary" className="mt-6" />
    </div>
  );
}
