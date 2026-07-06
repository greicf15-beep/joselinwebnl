const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const submitRegex = /    try \{\n      const token = import\.meta\.env[\s\S]*?    \} catch \(err: any\) \{\n      console\.error\(err\);\n      \/\/ Fallback absoluto: mostrar success incluso si hay error catastrófico\n      setStatus\('submitted'\);\n    \}/;

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
      
      // Independientemente de si la petición al backend falla, mostramos éxito
      // para no bloquear al usuario (en caso de que Telegram falle).
      setStatus('submitted');

    } catch (err: any) {
      console.error(err);
      setStatus('submitted');
    }`;

if (submitRegex.test(code)) {
    code = code.replace(submitRegex, newSubmit);
    fs.writeFileSync('src/components/CheckoutModal.tsx', code);
    console.log("Patched CheckoutModal.tsx successfully.");
} else {
    console.log("Regex not matched!");
}
