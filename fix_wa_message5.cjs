const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /const shortAccessLink = `https:\/\/joselinnextlevel\.com\/formulario`;/;
// Use a simple base64 encode for just the plan name to keep it short but hide the raw text if needed, or just raw text.
// Actually, encodeURIComponent(plan.name) is fine and short: 'Premium:%20Total%20Transformation'
// Or we can just btoa the plan name to make it look like a short hash: 'UHJlbWl1bTogVG90YWwgVHJhbnNmb3JtYXRpb24='
const replacement = "const shortAccessLink = `https://joselinnextlevel.com/formulario?p=${btoa(encodeURIComponent(plan.name))}`;";

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal to use short link with plan');
