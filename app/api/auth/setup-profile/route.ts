import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const avatar = formData.get("avatar") as File;

    const arrayBuffer = await avatar.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "chatapp-avatar" }, (error, result) => {
            if (error || !result) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(buffer);
      },
    );

    const avatar_url = uploadResult.secure_url;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name, bio, avatar: avatar_url, hasProfile: true },
    });

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    console.error("profile-setup-profile", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
