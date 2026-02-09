# Secure Messenger Desktop App

A desktop application simulating a secure messenger with local SQLite storage, real-time WebSocket sync, and efficient UI performance.

## Setup and Run

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Start the app: `npm start`

For development: `npm run dev` (watches for changes and rebuilds)

## Architecture Overview

- **Main Process (Electron)**: Handles window creation and IPC.
- **Renderer Process (React)**: UI components with Redux for state management.
- **Database Layer**: SQLite with better-sqlite3 for local storage.
- **WebSocket Layer**: Local server for sync simulation, client for connection handling.
- **Security**: Placeholder SecurityService for encryption boundaries.

Data flow: UI actions -> Redux -> Database/WebSocket updates -> UI re-renders.

## Trade-offs and Improvements

- **Virtualization**: ✅ Implemented react-window for chat list and message view for optimal performance with large datasets.
- **Seed Data**: ✅ Guaranteed 20,000+ messages (100-150 per chat across 200 chats).
- **Connection Testing**: ✅ Added "Simulate Connection Drop" button to test reconnection logic.
- **Security Logging**: ✅ Removed all console logging to prevent data leaks.
- **Real Encryption**: Placeholder only; integrate AES-256-GCM encryption for messages in production.
- **Indexes**: ✅ Added indexes on chatId+ts and lastMessageAt for query optimization.
- **Testing**: Could add unit tests for DB queries, Redux reducers, and WebSocket reconnection logic.
- **Error Handling**: Could add comprehensive error boundaries and user-friendly error messages.
- **Cross-chat Search**: Could implement search across all chats (currently searches within selected chat).

## Security Hygiene

Encryption would happen at the SecurityService boundary: encrypt before storing in DB, decrypt on display. Avoid logging message bodies; use placeholders in logs. Prevent leaks in crash dumps by not keeping decrypted data in memory.