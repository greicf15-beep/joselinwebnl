const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /    try \{\n      await fetch\('\/api\/checkout\/telegram', \{[\s\S]*?    \} catch \(err\) \{\n      console\.error\(err\);\n      alert\("Hubo un error al procesar el pago\."\);\n      setStatus\('editing'\);\n    \}/;

const replacement = `    try {
      const token = import.meta.env.TELEGRAM_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.TELEGRAM_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      if (!token || !chatId) {
        console.error("Faltan las credenciales de Telegram en Hostinger.");
        alert("Falta configurar el bot de Telegram en Hostinger.");
        setStatus('editing');
        return;
      }

      const tgUrl = \`https://api.telegram.org/bot\${token}/sendMessage\`;
      const replyMarkup = {
        inline_keyboard: [
          [
            { text: "✅ Aprobar", callback_data: \`approve_\${orderId}\` },
            { text: "❌ Rechazar", callback_data: \`reject_\${orderId}\` }
          ]
        ]
      };
      
      const sendRes = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
          reply_markup: replyMarkup
        })
      });

      if (!sendRes.ok) {
        throw new Error("Failed to send telegram message");
      }

      // Poll status directly from Telegram API
      let attempts = 0;
      let lastUpdateId = 0;
      const pollInterval = setInterval(async () => {
        try {
          // Use POST to avoid mobile browser caching the GET request
          const updatesRes = await fetch(\`https://api.telegram.org/bot\${token}/getUpdates\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ allowed_updates: ["callback_query"], offset: lastUpdateId + 1 })
          });
          
          if (updatesRes.ok) {
            const data = await updatesRes.json();
            if (data.ok && data.result) {
              for (const update of data.result) {
                lastUpdateId = update.update_id;
                if (update.callback_query && update.callback_query.data) {
                  const cbData = update.callback_query.data;
                  if (cbData === \`approve_\${orderId}\` || cbData === \`reject_\${orderId}\`) {
                    clearInterval(pollInterval);
                    
                    const isApproved = cbData === \`approve_\${orderId}\`;
                    const msgId = update.callback_query.message?.message_id;
                    
                    // Answer the callback so the button stops loading in Telegram
                    await fetch(\`https://api.telegram.org/bot\${token}/answerCallbackQuery\`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ 
                        callback_query_id: update.callback_query.id, 
                        text: isApproved ? 'Pago Aprobado ✅' : 'Pago Rechazado ❌' 
                      })
                    }).catch(()=>({}));

                    // Edit the message to remove buttons and show the final status to the admin
                    if (msgId) {
                      await fetch(\`https://api.telegram.org/bot\${token}/editMessageText\`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                          chat_id: chatId, 
                          message_id: msgId, 
                          text: message + (isApproved ? '\\n\\n✅ *APROBADO*' : '\\n\\n❌ *RECHAZADO*'),
                          parse_mode: 'Markdown'
                        })
                      }).catch(()=>({}));
                    }
                    
                    if (isApproved) {
                      setStatus('success');
                    } else {
                      setStatus('editing');
                      alert("El pago fue rechazado. Por favor, verifica los datos e intenta de nuevo.");
                    }
                    return;
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error("Error polling:", err);
        }
        
        attempts++;
        // Stop polling after 15 minutes (450 attempts * 2s)
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
