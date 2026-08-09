import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, PhoneCall, CheckCircle, Database, Trash2, Download } from 'lucide-react';
import { LeadFormData } from '../types';
import { SCHOOL } from '../data';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JAPAN_PROVINCES = [
  'Aichi', 'Gunma', 'Shizuoka', 'Mie', 'Gifu', 'Saitama', 'Kanagawa', 'Fukui', 'Shiga', 'Tochigi', 'Ibaraki', 'Outra Província'
];

const JOB_SECTORS = [
  'Autopeças / Prensa / Montagem', 'Alimentos / Bento / Padaria', 'Logística / Embalagem / Kanban', 
  'Moldagem Plástica / Borracha', 'Construção Civil', 'Metalúrgica Básica', 'Desempregado / Procurando', 'Outro'
];

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    whatsapp: '',
    province: 'Aichi',
    currentJob: 'Autopeças / Prensa / Montagem',
    timeInJapan: '1 a 3 anos',
    hasExperience: false,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);
  const [storedLeads, setStoredLeads] = useState<LeadFormData[]>([]);

  // Load leads from LocalStorage for the admin drawer demo
  useEffect(() => {
    const leads = localStorage.getItem('escola_solda_leads');
    if (leads) {
      try {
        setStoredLeads(JSON.parse(leads));
      } catch (e) {
        console.error('Erro ao ler leads', e);
      }
    }
  }, [isSuccess, showAdminDrawer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      alert('Por favor, preencha seu nome e telefone/WhatsApp.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write & local storage persistence
    setTimeout(() => {
      const existingLeadsStr = localStorage.getItem('escola_solda_leads') || '[]';
      let existingLeads: any[] = [];
      try {
        existingLeads = JSON.parse(existingLeadsStr);
      } catch (e) {}

      const newLead = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toLocaleString('pt-BR')
      };

      existingLeads.unshift(newLead);
      localStorage.setItem('escola_solda_leads', JSON.stringify(existingLeads));
      setStoredLeads(existingLeads);

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  // Build redirection link to WhatsApp
  const handleWhatsAppRedirect = () => {
    // Pegando apenas os números
    const schoolPhone = SCHOOL.whatsapp.replace(/\D/g, ''); 
    
    const experienceText = formData.hasExperience 
      ? 'Sim, já possuo alguma experiência prévia.' 
      : 'Não, pretendo começar do absoluto zero.';

    const message = `Olá Professor William! Gostaria de falar com um consultor do Centro de Soldagem Mendes sobre vagas e matrículas.

Aqui estão os meus dados para agilizar o atendimento:
• Nome: ${formData.name}
• Telefone: ${formData.whatsapp}
• Província: ${formData.province}
• Trabalho Atual: ${formData.currentJob}
• Tempo de Japão: ${formData.timeInJapan}
• Tem experiência: ${experienceText}
\${formData.notes ? \• Observações: \$\{formData.notes\}\ : ''\}

Fico no aguardo do contato! Obrigado.`;

    const encodedMessage = encodeURIComponent(message);
    
    // Detectando se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Gerar link correto baseado no dispositivo
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=` + schoolPhone + `&text=` + encodedMessage // Force open app on mobile
      : `https://api.whatsapp.com/send?phone=` + schoolPhone + `&text=` + encodedMessage; // Default to web on desktop
      
    // Alternativa caso o whatsapp:// falhe (o usuário será redirecionado para a loja / web)
    const fallbackUrl = `https://wa.me/` + schoolPhone + `?text=` + encodedMessage;
    
    if (isMobile) {
      // Tentamos abrir o app nativo no mobile
      window.location.href = whatsappUrl;
      // Timeout seguro para caso não abra, mandar pra web
      setTimeout(() => {
        window.location.href = fallbackUrl;
      }, 500);
    } else {
      // NO Desktop abrimos no Web Whatsapp sempre (evita bloquear no app sumido do windows)
      window.open(whatsappUrl, '_blank');
    }
    
    onClose();
    // Reset form after submission and delay
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        whatsapp: '',
        province: 'Aichi',
        currentJob: 'Autopeças / Prensa / Montagem',
        timeInJapan: '1 a 3 anos',
        hasExperience: false,
        notes: ''
      });
    }, 500);
  };

  const handleClearLeads = () => {
    if (confirm('Deseja excluir permanentemente todos os leads coletados neste navegador?')) {
      localStorage.removeItem('escola_solda_leads');
      setStoredLeads([]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark background backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Dialog container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent border-b border-zinc-900 px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
                  <span className="font-display font-bold text-base text-white tracking-tight">
                    Agende sua Consulta Gratuita
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Quick Admin view trigger */}
                  <button
                    onClick={() => setShowAdminDrawer(true)}
                    className="text-[10px] font-mono text-zinc-500 hover:text-brand-secondary flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 px-2 py-1 rounded cursor-pointer"
                    title="Ver leads salvos"
                  >
                    <Database className="w-3 h-3" />
                    <span>Vault</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable form body */}
              <div className="p-6 overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form-fields"
                      onSubmit={handleSubmit}
                      className="space-y-4 text-left"
                    >
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        Preencha suas informações para receber detalhes das turmas com desconto na sua província. Nosso consultor entrará em contato via WhatsApp.
                      </p>

                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-xs text-zinc-400 block uppercase font-bold">
                          Nome Completo:
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Carlos Silva"
                          className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary/60 transition-colors"
                        />
                      </div>

                      {/* Phone/WhatsApp */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-xs text-zinc-400 block uppercase font-bold">
                          Telefone / WhatsApp (Japão):
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="Ex: 080-1234-5678"
                          className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary/60 transition-colors"
                        />
                      </div>

                      {/* Two Columns: Province & Job Sector */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-xs text-zinc-400 block uppercase font-bold">
                            Província Atual:
                          </label>
                          <select
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary/60"
                          >
                            {JAPAN_PROVINCES.map((prov) => (
                              <option key={prov} value={prov}>{prov}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-xs text-zinc-400 block uppercase font-bold">
                            Setor da Fábrica:
                          </label>
                          <select
                            name="currentJob"
                            value={formData.currentJob}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary/60"
                          >
                            {JOB_SECTORS.map((job) => (
                              <option key={job} value={job}>{job}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Time in Japan Select */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-mono text-xs text-zinc-400 block uppercase font-bold">
                            Tempo no Japão:
                          </label>
                          <select
                            name="timeInJapan"
                            value={formData.timeInJapan}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                          >
                            <option value="Menos de 1 ano">Menos de 1 ano</option>
                            <option value="1 a 3 anos">1 a 3 anos</option>
                            <option value="3 a 5 anos">3 a 5 anos</option>
                            <option value="Mais de 5 anos">Mais de 5 anos</option>
                          </select>
                        </div>

                        {/* Experience Switch */}
                        <div className="flex items-center gap-2 border border-zinc-800/80 bg-zinc-900/30 p-3.5 rounded-xl mt-3 sm:mt-5 select-none">
                          <input
                            type="checkbox"
                            id="hasExperience"
                            name="hasExperience"
                            checked={formData.hasExperience}
                            onChange={handleCheckboxChange}
                            className="accent-brand-primary w-4.5 h-4.5 rounded cursor-pointer"
                          />
                          <label htmlFor="hasExperience" className="text-xs text-zinc-300 font-sans font-medium cursor-pointer">
                            Já tenho alguma experiência com solda
                          </label>
                        </div>
                      </div>

                      {/* Notes / Comments */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-xs text-zinc-400 block uppercase font-bold">
                          Dúvidas ou Observações (Opcional):
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Ex: Gostaria de saber preços para solda TIG em inox..."
                          className="w-full bg-zinc-900 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-primary/60 transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-primary hover:bg-brand-secondary text-black font-display font-bold text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4 fill-black" />
                            <span>SOLICITAR CONSULTA POR WHATSAPP</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    // SUCCESS STATE
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                        <CheckCircle className="w-8 h-8 fill-emerald-500/10 stroke-[2px]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-display font-bold text-xl text-white">Inscrição Prévia Realizada!</h4>
                        <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-xs mx-auto leading-relaxed">
                          Seus dados foram salvos com sucesso no cofre do Centro de Soldagem Mendes. 
                        </p>
                      </div>

                      <div className="bg-zinc-900/50 border border-zinc-800 p-4.5 rounded-xl text-left text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                        🔥 <strong>Próximo Passo Importante:</strong> Clique no botão abaixo para abrir o seu WhatsApp e iniciar o atendimento direto com o Professor William. Seus dados serão enviados de forma automática!
                      </div>

                      <button
                        onClick={handleWhatsAppRedirect}
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-bold text-sm py-4 rounded-xl shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <PhoneCall className="w-4.5 h-4.5 fill-white" />
                        <span>ABRIR WHATSAPP DO PROFESSOR</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Secure note */}
              <div className="bg-zinc-900/30 border-t border-zinc-900/60 p-4 shrink-0 text-center text-[10px] text-zinc-500 font-mono">
                Sua privacidade é garantida. Seus dados não serão compartilhados com terceiros.
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN LEADS VAULT DRAWER OVERLAY */}
      <AnimatePresence>
        {showAdminDrawer && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminDrawer(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full shadow-2xl z-10 flex flex-col p-6 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-brand-secondary" />
                  <span className="font-display font-bold text-base text-white">Leads Vault (Admin Demo)</span>
                </div>
                <button
                  onClick={() => setShowAdminDrawer(false)}
                  className="text-zinc-500 hover:text-white p-1 rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 font-mono leading-relaxed mb-4">
                Esta gaveta demonstra como os leads capturados na Landing Page são gravados de forma segura. Em produção, este painel fica protegido por senha para uso da escola.
              </p>

              {/* Action bar */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">
                  Total coletado: {storedLeads.length}
                </span>
                {storedLeads.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleClearLeads}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 bg-zinc-900 border border-zinc-800/80 px-2 py-1 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Limpar</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Leads list */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {storedLeads.length === 0 ? (
                  <div className="text-center py-16 text-zinc-600 font-mono text-xs">
                    Nenhum lead coletado ainda.<br />Submeta o formulário para testar.
                  </div>
                ) : (
                  storedLeads.map((lead: any, idx) => (
                    <div
                      key={lead.id || idx}
                      className="bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-xl space-y-2 text-xs text-left"
                    >
                      <div className="flex justify-between items-start border-b border-zinc-800/40 pb-2 mb-1.5">
                        <span className="font-sans font-bold text-white text-sm">{lead.name}</span>
                        <span className="font-mono text-[9px] text-zinc-500">{lead.createdAt || 'Recente'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-sans text-zinc-300">
                        <p><span className="text-zinc-500">Província:</span> {lead.province}</p>
                        <p><span className="text-zinc-500">WhatsApp:</span> {lead.whatsapp}</p>
                        <p className="col-span-2"><span className="text-zinc-500">Setor:</span> {lead.currentJob}</p>
                        <p><span className="text-zinc-500">Tempo JP:</span> {lead.timeInJapan}</p>
                        <p><span className="text-zinc-500">Exp. Solda:</span> {lead.hasExperience ? 'Sim' : 'Não'}</p>
                      </div>
                      {lead.notes && (
                        <p className="text-[11px] text-zinc-400 bg-zinc-950/40 border border-zinc-900/60 p-2 rounded italic mt-1 font-sans">
                          "{lead.notes}"
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Close footer */}
              <div className="border-t border-zinc-900 pt-4 mt-4 shrink-0">
                <button
                  onClick={() => setShowAdminDrawer(false)}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Voltar ao Formulário
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}




