import './App.css';
import React, { useEffect } from 'react';

import Chat from './components/Chat.jsx';


function App() {

  useEffect(() => {
    document.title = 'Rat-GPT';
  }, []);

  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;
