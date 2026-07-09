const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

// 1. Add state for screenshot
const stateHookPos = code.indexOf('const [status, setStatus]');
if (stateHookPos === -1) {
  console.error('Could not find state hook position');
  process.exit(1);
}
const stateVars = `  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
`;
code = code.substring(0, stateHookPos) + stateVars + code.substring(stateHookPos);


// 2. Update handleSubmit
const fetchStartRegex = /const response = await fetch\(`https:\/\/api\.telegram\.org\/bot\$\{token\}\/sendMessage`, \{[\s\S]*?\}\);/;
const newFetchLogic = `let endpoint = \`https://api.telegram.org/bot\$\{token\}/sendMessage\`;
      let payload: any;
      let fetchOptions: RequestInit = { method: 'POST' };
      
      if (screenshot) {
        endpoint = \`https://api.telegram.org/bot\$\{token\}/sendPhoto\`;
        payload = new FormData();
        payload.append('chat_id', chatId);
        payload.append('photo', screenshot);
        payload.append('caption', textWithLinks);
        payload.append('parse_mode', 'Markdown');
        payload.append('reply_markup', JSON.stringify({
          inline_keyboard: [
            [
              {
                text: "✅ Aprobar y Enviar WhatsApp",
                url: waUrl
              }
            ]
          ]
        }));
        fetchOptions.body = payload;
      } else {
        fetchOptions.headers = { 'Content-Type': 'application/json' };
        fetchOptions.body = JSON.stringify({
          chat_id: chatId,
          text: textWithLinks,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "✅ Aprobar y Enviar WhatsApp",
                  url: waUrl
                }
              ]
            ]
          }
        });
      }

      const response = await fetch(endpoint, fetchOptions);`;

code = code.replace(fetchStartRegex, newFetchLogic);

// 3. Update File Input UI
const fileInputUiRegex = /\{\/\* Mandatory Screenshot \*\/\}[\s\S]*?<input type="file" accept="image\/\*" className="hidden" required \/>\s*<\/label>\s*<\/div>/;

const newFileInputUi = `{/* Mandatory Screenshot */}
                    <div className="sm:col-span-2">
                      <label className="flex flex-col items-center justify-center w-full px-4 py-4 border-2 border-dashed border-neutral-400 rounded-xl cursor-pointer hover:bg-neutral-50 transition-colors bg-white overflow-hidden relative">
                        {screenshotPreview ? (
                          <div className="relative w-full h-40 flex items-center justify-center bg-black/5 rounded-lg overflow-hidden">
                            <img src={screenshotPreview} alt="Screenshot Preview" className="max-w-full max-h-full object-contain" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <span className="text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full">Cambiar imagen</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-neutral-700 mb-1">
                              <ImageIcon className="w-5 h-5" />
                              <span className="text-sm font-bold">Subir captura del pago (Obligatorio)</span>
                            </div>
                            <p className="text-[11px] text-[#30070C] text-center font-medium mt-1">
                              * No puede haber verificación sin la captura del pago
                            </p>
                          </>
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          required 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setScreenshot(e.target.files[0]);
                              setScreenshotPreview(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                      </label>
                    </div>`;

code = code.replace(fileInputUiRegex, newFileInputUi);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Update done');
