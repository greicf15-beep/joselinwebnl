import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

// Simple in-memory store for orders
const orders = new Map<string, { status: 'pending' | 'approved' | 'rejected', details: any }>();

let telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
let telegramChatId = process.env.TELEGRAM_CHAT_ID;

// Polling for Telegram Updates
let lastUpdateId = 0;
async function pollTelegram() {
  if (!telegramBotToken) return;

  try {
    const url = `https://api.telegram.org/bot${telegramBotToken}/getUpdates?offset=${lastUpdateId + 1}&timeout=10`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok && data.result) {
      for (const update of data.result) {
        lastUpdateId = update.update_id;

        // Handle Callback Queries from Inline Keyboard
        if (update.callback_query) {
          const callbackData = update.callback_query.data;
          const callbackQueryId = update.callback_query.id;
          const messageId = update.callback_query.message?.message_id;

          if (callbackData.startsWith('approve_') || callbackData.startsWith('reject_')) {
            const isApproved = callbackData.startsWith('approve_');
            const orderId = callbackData.replace(isApproved ? 'approve_' : 'reject_', '');

            if (orders.has(orderId)) {
              orders.get(orderId)!.status = isApproved ? 'approved' : 'rejected';
              
              // Answer callback query
              await fetch(`https://api.telegram.org/bot${telegramBotToken}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: callbackQueryId, text: isApproved ? 'Pago Aprobado ✅' : 'Pago Rechazado ❌' })
              });

              // Edit the original message to remove buttons and show approved/rejected status
              if (messageId) {
                await fetch(`https://api.telegram.org/bot${telegramBotToken}/editMessageText`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: telegramChatId,
                    message_id: messageId,
                    text: update.callback_query.message.text + (isApproved ? '\n\n✅ APROBADO' : '\n\n❌ RECHAZADO')
                  })
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error polling Telegram:", error);
  }

  // Continue polling
  setTimeout(pollTelegram, 2000);
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.post("/api/checkout/telegram", async (req, res) => {
    const { orderId, message, details } = req.body;
    
    // Return error if no tokens are configured
    if (!telegramBotToken || !telegramChatId) {
      console.error("No Telegram config found on server.");
      return res.status(500).json({ error: "Telegram config missing" });
    }

    orders.set(orderId, { status: 'pending', details });

    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Aprobar', callback_data: `approve_${orderId}` },
                { text: '❌ Rechazar', callback_data: `reject_${orderId}` }
              ]
            ]
          }
        })
      });

      const data = await response.json();
      if (!data.ok) {
        throw new Error(data.description);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error sending to Telegram:", error);
      res.status(500).json({ error: error.message || "Failed to notify bot" });
    }
  });

  app.get("/api/checkout/status/:orderId", (req, res) => {
    const order = orders.get(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ status: order.status });
  });

  // Start polling if configured
  if (telegramBotToken && telegramChatId) {
    pollTelegram();
  }

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
