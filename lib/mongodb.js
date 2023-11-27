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
    transactionData.date = new Date(transactionData.date);      //converting string to date
    const user = await User.findById(userId);
    transactionData.user = user;
    const transaction = await Transaction.create(transactionData);

    if (transaction.type === 'Asset') {
        user.asset += transaction.amount;
    } else if (transaction.type === 'Debt') {
        user.debt += transaction.amount;
    }
    await user.save();

    return transaction;
}

const editTransaction = async (userId, transactionData) => {
    transactionData.date = new Date(transactionData.date);
    const transaction = await Transaction.findById(transactionData._id);

    if (transaction.user.toString() !== userId) {
        throw new Error("This transaction doesn't belong to this user");
    }

    for (const key in transactionData) {
        if (key !== '_id') {    //copy all data except the _id without creating new object or assigment
            transaction[key] = transactionData[key];
        }
    }

    await transaction.save();

    return transaction;
}

const deleteTransaction = async (userId, transactionId) => {
    if (transaction.user.toString() !== userId) {
        throw new Error("This transaction doesn't belong to this user");
    }
    
    await Transaction.findByIdAndDelete(transactionId);
}

const getMonthlyTransactions = async (userId, month, year) => {
    const { start, end } = getStartAndEndDatesForMonth(month, year);
    const transactionData = await Transaction.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                date: { $gte: start, $lte: end }
            }
        },
        {
            $sort: { date: -1 }
        }
    ]);
    const graphData = await Transaction.aggregate(
        [
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: {
                        date: '$date',
                        type: '$type'
                    },
                    amount: { $sum: '$amount' }
                }
            },
            {
                $group: {
                    _id: '$_id.type',
                    transactions: {
                        $push: {
                            day: { $dayOfMonth: '$_id.date' },
                            amount: { $round: ['$amount', 2] }
                        },
                    }
                }
            },
            // **For sorting transactions array by day/date
            {
                $unwind: '$transactions'
            },
            {
                $sort: { 'transactions.day': 1 }
            },
            {
                $group: {
                    _id: '$_id',
                    transactions: {
                        $push: '$transactions'
                    }
                }
            },
            // **end sorting
            {
                $group: {
                    _id: null,
                    array: {
                        $push: {
                            k: '$_id',
                            v: '$transactions'
                        },
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: { $arrayToObject: '$array' }
                }
            },
        ]
    );
    return { transactionData, graphData };
}

const getYearlyTransactions = async (userId, year) => {
    const { start, end } = getStartAndEndDatesForYear(year);
    const transactionData = await Transaction.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                date: { $gte: start, $lte: end }
            }
        },
        {
            $sort: { date: -1 }
        }
    ]);
    const graphData = await Transaction.aggregate(
        [
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        type: '$type'
                    },
                    amount: { $sum: '$amount' }
                }
            },
            {
                $group: {
                    _id: '$_id.type',
                    transactions: {
                        $push: {
                            month: '$_id.month',
                            amount: { $round: ['$amount', 2] }
                        },
                    }
                }
            },
            // **For sorting transactions array by month
            {
                $unwind: '$transactions'
            },
            {
                $sort: { 'transactions.month': 1 }
            },
            {
                $group: {
                    _id: '$_id',
                    transactions: {
                        $push: '$transactions'
                    }
                }
            },
            // **end sorting
            {
                $group: {
                    _id: null,
                    array: {
                        $push: {
                            k: '$_id',
                            v: '$transactions'
                        },
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: { $arrayToObject: '$array' }
                }
            },
        ]
    );
    return { transactionData, graphData };
}

export { connectToMongoDB, disconnectFromMongoDB, addTransaction, editTransaction, deleteTransaction, getMonthlyTransactions, getYearlyTransactions }