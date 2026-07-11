const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /const telegramBotToken = process\.env\.TELEGRAM_BOT_TOKEN;/;
const replacement = 'const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || "8602916245:AAGqaY4oikBItzMOgGQ3TcHWz2bFOk5CMBA";';
code = code.replace(regex, replacement);

const regex2 = /const telegramChatId = process\.env\.TELEGRAM_CHAT_ID;/;
const replacement2 = 'const telegramChatId = process.env.TELEGRAM_CHAT_ID || "7421606171";';
code = code.replace(regex2, replacement2);

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts telegram fallback');
