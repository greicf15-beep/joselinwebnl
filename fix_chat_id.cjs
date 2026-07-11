const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /const chatId = import\.meta\.env\.VITE_TELEGRAM_CHAT_ID \|\| "992461854";/;
const replacement = 'const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || "7421606171";';

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal chatId');
