import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList } from 'react-window';
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
    setOffset(0);
    dispatch(setMessages({ chatId, messages: [] }));
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      loadMessages();
    }
  }, [chatId, offset]);

  const loadMessages = () => {
    const msgs = dbHelpers.getMessages.all(chatId, 50, offset) as any[];
    const uniqueMessages = offset === 0 ? msgs : [...messages, ...msgs];
    const seen = new Set();
    const deduplicated = uniqueMessages.filter(m => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
    dispatch(setMessages({ chatId, messages: deduplicated }));
  };

  const handleLoadOlder = () => {
    setOffset(offset + 50);
  };

  const handleSearch = () => {
    if (searchTerm) {
      const results = dbHelpers.searchMessages.all(chatId, `%${searchTerm}%`) as any[];
      dispatch(setMessages({ chatId, messages: results }));
      setOffset(0);
    } else {
      setOffset(0);
      dispatch(setMessages({ chatId, messages: [] }));
    }
  };

  const MessageRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const msg = messages[index];
    return (
      <div style={{ ...style, padding: '8px', borderBottom: '1px solid #eee' }}>
        <strong style={{ color: '#333' }}>{msg.sender}:</strong>{' '}
        <span>{msg.body}</span>
        <div style={{ fontSize: '10px', color: '#999' }}>{new Date(msg.ts).toLocaleString()}</div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>
        <input
          type="text"
          placeholder="Search messages in this chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{ width: '70%', padding: '8px' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '8px 16px' }}>Search</button>
      </div>
      {messages.length > 0 ? (
        <FixedSizeList
          height={450}
          itemCount={messages.length}
          itemSize={70}
          width="100%"
        >
          {MessageRow}
        </FixedSizeList>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No messages</div>
      )}
      <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
        <button onClick={handleLoadOlder} style={{ padding: '8px 16px' }}>Load Older Messages</button>
      </div>
    </div>
  );
};

export default MessageView;