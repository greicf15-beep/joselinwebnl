const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /    try \{\n      const token = import\.meta\.env\.TELEGRAM_BOT_TOKEN[\s\S]*?    \} catch \(err\) \{\n      console\.error\(err\);\n      alert\("Hubo un error al procesar el pago\."\);\n      setStatus\('editing'\);\n    \}/;

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
        throw new Error("Failed to send telegram message via backend");
      }

      // Poll status from our backend
      let attempts = 0;
      const pollInterval = setInterval(async () => {
        try {
          const res = await fetch(\`/api/checkout/status/\${orderId}\`);
          
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
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
          }
        } catch (err) {
          console.error("Error polling:", err);
        }
        
        attempts++;
        if (attempts > 450) {
          clearInterval(pollInterval);
          setStatus('editing');
          alert("Tiempo de espera agotado. Verifica tu WhatsApp/Correo más tarde.");
        }
      }, 2000);

    } catch (err) {
      console.error(err);
      alert("Hubo un error al procesar el pago.");
      setStatus('editing');
    }`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/CheckoutModal.tsx', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
