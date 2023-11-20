import { addTransaction, connectToMongoDB, disconnectFromMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
    try {
        const transactionData = await req.json();

        if (!transactionData.date || !transactionData.description || !transactionData.type || !transactionData.amount) {
            console.log("Missing Info");
            return new NextResponse('Missing Info', { status: 400 });
        }

        
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken({ req, secret });
        
        const userId = token.id;
        
        await connectToMongoDB();
        
        const transaction = await addTransaction(userId, transactionData);

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