const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\/\/ Si la URL tiene \/formulario, mostramos el cuestionario directamente[\s\S]*?return;\s*\}/;
code = code.replace(regex, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx early return');
