import WebSocket from 'ws';
import { store } from './store';
import { addMessage } from './features/chatSlice';
import { setStatus, incrementReconnectAttempts, resetReconnectAttempts } from './features/connectionSlice';

let ws: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const baseReconnectDelay = 1000; // 1 second

export function connectWebSocket() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  store.dispatch(setStatus('reconnecting'));
  store.dispatch(incrementReconnectAttempts());

  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    console.log('WebSocket connected');
    store.dispatch(setStatus('connected'));
    store.dispatch(resetReconnectAttempts());
    reconnectAttempts = 0;
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data.toString());
    store.dispatch(addMessage(data));
  };

  ws.onclose = () => {
    console.log('WebSocket closed');
    store.dispatch(setStatus('offline'));
    attemptReconnect();
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

function attemptReconnect() {
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.log('Max reconnect attempts reached');
    return;
  }

  const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts);
  reconnectTimeout = setTimeout(() => {
    reconnectAttempts++;
    connectWebSocket();
  }, delay);
}

export function disconnectWebSocket() {
  if (ws) {
    ws.close();
  }
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }
}

export function simulateConnectionDrop() {
  if (ws) {
    ws.close();
  }
}