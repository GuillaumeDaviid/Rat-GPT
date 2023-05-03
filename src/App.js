import './App.css';
import Chat from './components/Chat.jsx';


function App() {/*
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log(process.env.OPENAI_API_KEY) 

  const openai = new OpenAIApi(configuration);

  const generate = async () => {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 7,
    });

    console.log(res.data.data[0])

    return <div></div>
  }*/

  return (
    <div className="App">
      <Chat />

      <button>generate</button>
    </div>
  );
}

export default App;
