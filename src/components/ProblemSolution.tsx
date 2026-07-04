import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, ChevronRight, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function ProblemSolution() {
  const problems = [
    "Haces horas de cardio y comes poco, pero tu cuerpo se ve fláccido en lugar de tonificado.",
    "Copias rutinas genéricas de celebridades, pero no se adaptan a tu nivel ni a tu tipo de cuerpo.",
    "Sientes vergüenza o confusión al entrar al gimnasio porque no sabes qué ejercicios hacer ni con qué pesos.",
    "Piensas que para ver cambios tienes que vivir a base de lechuga y pollo hervido."
  ];

  const solutions = [
    {
      title: "Recomposición Corporal",
      desc: "El verdadero secreto no es bajar de peso en la báscula, es perder grasa y ganar músculo al mismo tiempo para moldear una silueta firme y fuerte."
    },
    {
      title: "Diseño para tu Vida Real",
      desc: "Planes que contemplan si entrenas en casa, en gimnasio equipado, si tienes 45 minutos o 1.5 horas, o si arrastras molestias lumbares."
    },
    {
      title: "Educación y Autonomía",
      desc: "Te enseño la técnica correcta para que asistas con seguridad al gimnasio y entiendas el porqué de cada repetición y de cada ejercicio."
    }
  ];

  const programs = [
    {
      num: "01",
      title: "Asesoría De Fuerza",
      desc: "Rutinas de fuerza 100% individualizadas adaptadas a tus lesiones, nivel, material disponible (Gym o Casa) e historial deportivo.",
      highlight: false
    },
    {
      num: "02",
      title: "Plan De Cardio Inteligente",
      desc: "Programación complementaria opcional (pacing de pasos, HIIT, LISS) para maximizar el gasto de energía y cuidar tu corazón.",
      highlight: false
    },
    {
      num: "03",
      title: "Nutrición Flexible Científica",
      desc: "Pautas nutricionales guiadas por ciencia biológica y energética. Come rico, cubre tus macronutrientes indispensables y pierde grasa.",
      highlight: true
    },
    {
      num: "04",
      title: "Soporte Técnico En Video",
      desc: "Envío semanal de videos de tu técnica en sentadilla, peso muerto y empujes para corrección inmediata y prevención de lesiones.",
      highlight: false
    }
  ];

  return (
    <section id="problem-solution" className="pt-20 sm:pt-28 bg-[#1C1111] text-white relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-[#9B655E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-[#E6A89E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* UPPER PART: COMPARISON - Error vs Method */}
        <div className="text-center md:max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[#E6A89E] font-mono text-xs uppercase tracking-widest font-bold">¿Te sientes identificada?</span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight leading-none" id="problem-heading">
            Entrenar duro no sirve si entrenas sin un plan.
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Muchos programas comerciales prometen pérdidas de peso mágicas y rápidas, destruyendo tu masa muscular y enlenteciendo tu metabolismo. Es hora de cambiar el enfoque.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-28" id="problem-grid">
          
          {/* Column A: Problems */}
          <div className="bg-[#261B1B] rounded-3xl p-8 border border-white/5 flex flex-col justify-between shadow-lg">
            <div>
              <div className="inline-flex items-center gap-2 text-[#E6A89E] font-bold text-xs tracking-wider uppercase mb-8 font-display">
                <AlertCircle className="w-5 h-5 text-[#E6A89E]" />
                Enfoque Común (El estancamiento)
              </div>
              
              <ul className="space-y-4">
                {problems.map((prob, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4.5 text-stone-300 text-sm sm:text-base leading-relaxed border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[#E6A89E] font-bold shrink-0">✕</span>
                    <span>{prob}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="text-stone-500 text-[10px] sm:text-xs mt-8 pt-4 border-t border-white/5 font-mono uppercase tracking-wider">
              REPERCUSIONES: Frustración, pérdida de masa muscular, rebotes crónicos.
            </div>
          </div>

          {/* Column B: Our Solution */}
          <div className="bg-gradient-to-br from-[#30070C] to-[#261B1B] rounded-3xl p-8 border border-[#9B655E]/20 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[#E6A89E] font-bold text-xs tracking-wider uppercase mb-8 font-display">
                <Zap className="w-5 h-5 text-[#E6A89E] animate-pulse" />
                El Método Joselin (La ciencia aplicada)
              </div>

              <div className="space-y-6">
                {solutions.map((sol, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#E6A89E]/10 border border-[#E6A89E]/20 flex items-center justify-center text-[#E6A89E] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase text-stone-100 text-base sm:text-lg tracking-tight font-display">
                        {sol.title}
                      </h4>
                      <p className="text-stone-400 text-xs sm:text-sm mt-1 leading-relaxed font-sans">
                        {sol.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#E6A89E]/10 text-stone-200 text-xs sm:text-sm p-4 rounded-2xl border border-[#E6A89E]/20 mt-8 flex items-center justify-between font-medium">
              <span>Resultado: Silueta firme, fuerte, activa e inteligente.</span>
              <ChevronRight className="w-4 h-4 shrink-0 text-[#E6A89E]" />
            </div>
          </div>

        </div>
      </div>

      {/* LOWER PART: Motivational Quote Section */}
      <div 
        className="mt-20 flex flex-col items-center justify-center text-center space-y-6 px-4 bg-cover bg-center bg-no-repeat w-full min-h-[600px] lg:min-h-[800px]"
        style={{ backgroundImage: "url('/fondofraseescritorio.webp')" }}
      >
        <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium tracking-tighter leading-tight max-w-4xl mx-auto text-white">
            "No se trata de pesar menos; es ganar más fuerza, salud y bienestar."
          </h3>
          <p className="text-[#330808] font-mono text-xs sm:text-sm tracking-widest font-bold uppercase">
            — Tu mejor versión te está esperando
          </p>
        </div>
      </div>
    </section>
  );
}
