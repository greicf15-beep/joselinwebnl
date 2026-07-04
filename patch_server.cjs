const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /    \/\/ Return error if no tokens are configured[\s\S]*?    orders\.set\(orderId, \{ status: 'pending', details \}\);/;

const replacement = `    // Return error if no tokens are configured
    if (!telegramBotToken || !telegramChatId) {
      console.error("No Telegram config found on server.");
      return res.status(500).json({ error: "Telegram config missing" });
    }

    orders.set(orderId, { status: 'pending', details });`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('server.ts', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
