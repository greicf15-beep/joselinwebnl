const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /const accessLink = `https:\/\/joselinnextlevel\.com\/formulario`;/;
const replacement = "const accessLink = `https://joselinnextlevel.com/formulario?p=${Buffer.from(encodeURIComponent(details.planName || 'Plan')).toString('base64')}`;";

code = code.replace(regex, replacement);

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts accessLink with plan');
