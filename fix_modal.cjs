const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

// Replace Zelle email
code = code.replace(/7869718364/g, 'acueto_25@hotmail.com');

// Replace screenshot optional with mandatory
const optionalScreenshotRegex = /\{\/\* Optional Screenshot \*\/\}[\s\S]*?<input type="file" accept="image\/\*" className="hidden" \/>\s*<\/label>\s*<\/div>/;

const mandatoryScreenshotHtml = `{/* Mandatory Screenshot */}
                    <div className="sm:col-span-2">
                      <label className="flex flex-col items-center justify-center w-full px-4 py-4 border-2 border-dashed border-neutral-400 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors bg-white">
                        <div className="flex items-center gap-2 text-neutral-700 mb-1">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-sm font-bold">Subir captura del pago (Obligatorio)</span>
                        </div>
                        <p className="text-[11px] text-[#30070C] text-center font-medium mt-1">
                          * No puede haber verificación sin la captura del pago
                        </p>
                        <input type="file" accept="image/*" className="hidden" required />
                      </label>
                    </div>`;

code = code.replace(optionalScreenshotRegex, mandatoryScreenshotHtml);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal');
