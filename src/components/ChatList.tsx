import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { RootState } from '../store';
import { selectChat } from '../features/chatSlice';

const ChatList: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch();

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const chat = chats[index];
    return (
      <div
        style={{
          ...style,
          padding: '10px',
          borderBottom: '1px solid #ccc',
          cursor: 'pointer',
        }}
        onClick={() => dispatch(selectChat(chat.id))}
      >
        <div style={{ fontWeight: 'bold' }}>{chat.title}</div>
        {chat.unreadCount > 0 && (
          <div style={{ color: '#007bff', fontSize: '12px' }}>({chat.unreadCount} unread)</div>
        )}
      </div>
    );
  };

  return (
    <FixedSizeList
      height={600}
      itemCount={chats.length}
      itemSize={60}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};

export default ChatList;