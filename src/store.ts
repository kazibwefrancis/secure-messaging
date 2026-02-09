import { configureStore } from '@reduxjs/toolkit';
import chatReducer, { ChatState } from './features/chatSlice';
import connectionReducer, { ConnectionStateType } from './features/connectionSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    connection: connectionReducer,
  },
});

export type RootState = {
  chat: ChatState;
  connection: ConnectionStateType;
};

export type AppDispatch = typeof store.dispatch;