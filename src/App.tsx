import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComparisonSection from './components/ComparisonSection';
import SalaryCalculator from './components/SalaryCalculator';
import CurriculumSection from './components/CurriculumSection';
import GallerySection from './components/GallerySection';
import InstructorSection from './components/InstructorSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import LeadCaptureModal from './components/LeadCaptureModal';
import Footer from './components/Footer';
import { Flame, Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleOpenLeadModal = () => {
    setIsLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col justify-between overflow-x-hidden antialiased font-sans selection:bg-brand-primary selection:text-black">
      
      {/* Header Navigation */}
      <Header onOpenLeadForm={handleOpenLeadModal} />

      {/* Main Page Layout */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Fold with stats */}
        <Hero onOpenLeadForm={handleOpenLeadModal} />

        {/* 2. Brand Value Comparison (Pain vs. Solution) */}
        <ComparisonSection onOpenLeadForm={handleOpenLeadModal} />

        {/* 3. Interactive ROI Salary Calculator */}
        <SalaryCalculator onOpenLeadForm={handleOpenLeadModal} />

        {/* 4. Curriculum Schedule with interactive check-ins */}
        <CurriculumSection onOpenLeadForm={handleOpenLeadModal} />

        {/* 4.5. Technique and Equipment Gallery */}
        <GallerySection />

        {/* 5. Instructor Trajectory and Credentials */}
        <InstructorSection />

        {/* 6. Student Testimonials (Social Proof) */}
        <TestimonialsSection />

        {/* 7. Accordion FAQs */}
        <FaqSection />

        {/* Bottom Sticky Floating CTA Widget (Mobile-Friendly) */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleOpenLeadModal}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-black text-xs sm:text-sm px-5 py-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
            title="Fale conosco agora"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <MessageCircle className="w-4.5 h-4.5 fill-white shrink-0" />
            <span className="tracking-wide uppercase">MATRÍCULAS ABERTAS</span>
          </button>
        </div>
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* High-Converting Lead Capture Modal & Admin Drawer */}
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={handleCloseLeadModal} />

    </div>
  );
}
