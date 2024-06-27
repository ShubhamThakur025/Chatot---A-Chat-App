import React, { useRef, useState } from 'react';

function MessageBox({ userData, onSendMessage }) {
    const [messageData, setMessageData] = useState("");
    const messageRef = useRef();

    const sendMessageClick = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (messageData.trim() === "") {
            return;
        }
        const messageObject = {
            userName: userData.userName,
            message: messageData
        };
        onSendMessage(messageObject);
        setMessageData("");
        messageRef.current.value = "";
    };

    return (
        <form onSubmit={sendMessageClick}>
            <input
                type="text"
                id='msgInput'
                placeholder='Enter message here:'
                ref={messageRef}
                value={messageData}
                onChange={e => setMessageData(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessageClick();
                    }
                }} 
            />
            <button id='sendBtn' type="submit">Send</button>
        </form>
    );
}

export default MessageBox;
