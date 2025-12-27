import { Hero, About, Projects, Contact } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
