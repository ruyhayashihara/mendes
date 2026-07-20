import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Award, CheckCircle, Sparkles, Trophy } from 'lucide-react';
import { COURSE_MODULES } from '../data';

interface CurriculumSectionProps {
  onOpenLeadForm: () => void;
}

export default function CurriculumSection({ onOpenLeadForm }: CurriculumSectionProps) {
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  
  // State to simulate progress checking by the user
  const [checkedLessons, setCheckedLessons] = useState<Record<string, boolean>>({});

  const handleToggleLesson = (lessonId: string) => {
    setCheckedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const activeModule = COURSE_MODULES[activeModuleIndex];

  // Calculate local progress for the selected module
  const moduleLessons = activeModule.lessons.map((lesson, idx) => `${activeModule.id}-lesson-${idx}`);
  const checkedCountInActiveModule = moduleLessons.filter(id => checkedLessons[id]).length;
  const progressPercent = Math.round((checkedCountInActiveModule / moduleLessons.length) * 100);

  return (
    <section id="cronograma" className="py-24 bg-[#0a0a0c] border-t border-zinc-900 relative">
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CRONOGRAMA COMPLETO E PROGRAMA DE ESTUDOS</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Seu cronograma de progresso técnico
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-sans">
            Aprenda passo a passo na prática do absoluto zero ao nível de certificação japonesa. 
            Clique nas abas abaixo para explorar os módulos e <strong className="text-brand-primary">simule marcar os tópicos concluídos</strong> para ver seu progresso!
          </p>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Module Selectors Sidebar (Left - 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs text-zinc-500 tracking-wider mb-2 uppercase block">Selecione o Módulo</span>
            {COURSE_MODULES.map((module, index) => {
              const isActive = index === activeModuleIndex;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModuleIndex(index)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer group ${
                    isActive
                      ? 'bg-zinc-900/90 border-brand-primary shadow-[0_4px_20px_rgba(255,107,0,0.15)]'
                      : 'bg-zinc-950/40 border-zinc-800/80 hover:bg-zinc-900/40 hover:border-zinc-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg font-mono text-xs font-bold shrink-0 mt-0.5 ${
                    isActive ? 'bg-brand-primary text-black' : 'bg-zinc-900 text-zinc-400 group-hover:text-brand-primary transition-colors'
                  }`}>
                    0{index + 1}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-mono text-[10px] font-bold tracking-widest uppercase mb-1 ${
                      isActive ? 'text-brand-secondary' : 'text-zinc-500'
                    }`}>
                      {module.tag} • {module.duration}
                    </span>
                    <span className={`font-sans font-bold text-sm tracking-tight leading-snug truncate ${
                      isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200 transition-colors'
                    }`}>
                      {module.title.split(': ')[1] || module.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Module Details Pane (Right - 8 cols) */}
          <div className="lg:col-span-8 bg-zinc-950/70 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl shadow-2xl relative min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* Module Header Inside */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-5">
                  <div>
                    <span className="font-mono text-xs text-brand-primary tracking-wider uppercase">Módulo 0{activeModuleIndex + 1}</span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
                      {activeModule.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {activeModule.duration}
                    </span>
                    <span className="bg-brand-primary/10 border border-brand-primary/30 px-3 py-1 rounded-full text-xs font-mono text-brand-primary">
                      {activeModule.tag}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {activeModule.description}
                </p>

                {/* Progress Tracker Simulator */}
                <div className="bg-zinc-900/60 border border-zinc-800/80 p-4.5 rounded-xl">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="font-mono text-[11px] text-zinc-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                      SIMULADOR DE PROGRESSO DE APRENDIZADO
                    </span>
                    <span className="font-mono text-xs text-brand-secondary font-bold bg-brand-primary/5 px-2.5 py-0.5 rounded-md">
                      {progressPercent}% Concluído
                    </span>
                  </div>
                  
                  {/* Real-time Progress Bar */}
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-brand-primary to-amber-400 h-full rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1.5 text-center sm:text-left">
                    💡 Clique nas aulas abaixo para marcar como concluídas e ver o seu progresso simulado subir!
                  </p>
                </div>

                {/* Interactive Lessons List */}
                <div className="space-y-3">
                  <span className="font-mono text-xs text-zinc-400 block uppercase font-bold tracking-wider mb-1">Aulas Práticas Contidas:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModule.lessons.map((lesson, idx) => {
                      const lessonId = `${activeModule.id}-lesson-${idx}`;
                      const isChecked = !!checkedLessons[lessonId];
                      return (
                        <button
                          key={idx}
                          onClick={() => handleToggleLesson(lessonId)}
                          className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            isChecked
                              ? 'bg-brand-primary/5 border-brand-primary/40 text-white'
                              : 'bg-zinc-900/30 border-zinc-800/40 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
                          }`}
                        >
                          <div className={`p-0.5 rounded-md mt-0.5 shrink-0 ${
                            isChecked ? 'text-brand-primary' : 'text-zinc-600'
                          }`}>
                            <CheckCircle className={`w-4 h-4 ${isChecked ? 'fill-brand-primary/10' : ''}`} />
                          </div>
                          <span className="text-xs sm:text-sm font-medium leading-snug font-sans">{lesson}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="border-t border-zinc-900 pt-5 mt-2">
                  <span className="font-mono text-xs text-zinc-400 block uppercase font-bold tracking-wider mb-2">Habilidades Técnicas que Você Conquista:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeModule.skillsLearned.map((skill, idx) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-brand-secondary" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA inside active module container */}
            <div className="border-t border-zinc-800/50 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-brand-primary" />
                <span className="text-xs text-zinc-400 font-sans max-w-[280px]">
                  Ao final deste ciclo completo de aulas, você receberá o nosso <strong>Certificado Profissional de Soldagem</strong>.
                </span>
              </div>
              <button
                onClick={onOpenLeadForm}
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-black font-display font-black text-xs px-6 py-3.5 rounded-xl transition-all tracking-wider uppercase cursor-pointer"
              >
                Garantir Minha Matrícula
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
