import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConnectionState = 'connected' | 'reconnecting' | 'offline';

export interface ConnectionStateType {
  status: ConnectionState;
  reconnectAttempts: number;
}

const initialState: ConnectionStateType = {
  status: 'offline',
  reconnectAttempts: 0,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ConnectionState>) => {
      state.status = action.payload;
    },
    incrementReconnectAttempts: (state) => {
      state.reconnectAttempts += 1;
    },
    resetReconnectAttempts: (state) => {
      state.reconnectAttempts = 0;
    },
  },
});

export const { setStatus, incrementReconnectAttempts, resetReconnectAttempts } = connectionSlice.actions;
export default connectionSlice.reducer;