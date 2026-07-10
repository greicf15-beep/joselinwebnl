const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.get\('\*all', \(req, res\) => \{\s*if \(req\.path\.startsWith\('\/formulario'\)\) \{\s*res\.sendFile\(path\.join\(distPath, 'bienvenida\.html'\)\);\s*\} else \{\s*res\.sendFile\(path\.join\(distPath, 'index\.html'\)\);\s*\}\s*\}\);/;
const replacement = `app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });`;

code = code.replace(regex, replacement);

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts fallback');
