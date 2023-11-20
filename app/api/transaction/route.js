import { connectToMongoDB, disconnectFromMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Transaction from "@/models/transaction";

export async function POST(req) {
    try {
        const transactionData = await req.json();

        if (!transactionData.date || !transactionData.description || !transactionData.type || !transactionData.amount) {
            console.log("Missing Info");
            return new NextResponse('Missing Info', { status: 400 });
        }

        transactionData.date = new Date(transactionData.date);

        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken({ req, secret });

        const userId = token.id;

        await connectToMongoDB();

        const user = await User.findById(userId);
        transactionData.user = user;
        const transaction = await Transaction.create(transactionData);

        if (transactionData.type === 'Asset') {
            user.asset += transactionData.amount;
        } else if (transactionData.type === 'Debt') {
            user.debt += transactionData.debt;
        }
        await user.save();

        console.log("Transaction Created Successfully");
        return new NextResponse(JSON.stringify(transaction), { status: 201 });
    } catch (error) {
        console.log(error);
        return new NextResponse(`An error occurred while creating transaction. ErrorMessage: ${error.message}`, { status: 500 });
    }
    finally {
        await disconnectFromMongoDB();
    }
}