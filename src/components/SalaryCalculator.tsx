import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, TrendingUp, HandCoins, CalendarCheck } from 'lucide-react';

interface SalaryCalculatorProps {
  onOpenLeadForm: () => void;
}

export default function SalaryCalculator({ onOpenLeadForm }: SalaryCalculatorProps) {
  const [currentWage, setCurrentWage] = useState<number>(1150);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(15);

  // Welding standards
  const welderWage = 1950; // Average welder wage

  // Calculation logic
  const weeksPerMonth = 4.33;
  
  // Current calculations
  const currentRegularPay = currentWage * weeklyHours * weeksPerMonth;
  const currentOvertimePay = (currentWage * 1.25) * overtimeHours * weeksPerMonth;
  const currentTotalMonthly = currentRegularPay + currentOvertimePay;
  
  // Welder calculations (usually welders get higher base rate, and same or slightly higher overtime)
  const welderRegularPay = welderWage * weeklyHours * weeksPerMonth;
  const welderOvertimePay = (welderWage * 1.25) * overtimeHours * weeksPerMonth;
  const welderTotalMonthly = welderRegularPay + welderOvertimePay;

  const monthlyIncrease = welderTotalMonthly - currentTotalMonthly;
  const annualIncrease = monthlyIncrease * 12;

  // Let's format money in JPY (¥)
  const formatJPY = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Math.round(amount));
  };

  return (
    <section id="calculadora" className="py-24 bg-[#070709] relative overflow-hidden">
      {/* Decorative side lights */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-brand-secondary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs px-3 py-1 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5 fill-none" />
            <span>SIMULADOR DE RETORNO FINANCEIRO (ROI)</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Simule o seu novo salário no Japão
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-sans">
            Ajuste os valores abaixo com a sua realidade de trabalho atual e veja o quanto seu faturamento aumentará como um soldador qualificado.
          </p>
        </div>

        {/* Calculator Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-6 bg-zinc-950/60 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl flex flex-col gap-6 justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
                <span>Passo 1: Suas Horas e Salário Atual</span>
              </h3>

              {/* Input 1: Hourly Rate */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm font-mono text-zinc-300">
                  <span>Seu Valor-Hora Atual:</span>
                  <span className="text-brand-primary font-bold text-base">{formatJPY(currentWage)}/h</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="1600"
                  step="25"
                  value={currentWage}
                  onChange={(e) => setCurrentWage(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                  <span>¥1.000/h (Mínimo comum)</span>
                  <span>¥1.600/h</span>
                </div>
              </div>

              {/* Input 2: Weekly Hours */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm font-mono text-zinc-300">
                  <span>Horas Normais de Trabalho p/ Semana:</span>
                  <span className="text-brand-primary font-bold text-base">{weeklyHours} horas</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                  <span>20h</span>
                  <span>40h (Padrão)</span>
                  <span>60h</span>
                </div>
              </div>

              {/* Input 3: Overtime Hours */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-mono text-zinc-300">
                  <span>Horas Extras de Trabalho p/ Mês:</span>
                  <span className="text-brand-primary font-bold text-base">{overtimeHours} horas</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="45"
                  step="5"
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Sem Extras (0h)</span>
                  <span>45h (Máximo legal)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-zinc-900/60 border border-zinc-800/50 p-4 rounded-xl text-xs text-zinc-400 leading-relaxed font-sans flex items-start gap-2.5">
              <CalendarCheck className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
              <span>
                <strong>Como calculamos:</strong> Consideramos um mês padrão de 4.33 semanas, horas normais, e acréscimo legal de 25% para as horas extras declaradas. Comparamos seu ganho com a média real de <strong>{formatJPY(welderWage)}/h</strong> de um soldador qualificado.
              </span>
            </div>
          </div>

          {/* Results Panel (Right) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-brand-primary/30 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3 -right-3 bg-brand-primary text-black font-mono font-black text-[10px] tracking-wide px-3 py-1 rounded-full shadow-lg">
              SIMULAÇÃO DE ENGENHARIA FINANCEIRA
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-6 flex items-center gap-2">
                <span>Passo 2: Seu Aumento Salarial Previsto</span>
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Current salary summary */}
                <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/80">
                  <p className="text-zinc-500 text-xs font-mono">Seu Ganho Mensal Atual</p>
                  <p className="font-display font-bold text-lg text-zinc-400 mt-1">
                    {formatJPY(currentTotalMonthly)}
                  </p>
                </div>
                {/* Welder salary summary */}
                <div className="bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/20">
                  <p className="text-brand-secondary text-xs font-mono">Novo Ganho Mensal Estimado</p>
                  <p className="font-display font-bold text-lg text-white mt-1">
                    {formatJPY(welderTotalMonthly)}
                  </p>
                </div>
              </div>

              {/* Comparison stats */}
              <div className="space-y-4 mb-8">
                <div className="bg-brand-primary/10 border border-brand-primary/20 p-5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-primary text-black rounded-lg p-2 shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-sans text-sm font-semibold">Seu Aumento Mensal Líquido</p>
                      <p className="text-zinc-400 text-xs font-sans">Dinheiro a mais todo mês no seu bolso</p>
                    </div>
                  </div>
                  <span className="font-display font-extrabold text-xl text-brand-primary text-right">
                    +{formatJPY(monthlyIncrease)}
                  </span>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/60 p-5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-primary/20 text-brand-primary rounded-lg p-2 shrink-0">
                      <HandCoins className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-sans text-sm font-semibold">Seu Ganho Extra p/ Ano</p>
                      <p className="text-zinc-400 text-xs font-sans">Viagens, poupança e tranquilidade</p>
                    </div>
                  </div>
                  <span className="font-display font-extrabold text-xl text-emerald-400 text-right">
                    +{formatJPY(annualIncrease)}
                  </span>
                </div>
              </div>
              
              {/* ROI statement */}
              <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl text-center">
                <p className="text-zinc-300 text-sm font-sans">
                  💡 <strong>Com essa diferença salarial</strong>, o custo de todo o treinamento prático e certificação se paga em <span className="text-brand-primary font-bold">menos de 2 meses</span> de trabalho como soldador qualificado!
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenLeadForm}
                className="group w-full bg-brand-primary hover:bg-brand-secondary text-black font-display font-black text-sm py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(255,107,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>QUERO SIMULAR MEU PLANO DE CARREIRA</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
