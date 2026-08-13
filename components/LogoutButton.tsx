"use client"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-blue-500 w-[80%] mx-auto py-3 rounded-full text-white cursor-pointer"
        >Logout</button>
    )
}

export default LogoutButton
