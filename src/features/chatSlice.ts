import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chat {
  id: number;
  title: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface Message {
  id: number;
  chatId: number;
  ts: string;
  sender: string;
  body: string;
}

export interface ChatState {
  chats: Chat[];
  selectedChatId: number | null;
  messages: { [chatId: number]: Message[] };
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  messages: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    selectChat: (state, action: PayloadAction<number>) => {
      state.selectedChatId = action.payload;
      // Mark as read
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { chatId } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(action.payload);
      // Update chat lastMessageAt and unreadCount
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        chat.lastMessageAt = action.payload.ts;
        if (state.selectedChatId !== chatId) {
          chat.unreadCount += 1;
        }
      }
    },
    setMessages: (state, action: PayloadAction<{ chatId: number; messages: Message[] }>) => {
      state.messages[action.payload.chatId] = action.payload.messages;
    },
  },
});

export const { setChats, selectChat, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;