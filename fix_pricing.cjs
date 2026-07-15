const fs = require('fs');
let code = fs.readFileSync('src/components/PricingSection.tsx', 'utf8');

const regex = /\{\/\* Small trust text \*\/\}[\s\S]*?<HelpCircle className="w-4 h-4 text-stone-300" \/>\s*<span>Pago seguro\. Acceso instantáneo al cuestionario\.<\/span>\s*<\/div>/;

const replacement = `{/* Small trust text */}
        <div className="text-center text-stone-400 text-xs mt-12 flex justify-center items-center gap-1.5 font-sans">
          <HelpCircle className="w-4 h-4 text-stone-300" />
          <span>Pago seguro. Acceso instantáneo al cuestionario.</span>
        </div>
        
        {/* Contact Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-stone-500 font-medium mb-2">Para más información, dale clic y envíame un email a:</p>
          <a href="mailto:info@joselinnextlevel.com" className="inline-flex items-center gap-2 text-base font-bold text-[#9B655E] hover:text-[#84534E] transition-colors">
            info@joselinnextlevel.com
          </a>
        </div>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/PricingSection.tsx', code);
console.log('Fixed PricingSection.tsx');
