const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<Instagram className="w-4 h-4 text-orange-500" \/>\s*<span>@joselincueto<\/span>\s*<\/a>\s*<\/div>/;

const replacement = `<Instagram className="w-4 h-4 text-orange-500" />
                  <span>@joselincueto</span>
                </a>
                
                <a 
                  id="foot-email"
                  href="mailto:info@joselinnextlevel.com" 
                  className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:bg-stone-850 hover:text-[#9B655E] transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Mail className="w-4 h-4 text-[#9B655E]" />
                  <span>info@joselinnextlevel.com</span>
                </a>
              </div>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed Footer in App.tsx');
