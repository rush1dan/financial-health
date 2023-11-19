import { connectToMongoDB, disconnectFromMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            console.log("Missing Info");
            return new NextResponse('Missing Info', { status: 400 });
        }

        await connectToMongoDB();

        const existingUser = await User.findOne({ email }).select("_id");
        if (existingUser) {
            console.log("User Already Exists");
            return new NextResponse('User already exists', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ username, email, password: hashedPassword });

        console.log("User Created Successfully");
        return new NextResponse(createdUser, { status: 201 });
    } catch (error) {
        return new NextResponse(`An error occurred while registering user. ErrorMessage: ${error.message}`, { status: 500 });
    }
    finally {
        await disconnectFromMongoDB();
    }
}