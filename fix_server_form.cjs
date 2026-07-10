const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.get\('\*all', \(req, res\) => \{\s*res\.sendFile\(path\.join\(distPath, 'index\.html'\)\);\s*\}\);/;
const replacement = `app.get('*all', (req, res) => {
      if (req.path.startsWith('/formulario')) {
        res.sendFile(path.join(distPath, 'formulario/index.html'));
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });`;

code = code.replace(regex, replacement);

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts to serve formulario/index.html');
