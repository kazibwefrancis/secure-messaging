import React from 'react';

interface ConnectionIndicatorProps {
  status: 'connected' | 'reconnecting' | 'offline';
  onSimulateDrop: () => void;
}

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status, onSimulateDrop }) => {
  return (
    <div>
      <div>Status: {status}</div>
      <button onClick={onSimulateDrop}>Simulate Connection Drop</button>
    </div>
  );
};

export default ConnectionIndicator;