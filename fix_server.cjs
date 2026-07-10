const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.get\('\*all', \(req, res\) => \{\s*res\.sendFile\(path\.join\(distPath, 'index\.html'\)\);\s*\}\);/;
const replacement = `app.get('*all', (req, res) => {
      if (req.path === '/bienvenida' || req.path === '/bienvenida.html') {
        res.sendFile(path.join(distPath, 'bienvenida.html'));
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });`;

code = code.replace(regex, replacement);

const accessLinkRegex = /const accessLink = `https:\/\/joselinnextlevel\.com\/\?access=\$\{payload\}`;/;
const replacementLink = 'const accessLink = `https://joselinnextlevel.com/bienvenida.html?a=${payload}`;';

code = code.replace(accessLinkRegex, replacementLink);
fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts');
