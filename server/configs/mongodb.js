import mongoose from "mongoose";

// connect to mongodb

const connectDb = async () => {
    mongoose.connection.on('connected', ()=> console.log('MongoDb Connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
}

export default connectDb