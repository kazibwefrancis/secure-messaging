import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectChat } from '../features/chatSlice';

const ChatList: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch();

  return (
    <div style={{ height: '600px', overflowY: 'scroll' }}>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => dispatch(selectChat(chat.id))}
          style={{ padding: '10px', borderBottom: '1px solid #ccc' }}
        >
          <div>{chat.title}</div>
          <div>{chat.unreadCount > 0 && `(${chat.unreadCount})`}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;