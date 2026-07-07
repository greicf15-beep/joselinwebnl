import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Trophy, Dumbbell, Star, ChevronRight } from 'lucide-react';
import { JoselinLogoSymbol } from './BrandLogo';

interface HeroSectionProps {
  onStartClick: () => void;
}

export default function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section id="hero-section" className="bg-[#FAF6F5] pt-4 pb-16 lg:pt-8 lg:pb-24 overflow-hidden relative">
      {/* Decorative Brand Circles & Background elements */}
      <div className="absolute top-1/3 left-[-10%] w-[30%] aspect-square rounded-full bg-[#E6A89E]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-[25%] aspect-square rounded-full bg-[#FAF6F5] blur-2xl pointer-events-none border border-[#E6A89E]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card mimicking Marcus Reid Layout */}
        <div className="bg-[#30070C] rounded-[2.5rem] text-white overflow-hidden shadow-2xl relative border border-[#4D2123]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[640px] lg:min-h-[720px]">
            
            {/* Left Column: Headline and Key details - 7 Cols */}
            <div className="order-2 lg:order-1 lg:col-span-7 p-8 sm:p-14 lg:p-16 flex flex-col justify-between relative z-20">
              
              {/* Top Badge and Stamp */}
              <div>
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6A89E]/10 border border-[#E6A89E]/20 text-[#E6A89E] text-[10px] font-bold tracking-widest uppercase mb-8"
                  id="hero-badge"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E6A89E] animate-pulse" />
                  <span>Personal Trainer • Certificación LUZ</span>
                </div>
                
                {/* Massive headline mimicking "FORGE YOUR BEST SELF" */}
                <h1 
                  className="text-4xl sm:text-6xl lg:text-[5.5rem] font-display font-medium leading-[0.85] tracking-tighter uppercase mb-6"
                  id="hero-headline"
                >
                  FORJA TU<br/>
                  MEJOR <span className="text-[#E6A89E] font-serif italic lowercase tracking-normal">versión.</span>
                </h1>

                <p 
                  className="text-stone-300 text-sm sm:text-base max-w-lg leading-relaxed mb-10 font-sans"
                  id="hero-subtext"
                >
                  Entrena de forma inteligente con un plan 100% personalizado adaptado a tu cuerpo, tu tiempo y tus objetivos.
                </p>

                {/* Primary CTAs in horizontal flow */}
                <div 
                  className="flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16"
                  id="hero-ctas"
                >
                  <button
                    id="hero-btn-primary"
                    onClick={onStartClick}
                    className="bg-[#E6A89E] hover:bg-[#F5D3C8] text-[#30070C] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-xl shadow-[#1B0406]/34 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>Comenzar Mi Cambio</span>
                    <ArrowRight className="w-4 h-4 text-[#30070C]" />
                  </button>
                  
                  <button
                    id="hero-btn-secondary"
                    onClick={() => {
                      const el = document.getElementById('pricing-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-transparent border border-stone-500 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                  >
                    Ver Programas
                  </button>
                </div>
              </div>

              {/* Stats Block - Bento styled stat overlays */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-black text-[#E6A89E] tracking-tight">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-200">Personalizado</div>
                  <p className="text-[11px] text-stone-400 font-sans">Diseñado exclusivamente para tus horarios, nivel y objetivos.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-display font-black text-[#E6A89E] tracking-tight">+7</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-200">Años de Experiencia</div>
                  <p className="text-[11px] text-stone-400 font-sans">Transformando físicos de forma sostenible y científica con la mejor metodología.</p>
                </div>
              </div>

            </div>

            {/* Right Column: Prominent Trainer Portrait & Back-Text - 5 Cols */}
            <div className="order-1 lg:order-2 lg:col-span-5 bg-[#1B0406]/55 relative min-h-[400px] sm:min-h-[480px] lg:min-h-full flex items-end justify-center overflow-hidden border-b lg:border-b-0 lg:border-l border-white/5">
              
              {/* Giant Background Title behind the trainer: "JOSELIN" */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
              >
                <span 
                  className="text-[#E6A89E]/[0.025] font-display font-bold uppercase tracking-tighter"
                  style={{ fontSize: '13vw', leading: '1' }}
                >
                  JOSELIN
                </span>
              </div>

              {/* Decorative radial lighting behind her silhouette */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-[#E6A89E]/10 blur-3xl bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-0" />

              {/* Master Trainer Photo with dynamic fallback */}
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[98%] flex items-end justify-center z-10 px-0">
                <img 
                  src="/joselinhome.webp" 
                  onError={(e) => {
                    const target = e.currentTarget;
                    const currentSrc = target.src || '';
                    if (currentSrc.includes('.webp')) {
                      target.src = "/joselin_flex.png";
                    } else if (currentSrc.includes('/joselin_flex.png') && !currentSrc.includes('.png.png')) {
                      target.src = "/joselin_flex.png.png";
                    } else if (currentSrc.includes('/joselin_flex.png.png')) {
                      target.src = "/assets/joselin_flex.png";
                    } else {
                      target.src = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000";
                    }
                  }}
                  alt="Joselin Personal Trainer Crouch" 
                  className="-mb-[185px] sm:-mb-[14px] max-h-[120%] sm:max-h-[105%] max-w-[110%] sm:max-w-[100%] lg:max-h-full lg:max-w-full object-contain select-none filter drop-shadow-[0_20px_50px_rgba(230,168,158,0.25)] transition-all duration-700 scale-[1.25] sm:scale-110 lg:scale-102 hover:scale-[1.3] sm:hover:scale-115 lg:hover:scale-105 origin-bottom"
                  style={{ paddingLeft: '0px', paddingTop: 0, paddingBottom: 140, marginTop: '0px', marginRight: '0px' }}
                  referrerPolicy="no-referrer"
                  id="hero-trainer-silhouette"
                />

                {/* Floating Glassmorphism Badge */}
                <div 
                  className="-mb-[21px] sm:mb-0 absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[#30070C]/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-[200px]"
                  id="floating-coach-badge"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E6A89E] flex items-center justify-center shrink-0">
                    <JoselinLogoSymbol className="w-5 h-5" color="#30070C" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white block uppercase tracking-wider">Joselin Coach</span>
                    <span className="text-[9px] text-[#E6A89E] font-medium block uppercase tracking-widest mt-0.5">Asesoría Con Ciencia</span>
                  </div>
                </div>

                {/* Left Floating Badge - Star rating trust */}
                <div className="absolute top-4 left-4 bg-[#160305]/85 backdrop-blur-md border border-white/5 py-1 px-2.5 rounded-full flex items-center gap-1 shadow-lg z-20">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 text-[#E6A89E] fill-[#E6A89E]" />
                    ))}
                  </div>
                  <span className="text-[8px] font-bold tracking-wider uppercase text-stone-200">5.0 (200+)</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
