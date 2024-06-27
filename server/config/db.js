import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: './envFiles/.env' })
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected To MongoDB")
    }
    catch (error) {
        console.log("Failed to Connect", error)
        process.exit(1)
    }
}

export default connectToDB 