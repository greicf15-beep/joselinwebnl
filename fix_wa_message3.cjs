const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

// Restore the link generation with the payload
const regexLink = /const shortAccessLink = 'https:\/\/joselinnextlevel\.com\/formulario';/;
const replacementLink = 'const shortPayload = btoa(encodeURIComponent(JSON.stringify([name, email, plan.name])));\n      const shortAccessLink = `https://joselinnextlevel.com/formulario?a=${shortPayload}`;';
code = code.replace(regexLink, replacementLink);

// Remove the second telegram fetch for the photo
const photoFetchRegex = /\/\/ Send the bienvenida image as a separate message[\s\S]*?\} catch \(imgErr\) \{\s*console\.error\("Error sending bienvenida image", imgErr\);\s*\}/;
code = code.replace(photoFetchRegex, '');

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal links and removed extra photo send');
