import { NextResponse } from "next/server";
import { addDemoData } from "@/lib/demo";

export async function POST(req) {
    try {
        console.log("Adding...");
        await addDemoData();
        return new NextResponse("Demo Added", { status: 201 });
    } catch (error) {
        return new NextResponse("Something went wron", { status: 500 });
    }
}