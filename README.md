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

- **Virtualization**: Chat list uses simple scroll; could add react-window for better performance with large lists.
- **Message Virtualization**: Not implemented; add for long histories.
- **Real Encryption**: Placeholder only; integrate AES encryption for messages.
- **Indexes**: Added basic indexes; could optimize further for search.
- **Testing**: No tests; add unit tests for DB queries and reducers.
- **Error Handling**: Basic; add comprehensive error boundaries.
- **Security**: No real crypto; prevent leaks in logs/devtools by sanitizing output.

## Security Hygiene

Encryption would happen at the SecurityService boundary: encrypt before storing in DB, decrypt on display. Avoid logging message bodies; use placeholders in logs. Prevent leaks in crash dumps by not keeping decrypted data in memory.