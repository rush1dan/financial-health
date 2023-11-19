import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        if (process.env.MONGODB_URL) {
            await mongoose.connect(process.env.MONGODB_URL);
        }
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}

const disconnectFromMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error disconnecting from MongoDB: ", error);
    }
}

export {connectToMongoDB, disconnectFromMongoDB}