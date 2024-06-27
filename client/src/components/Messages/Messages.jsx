import React from 'react';

function Messages({ messages }) {
    return (
        <div className="messages-container">
            {messages && messages.map((message, index) => (
                <div className={`message ${message.userName === "Admin" ? 'admin' : 'noadmin'}`} key={index}>
                    <div className='header' >{message.userName}</div> <br />
                    <div className='msg-text'>{message.message}</div>
                </div>
            ))}
        </div>
    );
}

export default Messages;
