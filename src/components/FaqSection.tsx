import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

interface FaqSectionProps {
  onOpenLeadForm: () => void;
}

export default function FaqSection({ onOpenLeadForm }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#070709] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>DÚVIDAS FREQUENTES (FAQ)</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Tire todas as suas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              dúvidas sobre o curso
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-sans">
            Encontre respostas rápidas sobre a metodologia, vagas de trabalho, idiomas e formas de pagamento da nossa escola.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-zinc-900/60 border-brand-primary/60'
                    : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700/80'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    isOpen ? 'bg-brand-primary text-black' : 'bg-zinc-900 text-zinc-400'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 border-t border-zinc-800/60 pt-4">
                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic bottom prompt */}
        <div className="mt-12 text-center max-w-md mx-auto">
          <p className="text-xs text-zinc-500 font-mono">
            Sua dúvida não está listada aqui? Fale diretamente com a gente no WhatsApp para obter atendimento personalizado.
          </p>
          <button
            onClick={onOpenLeadForm}
            className="mt-5 bg-brand-primary hover:bg-brand-secondary text-black font-display font-black text-sm px-8 py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-glow shadow-glow-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#070709] cursor-pointer"
          >
            FALAR COM UM CONSULTOR
          </button>
        </div>

      </div>
    </section>
  );
}
