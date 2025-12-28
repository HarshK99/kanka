import { Container } from '@/components/ui/container';

export const Footer = () => {
  return (
    <footer className="py-16 bg-black border-t border-white/10">
      <Container size="md" className="text-center">
        <p className="text-gray-400 text-sm">
          © 2025 Harsh Kankaria.
        </p>
      </Container>
    </footer>
  );
};