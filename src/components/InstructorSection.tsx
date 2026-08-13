import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Flame, ChevronRight, GraduationCap, Briefcase } from 'lucide-react';
import { INSTRUCTOR } from '../data';

export default function InstructorSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(INSTRUCTOR.trajectory.length - 1);

  return (
    <section id="instrutor" className="py-16 md:py-24 bg-[#070709] relative overflow-hidden">
      {/* Back lighting */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>APRENDA COM QUEM REALMENTE CONHECE O CHÃO DE FÁBRICA</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Conheça o seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              instrutor técnico
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-sans">
            O Centro de Soldagem Mendes foi desenhado por quem sentiu na pele as dificuldades do trabalhador estrangeiro e conquistou o topo na metalurgia japonesa.
          </p>
        </div>

        {/* Biography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Instructor Photo & Experience Badges (Left - 5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[500px] lg:max-w-none">
              {/* Back ambient frame */}
              <div className="absolute inset-0 bg-brand-primary/20 rounded-3xl blur-2xl -z-10 transform translate-x-2 translate-y-2 animate-pulse" />
              
              {/* Image Container */}
              <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl w-full max-w-[652px] h-full sm:h-[752px] lg:h-auto lg:aspect-[652/752]">
                <img
                  src={INSTRUCTOR.photoUrl}
                  alt={INSTRUCTOR.name}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Years badge overlay */}
                <div className="absolute top-4 left-4 bg-[#0a0a0c]/90 border border-zinc-800/80 backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <span className="font-display font-black text-xl text-brand-primary leading-none">
                    {INSTRUCTOR.experienceYears}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-zinc-400 uppercase leading-none tracking-wider">Anos de</span>
                    <span className="font-sans font-bold text-[10px] text-white leading-none mt-0.5">Prática no Japão</span>
                  </div>
                </div>
              </div>

              {/* Trust Tag bottom overlap */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center justify-center gap-2 shadow-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase tracking-wider">
                  Certificado Master JWES
                </span>
              </div>
            </div>
          </div>

          {/* Instructor Bio & Trajectory (Right - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Identity details */}
            <span className="font-mono text-xs text-brand-primary tracking-widest uppercase mb-1">{INSTRUCTOR.role}</span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-5">
              {INSTRUCTOR.name}
            </h3>

            {/* Bio story paragraph */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {INSTRUCTOR.bio}
            </p>

            {/* Credential badges */}
            <div className="space-y-2.5 mb-8 border-l-2 border-brand-primary/30 pl-4">
              {INSTRUCTOR.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 font-medium font-sans">{cert}</span>
                </div>
              ))}
            </div>

            {/* Trajectory Milestone Timeline */}
            <div className="border border-zinc-800/80 bg-zinc-950/40 p-5 rounded-2xl">
              <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase block mb-3 font-bold">
                TRAJETÓRIA VITORIOSA: CLIQUE NOS ANOS
              </span>

              {/* Year Buttons Row */}
              <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-zinc-800/60 pb-3">
                {INSTRUCTOR.trajectory.map((item, idx) => {
                  const isActive = idx === selectedMilestone;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedMilestone(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-primary text-black'
                          : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {item.year}
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Card */}
              <div className="min-h-[100px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMilestone}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-brand-secondary" />
                      <h4 className="font-sans font-bold text-sm sm:text-base text-white">
                        {INSTRUCTOR.trajectory[selectedMilestone].title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed font-sans">
                      {INSTRUCTOR.trajectory[selectedMilestone].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}




