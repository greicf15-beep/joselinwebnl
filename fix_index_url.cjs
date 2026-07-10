const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/<meta property="og:url" content="[^"]+" \/>\n/g, '');

fs.writeFileSync('index.html', code);

let formCode = fs.readFileSync('public/formulario/index.html', 'utf8');
formCode = formCode.replace(/<meta property="og:url" content="[^"]+" \/>\n/g, '');
fs.writeFileSync('public/formulario/index.html', formCode);

console.log('Fixed og:url tags');
