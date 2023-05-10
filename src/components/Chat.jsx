import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './Chat.css'

function Chat() {
    const [msg, setMsg] = useState('');
    const [countMsg, setCountMsg]= useState(0);
    const [newMsg, setNewMsg]= useState({'me': [], 'bot': []})


    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });

    const openai = new OpenAIApi(configuration);

    const generate = async () => {
       const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg,
        temperature: 0,
        max_tokens: 7,
    });

    setNewMsg({'me' : newMsg.me.concat(msg), 'bot': newMsg.bot.concat(res.data.choices[0].text)})

    return <div></div>
  }

    function handleClick(e){
        e.preventDefault();
        setCountMsg(countMsg + 1);
        setNewMsg({'me' : newMsg.me.concat(msg), 'bot': newMsg.bot})
        generate();
        setMsg('');
        
    }

    function handleChange(e){
        setMsg(e.target.value);
    }

    const listMsg = countMsg > 0 ?
    (newMsg.me.map((item, key) => <div className='chat_bot_content-msg'><h2 className='chat_bot-msg'>Moi :</h2><p className='chat_bot-msg' key={item.key}>{item}</p>
    <h2 className='chat_bot-msg'>Bot :</h2> {newMsg.bot[key]}</div>))
 : (<p></p>)

    return(
        <div>
            <h1>Chat Bot with GPT</h1>
            <div className="chat_bot" id="chat_bot">
                <div className='chat_bot_content-msg' id='chat_bot_content-msg'>
                <h2 className='chat_bot-msg'>Bot :</h2>
                <p className='chat_bot-msg'>Bonjour, Je suis un bot codé en React.js et utilisant GPT3 d'Open AI</p>
                </div>
                {listMsg}
                
                
            </div>
            <form className='form'>
                <input className='msg' id="msg" placeholder='Message'  value={msg} onChange={handleChange}></input>
                <button className='btn' onClick={handleClick}>Envoyer</button>
            </form>


            <p><i>Nombre de tokens par réponse limités pour des raisons de coût*</i></p>
        </div>
    )
}

export default Chat