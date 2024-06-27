import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useChat = (userName, roomName) => {
    const socketRef = useRef();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Initialize the socket connection
        socketRef.current = socketIOClient('http://localhost:8080');

        // Handle receiving the most recent messages
        socketRef.current.on("MostRecentMessages", (mostRecentMessages) => {
            setMessages(mostRecentMessages);
        });

        // Handle receiving new chat messages 
        socketRef.current.on("newChatMessage", ({ userName, message }) => {
            console.log("HEREME", message.message)
            setMessages(prevMessages => [...prevMessages, { userName, message }]);
        });

        // Join the room
        socketRef.current.emit('enterRoom', { userName, room: roomName });

        // Clean up the socket connection when the component unmounts
        return () => {
            socketRef.current.disconnect();
        };
    }, [userName, roomName]);

    // Function to send a new chat message
    const sendMessage = (messageObject) => {
        socketRef.current.emit("newChatMessage", messageObject);
    };

    return { messages, sendMessage };
};

export default useChat;
