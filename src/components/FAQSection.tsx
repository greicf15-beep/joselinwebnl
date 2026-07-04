import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      q: "¿Sirve si nunca he pisado un gimnasio?",
      a: "¡Por supuesto! Mis rutinas están adaptadas a todos los niveles. Si eres principiante absoluta, diseñaré un plan simplificado y enfocado en que aprendas correctamente la técnica de ejecución (sentadillas, empujes, etc.) para evitar lesiones y ganar seguridad desde el día uno."
    },
    {
      q: "¿Puedo entrenar en casa?",
      a: "Sí. Dentro del cuestionario post-pago, podrás indicar si vas a entrenar en casa y detallar con qué material cuentas (mancuernas, ligas, peso corporal). Diseñaré el plan para que consigas la misma intensidad de estímulo muscular que en un gimnasio comercial."
    },
    {
      q: "¿La asesoría incluye plan de alimentación?",
      a: "Actualmente curso el II semestre de Nutrición y Dietética. Por ética y respeto profesional, no receto dietas médicas restrictivas. Sin embargo, te proporciono una guía detallada de hábitos saludables, recomendaciones de porciones de proteínas/carbohidratos y estimaciones calóricas personalizadas para potenciar tus resultados en los entrenamientos."
    },
    {
      q: "¿Cuándo recibo mi plan después de realizar el cuestionario?",
      a: "Recibirás tu plan de entrenamiento 100% individualizado en un plazo de 4 a 5 días hábiles a partir del momento en que envíes el cuestionario completado. Este tiempo es indispensable porque analizo personalmente cada una de tus respuestas para armar la rutina ideal para ti."
    },
    {
      q: "¿Qué pasa si tengo lesiones o dolores (rodillas, zona lumbar)?",
      a: "Tengo una certificación especializada de musculación avalada por la Federación Venezolana de Físico Culturismo (FVFC). Diseñaré tu rutina descartando variantes que comprometan articulaciones vulnerables y agregando ejercicios correctores para fortalecer tus ligamentos y tu zona lumbar."
    },
    {
      q: "¿Cómo se realizan los chequeos de progreso?",
      a: "Si estás en el plan Recomposición Pro o superior, tendremos un contacto directo semanal vía WhatsApp. Me enviarás tus mediciones corporales y fotos opcionales (con la misma iluminación y ropa) para evaluar tu tasa de progreso y ajustar las cargas."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq-section" className="py-20 sm:py-28 bg-[#FAFAF9] relative border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100/20 border border-orange-200/45 rounded-full text-orange-600 font-bold text-xs uppercase tracking-wider font-display">
            <HelpCircle className="w-3.5 h-3.5" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#1C1917]" id="faq-heading">
            ¿Tienes alguna duda sobre el proceso?
          </h2>
          <p className="text-stone-500 text-sm">
            Respuestas directas a las preguntas que suelen hacerme mis alumnas antes de comenzar.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordions">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-orange-300 bg-white shadow-md shadow-orange-950/5' 
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <button
                  id={`btn-faq-toggle-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4 sm:py-5 px-6 flex justify-between items-center text-left gap-4 font-bold tracking-tight text-sm sm:text-base text-stone-900 transition-colors"
                >
                  <span className="font-display uppercase tracking-tight leading-tight">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-orange-600 text-white border-orange-600 rotate-180' : 'bg-stone-50 text-stone-500 border-stone-200'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 sm:pb-6 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-orange-100/50 pt-2 font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
