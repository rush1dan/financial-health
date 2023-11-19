import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const transactionSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense', 'asset', 'debt']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true,
        //min: new Date('1990-01-01')
    }
});

const Transaction = models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;