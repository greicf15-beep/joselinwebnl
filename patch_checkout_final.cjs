const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /    try \{\n      const response = await fetch\('\/api\/checkout\/telegram', \{[\s\S]*?    \} catch \(err\) \{\n      console\.error\(err\);\n      alert\("Hubo un error al procesar el pago\."\);\n      setStatus\('editing'\);\n    \}/;

const replacement = `    try {
      const token = import.meta.env.TELEGRAM_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.TELEGRAM_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      if (!token || !chatId) {
        console.error("Faltan las credenciales de Telegram.");
        alert("Falta configurar el bot de Telegram en el entorno.");
        setStatus('editing');
        return;
      }

      const tgUrl = \`https://api.telegram.org/bot\${token}/sendMessage\`;
      
      const sendRes = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!sendRes.ok) {
        throw new Error("Failed to send telegram message");
      }

      // Como el usuario puede cerrar la página y Hostinger no corre un servidor Node permanentemente,
      // aprobamos automáticamente el flujo en el frontend para no dejar al usuario esperando.
      // El administrador recibirá el mensaje en Telegram y podrá gestionar el acceso manualmente.
      setStatus('success');

    } catch (err) {
      console.error(err);
      alert("Hubo un error al procesar el pago. Por favor intenta de nuevo.");
      setStatus('editing');
    }`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/CheckoutModal.tsx', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
