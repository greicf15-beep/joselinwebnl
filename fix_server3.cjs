const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /                    text: finalMessage\n    \)\n                \}\);/;

code = code.replace(regex, "                    text: finalMessage\n                  })\n                });");
fs.writeFileSync('server.ts', code);
console.log("Fixed!");
