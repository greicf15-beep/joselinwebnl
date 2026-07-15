import { motion } from 'motion/react';
import { Check, Star, HelpCircle } from 'lucide-react';
import { PlanOption } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PlanOption) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans: PlanOption[] = [
    {
      id: "esencial",
      name: "Esencial: Fit Start",
      price: "$50",
      period: "Por mes",
      tagline: "Tu estructura de éxito. Ideal para romper estancamientos.",
      isPopular: false,
      features: [
        "Rutina personalizada (4 o 5 días)",
        "Cálculo y guía de macronutrientes",
        "Protocolo de suplementación básica",
        "Renovación y ajuste mensual",
        "Soporte por correo en 24-48 horas"
      ]
    },
    {
      id: "premium",
      name: "Premium: Total Transformation",
      price: "$80",
      period: "Por mes",
      tagline: "Acompañamiento estricto y personalización máxima.",
      isPopular: true,
      features: [
        "Todo lo incluido en el Plan Esencial",
        "Guía nutricional estructurada",
        "Check-in y monitoreo semanal",
        "Análisis y corrección técnica en videos",
        "Soporte prioritario vía WhatsApp",
        "Bitácora de progreso digital"
      ]
    },
    {
      id: "vip",
      name: "VIP: Next Level Coached",
      price: "$120",
      period: "Por mes (Cupos limitados)",
      tagline: "Máxima exclusividad. Enfoque 360° de alta gama.",
      isPopular: false,
      features: [
        "Todo lo incluido en el Plan Premium",
        "Mentoría mensual 1-on-1 (30 min)",
        "Contenido educativo exclusivo",
        "Soporte de emergencia prioritario",
        "Protocolo de viajes y eventos"
      ]
    }
  ];

  return (
    <section id="pricing-section" className="py-20 sm:py-28 bg-[#FAF6F5] relative overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:max-w-xl mx-auto space-y-4 mb-20">
          <span className="text-[#9B655E] font-mono text-xs uppercase tracking-widest font-bold block">• INVERSIÓN EN TI MISMA •</span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium uppercase tracking-tight text-[#30070C]" id="pricing-heading">
            ELIGE EL CAMINO A TU BIENESTAR
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed font-sans">
            Sin contratos forzosos. Cancela o detén tu suscripción cuando quieras. Al realizar el pago, obtendrás acceso inmediato a tu cuestionario individualizado.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="pricing-grid">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white rounded-[2.2rem] p-6 sm:p-8 flex flex-col justify-between relative shadow-sm border transition-all ${
                plan.isPopular 
                  ? 'border-[#9B655E]/50 shadow-xl shadow-[#30070C]/5 scale-[1.02] ring-4 ring-[#9B655E]/5 md:-translate-y-2' 
                  : 'border-stone-200/80 hover:border-stone-300'
              }`}
              id={`plan-card-${plan.id}`}
            >
              {/* Popular item gold star */}
              {plan.isPopular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#30070C] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md border border-[#E6A89E]/20">
                  <Star className="w-3.5 h-3.5 text-[#E6A89E] fill-[#E6A89E]" />
                  <span>El más elegido</span>
                </div>
              )}

              <div>
                {/* Header card pricing list */}
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-medium uppercase text-[#30070C] tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-stone-550 mt-1 leading-snug font-sans">
                    {plan.tagline}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 mb-8 border-b border-stone-100 pb-6">
                  <span className="text-4xl sm:text-5xl font-display font-bold text-[#30070C]">
                    {plan.price}
                  </span>
                  <span className="text-xs text-stone-500 font-medium font-mono uppercase tracking-wider">
                    / {plan.period}
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3.5 mb-10 text-left">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#FAF6F5] border border-[#E6A89E]/40 flex items-center justify-center text-[#9B655E] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-stone-600 text-xs sm:text-sm leading-snug font-sans">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                id={`btn-purchase-${plan.id}`}
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-wider text-xs transform active:scale-95 transition-all text-center cursor-pointer ${
                  plan.isPopular 
                    ? 'bg-[#9B655E] hover:bg-[#84534E] text-white shadow-lg shadow-[#30070C]/15' 
                    : 'bg-stone-900 hover:bg-stone-850 text-white'
                }`}
              >
                Comenzar Asesoría
              </button>
            </motion.div>
          ))}
        </div>

        {/* Small trust text */}
        <div className="text-center text-stone-400 text-xs mt-12 flex justify-center items-center gap-1.5 font-sans">
          <HelpCircle className="w-4 h-4 text-stone-300" />
          <span>Pago seguro. Acceso instantáneo al cuestionario.</span>
        </div>
        
        {/* Contact Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-stone-500 font-medium mb-2">Para más información, dale clic y envíame un email a:</p>
          <a href="mailto:info@joselinnextlevel.com" className="inline-flex items-center gap-2 text-base font-bold text-[#9B655E] hover:text-[#84534E] transition-colors">
            info@joselinnextlevel.com
          </a>
        </div>

      </div>
    </section>
  );
}
