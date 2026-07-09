const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/https:\/\/joselinnextlevel\.com\/joselinhome\.webp/g, 'https://joselinnextlevel.com/linkjoselin.jpg');
fs.writeFileSync('index.html', code);
console.log('Fixed index.html images');
