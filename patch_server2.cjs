const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /              \/\/ Edit the original message to remove buttons and show approved\/rejected status[\s\S]*?              \}/;

const replacement = `              // Edit the original message to remove buttons and show approved/rejected status
              if (messageId) {
                let finalMessage = update.callback_query.message.text;
                
                if (isApproved) {
                  // Generar un link de acceso simple codificando los detalles
                  const orderDetails = orders.get(orderId).details;
                  const payload = Buffer.from(JSON.stringify(orderDetails)).toString('base64');
                  const accessLink = \`https://joselinnextlevel.com/?access=\${payload}\`;
                  
                  finalMessage += '\\n\\n✅ *PAGO APROBADO*\\n\\nEnvíale este link al cliente para que inicie su cuestionario:\\n' + accessLink;
                } else {
                  finalMessage += '\\n\\n❌ *PAGO RECHAZADO*';
                }
              
                await fetch(\`https://api.telegram.org/bot\${telegramBotToken}/editMessageText\`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: telegramChatId,
                    message_id: messageId,
                    text: finalMessage
                  })
                });
              }`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('server.ts', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
