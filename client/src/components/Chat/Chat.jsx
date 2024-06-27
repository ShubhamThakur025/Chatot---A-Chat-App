import React from 'react'
import useChat from './useChat'
import Messages from '../Messages/Messages'
import MessageBox from '../Messages/MessageBox'
function Chat({ userData }) {
  const { messages, sendMessage } = useChat(userData.userName, userData.roomName)
  return (
    <div className='bg'>
      <h1 className='head'>{userData.roomName} Room</h1>
      <Messages messages={messages} />
      <MessageBox userData={userData} onSendMessage={message => sendMessage(message)} />
    </div>
  )
}

export default Chat
