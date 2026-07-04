const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /          if \(callbackData\.startsWith\('approve_'\) \|\| callbackData\.startsWith\('reject_'\)\) \{[\s\S]*?\n            \}          \}        \}      \}    \}/;

const replacement = `          if (callbackData.startsWith('approve_') || callbackData.startsWith('reject_')) {
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
          }
        }
      }
    }`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code);
