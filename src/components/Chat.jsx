import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Modal from './Modal'
import './Chat.css'

function Chat() {
    const [msg, setMsg] = useState('');
    const [countMsg, setCountMsg]= useState(0);
    const [newMsg, setNewMsg]= useState({'me': [], 'bot': []})
    const [api, setApi] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('api')){
            console.log(localStorage.getItem('api'))
            setApi(localStorage.getItem('api'));
        }
    })

    console.log(api)
    console.log(error)


    const configuration = new Configuration({
        apiKey: api,
      });

    const openai = new OpenAIApi(configuration);

    const generate = async () => {
        console.log(openai)
        try {
          const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg,
            temperature: 0,
            max_tokens: 7,
          });

          setNewMsg({'me' : newMsg.me.concat(msg), 'bot': newMsg.bot.concat(res.data.choices[0].text)})

          setError(false)
        } catch (err) {
          // Gérer les erreurs
          console.error("Erreur lors de la génération :", err);
          setNewMsg({'me': [], 'bot': []})
          setError(true);
        }
      
        return <div></div>; // Rendu vide (peut-être remplacé par le rendu souhaité)
      };

    function handleClick(e){
        e.preventDefault();
        if (localStorage.getItem('api')){
            console.log("APIIIIIIIII",localStorage.getItem('api'))
            setApi(localStorage.getItem('api'));
        }
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
            <div><Modal/></div>
            <div className="chat_bot" id="chat_bot">
                <div className='chat_bot_content-msg' id='chat_bot_content-msg'>
                <h2 className='chat_bot-msg'>Bot :</h2>
                <p className='chat_bot-msg'>Bonjour, Je suis un bot codé en React.js et utilisant GPT3 d'Open AI</p>
                </div>
                {
                    error ? <p>Veuillez entrer une clé API valide et réessayez !</p> : listMsg
                }
                
                
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