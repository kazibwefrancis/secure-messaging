import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatApp from './components/ChatApp';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChatApp />
    </Provider>
  );
};

export default App;