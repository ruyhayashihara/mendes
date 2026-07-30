import { motion } from 'motion/react';
import { Flame, Sparkles, CheckSquare, Layers } from 'lucide-react';

import weldingBg from '../assets/images/welding_background_1784545356543.jpg';
import gougingBg from '../assets/images/gouging_background_1784545377668.jpg';

export default function GallerySection() {
  const images = [
    {
      title: 'Soldagem Industrial Avançada',
      description: 'Treinamento completo nos processos TIG, MIG/MAG e Eletrodo Revestido para atuar nas indústrias mais exigentes do Japão.',
      url: weldingBg,
      badge: 'PROCESSO PRINCIPAL',
    },
    {
      title: 'Goivagem (Carbon Arc Gouging)',
      description: 'Aprenda a técnica de remoção rápida de soldas com defeito, corte térmico e preparação de juntas pesadas (Gouging).',
      url: gougingBg,
      badge: 'ESPECIALIZAÇÃO ALTA RENDA',
    },
  ];

  return (
    <section id="galeria" className="py-24 bg-[#070709] border-t border-zinc-900 relative">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] bg-brand-primary/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>GALERIA DE TÉCNICAS E EQUIPAMENTOS</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Nossas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              Especialidades e Processos
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-sans">
            Explore de forma visual as técnicas industriais de alta performance que você dominará em nossas cabines de treino prático.
          </p>
        </div>

        {/* Beautiful Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="group relative bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl hover:border-zinc-700/80 transition-all"
            >
              {/* Image Container with Hover Zoom */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay with subtle steel gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-brand-primary text-black font-mono font-black text-[9px] uppercase px-2.5 py-1 rounded-md tracking-wider">
                  {img.badge}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-brand-primary shrink-0" />
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                    {img.title}
                  </h3>
                </div>
                
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  {img.description}
                </p>

                {/* Technical Highlights list */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Treino Individual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Equipamento de Ponta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Ajuste de Parâmetros</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Norma de Segurança Japonesa</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-12 text-center max-w-md mx-auto bg-zinc-900/40 border border-zinc-800/40 px-4 py-2.5 rounded-xl">
          <p className="text-[11px] text-zinc-500 font-mono flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
            Processos homologados pelas maiores licenças industriais do Japão.
          </p>
        </div>

      </div>
    </section>
  );
}
