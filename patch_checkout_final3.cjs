const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const submitRegex = /    try \{\n      const response = await fetch\('\/api\/checkout\/telegram'[\s\S]*?    \} catch \(err: any\) \{\n      console\.error\(err\);\n      alert\(`Hubo un error al procesar el pago: \$\{err\.message\}`\);\n      setStatus\('editing'\);\n    \}/;

const newSubmit = `    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "7243911516:AAF89R3c0wQz3VrtYvR9wW76U2Q_xYtq11w";
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || "-1002347206016";
      
      const tgUrl = \`https://api.telegram.org/bot\${token}/sendMessage\`;

      // Generar link de acceso
      const orderDetails = { name, email, plan: plan.name, method };
      const payload = btoa(JSON.stringify(orderDetails));
      const accessLink = \`https://joselinnextlevel.com/?access=\${payload}\`;

      const finalMessage = message + 
        "\\n\\n----------------------------------\\n" +
        "✅ SI EL PAGO ES CORRECTO:\\n" +
        "Copia el siguiente enlace y envíaselo al cliente por WhatsApp o Correo para que inicie su cuestionario:\\n\\n" +
        accessLink;

      const sendRes = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: finalMessage,
          parse_mode: 'HTML' // Usamos HTML o nada para no romper por caracteres de markdown
        })
      });

      if (!sendRes.ok) {
        throw new Error("Error al enviar mensaje a Telegram.");
      }

      // Mostramos la pantalla de éxito al usuario (que indica que debe esperar)
      setStatus('submitted');

    } catch (err: any) {
      console.error(err);
      alert(\`Hubo un error al procesar el pago. Por favor intenta nuevamente.\`);
      setStatus('editing');
    }`;

code = code.replace(submitRegex, newSubmit);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log("Patched CheckoutModal.tsx");
