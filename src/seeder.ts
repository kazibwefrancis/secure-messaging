import { db, dbHelpers } from './database';

export function seedData() {
  // Check if already seeded
  const chatCount = db.prepare('SELECT COUNT(*) as count FROM chats').get() as { count: number };
  if (chatCount.count > 0) return;

  // Seed chats
  for (let i = 1; i <= 200; i++) {
    dbHelpers.insertChat.run(`Chat ${i}`, new Date().toISOString(), 0);
  }

  // Seed messages
  const chats = db.prepare('SELECT id FROM chats').all() as { id: number }[];
  let messageId = 1;
  chats.forEach(chat => {
    const messageCount = Math.floor(Math.random() * 100) + 20; // 20-120 messages per chat
    for (let j = 0; j < messageCount; j++) {
      const ts = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
      const sender = `User${Math.floor(Math.random() * 10) + 1}`;
      const body = `Message ${messageId} in chat ${chat.id}`;
      dbHelpers.insertMessage.run(chat.id, ts, sender, body);
      messageId++;
    }
  });

  // Update lastMessageAt for chats
  db.exec(`
    UPDATE chats SET lastMessageAt = (
      SELECT MAX(ts) FROM messages WHERE messages.chatId = chats.id
    )
  `);
}