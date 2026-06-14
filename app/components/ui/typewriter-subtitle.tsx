'use client';

import { TypeAnimation } from 'react-type-animation';

interface TypewriterSubtitleProps {
  prefix?: string;
  className?: string;
}

export function TypewriterSubtitle({ prefix, className = '' }: TypewriterSubtitleProps) {
  return (
    <p className={`mb-6 text-xl text-zinc-400 sm:text-2xl ${className}`}>
      {prefix && <>{prefix} · </>}
      <TypeAnimation
        sequence={[
          'Co-founder @ Wave Link', 1500,
          'Ex-Zomato', 1500,
          'IIT Delhi', 1500,
        ]}
        repeat={Infinity}
        speed={50}
        deletionSpeed={65}
        cursor
      />
    </p>
  );
}
