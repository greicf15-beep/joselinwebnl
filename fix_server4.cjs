const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /const payload = Buffer\.from\(JSON\.stringify\(details\)\)\.toString\('base64'\);\s*const accessLink = `https:\/\/joselinnextlevel\.com\/formulario\?a=\$\{payload\}`;/;
const replacement = "const accessLink = `https://joselinnextlevel.com/formulario`;";

code = code.replace(regex, replacement);

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts accessLink');
