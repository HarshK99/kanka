interface LogoStripProps {
  className?: string;
}

export function LogoStrip({ className = '' }: LogoStripProps) {
  return (
    <div className={`mt-12 flex flex-col items-center gap-4 ${className}`}>
      <p className="text-xs uppercase tracking-widest text-zinc-600">Previously at</p>
      <div className="flex items-center gap-10">
        <img src="/logos/zomato.png" alt="Zomato" className="h-6 opacity-80" />
        <img src="/logos/iitd.png" alt="IIT Delhi" className="h-6 opacity-80" />
        <img src="/logos/wavelink.png" alt="Wave Link" className="h-6 opacity-80" />
      </div>
    </div>
  );
}
