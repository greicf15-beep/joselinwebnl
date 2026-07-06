import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, ArrowRight, User, Target, Dumbbell } from 'lucide-react';

interface QuestionnaireFormProps {
  purchaseData: { name: string, email: string, planName: string, total: string } | null;
}

export default function QuestionnaireForm({ purchaseData }: QuestionnaireFormProps) {
  const [name, setName] = useState(purchaseData?.name || '');
  const [email, setEmail] = useState(purchaseData?.email || '');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('perder_grasa');
  const [location, setLocation] = useState('gimnasio');
  const [injuries, setInjuries] = useState('');
  const [experience, setExperience] = useState('principiante');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = "584126851261"; // Reemplazar con el teléfono real
    const message = `🚨 *¡Nuevo formulario completado!*\n\n` +
      `*Datos de Compra:*\n` +
      `- Cliente: ${purchaseData?.name || 'N/A'}\n` +
      `- Email: ${purchaseData?.email || 'N/A'}\n` +
      `- Plan: ${purchaseData?.planName || 'N/A'}\n\n` +
      `*Datos Físicos:*\n` +
      `- Edad: ${age} años\n` +
      `- Peso: ${weight} kg\n` +
      `- Altura: ${height} cm\n\n` +
      `*Objetivo y Entrenamiento:*\n` +
      `- Meta Principal: ${goal.replace('_', ' ')}\n` +
      `- Experiencia: ${experience}\n` +
      `- Lugar de Entreno: ${location}\n` +
      `- Lesiones: ${injuries || 'Ninguna'}\n\n` +
      `¡Lista para empezar mi plan! 💪`;

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] bg-neutral-100 py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg mx-auto"
        >
          <div className="w-20 h-20 bg-neutral-900 rounded-full text-white flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-black tracking-tight mb-4 text-neutral-900">
            ¡Todo Listo!
          </h2>
          <p className="text-neutral-500 font-sans mb-8">
            Si no se abrió la ventana de WhatsApp automáticamente, haz clic en el botón de abajo para enviarle tus datos a Joselin.
          </p>
          <button
            onClick={() => window.open(`https://wa.me/584126851261`, '_blank', 'noopener,noreferrer')}
            className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-all"
          >
            Abrir WhatsApp Manualmente
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-neutral-100 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-neutral-900 p-8 text-white text-center">
            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-[#E6A89E]" />
            <h2 className="text-3xl font-display font-black tracking-tight mb-2">
              Formulario Diagnóstico
            </h2>
            <p className="text-neutral-400 font-sans max-w-md mx-auto">
              Para diseñar tu plan {purchaseData?.planName ? `(${purchaseData.planName})` : ''} 100% personalizado, necesitamos conocer tu punto de partida.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {!purchaseData && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E6A89E]" />
                  Tus Datos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all"
                      placeholder="Ej: Ana María"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all"
                      placeholder="Ej: ana@email.com"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Medidas Básicas */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 flex items-center gap-2">
                <User className="w-4 h-4 text-[#E6A89E]" />
                Datos Físicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Edad (años)</label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all"
                    placeholder="Ej: 28"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all"
                    placeholder="Ej: 65"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Altura (cm)</label>
                  <input
                    type="number"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all"
                    placeholder="Ej: 165"
                  />
                </div>
              </div>
            </div>

            {/* Objetivos y Experiencia */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#E6A89E]" />
                Metas y Experiencia
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-2">Objetivo Principal</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all bg-white"
                  >
                    <option value="perder_grasa">Perder Grasa / Definir</option>
                    <option value="aumentar_masa">Aumentar Masa Muscular</option>
                    <option value="recomposicion">Recomposición Corporal</option>
                    <option value="mantenimiento">Mantenimiento / Salud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-2">Nivel de Experiencia</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all bg-white"
                  >
                    <option value="principiante">Principiante (0-6 meses)</option>
                    <option value="intermedio">Intermedio (6 meses - 2 años)</option>
                    <option value="avanzado">Avanzado (+2 años)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Entrenamiento y Lesiones */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#E6A89E]" />
                Entrenamiento
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2">Lugar de Entrenamiento</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="gimnasio"
                      checked={location === 'gimnasio'}
                      onChange={(e) => setLocation(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`text-center py-3 px-4 rounded-xl border-2 transition-all ${location === 'gimnasio' ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-300'}`}>
                      <span className="font-semibold text-sm">Gimnasio</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="casa"
                      checked={location === 'casa'}
                      onChange={(e) => setLocation(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`text-center py-3 px-4 rounded-xl border-2 transition-all ${location === 'casa' ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-300'}`}>
                      <span className="font-semibold text-sm">En Casa</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2">Lesiones o patologías</label>
                <textarea
                  value={injuries}
                  onChange={(e) => setInjuries(e.target.value)}
                  placeholder="Ej: Molestias en rodilla derecha, hipotiroidismo..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base group"
              >
                Enviar y Contactar por WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
