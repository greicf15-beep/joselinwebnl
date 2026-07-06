const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /    \/\/ If no tokens are configured, simulate for development[\s\S]*?    orders\.set\(orderId, \{ status: 'pending', details \}\);/;

const replacement = `    // If no tokens are configured, simulate for development
    if (!telegramBotToken || !telegramChatId) {
      console.log("No Telegram config found on server. Simulating...");
      orders.set(orderId, { status: 'pending', details });
      
      // Simulate an admin approving after 5 seconds
      setTimeout(() => {
        if (orders.has(orderId)) {
          orders.get(orderId).status = 'approved';
        }
      }, 5000);
      
      return res.json({ success: true, simulated: true });
    }

    orders.set(orderId, { status: 'pending', details });`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('server.ts', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
