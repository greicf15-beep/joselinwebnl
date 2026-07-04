const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
/          if \(callbackData\.startsWith\('approve_'\)\) \{[\s\S]*?          \}/,
`          if (callbackData.startsWith('approve_') || callbackData.startsWith('reject_')) {
            const isApproved = callbackData.startsWith('approve_');
            const orderId = callbackData.replace(isApproved ? 'approve_' : 'reject_', '');
            if (orders.has(orderId)) {
              orders.get(orderId).status = isApproved ? 'approved' : 'rejected';
              
              // Answer callback query
              await fetch(\`https://api.telegram.org/bot\${telegramBotToken}/answerCallbackQuery\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callbackQueryId, text: isApproved ? 'Pago Aprobado ✅' : 'Pago Rechazado ❌' })
              });

              // Edit the original message to remove buttons and show approved/rejected status
              if (messageId) {
                await fetch(\`https://api.telegram.org/bot\${telegramBotToken}/editMessageText\`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: telegramChatId,
                    message_id: messageId,
                    text: update.callback_query.message.text + (isApproved ? '\\n\\n✅ APROBADO' : '\\n\\n❌ RECHAZADO')
                  })
                });
              }
            }
          }`
);

// also let's update the sendMessage in server.ts to include the Reject button!
code = code.replace(
/inline_keyboard: \[[\s\S]*?\]/,
`inline_keyboard: [
              [
                { text: '✅ Aprobar', callback_data: \`approve_\${orderId}\` },
                { text: '❌ Rechazar', callback_data: \`reject_\${orderId}\` }
              ]
            ]`
);

fs.writeFileSync('server.ts', code);
