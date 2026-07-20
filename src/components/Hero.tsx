import { motion } from 'motion/react';
import { Flame, CheckCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { STATS } from '../data';

import heroImgSrc from '../assets/images/hero_welding_japan_1784542489665.jpg';

interface HeroProps {
  onOpenLeadForm: () => void;
}

export default function Hero({ onOpenLeadForm }: HeroProps) {

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
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Decorative radial gradients for glowing ambient effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col text-left"
          >
            {/* Promo Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 self-start bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1.5 mb-6 text-xs font-mono font-medium tracking-wide text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
              <span>Diga Adeus às Linhas de Fábrica Comuns</span>
            </motion.div>

            {/* High Converting Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-6"
            >
              Mude de Vida no Japão:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                Torne-se um Soldador Profissional
              </span>{' '}
              e Multiplique Seus Ganhos
            </motion.h1>

            {/* Sub-headline / Hook */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed font-sans"
            >
              Chega de trabalhar 12 horas em pé em serviços pesados de haken por salários baixos. 
              Domine os processos <strong className="text-white">TIG, MIG/MAG e Eletrodo</strong> na prática, 
              com aulas <strong className="text-white">100% em português</strong> aos finais de semana, e conquiste vagas de até <strong className="text-brand-primary">¥2.500/h</strong>.
            </motion.p>

            {/* Micro Badges (Trust Elements) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg font-mono text-xs text-zinc-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                <span>Aulas Práticas Individuais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                <span>Preparação Oficial de Licença JWES</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                <span>Didática 100% em Português</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                <span>Indicação de Vagas e Contatos</span>
              </div>
            </motion.div>

            {/* Strong CTA Button */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenLeadForm}
                className="group relative flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-black font-display font-bold text-base px-8 py-4.5 rounded-xl shadow-[0_6px_24px_rgba(255,107,0,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>FALAR COM NOSSO CONSULTOR</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-800/80 bg-zinc-900/40 rounded-xl text-zinc-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Suporte Completo no Japão</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Media Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient orange glow behind the image */}
            <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-2xl -z-10 transform scale-95 animate-pulse" />
            
            {/* Main Hero Image */}
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto">
              <img
                src={heroImgSrc}
                alt="Soldador trabalhando com faíscas brilhantes"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with subtle steel gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Badge (Social Proof) */}
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-zinc-800/60 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-brand-primary/10 p-2 rounded-lg text-brand-primary">
                  <Flame className="w-5 h-5 fill-brand-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-white leading-tight">Escola de Solda no Japão</p>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">Foco na Prática e Empregabilidade Imediata</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-950/60 border border-zinc-800/80 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-2xl"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col text-center md:text-left border-r last:border-r-0 border-zinc-800/60 pr-2 last:pr-0">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-brand-primary tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans font-semibold text-xs sm:text-sm text-white mt-1">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 mt-1 max-w-[180px] mx-auto md:mx-0">
                {stat.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
