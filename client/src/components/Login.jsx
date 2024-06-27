import React, { useRef } from 'react';

function Login({ setUserData }) {
    const nameInput = useRef();
    const roomInput = useRef();

    const enterChatClick = (event) => {
        event.preventDefault();
        setUserData({ userName: nameInput.current.value, roomName: roomInput.current.value })
    }

    return (
        <form onSubmit={enterChatClick} className='login-form'>
            <h1>JOIN CHATOT</h1>
            <input
                className="input"
                placeholder='Enter your name for the chat'
                ref={nameInput}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        enterChatClick()
                    }
                }}
            />
            <input
                className="input"
                placeholder='Enter room you wish to join'
                ref={roomInput}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        enterChatClick()
                    }
                }}
            />
            <button type="submit" className='enterBtn'>Enter Chat</button>
        </form>
    );
}

export default Login;
