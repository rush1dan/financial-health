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

const addTransaction = async (userId, transactionData) => {
    transactionData.date = new Date(transactionData.date);
    const user = await User.findById(userId);
    transactionData.user = user;
    const transaction = await Transaction.create(transactionData);

    if (transaction.type === 'Asset') {
        user.asset += transaction.amount;
    } else if (transaction.type === 'Debt') {
        user.debt += transaction.debt;
    }
    await user.save();

    return transaction;
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

export { connectToMongoDB, disconnectFromMongoDB, addTransaction, getMonthlyTransactions, getYearlyTransactions }