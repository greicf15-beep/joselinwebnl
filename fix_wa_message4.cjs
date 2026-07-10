const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /const shortPayload = btoa\(encodeURIComponent\(JSON\.stringify\(\[name, email, plan\.name\]\)\)\);\s*const shortAccessLink = `https:\/\/joselinnextlevel\.com\/formulario\?a=\$\{shortPayload\}`;/;
const replacement = "const shortAccessLink = `https://joselinnextlevel.com/formulario`;";

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal to use short link without payload');
