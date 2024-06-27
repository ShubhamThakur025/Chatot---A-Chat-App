import express from 'express';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import connectToDB from './config/db';
import dotenv from 'dotenv';
import Message from './Models/Message';
import User from './Models/User';

dotenv.config({ path: './envFiles/.env' });

const PORT = process.env.SOCKET_PORT || 8080;
const app = express();
const ADMIN = "Admin";

app.use(bodyParser.json());

// CLEANUP CODE
app.delete('/del', async (req, res) => {
    try {
        await Message.deleteMany({})
        return res.send("Done")
    }
    catch (errr) {
        console.log(errr)
        return res.send("Failed")
    }
})
app.delete('/delu', async (req, res) => {
    try {
        await User.deleteMany({})
        return res.send("Done")
    }
    catch (errr) {
        console.log(errr)
        return res.send("Failed")
    }
})

const expressServer = app.listen(PORT, () => console.log("Listening on Port", PORT));
connectToDB();

const io = new Server(expressServer, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    // Handle entering the room
    socket.on('enterRoom', async ({ userName, room }) => {
        try {
            // Activate the user and join the room
            const user = await activateUser({ id: socket.id, userName, room });
            socket.join(user.room);

            // Emit a message about user joining
            socket.broadcast.to(user.room).emit('message', await buildMessage(ADMIN, `${user.userName} has joined the room`, room));

            // Get ten most recent messages and send them to the user
            const recentMessages = await getRecentMessages(room);
            console.log("HERE!")
            console.log(recentMessages)
            socket.emit("MostRecentMessages", recentMessages.reverse());
        } catch (error) {
            console.log("Error entering room", error);
        }
    });

    // Handle new chat message by user
    socket.on("newChatMessage", async (data) => {
        try {
            const findUser = await getUser(socket.id);
            const room = findUser.room
            console.log("Room:")
            console.log(room)
            const message = await buildMessage(data.userName, data.message, room);
            console.log(message)
            io.to(room).emit("newChatMessage", message);
        } catch (error) {
            console.log("Error occurred sending message:", error);
        }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
});

// Function to get recent 10 messages
async function getRecentMessages(room) {
    try {
        const recentMessages = await Message.find({ room: room }).sort({ _id: -1 }).limit(10);
        console.log(recentMessages)
        return recentMessages;
    } catch (error) {
        console.log("Error fetching recent messages:", error);
        return [];
    }
}

// Function to create and save a message
async function buildMessage(userName, text, room) {
    try {
        const message = new Message({
            userName: userName,
            message: text,
            room: room
        });
        await message.save();
        return message;
    } catch (error) {
        console.log("Error building message:", error);
        throw error; // Optionally rethrow the error for higher-level handling
    }
}

// Function to activate users
const activateUser = async ({ id, userName, room }) => {
    try {
        const user = new User({
            socketID: id,
            userName: userName,
            room: room
        });
        await user.save();
        console.log(user);
        return user;
    } catch (error) {
        console.log("Error activating the user", error);
        throw error; // Optionally rethrow the error for higher-level handling
    }
};

// Function to get the user
const getUser = async (id) => {
    try {
        const findUser = await User.findOne({ socketID: id });
        console.log(findUser)
        console.log("I am here")
        return findUser;
    } catch (error) {
        console.log("Error occurred fetching user", error);
        throw error;
    }
};
