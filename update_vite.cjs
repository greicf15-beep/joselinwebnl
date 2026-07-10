const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');

const regex = /server: \{/;
const buildConfig = `build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          bienvenida: path.resolve(__dirname, 'bienvenida.html')
        }
      }
    },
    server: {`;

code = code.replace(regex, buildConfig);
fs.writeFileSync('vite.config.ts', code);
console.log('Updated vite.config.ts');
