const fs = require('fs');
let code = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');

const regex = /const response = await fetch\(endpoint, fetchOptions\);\s*const data = await response\.json\(\);\s*if \(\!data\.ok\) \{\s*console\.error\("Telegram API Error:", data\);\s*\}/;

const newLogic = `const response = await fetch(endpoint, fetchOptions);
      
      const data = await response.json();
      if (!data.ok) {
        console.error("Telegram API Error:", data);
      }

      // Send the bienvenida image as a separate message so Joselin can easily forward it
      try {
        await fetch(\`https://api.telegram.org/bot\$\{token\}/sendPhoto\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            photo: 'https://joselinnextlevel.com/bienvenida.webp',
            caption: '👆 *Imagen de Bienvenida*\\n\\nPuedes reenviar esta imagen al cliente junto con el mensaje de WhatsApp.',
            parse_mode: 'Markdown'
          })
        });
      } catch (imgErr) {
        console.error("Error sending bienvenida image", imgErr);
      }`;

code = code.replace(regex, newLogic);

fs.writeFileSync('src/components/CheckoutModal.tsx', code);
console.log('Fixed CheckoutModal with second image');
