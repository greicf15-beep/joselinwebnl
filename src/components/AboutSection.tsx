import { motion } from 'motion/react';
import { Award, BookOpen, Heart, ShieldCheck, Check } from 'lucide-react';

export default function AboutSection() {
  const credentials = [
    {
      icon: <Award className="w-5 h-5 text-[#9B655E]" />,
      title: "Entrenadora Personal Certificada",
      institution: "Nutrienfit / Avalada por LUZ (La Universidad del Zulia) - 2022"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#9B655E]" />,
      title: "Instructor Especialista en Sala de Musculación",
      institution: "Federación Venezolana de Físico Culturismo (FVFC) - Enero 2026"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#9B655E]" />,
      title: "Nutrición y Dietética Aplicada",
      institution: "II Semestre Universitario"
    }
  ];

  return (
    <section id="about-me" className="py-20 sm:py-28 bg-[#FCFAF9] relative overflow-hidden border-t border-stone-200">
      {/* Background gradients */}
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-[#E6A89E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-80 h-80 bg-[#E6A89E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* MOBILE TEXT: Shows only on mobile before the image */}
          <div className="lg:hidden order-1 space-y-6 text-center">
            <span className="text-[#9B655E] font-mono text-xs tracking-widest uppercase font-bold block">
              • QUIÉN SOY Y MI ENFOQUE •
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium uppercase tracking-tight text-[#30070C]">
              Hola, soy Joselin <span className="text-[#E6A89E] italic lowercase font-serif">coach.</span>
            </h2>
            
            <div className="text-stone-700 text-sm leading-relaxed space-y-4">
              <p>
                Tengo 22 años y mi historia en el mundo del fitness comenzó cuando apenas tenía 15. Lo que empezó como simple curiosidad se convirtió rápidamente en mi hobby, mi pasión más grande, y finalmente en mi carrera profesional. No te ofrezco fórmulas milagrosas; te ofrezco <strong className="text-[#30070C] font-semibold">ciencia, técnica rigurosa y acompañamiento empático real</strong>.
              </p>
              <p>
                Como especialista certificada y en constante formación nutricional, entiendo de primera mano los desafíos metabólicos y de horarios que enfrentan mujeres en distintas etapas, desde jóvenes hasta adultas contemporáneas y maduras. Mi misión es entregarte planes basados en evidencia para que dejes de dar vueltas a ciegas y transformes tu físico con bases sólidas y sostenibles.
              </p>
            </div>
          </div>

          {/* Image & Stamp Column */}
          <div className="order-2 lg:order-1 flex justify-center relative">
            <div className="relative w-full max-w-[380px] lg:max-w-[480px] xl:max-w-[550px] aspect-[4/5]" id="about-img-container">
              
              {/* Outer decorative borders - elegant luxury frame using terracotta & rose theme */}
              <div className="absolute -inset-4 bg-[#E6A89E]/20 rounded-[3rem] -rotate-3" />
              <div className="absolute -inset-2 bg-[#9B655E]/10 rounded-[2.8rem] rotate-2" />
              
              <div className="relative w-full h-full bg-[#30070C] rounded-[2.5rem] p-1.5 overflow-hidden shadow-2xl border-2 border-stone-200">
                <div className="w-full h-full rounded-[2.3rem] overflow-hidden">
                  <img 
                    src="/joselinquiensoy.webp" 
                    alt="Joselin Coach de Recomposición Femenina - Box Kneel pose" 
                    className="w-full h-full object-cover object-[85%_top] scale-[1.15] sm:scale-[1.25] translate-y-8 sm:translate-y-12 hover:scale-[1.20] sm:hover:scale-[1.30] transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                    id="about-coach-img"
                  />
                </div>
              </div>

              {/* Heart Stamp Badge celebrating her workout passion */}
              <div className="absolute -bottom-5 -right-5 bg-white shadow-xl px-4 py-3 rounded-2xl border border-stone-200 flex items-center gap-2.5 max-w-[185px] z-20" id="about-badge-heart">
                <div className="w-8 h-8 rounded-full bg-[#FAF6F5] border border-[#E6A89E]/30 flex items-center justify-center text-[#9B655E] shrink-0">
                  <Heart className="w-4 h-4 text-[#9B655E] fill-[#9B655E]/20" />
                </div>
                <span className="text-[10px] font-bold text-stone-800 leading-tight uppercase tracking-wider">Entreno desde los 15 años • Hobby & Pasión</span>
              </div>
            </div>
          </div>

          {/* Biography and list of credentials */}
          <div className="order-3 lg:order-2 space-y-6 text-left">
            <div className="hidden lg:block space-y-6">
              <span className="text-[#9B655E] font-mono text-xs tracking-widest uppercase font-bold block" id="about-tag">
                • QUIÉN SOY Y MI ENFOQUE •
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium uppercase tracking-tight text-[#30070C]" id="about-title">
                Hola, soy Joselin <span className="text-[#E6A89E] italic lowercase font-serif">coach.</span>
              </h2>
              
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4" id="about-description">
                <p>
                  Tengo 22 años y mi historia en el mundo del fitness comenzó cuando apenas tenía 15. Lo que empezó como simple curiosidad se convirtió rápidamente en mi hobby, mi pasión más grande, y finalmente en mi carrera profesional. No te ofrezco fórmulas milagrosas; te ofrezco <strong className="text-[#30070C] font-semibold">ciencia, técnica rigurosa y acompañamiento empático real</strong>.
                </p>
                <p>
                  Como especialista certificada y en constante formación nutricional, entiendo de primera mano los desafíos metabólicos y de horarios que enfrentan mujeres en distintas etapas, desde jóvenes hasta adultas contemporáneas y maduras. Mi misión es entregarte planes basados en evidencia para que dejes de dar vueltas a ciegas y transformes tu físico con bases sólidas y sostenibles.
                </p>
              </div>
            </div>

            {/* List of credentials */}
            <div className="space-y-4 pt-0 lg:pt-6 text-left" id="about-credentials">
              {credentials.map((cred, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-3xl bg-white border border-stone-150 hover:border-[#E6A89E]/40 hover:shadow-lg transition-all flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FAF6F5] border border-[#E6A89E]/20 flex items-center justify-center shrink-0">
                    {cred.icon}
                  </div>
                  <div>
                    <h3 className="font-bold sm:text-base text-[#30070C] uppercase tracking-tight">
                      {cred.title}
                    </h3>
                    <div className="text-[#9B655E] font-bold text-[10px] tracking-widest uppercase mt-0.5">
                      {cred.institution}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
