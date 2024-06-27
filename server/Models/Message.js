import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        requried: true
    },
    room : {
        type : String,
        requried : true
    }
}, {
    timeStamp: {
        createdAt: true,
        updatedAt: true
    }
})

export default mongoose.model('Message', messageSchema)
