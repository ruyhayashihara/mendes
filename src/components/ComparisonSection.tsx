import { motion } from 'motion/react';
import { ShieldAlert, Star, X, Check } from 'lucide-react';
import { COMPARISONS } from '../data';

interface ComparisonSectionProps {
  onOpenLeadForm: () => void;
}

export default function ComparisonSection({ onOpenLeadForm }: ComparisonSectionProps) {
  return (
    <section id="comparativo" className="py-24 bg-[#0a0a0c] border-y border-zinc-900 relative">
      {/* Back glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4"
          >
            <span>DIFERENÇA DE REALIDADES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight"
          >
            Qual caminho você quer{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              seguir no Japão
            </span>
            ?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base mt-4 font-sans"
          >
            Compare a rotina estressante de uma linha comum de fábrica com a liberdade e o retorno financeiro de um profissional técnico especializado.
          </motion.p>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Haken Card (Negative) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-950/40 border border-zinc-800/80 p-8 rounded-2xl flex flex-col justify-between relative opacity-80 hover:opacity-100 transition-opacity"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-zinc-300">
                    {COMPARISONS.haken.title}
                  </h3>
                  <p className="text-xs text-red-400/80 font-mono mt-0.5">Rotina Estagnada e Pesada</p>
                </div>
              </div>

              <div className="space-y-4 my-8">
                {COMPARISONS.haken.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-red-500/10 text-red-500 rounded-full p-0.5 mt-0.5 shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-zinc-400 leading-relaxed font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800/60 pt-6 mt-4">
              <p className="text-zinc-500 text-xs font-mono text-center">
                Sem tempo para a família • Alto esgotamento físico e mental
              </p>
            </div>
          </motion.div>

          {/* Welder Card (Positive & Premium) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-brand-primary p-8 rounded-2xl flex flex-col justify-between relative shadow-[0_10px_50px_rgba(255,107,0,0.25)] overflow-hidden ring-1 ring-brand-primary/30"
          >
            {/* Corner Ribbon or Highlight Badge */}
            <div className="absolute top-4 right-4 bg-brand-primary text-black font-mono font-black text-[9px] uppercase px-2 py-1 rounded">
              MELHOR FUTURO
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl text-brand-primary">
                  <Star className="w-6 h-6 fill-brand-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {COMPARISONS.welder.title}
                  </h3>
                  <p className="text-xs text-brand-secondary font-mono mt-0.5">Carreira de Elite no Japão</p>
                </div>
              </div>

              <div className="space-y-4 my-8">
                {COMPARISONS.welder.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-brand-primary/20 text-brand-primary rounded-full p-0.5 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <span className="text-sm text-white font-medium leading-relaxed font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6 mt-4 flex flex-col gap-4">
              <button
                onClick={onOpenLeadForm}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-black font-display font-black text-sm py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-[0_6px_24px_rgba(255,107,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>QUERO ESTA EVOLUÇÃO NA MINHA VIDA</span>
              </button>
              <p className="text-zinc-400 text-[11px] font-mono text-center">
                Atualmente, oferecemos curso presencial em Kakogawa, Hyogo, Japão. Para mais informações, entre em contato conosco.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
