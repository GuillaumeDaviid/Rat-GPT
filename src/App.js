import './App.css';
const { Configuration, OpenAIApi } = require("openai");
import Chat from './components/Chat.jsx';

function App() {
  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;
