import React, { useState } from 'react';
import './ChatWithCHild.css';

function ChatWithChild() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (userInput.trim() !== "") {
      const newMessages = [...messages, { text: userInput, isUser: true }];
      setMessages(newMessages);
      setUserInput('');

      try {
        const response = await fetch('http://127.0.0.1:8000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput }),
        });

        if (response.ok) {
          const data = await response.json();
          handleChildResponse(data.response);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleChildResponse = (response) => {
    setMessages(prevMessages => [...prevMessages, { text: response, isUser: false }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'child'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type your message" 
          value={userInput} 
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default ChatWithChild;
