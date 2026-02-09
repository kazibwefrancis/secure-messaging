import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { simulateConnectionDrop } from '../websocketClient';

const ConnectionIndicator: React.FC = () => {
  const status = useSelector((state: RootState) => state.connection.status);
  const reconnectAttempts = useSelector((state: RootState) => state.connection.reconnectAttempts);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return '#28a745';
      case 'reconnecting': return '#ffc107';
      case 'offline': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ padding: '10px', borderBottom: '2px solid #ddd', backgroundColor: '#f8f9fa' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            marginRight: '8px'
          }} />
          <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{status}</span>
          {reconnectAttempts > 0 && (
            <span style={{ marginLeft: '10px', fontSize: '12px', color: '#6c757d' }}>
              (Attempt {reconnectAttempts})
            </span>
          )}
        </div>
        <button
          onClick={simulateConnectionDrop}
          style={{
            padding: '6px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Simulate Connection Drop
        </button>
      </div>
    </div>
  );
};

export default ConnectionIndicator;