const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /    try \{\n      const token = import\.meta\.env\.TELEGRAM_BOT_TOKEN[\s\S]*?    \} catch \(err\) \{\n      console\.error\(err\);\n      alert\("Hubo un error al procesar el pago\. Por favor intenta de nuevo\."\);\n      setStatus\('editing'\);\n    \}/;

const replacement = `    try {
      // Intentamos usar el backend si está disponible (para ocultar tokens)
      let backendSuccess = false;
      try {
        const response = await fetch('/api/checkout/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            message,
            details: { name, email, plan: plan.name, method }
          })
        });
        
        if (response.ok) {
          backendSuccess = true;
          // Si el backend funcionó, hacemos polling al backend
          let attempts = 0;
          const pollInterval = setInterval(async () => {
            try {
              const res = await fetch(\`/api/checkout/status/\${orderId}\`);
              const contentType = res.headers.get("content-type");
              if (contentType && contentType.includes("application/json") && res.ok) {
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
              alert("Tiempo de espera agotado. Verifica tu WhatsApp/Correo más tarde.");
            }
          }, 2000);
          return; // Salimos, el backend se encarga
        }
      } catch(e) {
        console.warn("Backend no disponible, intentando desde el cliente (frontend).", e);
      }

      if (!backendSuccess) {
        // Fallback: Modo Frontend (Cliente directo a Telegram API)
        // Requiere que las variables en .env comiencen con VITE_
        const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "7243911516:AAF89R3c0wQz3VrtYvR9wW76U2Q_xYtq11w"; // Fallback to a temp token if needed, but better to rely on env
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || "-1002347206016";
        
        if (!token || !chatId || token === "YOUR_TELEGRAM_BOT_TOKEN") {
          console.error("Faltan las credenciales de Telegram.");
          alert("Falta configurar el bot de Telegram (VITE_TELEGRAM_BOT_TOKEN y VITE_TELEGRAM_CHAT_ID en .env).");
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
          throw new Error("Failed to send telegram message directly");
        }

        // Poll status directly from Telegram API
        let attempts = 0;
        let lastUpdateId = 0;
        const pollInterval = setInterval(async () => {
          try {
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
                      
                      // Answer the callback
                      await fetch(\`https://api.telegram.org/bot\${token}/answerCallbackQuery\`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                          callback_query_id: update.callback_query.id, 
                          text: isApproved ? 'Pago Aprobado ✅' : 'Pago Rechazado ❌' 
                        })
                      }).catch(()=>({}));

                      // Edit message
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
            console.error("Error polling Telegram API directly:", err);
          }
          
          attempts++;
          if (attempts > 900) { // ~30 minutos
            clearInterval(pollInterval);
            setStatus('editing');
            alert("Tiempo de espera agotado. Verifica tu WhatsApp/Correo más tarde.");
          }
        }, 2000);
      }
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
