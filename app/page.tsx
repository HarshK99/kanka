import { Hero, About, Projects, Writing, ClientProjects, Contact, Footer } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Hero />
      <About />
      <Projects />
      <ClientProjects />
      {/* <Writing /> */}
      <Contact />
      <Footer />
    </div>
  );
}
