import { useState } from 'react';
import { Dumbbell, User, Lock, Sparkles, Receipt, ListTodo } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface HeaderProps {
  currentView: 'landing' | 'checkout' | 'questionnaire' | 'dashboard';
  setView: (view: 'landing' | 'checkout' | 'questionnaire' | 'dashboard') => void;
  hasPaid: boolean;
  onResetDemo: () => void;
}

export default function Header({ currentView, setView, hasPaid, onResetDemo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      setView('landing');
      // Wait for view to switch then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="header-root" className="sticky top-0 z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setView('landing')} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="brand-logo"
          >
            <BrandLogo color="#30070C" textColor="text-[#30070C]" subtitleColor="text-stone-500" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-stone-600">
            <button 
              id="nav-home"
              onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#9B655E] transition-colors ${currentView === 'landing' ? 'text-[#9B655E] font-bold' : ''}`}
            >
              Inicio
            </button>
            <button 
              id="nav-about"
              onClick={() => handleNavClick('about-me')}
              className="hover:text-[#9B655E] transition-colors"
            >
              Quién Soy
            </button>
            <button 
              id="nav-how"
              onClick={() => handleNavClick('how-it-works')}
              className="hover:text-[#9B655E] transition-colors"
            >
              ¿Cómo Funciona?
            </button>
            <button 
              id="nav-plans"
              onClick={() => handleNavClick('pricing-section')}
              className="hover:text-[#9B655E] transition-colors"
            >
              Planes
            </button>
            <button 
              id="nav-faq"
              onClick={() => handleNavClick('faq-section')}
              className="hover:text-[#9B655E] transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* User Action States */}
          <div className="flex items-center gap-2.5 sm:gap-4 font-display">
            
            <button
              id="btn-client-portal-unpaid"
              onClick={() => handleNavClick('pricing-section')}
              className="border border-stone-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors"
            >
              Planes
            </button>

            {/* Mobile Menu Icon */}
            <button 
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 text-stone-700"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-dropdown" className="lg:hidden bg-[#FAFAF9] border-t border-stone-200 px-4 py-4 space-y-1.5 flex flex-col shadow-inner transition-all animate-fadeIn">
          <button 
            id="mob-nav-home"
            onClick={() => { setView('landing'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-left py-2.5 px-3 text-xs uppercase tracking-wider font-bold text-stone-800 hover:bg-stone-50 hover:text-[#9B655E]"
          >
            Inicio
          </button>
          <button 
            id="mob-nav-about"
            onClick={() => handleNavClick('about-me')}
            className="text-left py-2.5 px-3 text-xs uppercase tracking-wider font-bold text-stone-800 hover:bg-stone-50 hover:text-[#9B655E]"
          >
            Quién Soy
          </button>
          <button 
            id="mob-nav-how"
            onClick={() => handleNavClick('how-it-works')}
            className="text-left py-2.5 px-3 text-xs uppercase tracking-wider font-bold text-stone-800 hover:bg-stone-50 hover:text-[#9B655E]"
          >
            ¿Cómo Funciona?
          </button>
          <button 
            id="mob-nav-plans"
            onClick={() => handleNavClick('pricing-section')}
            className="text-left py-2.5 px-3 text-xs uppercase tracking-wider font-bold text-stone-800 hover:bg-stone-50 hover:text-[#9B655E]"
          >
            Planes
          </button>
          <button 
            id="mob-nav-faq"
            onClick={() => handleNavClick('faq-section')}
            className="text-left py-2.5 px-3 text-xs uppercase tracking-wider font-bold text-stone-800 hover:bg-stone-50 hover:text-[#9B655E]"
          >
            FAQ
          </button>
        </div>
      )}
    </header>
  );
}
