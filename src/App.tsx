import { useState, useEffect } from 'react';
import Header from './components/Header';
import BrandLogo from './components/BrandLogo';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import CheckoutModal from './components/CheckoutModal';
import QuestionnaireForm from './components/QuestionnaireForm';
import { PlanOption } from './types';
import { Instagram } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<'landing' | 'checkout' | 'questionnaire' | 'dashboard'>('landing');
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [purchasedEmail, setPurchasedEmail] = useState<string>('');
  const [purchaseData, setPurchaseData] = useState<{name: string, email: string, planName: string, total: string} | null>(null);

  // Check for access token in URL (from Joselin's approval link)
  useEffect(() => {
    // Si la URL tiene /formulario, mostramos el cuestionario directamente
    if (window.location.pathname.startsWith('/formulario') || window.location.search.includes('form=')) {
      setView('questionnaire');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const shortAccess = params.get('a');
    
    if (access || shortAccess) {
      try {
        let decoded;
        if (shortAccess) {
          const arr = JSON.parse(decodeURIComponent(atob(shortAccess)));
          decoded = { name: arr[0], email: arr[1], plan: arr[2] };
        } else {
          decoded = JSON.parse(decodeURIComponent(atob(access)));
        }
        
        if (decoded.name && decoded.email) {
          setPurchaseData({
            name: decoded.name,
            email: decoded.email,
            planName: decoded.plan || 'Plan',
            total: ''
          });
          setHasPaid(true);
          setPurchasedEmail(decoded.email);
          setView('questionnaire');
          
          // Clean the URL without reloading the page
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (e) {
        console.error("Invalid access token");
      }
    }
  }, []);
  
  // Handle plan purchase selection click
  const handleSelectPlan = (plan: PlanOption) => {
    setSelectedPlan(plan);
    setView('checkout');
  };

  // Payment triggers successful purchase step
  const handlePaymentSuccess = (data: { name: string, email: string, planName: string, total: string }) => {
    // Save purchased data and go to questionnaire
    setPurchasedEmail(data.email);
    setHasPaid(true);
    setPurchaseData(data);
    // Store data to pass to questionnaire if needed, or just set view
    setView('questionnaire');
  };

  // Reset demo payment simulation state
  const handleResetDemoState = () => {
    setHasPaid(false);
    setPurchasedEmail('');
    setSelectedPlan(null);
    setView('landing');
    alert("Simulación reiniciada.");
  };

  return (
    <div id="app-root" className="min-h-screen bg-neutral-50 flex flex-col justify-between font-sans">
      
      {/* Universal header */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        hasPaid={hasPaid} 
        onResetDemo={handleResetDemoState}
      />

      {/* Main Dynamic Router Content */}
      <main className="flex-grow">
        {currentView === 'landing' && (
          <div id="landing-container" className="animate-fadeIn">
            {/* 1. Hero Section */}
            <HeroSection onStartClick={() => {
              const el = document.getElementById('pricing-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* 2. Problem/Solution Section */}
            <ProblemSolution />

            {/* 3. Who is Joselin */}
            <AboutSection />

            {/* 4. How It Works */}
            <ProcessSection />

            {/* 5. Proof / Testimonials */}
            <TestimonialsSection />

            {/* 6. Plans & Pricing Cards */}
            <PricingSection onSelectPlan={handleSelectPlan} />

            {/* 7. FAQs accordion */}
            <FAQSection />
          </div>
        )}

        {currentView === 'checkout' && selectedPlan && (
          <div className="py-12 flex justify-center items-center min-h-[70vh] bg-neutral-100">
            <CheckoutModal 
              plan={selectedPlan}
              onClose={() => setView('landing')}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        )}

        {currentView === 'questionnaire' && (
          <QuestionnaireForm purchaseData={purchaseData} />
        )}
      </main>

      {/* Footer Area designed beautifully with modern high-contrast typography */}
      <footer id="app-footer" className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <BrandLogo color="#E6A89E" textColor="text-white" subtitleColor="text-stone-400" />
              
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-sm">
                Asesoría online especializada de recomposición corporal femenina. Técnica guiada, pautas de salud y entrenamientos adaptados a tu vida y horarios reales.
              </p>

              <div className="flex gap-3 pt-2 text-zinc-500 hover:text-orange-400 transition-colors">
                <a 
                  id="foot-instagram"
                  href="https://instagram.com/joselincueto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:bg-stone-850 hover:text-orange-500 transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Instagram className="w-4 h-4 text-orange-500" />
                  <span>@joselincueto</span>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Navegación</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setView('landing');
                      setTimeout(() => {
                        const el = document.getElementById('about-me');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    Sobre Joselin
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setView('landing');
                      setTimeout(() => {
                        const el = document.getElementById('pricing-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    Planes de Precios
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setView('landing');
                      setTimeout(() => {
                        const el = document.getElementById('faq-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    Preguntas Comunes
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal and compliance definitions Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Acreditaciones de Joselin</h4>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li>• Personal Trainer Nutrienfit (LUZ Cert. 2022)</li>
                <li>• Instructor Musculación Sala (FVFC Cert. 2026)</li>
                <li>• Bases Deportivas Científicas Adaptadas para la Mujer</li>
                <li>• Registro de Alumnas Conectado a Servidor Seguro</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-zinc-500 gap-4">
            <div>
              Copyright © 2026 Joselin Next Level Training - <a href="https://www.kromadesign.net/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white transition-colors">Diseñado por Kroma Design</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

