import Database from 'better-sqlite3';
import * as path from 'path';

const dbPath = path.join(__dirname, 'messenger.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    lastMessageAt TEXT,
    unreadCount INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    chatId INTEGER NOT NULL,
    ts TEXT NOT NULL,
    sender TEXT NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (chatId) REFERENCES chats(id)
  );

  CREATE INDEX IF NOT EXISTS idx_messages_chatId_ts ON messages(chatId, ts DESC);
  CREATE INDEX IF NOT EXISTS idx_chats_lastMessageAt ON chats(lastMessageAt DESC);
`);

export { db };

// Prepared statements
const insertChat = db.prepare('INSERT INTO chats (title, lastMessageAt, unreadCount) VALUES (?, ?, ?)');
const insertMessage = db.prepare('INSERT INTO messages (chatId, ts, sender, body) VALUES (?, ?, ?, ?)');

const getChats = db.prepare('SELECT * FROM chats ORDER BY lastMessageAt DESC LIMIT ? OFFSET ?');
const getMessages = db.prepare('SELECT * FROM messages WHERE chatId = ? ORDER BY ts DESC LIMIT ? OFFSET ?');
const searchMessages = db.prepare('SELECT * FROM messages WHERE chatId = ? AND body LIKE ? ORDER BY ts DESC LIMIT 50');

export const dbHelpers = {
  insertChat,
  insertMessage,
  getChats,
  getMessages,
  searchMessages,
};