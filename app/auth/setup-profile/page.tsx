import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SetupProfile from "@/components/SetupProfile";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

    const session = await getServerSession(authOptions)

    if(!session?.user.id) redirect("/")
        
    const user = await prisma.user.findUnique({
        where: {id: session.user.id},
        select: {hasProfile: true}
    })

    if(user?.hasProfile) redirect('/chat')

    
    
    return (
        <SetupProfile />
    );
}
