import { Hero, About, Projects, Writing, ClientProjects, Contact, Footer } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black shadow-2xl text-white pt-24">
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
