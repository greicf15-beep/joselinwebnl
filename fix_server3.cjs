const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /const accessLink = `https:\/\/joselinnextlevel\.com\/bienvenida\.html\?a=\$\{payload\}`;/;
const replacement = 'const accessLink = `https://joselinnextlevel.com/formulario?a=${payload}`;';
code = code.replace(regex, replacement);

fs.writeFileSync('server.ts', code);
console.log('Fixed accessLink in server.ts');
