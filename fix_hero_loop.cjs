const fs = require('fs');
let code = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

const regex = /<picture[\s\S]*?<\/picture>/;
const newImg = `<picture className="w-full h-full flex justify-center items-end relative z-10">
                  <source media="(min-width: 1024px)" srcSet="/joselin_flex.png" />
                  <source media="(min-width: 640px)" srcSet="/joselinhome.webp" />
                  <img 
                    src="/joselin_flex.png" 
                    alt="Joselin Personal Trainer Crouch" 
                    className="-mb-[185px] sm:-mb-[14px] translate-y-[40px] sm:translate-y-0 max-h-[120%] sm:max-h-[105%] max-w-[110%] sm:max-w-[100%] lg:max-h-full lg:max-w-full object-contain select-none filter drop-shadow-[0_20px_50px_rgba(230,168,158,0.25)] transition-all duration-700 scale-[1.25] sm:scale-110 lg:scale-102 hover:scale-[1.3] sm:hover:scale-115 lg:hover:scale-105 origin-bottom"
                    style={{ paddingLeft: '0px', paddingTop: 0, paddingBottom: 140, marginTop: '0px', marginRight: '0px' }}
                    referrerPolicy="no-referrer"
                    id="hero-trainer-silhouette"
                  />
                </picture>`;

code = code.replace(regex, newImg);
fs.writeFileSync('src/components/HeroSection.tsx', code);
console.log('Fixed infinite loop in HeroSection');
