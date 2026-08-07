import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
}

interface ParsedValue {
  prefix: string;
  number: number;
  suffix: string;
}

/**
 * Tries to parse a stat value like "+1.200", "92%" or "100%" into
 * prefix + integer + suffix. Handles the pt-BR thousands separator ('.')
 * so "+1.200" counts up to 1200 instead of just the first digit.
 * Returns null for interval values (e.g. "¥1.600 - ¥3.000") so they
 * render statically instead of counting a meaningless number.
 */
function parseValue(value: string): ParsedValue | null {
  const trimmed = value.trim();

  // Ranges: two numeric groups separated by a hyphen -> keep static.
  const parts = trimmed.split('-');
  if (parts.length >= 2 && parts.every((part) => /\d/.test(part))) {
    return null;
  }

  // Single integer with optional thousands separator ('.' or ',').
  const match = trimmed.match(/^([^\d]*?)([\d][\d.,]*)(.*)$/);
  if (!match) return null;

  const [, prefix, rawNumber, suffix] = match;
  const number = Number(rawNumber.replace(/[.,]/g, ''));
  if (!Number.isFinite(number)) return null;

  return { prefix, number, suffix };
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    if (!inView || !parsed) return;
    const controls = animate(0, parsed.number, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        setDisplay(`${parsed.prefix}${Math.round(v).toLocaleString('pt-BR')}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
