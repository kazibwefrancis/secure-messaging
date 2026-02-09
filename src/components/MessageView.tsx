import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setMessages } from '../features/chatSlice';
import { dbHelpers } from '../database';

interface MessageViewProps {
  chatId: number;
}

const MessageView: React.FC<MessageViewProps> = ({ chatId }) => {
  const messages = useSelector((state: RootState) => state.chat.messages[chatId] || []);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMessages();
  }, [chatId, offset]);

  const loadMessages = () => {
    const msgs = dbHelpers.getMessages.all(chatId, 50, offset) as any[];
    dispatch(setMessages({ chatId, messages: [...messages, ...msgs] }));
  };

  const handleLoadOlder = () => {
    setOffset(offset + 50);
  };

  const handleSearch = () => {
    if (searchTerm) {
      const results = dbHelpers.searchMessages.all(chatId, `%${searchTerm}%`) as any[];
      dispatch(setMessages({ chatId, messages: results }));
    } else {
      loadMessages();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search messages"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ height: '500px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}:</strong> {msg.body}
          </div>
        ))}
      </div>
      <button onClick={handleLoadOlder}>Load Older Messages</button>
    </div>
  );
};

export default MessageView;