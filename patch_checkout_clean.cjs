const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /    try \{\n      \/\/ Intentamos usar el backend si está disponible[\s\S]*?    \} catch \(err\) \{\n      console\.error\(err\);\n      alert\("Hubo un error al procesar el pago\. Por favor intenta de nuevo\."\);\n      setStatus\('editing'\);\n    \}/;

const replacement = `    try {
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al comunicarse con el servidor.");
      }

      // Si el envío fue exitoso, empezamos a hacer polling para ver si lo aprueban
      let attempts = 0;
      const pollInterval = setInterval(async () => {
        try {
          const res = await fetch(\`/api/checkout/status/\${orderId}\`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'approved') {
              clearInterval(pollInterval);
              setStatus('success');
            } else if (data.status === 'rejected') {
              clearInterval(pollInterval);
              setStatus('editing');
              alert("El pago fue rechazado. Por favor, verifica los datos e intenta de nuevo.");
            }
          }
        } catch (err) {
          console.error("Error polling backend:", err);
        }
        
        attempts++;
        if (attempts > 900) { // ~30 minutos
          clearInterval(pollInterval);
          setStatus('editing');
          alert("Tiempo de espera agotado. Verificaremos tu pago y te contactaremos más tarde.");
        }
      }, 2000);

    } catch (err: any) {
      console.error(err);
      alert(\`Hubo un error al procesar el pago: \${err.message}\`);
      setStatus('editing');
    }`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/CheckoutModal.tsx', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
