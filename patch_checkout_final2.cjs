const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

// Change the status type to include 'submitted'
code = code.replace(/const \[status, setStatus\] = useState\<'editing' \| 'processing' \| 'success'\>\('editing'\);/, 
    "const [status, setStatus] = useState<'editing' | 'processing' | 'success' | 'submitted'>('editing');");

// Change the handleSubmit logic to just post and show submitted
const submitRegex = /    try \{\n      const token = import\.meta\.env[\s\S]*?    \} catch \(err: any\) \{\n      console\.error\(err\);\n      alert\(`Hubo un error al procesar el pago: \$\{err\.message\}`\);\n      setStatus\('editing'\);\n    \}/;

const newSubmit = `    try {
      const response = await fetch('/api/checkout/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          message,
          details: { name, email, plan: plan.name, method }
        })
      });
      
      if (!response.ok) {
        throw new Error("Error al comunicarse con el servidor.");
      }

      // No esperamos la aprobacion en vivo.
      // Simplemente le mostramos al usuario que ya se envio.
      setStatus('submitted');

    } catch (err: any) {
      console.error(err);
      alert(\`Hubo un error al procesar el pago: \${err.message}\`);
      setStatus('editing');
    }`;

code = code.replace(submitRegex, newSubmit);

// Add the submitted view
const successViewRegex = /            \{status === 'success' && \([\s\S]*?              \<\/motion\.div\>\n            \)\}/;

const submittedView = `            {status === 'success' && (
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
            )}`;

code = code.replace(successViewRegex, submittedView);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log("Patched CheckoutModal.tsx");
