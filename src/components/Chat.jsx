import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Modal from './Modal'
import Footer from './Footer'
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
    <h2 className='chat_bot-msg'>Rat GPT :</h2> {newMsg.bot[key]}</div>))
 : (<p></p>)

    return(
        <div>
            <h1>Rat GPT</h1>
            <div><Modal/></div>
            <div className="chat_bot" id="chat_bot">
                <div className='chat_bot_content-msg' id='chat_bot_content-msg'>
                <h2 className='chat_bot-msg'>Rat GPT :</h2>
                <p className='chat_bot-msg'>Bonjour, je fonctionne comme ChatGPT !</p>
                </div>
                {
                    error ? <p>Veuillez entrer une clé API valide et réessayez !</p> : listMsg
                }
                
                
            </div>
            <form className='form'>
                <input className='msg' id="msg" placeholder='Message'  value={msg} onChange={handleChange}></input>
                <button className='btn' onClick={handleClick}>Envoyer</button>
            </form>


            <p><i>Privilégiez l'utilisation de l'API d'OPEN AI à l'abonnement ChatGPT pour faire des économies d'argent !</i></p>

            <p><strong>Il n'est pas recommandé d'utiliser Rat GPT si vous avez une utilisation régulière !</strong></p>

            <Footer/>
        </div>
    )
}

export default Chat