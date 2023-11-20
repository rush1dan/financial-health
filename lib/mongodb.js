import Transaction from "@/models/transaction";
import mongoose from "mongoose";
import { getStartAndEndDates } from "./utils";
import User from "@/models/user";

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

const getMonthlyTransactions = async (userId, month, year) => {
    const { start, end } = getStartAndEndDates(month, year);
    const transactions = await Transaction.find({
        user: userId,
        date: { $gte: start, $lte: end }
    });
    return transactions;
}

const getYearlyTransactions = async (userId) => {

}

export {connectToMongoDB, disconnectFromMongoDB, getMonthlyTransactions, getYearlyTransactions}