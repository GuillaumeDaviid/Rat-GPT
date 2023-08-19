import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

const ParentComponent = () => {
    const [message, setMessage] = useState("");
    const [api, setApi]= useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedApi = localStorage.getItem('api');
        if (storedApi) {
          setApi(storedApi);
        } else {
          setIsModalOpen(true);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('api', api);
      }, [api]);

    
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    setApi(message);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className='btn-api'>Entrez votre clé API</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Entrez votre clé API !</h2>
        <input type="text"
               id="api"
               name="api"
               onChange={handleChange}
               value={message} />
        <button onClick={handleClick} className='btn-send'>Envoyer</button>
        <p>Votre clé ne sera stockée qu'en local*</p>
      </Modal>
    </div>
  );
};

export default ParentComponent;