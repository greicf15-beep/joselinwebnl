import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || "8602916245:AAGqaY4oikBItzMOgGQ3TcHWz2bFOk5CMBA";
const telegramChatId = process.env.TELEGRAM_CHAT_ID || "7421606171";
import fs from 'fs';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.get("/api/debug/env", (req, res) => res.json({ token: !!telegramBotToken, id: !!telegramChatId })); app.post("/api/checkout/telegram", async (req, res) => {
    const { orderId, message, details } = req.body;
    
    if (!telegramBotToken || !telegramChatId) {
      console.warn("No Telegram config found on server.");
      return res.json({ success: true, simulated: true });
    }

    try {
      // Generar link de acceso
      const accessLink = `https://joselinnextlevel.com/formulario?p=${Buffer.from(encodeURIComponent(details.planName || 'Plan')).toString('base64')}`;

      const finalMessage = message + 
        "\n\n----------------------------------\n" +
        "✅ SI EL PAGO ES CORRECTO:\n" +
        "Copia el siguiente enlace y envíaselo al cliente por WhatsApp o Correo para que inicie su cuestionario:\n\n" +
        accessLink;

      console.log("Sending message to Telegram...");
      fs.appendFileSync('telegram.log', JSON.stringify({ chat_id: telegramChatId, text: finalMessage }) + '\n');
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: finalMessage
        })
      });
      
      const data = await response.json();
      if (!data.ok) {
        console.error("Telegram API Error:", data);
        throw new Error(data.description);
      }
      
      console.log("Message sent to Telegram successfully.");
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending to Telegram:", error);
      res.status(500).json({ error: error.message || "Failed to notify bot" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
