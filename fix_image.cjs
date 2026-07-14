const fs = require('fs');
let code = fs.readFileSync('src/components/TestimonialsSection.tsx', 'utf8');
code = code.replace(/picAfter: "\/valeska\.png"/, 'picAfter: "/valeska.jpg"');
fs.writeFileSync('src/components/TestimonialsSection.tsx', code);
console.log('Fixed Valeska image');
