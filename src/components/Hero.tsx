import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { ArrowRight, Flame, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';
import heroImgSrc from '../assets/images/hero_welding_japan_1784542489665.webp';
import { STATS } from '../data';

interface HeroProps {
  onOpenLeadForm: () => void;
}



export default function Hero({ onOpenLeadForm }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 90]),
    { stiffness: 100, damping: 30 }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] pb-16 flex flex-col justify-center overflow-hidden bg-[#070709]">
      
      {/* 
        NEW: VAST CINEMATIC BACKGROUND 
        The image takes up the entire section, using a horizontal gradient overlay 
        to fade beautifully into the text on the left, but retaining the spark/action 
        at full height on the right.
      */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroImgSrc}
          alt="Soldador trabalhando no Japão"
          style={{ y: parallaxY }}
          className="w-full h-full object-cover object-center lg:object-right select-none opacity-90"
        />
        {/* Horizontal cinematic mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/60 to-transparent lg:w-3/4" />
        
        {/* Vertical mask to fade softly from header and into the next section */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070709] to-transparent shrink-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070709] focus:to-[rgba(7,7,9,0.2)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-32 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Hero Content Left (Spans heavily to allow reading over the dark gradient mask) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 xl:col-span-7 flex flex-col text-left relative z-20"
          >
            {/* Promo Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 self-start bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1.5 mb-6 text-xs font-mono font-medium tracking-wide text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
              <span>Diga Adeus às Linhas de Fábrica Comuns</span>
            </motion.div>

            {/* High Converting Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6 text-balance"
            >
              Mude de Vida no Japão:{' '}
              <span className="text-brand-primary">
                Torne-se um Soldador Profissional
              </span>{' '}
              e Multiplique Seus Ganhos
            </motion.h1>

            {/* Sub-headline / Hook */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed font-sans text-pretty drop-shadow-md"
            >
              Chega de trabalhar 12 horas em pé em serviços pesados de haken por salários baixos.
              Domine os processos <strong className="text-white">TIG, MIG/MAG e Eletrodo</strong> na prática,
              com aulas <strong className="text-white">100% em português</strong> aos finais de semana, e conquiste vagas de até <strong className="text-brand-primary">¥3.000/h</strong>.
            </motion.p>

            {/* Micro Badges (Trust Elements) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg font-mono text-xs text-zinc-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0 drop-shadow-md" />
                <span className="drop-shadow-md">Aulas Práticas Individuais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0 drop-shadow-md" />
                <span className="drop-shadow-md">Preparação Oficial de Licença JWES</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0 drop-shadow-md" />
                <span className="drop-shadow-md">Didática 100% em Português</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0 drop-shadow-md" />
                <span className="drop-shadow-md">Indicação de Vagas e Contatos</span>
              </div>
            </motion.div>

            {/* Strong CTA Button */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenLeadForm}
                className="group relative flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-black font-display font-bold text-base px-8 py-4.5 rounded-xl shadow-glow shadow-glow-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#070709] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>FALAR COM NOSSO CONSULTOR</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 px-4 py-2 border border-brand-primary/20 bg-black/40 backdrop-blur-sm rounded-xl text-zinc-300 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>Suporte Completo no Japão</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Floating Action Badge on the right, floating over sparks! */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
            className="hidden lg:flex lg:col-span-4 xl:col-span-5 h-full items-end justify-end pb-12 z-10 pointer-events-none"
          >
            <div className="bg-[#070709]/60 backdrop-blur-md border border-zinc-700/60 p-5 rounded-2xl flex flex-col xl:flex-row items-center xl:items-start gap-4 xl:gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative mt-auto right-[-2rem] pointer-events-auto transform hover:scale-105 transition-transform duration-300">
              <div className="bg-brand-primary/10 p-4 rounded-xl text-brand-primary shrink-0 border border-brand-primary/20 relative">
                 <div className="absolute inset-0 bg-brand-primary/30 blur-xl animate-pulse rounded-full" />
                 <Flame className="w-8 h-8 fill-brand-primary relative z-10 drop-shadow-[0_0_12px_rgba(255,107,0,1)]" />
              </div>
              <div className="text-center xl:text-left mt-2 xl:mt-0">
                <p className="font-display font-bold text-sm text-white leading-tight">Centro de Soldagem<br/>Mendes</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-primary font-mono mt-2">Metodologia 100% Prática</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Stats Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle line glow inside stats bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
          
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col text-center md:text-left md:border-r last:border-r-0 border-zinc-800/60 pb-4 mb-4 border-b md:pb-0 md:mb-0 md:border-b-0 md:pr-4 last:pr-0">
              <span className="font-display font-extrabold text-[1.4rem] sm:text-[1.7rem] text-white tracking-tight drop-shadow-md whitespace-nowrap">
                {stat.value}
              </span>
              <span className="font-sans font-semibold text-xs sm:text-[13px] text-brand-primary mt-1 md:mt-1 leading-tight">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 mt-1 max-w-[180px] mx-auto md:mx-0 leading-snug">
                {stat.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}





