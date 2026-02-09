import WebSocket from 'ws';
import { db } from './database';
import { dbHelpers } from './database';

let wss: WebSocket.Server | null = null;

export function startWebSocketServer(port: number = 8080) {
  wss = new WebSocket.Server({ port });

  wss.on('connection', (ws) => {
    // Client connected

    ws.on('message', (message) => {
      // Message received
    });

    // Heartbeat
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    }, 10000);

    ws.on('close', () => {
      clearInterval(heartbeat);
    });
  });

  // Simulate new messages
  setInterval(() => {
    if (wss && wss.clients.size > 0) {
      const chatCount = db.prepare('SELECT COUNT(*) as count FROM chats').get() as { count: number };
      if (chatCount.count > 0) {
        const randomChatId = Math.floor(Math.random() * chatCount.count) + 1;
        const messageId = Date.now(); // Simple ID
        const ts = new Date().toISOString();
        const sender = `User${Math.floor(Math.random() * 10) + 1}`;
        const body = `New message ${messageId}`;

        // Insert into DB
        dbHelpers.insertMessage.run(randomChatId, ts, sender, body);

        // Emit to clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ chatId: randomChatId, messageId, ts, sender, body }));
          }
        });
      }
    }
  }, Math.random() * 2000 + 1000); // 1-3 seconds
}

export function stopWebSocketServer() {
  if (wss) {
    wss.close();
  }
}