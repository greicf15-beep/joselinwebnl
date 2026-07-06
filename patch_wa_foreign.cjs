const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const oldStr = `      // Formatear el número de WhatsApp (asumimos Venezuela si empieza por 04)
      let cleanWa = whatsapp.replace(/\\D/g,'');
      if (cleanWa.startsWith('0') && cleanWa.length === 11) {
        cleanWa = '58' + cleanWa.substring(1);
      } else if (cleanWa.length === 10 && cleanWa.startsWith('4')) {
        cleanWa = '58' + cleanWa;
      }`;

const newStr = `      // Limpiamos los caracteres especiales (ej. + o espacios)
      let cleanWa = whatsapp.replace(/\\D/g,'');
      
      // Autocorrección EXCLUSIVA para números de Venezuela sin el +58 (ej. 0414... o 414...)
      const vePrefixes = ['414', '424', '412', '416', '426'];
      if (cleanWa.length === 11 && cleanWa.startsWith('0') && vePrefixes.includes(cleanWa.substring(1, 4))) {
        cleanWa = '58' + cleanWa.substring(1);
      } else if (cleanWa.length === 10 && vePrefixes.includes(cleanWa.substring(0, 3))) {
        cleanWa = '58' + cleanWa;
      }`;

code = code.replace(oldStr, newStr);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log("Patched international logic");
