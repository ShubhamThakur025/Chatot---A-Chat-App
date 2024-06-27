import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    socketID : {
        type : String,
        required : true
    },
    userName: {
        type: String,
        required: true
    },
    room: {
        type: String,
        requried: true
    }
})

export default mongoose.model('User', UserSchema)
