const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');

const regex = /build: \{\s*rollupOptions: \{\s*input: \{\s*main: path\.resolve\(__dirname, 'index\.html'\),\s*bienvenida: path\.resolve\(__dirname, 'bienvenida\.html'\)\s*\}\s*\}\s*\},/;
code = code.replace(regex, '');

fs.writeFileSync('vite.config.ts', code);
console.log('Fixed vite.config.ts build options');
