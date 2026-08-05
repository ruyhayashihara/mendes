import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Instagram, Phone, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenLeadForm: () => void;
}

export default function Header({ onOpenLeadForm }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Por que Soldar?', href: '#comparativo' },
    { label: 'Simulador Salarial', href: '#calculadora' },
    { label: 'Cronograma', href: '#cronograma' },
    { label: 'O Instrutor', href: '#instrutor' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/90 backdrop-blur-md border-b border-zinc-800/60 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="bg-brand-primary p-2 rounded-lg text-black font-bold flex items-center justify-center transition-transform group-hover:scale-105">
                <Flame className="w-5 h-5 fill-black animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none tracking-tight text-white">
                  CENTRO MENDES DE SOLDAGEM
                </span>
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest leading-none mt-1">
                  NO JAPÃO • 溶接学校
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.href)}
                  className="text-sm font-medium text-zinc-300 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://www.instagram.com/escoladesoldanojapao/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-brand-secondary transition-colors"
                title="Instagram da Escola"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <button
                onClick={onOpenLeadForm}
                className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-black font-bold px-4 py-2 rounded-lg text-sm shadow-[0_4px_14px_rgba(255,107,0,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>Garantir Vaga</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <a
                href="https://www.instagram.com/escoladesoldanojapao/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-brand-secondary transition-colors p-2"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-300 hover:text-white p-2"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#0a0a0c]/95 backdrop-blur-lg border-b border-zinc-800 p-6 lg:hidden shadow-2xl flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.href)}
                  className="text-left py-2 px-3 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-brand-primary transition-colors font-medium text-base cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-zinc-800/80 pt-4 mt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLeadForm();
                }}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-black font-bold py-3 rounded-lg shadow-lg cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>Garantir Vaga no WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
