const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

code = code.replace(/const shortAccessLink = `https:\/\/joselinnextlevel\.com\/\?a=\$\{shortPayload\}`;/, 'const shortAccessLink = `https://joselinnextlevel.com/bienvenida.html?a=${shortPayload}`;');

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed WA link');
