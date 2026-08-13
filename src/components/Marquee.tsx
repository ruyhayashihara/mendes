import { Flame } from 'lucide-react';

const ITEMS = [
  'Eletrodo (MMA)',
  'MIG/MAG CO₂',
  'TIG Inox',
  'TIG Alumínio',
  'Goivagem',
  'Certificação JWES',
];

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 sm:px-8 font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-400 whitespace-nowrap">
            {item}
          </span>
          <Flame className="w-3.5 h-3.5 shrink-0 text-brand-primary" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      className="relative overflow-hidden border-y border-zinc-900 bg-[#070709] py-4 select-none"
      aria-label="Processos de soldagem ensinados"
    >
      {/* Edge fade so the strip blends into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#070709] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#070709] to-transparent z-10" />

      <div className="flex w-max animate-marquee">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </section>
  );
}
