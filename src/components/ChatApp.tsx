import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setChats } from '../features/chatSlice';
import { setStatus } from '../features/connectionSlice';
import { dbHelpers } from '../database';
import { seedData } from '../seeder';
import { startWebSocketServer } from '../websocketServer';
import { connectWebSocket, simulateConnectionDrop } from '../websocketClient';
import ChatList from './ChatList';
import MessageView from './MessageView';
import ConnectionIndicator from './ConnectionIndicator';

const ChatApp: React.FC = () => {
  const dispatch = useDispatch();
  const selectedChatId = useSelector((state: RootState) => state.chat.selectedChatId);
  const status = useSelector((state: RootState) => state.connection.status);

  useEffect(() => {
    // Seed data
    seedData();

    // Load chats
    const chats = dbHelpers.getChats.all(50, 0) as any[];
    dispatch(setChats(chats));

    // Start WS server
    startWebSocketServer();

    // Connect WS client
    connectWebSocket();

    return () => {
      // Cleanup
    };
  }, [dispatch]);

  const handleSimulateDrop = () => {
    simulateConnectionDrop();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <ConnectionIndicator />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
          <ChatList />
        </div>
        <div style={{ width: '70%' }}>
          {selectedChatId ? <MessageView chatId={selectedChatId} /> : <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Select a chat to start messaging</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;