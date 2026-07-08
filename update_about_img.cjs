const fs = require('fs');
let code = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

const regex = /<img\s+src="\/joselin_box\.png"[\s\S]*?id="about-coach-img"\s*\/>/;
const newImg = `<img 
                  src="/joselinquiensoy.webp" 
                  alt="Joselin Coach de Recomposición Femenina - Box Kneel pose" 
                  className="w-full h-full object-cover rounded-[2.3rem] hover:scale-105 transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                  id="about-coach-img"
                />`;

code = code.replace(regex, newImg);
fs.writeFileSync('src/components/AboutSection.tsx', code);
console.log('Done');
