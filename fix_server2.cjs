const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /              \}\)\n                \}\);\n              \}/;

code = code.replace(regex, "");
fs.writeFileSync('server.ts', code);
console.log("Fixed!");
