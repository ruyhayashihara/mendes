import { Flame, Instagram, MessageSquare, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { SCHOOL } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050507] border-t border-zinc-900/80 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle bottom glowing accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-brand-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-zinc-900 pb-12 mb-12">
          {/* Logo & Pitch */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand-primary p-2 rounded-lg text-black font-bold flex items-center justify-center">
                <Flame className="w-5 h-5 fill-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base leading-none tracking-tight text-white">
                  Centro de Soldagem Mendes
                </span>
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest leading-none mt-1">
                  MUDANDO VIDAS PELA QUALIFICAÇÃO
                </span>
              </div>
            </div>
            
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              Especialistas em transformar trabalhadores comuns em soldadores profissionais altamente qualificados e bem remunerados no Japão. Aulas práticas ministradas 100% em português aos finais de semana.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={SCHOOL.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-brand-secondary p-2.5 rounded-xl transition-all"
                title="Instagram da Escola"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <span className="text-[11px] font-mono text-zinc-500">@escoladesoldanojapao</span>
            </div>
          </div>

          {/* Location & Support */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Nosso Centro de Treinamento
            </h4>
            
            <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  {SCHOOL.location}
                  <span className="text-zinc-500 font-mono text-[10px]">{SCHOOL.postal}</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <span>{SCHOOL.email}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-brand-primary shrink-0" />
                <span>{SCHOOL.hours}</span>
              </div>
            </div>
          </div>

          {/* Certifications and legal */}
          <div className="md:col-span-3 flex flex-col gap-4 text-left">
            <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase">
              Certificação de Qualidade
            </h4>

            <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <p className="font-sans font-bold text-xs text-white">Treinamento Habilitado</p>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans mt-0.5">
                  Nossas diretrizes de segurança prática seguem rigidamente os padrões do JWES (Japan Welding Engineering Society).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500 text-center">
          <p>© {currentYear} Centro de Soldagem Mendes. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-600">Projetado com foco em alta conversão</span>
            <span>•</span>
            <span>Padrão JWES</span>
          </div>
        </div>

      </div>
    </footer>
  );
}


