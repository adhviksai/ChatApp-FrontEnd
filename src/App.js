import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, this is a received message.', type: 'received', time: new Date().toLocaleTimeString() },
    { text: 'Hi, this is a sent message.', type: 'sent', time: new Date().toLocaleTimeString() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messageListRef = useRef(null);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: newMessage, type: 'sent', time: new Date().toLocaleTimeString() }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-sidebar"></div>
      <div className="chat-container">
        <h1 className="chat-title">22BCE1733</h1>
        <div className="message-list" ref={messageListRef}>
          {messages.slice().reverse().map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div>{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}></button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;