import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Copy, CheckCircle2, Lock, Loader2, X, Check, Image as ImageIcon } from 'lucide-react';
import { PlanOption } from '../types';

interface CheckoutModalProps {
  plan: PlanOption;
  onClose: () => void;
  onPaymentSuccess: (data: { name: string, email: string, planName: string, total: string }) => void;
}

type PaymentMethod = 'zelle' | 'binance' | 'pagomovil' | 'paypal';

export default function CheckoutModal({ plan, onClose, onPaymentSuccess }: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>('zelle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  // Specific fields
  const [zelleHolder, setZelleHolder] = useState('');
  const [zelleAmount, setZelleAmount] = useState('');
  const [binanceTxid, setBinanceTxid] = useState('');
  const [pmBank, setPmBank] = useState('');
  const [pmReference, setPmReference] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalTxid, setPaypalTxid] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const [status, setStatus] = useState<'editing' | 'processing' | 'success' | 'submitted'>('editing');

  // Helper to copy text
  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyBtn = (text: string, id: string) => (
    <button 
      type="button"
      onClick={() => copyToClipboard(text, id)}
      className="ml-2 p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500 transition-colors"
      title="Copiar"
    >
      {copiedField === id ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !whatsapp) {
      alert("Por favor ingresa tu nombre, correo y número de WhatsApp.");
      return;
    }
    
    setStatus('processing');
    
    const orderId = `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    let detailsString = '';
    if (method === 'zelle') detailsString = `Zelle: Titular ${zelleHolder}, Monto: ${zelleAmount}`;
    else if (method === 'binance') detailsString = `Binance: TXID/Usuario ${binanceTxid}`;
    else if (method === 'pagomovil') detailsString = `Pago Móvil: Banco ${pmBank}, Ref ${pmReference}`;
    else if (method === 'paypal') detailsString = `PayPal: Correo Origen ${paypalEmail}, Ref ${paypalTxid}`;

    const message = `🚨 *¡Nuevo pago reportado!*\n\n*Cliente:* ${name}\n*WhatsApp:* ${whatsapp}\n*Plan:* ${plan.name} (${plan.price})\n*Método:* ${method.toUpperCase()}\n*Detalles:* ${detailsString}`;

    try {
      // Fetch directamente desde el cliente para compatibilidad con hosting estático (ej. Vercel)
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8602916245:AAGqaY4oikBItzMOgGQ3TcHWz2bFOk5CMBA";
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || "992461854";
      
      // Limpiamos los caracteres especiales (ej. + o espacios)
      let cleanWa = whatsapp.replace(/\D/g,'');
      
      // Autocorrección EXCLUSIVA para números de Venezuela sin el +58 (ej. 0414... o 414...)
      const vePrefixes = ['414', '424', '412', '416', '426'];
      if (cleanWa.length === 11 && cleanWa.startsWith('0') && vePrefixes.includes(cleanWa.substring(1, 4))) {
        cleanWa = '58' + cleanWa.substring(1);
      } else if (cleanWa.length === 10 && vePrefixes.includes(cleanWa.substring(0, 3))) {
        cleanWa = '58' + cleanWa;
      }
      
      // Usar enlace de formulario limpio y universal
      const shortAccessLink = `https://joselinnextlevel.com/formulario`;

      const waMessage = `¡Hola ${name}! Tu pago del plan ${plan.name} ha sido aprobado con éxito ✅. Aquí tienes tu enlace de acceso único para iniciar tu proceso: \n\n${shortAccessLink}`;
      const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;

      const textWithLinks = message + "\n\nPara aprobar y enviar el enlace al cliente por WhatsApp, haz clic en el botón de abajo.";

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: textWithLinks,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "✅ Aprobar y Enviar WhatsApp",
                  url: waUrl
                }
              ]
            ]
          }
        })
      });
      
      const data = await response.json();
      if (!data.ok) {
        console.error("Telegram API Error:", data);
      }
      
      // Independientemente de si la petición al backend falla, mostramos éxito
      // para no bloquear al usuario (en caso de que Telegram falle).
      setStatus('submitted');

    } catch (err: any) {
      console.error(err);
      setStatus('submitted');
    }
  };

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        onPaymentSuccess({ name, email, planName: plan.name, total: plan.price });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <div id="checkout-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col relative"
        id="checkout-card"
      >
        
        {/* Header decoration */}
        <div className="bg-[#30070C] p-6 text-white text-center relative flex justify-between items-center">
          <div>
             <h3 className="font-display font-black text-xl tracking-tight text-left">Confirmar Compra</h3>
             <p className="text-xs text-neutral-400 font-medium tracking-wide uppercase mt-1 text-left">{plan.name} — {plan.price}</p>
          </div>
          <button 
            id="checkout-close"
            onClick={onClose} 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on status */}
        <div className="p-6 sm:p-8 flex-grow bg-neutral-50 overflow-y-auto max-h-[80vh]">
          <AnimatePresence mode="wait">
            
            {status === 'editing' && (
              <motion.form 
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
                id="checkout-form"
              >
                
                {/* Step 1: Payment Method Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest">1. Método de Pago</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'zelle', label: 'Zelle' },
                      { id: 'binance', label: 'Binance Pay' },
                      { id: 'pagomovil', label: 'Pago Móvil' },
                      { id: 'paypal', label: 'PayPal' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id as PaymentMethod)}
                        className={`py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          method === m.id 
                            ? 'border-[#30070C] bg-[#30070C] text-white shadow-md' 
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Show Data */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest">2. Datos de Transferencia</label>
                  <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm space-y-4">
                    {method === 'zelle' && (
                      <>
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Correo Zelle</p>
                            <p className="font-mono text-sm sm:text-base font-semibold text-neutral-800">7869718364</p>
                          </div>
                          {handleCopyBtn('7869718364', 'zelle-email')}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Titular</p>
                            <p className="font-sans text-sm font-medium text-neutral-800">Alejandro Cueto</p>
                          </div>
                        </div>
                      </>
                    )}

                    {method === 'binance' && (
                      <>
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Pay ID</p>
                            <p className="font-mono text-sm sm:text-base font-semibold text-neutral-800">1098681051</p>
                          </div>
                          {handleCopyBtn('1098681051', 'binance-id')}
                        </div>
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Usuario (Opcional)</p>
                            <p className="font-mono text-sm font-medium text-neutral-800">Gabriele Magitt rx7E</p>
                          </div>
                          {handleCopyBtn('Gabriele Magitt rx7E', 'binance-user')}
                        </div>
                        <div className="pt-1">
                           <p className="text-xs text-neutral-500 font-medium">Por favor enviar la cantidad exacta en USDT.</p>
                        </div>
                      </>
                    )}

                    {method === 'pagomovil' && (
                      <>
                        <div className="grid grid-cols-2 gap-4 border-b border-neutral-100 pb-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Banco</p>
                            <p className="font-sans text-sm font-semibold text-neutral-800">Mercantil</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Cédula</p>
                              <p className="font-mono text-sm font-semibold text-neutral-800">V-30231327</p>
                            </div>
                            {handleCopyBtn('V30231327', 'pm-ci')}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Teléfono</p>
                            <p className="font-mono text-sm font-semibold text-neutral-800">0414-6404213</p>
                          </div>
                          {handleCopyBtn('04146404213', 'pm-phone')}
                        </div>
                      </>
                    )}

                    {method === 'paypal' && (
                      <>
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Correo PayPal</p>
                            <p className="font-mono text-sm sm:text-base font-semibold text-neutral-800">cuetojoselin@gmail.com</p>
                          </div>
                          {handleCopyBtn('cuetojoselin@gmail.com', 'paypal-email')}
                        </div>
                        <div className="pt-1">
                           <p className="text-xs text-neutral-500 font-medium">Por favor, calcular y enviar el monto exacto cubriendo la comisión.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Step 3: Report Form */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-widest">3. Reportar Pago</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Common fields */}
                    <div className="sm:col-span-2">
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu Nombre Completo"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tu Correo Electrónico"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                      />
                    </div>\n                    <div className="sm:col-span-2">
                      <input 
                        type="tel" 
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Tu WhatsApp (ej. +584141234567)"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                      />
                    </div>

                    {/* Conditional fields */}
                    {method === 'zelle' && (
                      <>
                        <div className="sm:col-span-2">
                          <input 
                            type="text" 
                            required
                            value={zelleHolder}
                            onChange={(e) => setZelleHolder(e.target.value)}
                            placeholder="Nombre del titular de la cuenta Zelle"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input 
                            type="text" 
                            required
                            value={zelleAmount}
                            onChange={(e) => setZelleAmount(e.target.value)}
                            placeholder="Monto exacto enviado"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                          />
                        </div>
                      </>
                    )}

                    {method === 'binance' && (
                      <div className="sm:col-span-2">
                        <input 
                          type="text" 
                          required
                          value={binanceTxid}
                          onChange={(e) => setBinanceTxid(e.target.value)}
                          placeholder="Últimos 6 dígitos del TXID o Usuario"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                        />
                      </div>
                    )}

                    {method === 'pagomovil' && (
                      <>
                        <div className="col-span-1">
                          <input 
                            type="text" 
                            required
                            value={pmBank}
                            onChange={(e) => setPmBank(e.target.value)}
                            placeholder="Banco de origen"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                          />
                        </div>
                        <div className="col-span-1">
                          <input 
                            type="text" 
                            required
                            value={pmReference}
                            onChange={(e) => setPmReference(e.target.value)}
                            placeholder="Últimos 4 núm. de ref."
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                          />
                        </div>
                      </>
                    )}

                    {method === 'paypal' && (
                      <>
                        <div className="sm:col-span-2">
                          <input 
                            type="email" 
                            required
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            placeholder="Correo PayPal de origen"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input 
                            type="text" 
                            value={paypalTxid}
                            onChange={(e) => setPaypalTxid(e.target.value)}
                            placeholder="Número de referencia (Opcional)"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm transition-all bg-white"
                          />
                        </div>
                      </>
                    )}
                    
                    {/* Optional Screenshot */}
                    <div className="sm:col-span-2">
                      <label className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors bg-white">
                        <div className="flex items-center gap-2 text-neutral-500">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-sm font-medium">Subir captura del pago (Opcional)</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#30070C] hover:bg-[#4D2123] text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                  >
                    Verificar mi pago
                    <ShieldCheck className="w-5 h-5" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 4: Hold State */}
            {status === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="relative mb-8">
                  {/* Rotating elegant ring */}
                  <svg className="animate-spin w-24 h-24 text-neutral-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"></circle>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"></path>
                  </svg>
                  <Lock className="w-6 h-6 text-[#30070C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                <h4 className="font-display font-medium text-2xl text-[#30070C] mb-4">Estamos validando tu transacción</h4>
                <p className="text-sm text-neutral-600 max-w-sm leading-relaxed mx-auto">
                  Este proceso puede tomar un par de minutos. En cuanto confirmemos, tu portal diagnóstico se desbloqueará automáticamente.
                </p>
                <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-lg max-w-sm text-left flex gap-3 items-start">
                  <span className="text-amber-500 mt-0.5">⚠️</span>
                  <p>
                    <strong>¡Importante!</strong> Por favor no cierres ni cambies de pestaña hasta que recibas la confirmación.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="w-20 h-20 bg-[#30070C] rounded-full text-white flex items-center justify-center mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-black text-neutral-900 tracking-tight mb-2">
                  ¡Pago Aprobado!
                </h2>
                <p className="text-neutral-500 max-w-sm mx-auto mb-8">
                  Tu pago ha sido validado exitosamente. Redirigiendo a tu portal...
                </p>
              </motion.div>
            )}

            {status === 'submitted' && (
              <motion.div 
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center justify-center text-center px-6"
              >
                <div className="w-20 h-20 bg-[#30070C] rounded-full text-white flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-display font-black text-neutral-900 tracking-tight mb-4">
                  ¡Registro Exitoso!
                </h2>
                <p className="text-neutral-600 max-w-sm mx-auto mb-6 text-lg">
                  Hemos recibido los datos de tu pago correctamente.
                </p>
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl text-left max-w-md mx-auto shadow-sm">
                  <p className="text-orange-900 font-medium mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Siguiente paso:
                  </p>
                  <p className="text-orange-800 text-sm leading-relaxed">
                    Joselin validará tu transferencia a la brevedad posible. Una vez aprobada, recibirás tu <b>enlace de acceso único</b> por WhatsApp o Correo para iniciar tu proceso.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-4 bg-neutral-900 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#30070C] transition-colors"
                >
                  Entendido, cerrar ventana
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

