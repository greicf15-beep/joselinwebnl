const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/<div className="flex gap-3 pt-2 text-zinc-500 hover:text-orange-400 transition-colors">/, '<div className="flex flex-wrap gap-3 pt-2 text-zinc-500 transition-colors">');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed flex wrap');
