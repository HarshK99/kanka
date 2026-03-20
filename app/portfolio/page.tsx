import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Heading1, Lead } from '@/components/ui/typography';
import { SectionHeader } from './components/section-header';
import { BulletList } from './components/bullet-list';
import { InfoCard } from './components/info-card';
import { TagList } from './components/tag-list';
import { CaseStudyCard } from './components/case-study-card';
import { ProjectCylinder } from './components/project-cylinder';
import type { CaseStudyData } from './components/case-study-card';
import type { CylinderProject } from './components/project-cylinder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PM Portfolio – Harsh Kankaria',
  description:
    'Product Manager portfolio of Harsh Kankaria. Ex-Zomato, IIT Delhi. Showcasing product thinking, case studies, and impact.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const skills: { category: string; items: string[] }[] = [
  { category: 'Product Strategy', items: ['Roadmap Planning', 'OKR Setting', 'GTM Strategy', 'Competitive Analysis', 'Product Vision'] },
  { category: 'Execution', items: ['Agile / Scrum', 'Sprint Planning', 'PRD Writing', 'Feature Prioritisation', 'Cross-functional Alignment'] },
  { category: 'Analytics & Data', items: ['SQL', 'Funnel Analysis', 'A/B Testing', 'Retention Modelling', 'Mixpanel / Amplitude'] },
  { category: 'User Research', items: ['User Interviews', 'Usability Testing', 'Jobs-to-be-Done', 'Persona Building', 'Empathy Mapping'] },
  { category: 'Tech & Design', items: ['Python', 'Figma', 'REST APIs', 'Machine Learning Basics', 'System Design'] },
  { category: 'Soft Skills', items: ['Stakeholder Management', 'Storytelling', 'Written Communication', 'Leadership', 'Mentoring'] },
];

const experience: {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}[] = [
  {
    role: 'Co-founder & Product Lead',
    company: 'Wave Link',
    period: '2023 – Present',
    description:
      'Built a full-stack digital presence platform for SMEs — from zero to paying customers. Owned the entire product lifecycle: discovery, design, development, launch, and iteration.',
    highlights: [
      'Defined product vision and 12-month roadmap across web, social, and marketing verticals',
      'Shipped 14 client products end-to-end, iterating based on weekly retention reviews',
      'Designed and launched AccountX — an accounting SaaS for digital agencies — reducing billing time by ~60%',
      'Led a cross-functional team of 4 (design, dev, marketing) using Agile sprints',
    ],
    tags: ['Roadmap', 'Agile', 'SaaS', 'B2B', 'Retention'],
  },
  {
    role: 'Product Analyst',
    company: 'Zomato',
    period: '2021 – 2023',
    description:
      "Worked in Zomato's growth org, driving data-informed product decisions across the user acquisition and retention funnel.",
    highlights: [
      'Built and maintained funnel dashboards tracking 10M+ MAU, flagging drop-offs that led to 2 sprint iterations',
      'Collaborated with PMs to scope A/B tests on checkout flow — one experiment improved conversion by 8%',
      'Automated weekly reporting pipelines (SQL + Python), saving ~6 hours/week of manual work',
      'Surfaced cohort insights that directly shaped the loyalty programme redesign (Q3 2022)',
    ],
    tags: ['Growth', 'Analytics', 'A/B Testing', 'SQL', 'Retention'],
  },
];

const caseStudies: CaseStudyData[] = [
  {
    tag: 'Case Study · SaaS',
    title: 'Reducing Billing Friction for Digital Agencies',
    problem:
      'Digital marketing agencies were stitching together spreadsheets, WhatsApp messages, and manual invoices to manage client billing — leading to errors, delays, and churn.',
    approach:
      'Ran 8 discovery interviews with agency owners to map the billing workflow. Identified the core pain: no single source of truth for hours-tracked → invoice raised. Built AccountX with a time-tracking → billing → payment flow, shipped an MVP in 6 weeks.',
    impact: [
      '60% reduction in time spent on billing per client',
      '3 agencies onboarded in the first month post-launch',
      'NPS of 72 after 90-day cohort',
    ],
    tags: ['Discovery', 'MVP', 'B2B SaaS', 'Retention'],
  },
  {
    tag: 'Case Study · Growth',
    title: 'Checkout Funnel Optimisation at Zomato',
    problem:
      'The checkout funnel showed a consistent 18% drop-off between cart review and payment confirmation on mid-tier Android devices — disproportionately affecting Tier 2 & 3 users.',
    approach:
      'Segmented drop-off by device, OS, and network. Identified that the address selection step caused the most friction on low-RAM devices. Worked with engineering to lazy-load the map component and simplify the address confirm CTA. Ran an A/B test across 2% traffic for 2 weeks.',
    impact: [
      '8% improvement in checkout conversion for the test cohort',
      'Shipped to 100% of users in the next sprint cycle',
      'Estimated incremental GMV impact: ₹4–6Cr/month',
    ],
    tags: ['A/B Testing', 'Funnel Analysis', 'Mobile', 'Growth'],
  },
  {
    tag: 'Case Study · 0→1',
    title: 'Building Whisp — AI Book-Notes App',
    problem:
      'Avid readers lose 80% of key ideas from books within a week. Existing apps either require too much manual effort or surface highlights without context.',
    approach:
      'Did a Jobs-to-be-Done analysis across 20 readers. Core job: "When I finish a chapter, help me lock in the 3 ideas I want to remember." Built an AI-powered capture flow (highlight → tag → summary) with a weekly spaced-repetition digest.',
    impact: [
      'Launched beta with 120 users, 42% weekly active',
      'Average of 9 notes saved per session',
      '4.7/5 satisfaction on the "I feel like I retained more" survey question',
    ],
    tags: ['0→1', 'AI Product', 'User Research', 'Consumer'],
  },
];

const metrics: { value: string; label: string }[] = [
  { value: '5+', label: 'Years of product & analytics experience' },
  { value: '14', label: 'Products shipped end-to-end' },
  { value: '10M+', label: "Users across products I've worked on" },
  { value: '8%', label: 'Checkout conversion lift (Zomato A/B test)' },
];

const projects: CylinderProject[] = [
  { title: 'AccountX', image: '/images/accountx.png', link: 'https://accountx.paperthoughts.in/' },
  { title: 'Wave Link', image: '/images/wavelink.png', link: 'https://wavelink.co.in/' },
  { title: 'Toastmasters Voting', image: '/images/toastmasters.png', link: 'https://toastmasters-poster.vercel.app/voting/admin/dashboard' },
  { title: 'Whisp', image: '/images/whisp.png', link: 'https://whisp-sand.vercel.app/' },
  { title: 'Mannat', image: '/images/mannat.png', link: '#' },
];

const pmPrinciples: { title: string; body: string }[] = [
  {
    title: 'Problem before solution',
    body: 'I spend disproportionate time in discovery. A well-framed problem is already 40% of the solution. I use Jobs-to-be-Done, user interviews, and data triangulation before writing a single spec.',
  },
  {
    title: 'Outcome > output',
    body: "Roadmaps ship features; great PMs ship outcomes. I anchor everything to a north-star metric and tie each initiative to a measurable hypothesis before it enters the sprint.",
  },
  {
    title: 'Opinionated, not precious',
    body: "I form strong views quickly from evidence, share them clearly, and update them faster when I'm wrong. Bad ideas should die in review, not in production.",
  },
  {
    title: 'Ruthless prioritisation',
    body: 'I use RICE and impact/effort frameworks, but the real skill is saying no loudly enough that the team feels the focus, not the constraint.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="flex min-h-[80vh] items-center justify-center px-6 py-24">
        <Container size="lg" className="text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-400">
            Open to PM roles · March 2026
          </span>
          <Heading1 className="mb-6">Product Manager</Heading1>
          <p className="mb-6 text-xl text-zinc-400 sm:text-2xl">
            Harsh Kankaria · Ex-Zomato · Co-founder · IIT Delhi
          </p>
          <Lead className="mb-10 px-2">
            I turn ambiguous problems into shipped products. I live in the space between user empathy, data,
            and engineering trade-offs — and I thrive when zero becomes one.
          </Lead>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="#case-studies" size="lg" className="py-5">View Case Studies</Button>
            <Button href="#experience" variant="secondary" size="lg">My Experience</Button>
            <Button href="mailto:harshkankaria9@gmail.com" variant="ghost" size="lg">
              Let&apos;s Talk →
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Metrics Bar ──────────────────────────────────────────────── */}
      <div className="border-y border-zinc-800 bg-zinc-900/60 py-10">
        <Container size="lg">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{m.value}</p>
                <p className="mt-2 text-sm text-zinc-400">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── PM Approach ──────────────────────────────────────────────── */}
      <Section id="approach">
        <Container size="md">
          <SectionHeader
            title="How I think about product"
            subtitle="My mental models, distilled from building products across B2B SaaS, consumer apps, and high-traffic platforms."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {pmPrinciples.map((p) => (
              <InfoCard key={p.title} title={p.title} body={p.body} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Case Studies ─────────────────────────────────────────────── */}
      <Section id="case-studies" background="muted">
        <Container size="lg">
          <SectionHeader
            title="Case Studies"
            subtitle="Three product problems I've owned — from discovery to impact."
            centered
            className="mb-16"
          />
          <div className="flex flex-col gap-12">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.title} {...cs} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <Section id="experience">
        <Container size="md">
          <SectionHeader title="Experience" className="mb-12" />
          <div className="flex flex-col gap-12">
            {experience.map((job) => (
              <div key={job.company} className="border-l-2 border-zinc-800 pl-8">
                <div className="mb-1 flex flex-wrap items-center gap-3">
                  <span className="text-xl font-semibold text-white">{job.role}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-zinc-400">{job.company}</span>
                  <span className="ml-auto text-sm text-zinc-500">{job.period}</span>
                </div>
                <p className="mb-5 text-sm leading-7 text-zinc-400">{job.description}</p>
                <BulletList items={job.highlights} />
                <TagList tags={job.tags} className="mt-5" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Projects Cylinder ────────────────────────────────────────── */}
      <Section id="projects" background="muted">
        <Container size="lg">
          <SectionHeader
            title="Projects"
            subtitle="Products I've built from zero — each one a real problem, a shipped solution."
            centered
            className="mb-16"
          />
          <ProjectCylinder projects={projects} />
        </Container>
      </Section>

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <Section id="skills">
        <Container size="lg">
          <SectionHeader title="Skills &amp; Toolkit" centered className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.category} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
                  {group.category}
                </p>
                <TagList tags={group.items} variant="secondary" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Education ────────────────────────────────────────────────── */}
      <Section id="education" background="muted">
        <Container size="md">
          <SectionHeader title="Education" className="mb-10" />
          <div className="border-l-2 border-zinc-800 pl-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xl font-semibold text-white">B.Tech, Engineering</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">IIT Delhi</span>
              <span className="ml-auto text-sm text-zinc-500">2017 – 2021</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Strong foundation in systems thinking, algorithms, and problem decomposition.
              Active in the entrepreneurship cell and product / design clubs.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <Section>
        <Container size="sm" className="text-center">
          <SectionHeader
            title="Let's build something together"
            subtitle="I'm actively exploring senior PM and product leadership roles. If you're looking for someone who brings founder-level ownership, data fluency, and strong execution habits — I'd love to chat."
            centered
            className="mb-10"
          />
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="mailto:harshkankaria9@gmail.com" size="lg">Email Me</Button>
            <Button href="https://linkedin.com/in/harshkankaria9" variant="secondary" size="lg">LinkedIn</Button>
            <Button href="/" variant="ghost" size="lg">← Back to Home</Button>
          </div>
        </Container>
      </Section>

    </div>
  );
}
