import { motion } from 'motion/react';
import { CreditCard, FileText, CheckCircle } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: <CreditCard className="w-6 h-6 text-orange-600" />,
      title: "Elige tu Plan",
      desc: "Selecciona el nivel de acompañamiento que deseas. El pago es rápido y 100% seguro."
    },
    {
      num: "02",
      icon: <FileText className="w-6 h-6 text-orange-600 animate-pulse" style={{ animationDuration: '3s' }} />,
      title: "Cuéntame de ti (Cuestionario)",
      desc: "Al realizar tu pago, serás redirigida al portal privado donde responderás preguntas clave sobre tu cuerpo, metas, disponibilidad y lesiones."
    },
    {
      num: "03",
      icon: <CheckCircle className="w-6 h-6 text-orange-600" />,
      title: "Recibe tu Rutina en 4-5 Días",
      desc: "Joselin analizará tus respuestas y diseñará a mano tu plan de recomposición corporal con videos de ejercicios específicos y consejos."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-stone-200">
      
      {/* Decorative gradient stripes */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/10 to-transparent -translate-y-1/2 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:max-w-xl mx-auto space-y-4 mb-16">
          <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-bold">Simple, rápido e individualizado</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#1C1917]" id="process-heading">
            ¿Cómo funciona la asesoría?
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Nada de complicaciones. El camino hacia tu cambio está estructurado de manera automatizada para que arranques de inmediato.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10" id="steps-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between group"
            >
              <div>
                {/* Header step card */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-stone-55 border border-stone-15 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-100 group-hover:scale-105 transition-all">
                    {step.icon}
                  </div>
                  <span className="text-4xl sm:text-5xl font-display font-black tracking-tighter text-stone-200 group-hover:text-orange-100 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display uppercase tracking-tight text-stone-900 leading-tight mb-3">
                  {step.title}
                </h3>
                
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Little status bar below */}
              <div className="w-full h-1 bg-stone-100 rounded-full mt-8 overflow-hidden">
                <div 
                  className="h-full bg-[#9B655E]" 
                  style={{ width: `${(idx + 1) * 33.3}%` }} 
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
