import { connectToMongoDB, disconnectFromMongoDB, getYearlyTransactions } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(req, {params}) {
    try {
        console.log("TYPE: ", typeof params.year);
        if (isNaN(params.year)) {
            throw new Error("Param type must be integer");
        }
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken({ req, secret });

        const userId = token.id;

        await connectToMongoDB();
        const transactions = await getYearlyTransactions(userId, params.year);

        console.log("Transaction Retrieved Successfully");
        return new NextResponse(JSON.stringify(transactions), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(`An error occurred while creating transaction. ErrorMessage: ${error.message}`, { status: 500 });
    }
    finally {
        await disconnectFromMongoDB();
    }
}