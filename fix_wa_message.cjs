const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

// Replace the link generation
const regex = /const shortPayload = [\s\S]*?const shortAccessLink = [^;]+;/;
const replacement = `const shortAccessLink = 'https://joselinnextlevel.com/formulario';`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal link');
