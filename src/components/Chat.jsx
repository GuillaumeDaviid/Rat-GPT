import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './Chat.css'
import { msgBot } from './Messages.jsx';

function Chat() {
    const [msg, setMsg] = useState('');
    const [countMsg, setCountMsg]= useState(0);
    const [newMsg, setNewMsg]= useState([]);
    const [msgGpt, setMsgGpt] = useState([]);

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });

    const openai = new OpenAIApi(configuration);

    const generate = async () => {
       const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: newMsg.slice(-1),
        temperature: 0,
        max_tokens: 7,
    });

    console.log(res.data.choices[0].text)
    setMsgGpt(msgGpt.concat(res.data.choices[0].text));

    return <div></div>
  }

    function handleClick(e){
        e.preventDefault();
        setCountMsg(countMsg + 1);
        setNewMsg(newMsg.concat(msg))
        setMsg('');
        generate();
    }

    function handleChange(e){
        setMsg(e.target.value);
    }

    const listMsg = countMsg > 0 ?
    (newMsg.map((newMsg) => <div className='chat_bot_content-msg'><h2 className='chat_bot-msg'>Moi :</h2><p className='chat_bot-msg' key={newMsg.key}>{newMsg}</p>
    <h2 className='chat_bot-msg'>Bot :</h2> {msgGpt.slice(-1)}</div>))
 : (<p></p>)

    return(
        <div>
            <h1>Chat Bot</h1>
            <div className="chat_bot" id="chat_bot">
                <div className='chat_bot_content-msg' id='chat_bot_content-msg'>
                <h2 className='chat_bot-msg'>Bot :</h2>
                <p className='chat_bot-msg'>Bonjour, Je suis un bot codé en React.js</p>
                </div>
                {listMsg}
                
                
            </div>
            <form className='form'>
                <input className='msg' id="msg" placeholder='Message'  value={msg} onChange={handleChange}></input>
                <button className='btn' onClick={handleClick}>Envoyer</button>
            </form>
        </div>
    )
}

export default Chat