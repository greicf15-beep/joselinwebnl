import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareQuote, Check } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'gym' | 'casa'>('all');

  const transformations = [
    {
      id: 1,
      name: "Angélica Prieto",
      category: "gym",
      goal: "Aumento de glúteos y mejora de composición",
      weightChange: "Transformación radical",
      time: "1.5 meses",
      quote: "No tenía idea de cómo empezar. Joselin me guió, apoyó y motivó cada día. Mis cambios fueron notorios en poco tiempo. Nunca me había sentido tan fuerte y con tanta energía.",
      picBefore: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=200&auto=format&fit=crop&blur=50",
      picAfter: "/angelica.png",
    },
    {
      id: 2,
      name: "Valeska",
      category: "casa",
      goal: "Acompañamiento y disciplina",
      weightChange: "Cambios reales y sostenibles",
      time: "Proceso continuo",
      quote: "Mi experiencia ha sido excelente. A pesar de ser online, me siento muy acompañada y motivada en el entrenamiento y la alimentación. He logrado ver cambios que sola no habría podido obtener.",
      picBefore: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=200&auto=format&fit=crop&blur=50",
      picAfter: "/valeska.jpg",
    },
    {
      id: 3,
      name: "Anthonella",
      category: "gym",
      goal: "Pérdida de peso y aumento de fuerza",
      weightChange: "- Reducción de grasa, + Tono muscular",
      time: "Cambio de estilo de vida",
      quote: "He notado un cambio brutal en mi resistencia y fuerza. Físicamente me veo y me siento mucho mejor, con más tono muscular y bajé de peso. Ya no veo el gimnasio como obligación sino como un estilo de vida.",
      picBefore: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=200&auto=format&fit=crop&blur=50",
      picAfter: "/antonella.png",
    }
  ];

  const filtered = activeTab === 'all' 
    ? transformations 
    : transformations.filter(t => t.category === activeTab);

  return (
    <section id="testimonials-section" className="py-20 sm:py-24 bg-[#FAFAF9] relative overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center md:max-w-xl mx-auto space-y-4 mb-14">
          <span className="text-[#9B655E] font-mono text-xs uppercase tracking-widest font-bold block">• HISTORIAS DE ÉXITO REAL •</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#1C1917]" id="testimonials-heading">
            Ellas decidieron transformar su vida
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Cambios físicos que van más allá del espejo: seguridad, fuerza de verdad y hábitos indestructibles.
          </p>
 
          {/* Tab buttons */}
          <div className="flex items-center justify-center gap-2 pt-4" id="testimonials-tabs">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'all' ? 'bg-stone-900 text-white shadow-sm' : 'bg-white hover:bg-stone-100 border border-stone-200 text-stone-600'}`}
            >
              Todas
            </button>
            <button 
              onClick={() => setActiveTab('gym')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'gym' ? 'bg-stone-900 text-white shadow-sm' : 'bg-white hover:bg-stone-100 border border-stone-200 text-stone-600'}`}
            >
              En Gimnasio
            </button>
            <button 
              onClick={() => setActiveTab('casa')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'casa' ? 'bg-stone-900 text-white shadow-sm' : 'bg-white hover:bg-stone-100 border border-stone-200 text-stone-600'}`}
            >
              En Casa
            </button>
          </div>
        </div>
 
        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-[#E6A89E] text-[#E6A89E]" />
                    ))}
                  </div>
 
                  {/* Transformation Card */}
                  <div className="flex items-center gap-4 mb-4 border-b border-stone-100 pb-4">
                    {/* Before/After Transformation visual */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-sm border border-stone-100 shrink-0 bg-stone-50">
                      <img 
                        src={item.picAfter} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
 
                    <div>
                      <h4 className="font-bold text-stone-900 uppercase tracking-tight font-display leading-tight">{item.name}</h4>
                      <div className="text-[11px] text-stone-500 font-medium">Tiempo: {item.time}</div>
                      <div className="text-[10px] bg-[#FAF6F5] border border-[#E6A89E]/40 text-[#9B655E] font-bold px-1.5 py-0.5 rounded inline-block mt-1 uppercase tracking-wider font-sans">
                        {item.goal}
                      </div>
                    </div>
                  </div>
 
                  <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed relative z-10 pt-2 pl-4 border-l-2 border-[#9B655E] font-sans">
                    "{item.quote}"
                  </p>
                </div>
 
                <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] sm:text-xs text-stone-500 font-mono space-y-1">
                  <div className="flex justify-between">
                    <span>Cambio logrado:</span>
                    <span className="text-[#9B655E] font-bold font-display">{item.weightChange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ejecución técnica:</span>
                    <span className="text-stone-700 font-semibold">100% mejorada</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
 
      </div>
    </section>
  );
}
