import { Hero, About, Projects, Writing, Contact } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Hero />
      <About />
      <Projects />
      <Writing />
      <Contact />
    </div>
  );
}
