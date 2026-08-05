import { motion } from 'motion/react';
import { Star, MessageSquare, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 bg-[#0a0a0c] border-y border-zinc-900 relative">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>TRANSFORMAÇÕES REAIS</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Histórias de quem{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              mudou de vida de verdade
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-sans">
            Centenas de alunos já passaram por nossas cabines e hoje colhem os frutos de terem aprendido uma profissão altamente valorizada e de alta renda.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-zinc-950/50 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl relative hover:border-zinc-700/80 transition-colors flex flex-col justify-between"
            >
              {/* Quote icon watermark */}
              <Quote className="absolute top-4 right-6 w-12 h-12 text-zinc-900/40 pointer-events-none select-none" />

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-brand-primary text-brand-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 italic font-sans relative z-10">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Author & Journey Info */}
              <div className="border-t border-zinc-900 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Pseudo-Avatar */}
                  <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/30 rounded-full flex items-center justify-center text-brand-primary font-display font-black text-sm uppercase">
                    {testimonial.name.slice(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-sm text-white leading-tight">
                      {testimonial.name}
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-zinc-600" />
                      {testimonial.location}
                    </span>
                  </div>
                </div>

                {/* Job Switch Badges */}
                <div className="flex flex-col text-left sm:text-right font-mono text-[10px]">
                  <span className="text-red-400 line-through">
                    {testimonial.previousJob}
                  </span>
                  <span className="text-emerald-400 font-bold mt-0.5">
                    🚀 {testimonial.currentJob}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic call to action prompt */}
        <div className="mt-16 text-center max-w-lg mx-auto bg-zinc-950/60 border border-zinc-800/80 p-5 rounded-xl">
          <p className="text-zinc-400 text-xs sm:text-sm font-sans">
            Você também pode ser a nossa próxima história de sucesso. Faça parte do Centro Mendes de Soldagem e conquiste a sua valorização profissional.
          </p>
        </div>

      </div>
    </section>
  );
}
