import Transaction from "@/models/transaction";
import mongoose from "mongoose";
import { getStartAndEndDatesForMonth, getStartAndEndDatesForYear } from "./utils";
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
    const { start, end } = getStartAndEndDatesForMonth(month, year);
    const transactions = await Transaction.find({
        user: userId,
        date: { $gte: start, $lte: end }
    }).sort({ date: -1 });  //sort date by descending order
    return transactions;
}

const getYearlyTransactions = async (userId, year) => {
    const { start, end } = getStartAndEndDatesForYear(year);
    const transactions = await Transaction.find({
        user: userId,
        date: { $gte: start, $lte: end }
    }).sort({ date: -1 });  //sort date by descending order
    return transactions;
}

export {connectToMongoDB, disconnectFromMongoDB, getMonthlyTransactions, getYearlyTransactions}