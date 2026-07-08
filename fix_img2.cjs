const fs = require('fs');
let code = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

const regex = /className="w-full h-full object-cover[^"]*"/;
const newClass = 'className="w-full h-full object-cover object-[80%_top] scale-[1.15] sm:scale-[1.25] translate-y-8 sm:translate-y-12 -translate-x-4 sm:-translate-x-8 hover:scale-[1.20] sm:hover:scale-[1.30] transition-transform duration-700 select-none"';

code = code.replace(regex, newClass);
fs.writeFileSync('src/components/AboutSection.tsx', code);
console.log('Fixed img 2');
