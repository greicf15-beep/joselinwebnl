const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace the messed up block
const regex = /    orders\.set\(orderId, \{ status: 'pending', details \}\);\n      return res\.json\(\{ success: true, simulated: true \}\);\n    \}\n\n    orders\.set\(orderId, \{ status: 'pending', details \}\);/;

code = code.replace(regex, "    orders.set(orderId, { status: 'pending', details });");
fs.writeFileSync('server.ts', code);
console.log("Fixed!");
