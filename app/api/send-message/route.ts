import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const { text, receiverId } = body;

    if (!text || !receiverId)
      return NextResponse.json(
        { error: "Text and recieverId are required" },
        { status: 400 },
      );

    const newMessage = await prisma.message.create({
      data: {
        text,
        receiverId,
        senderId: session.user.id,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating message", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
