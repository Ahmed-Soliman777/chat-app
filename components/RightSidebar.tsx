"use client"

import Image from "next/image"
import LogoutButton from "./LogoutButton"
import { useGetUser } from "@/custom-hook/useUser"

const RightSidebar = () => {

    const { isLoading, user, isError } = useGetUser()

    if (isLoading) {
        return (
            <aside className="h-screen fixed top-0 right-0 w-87.5 border border-border">
                <p className="text-xl text-gray-400">Loading...</p>
            </aside>
        )
    }

    if (isError) {
        return (
            <aside className="h-screen fixed top-0 right-0 w-87.5 border border-border">
                <p className="text-xl text-gray-400">Error Fetching User</p>
            </aside>
        )
    }

    return (
        <aside className="hidden xl:block h-screen fixed top-0 right-0 w-87.5 border border-border">

            <div className=" flex flex-col justify-between h-full p-4 ">
                <div className="flex items-center mt-10 flex-col">
                    <Image
                        src={user?.avatar}
                        alt='profile-pic'
                        width={1000}
                        height={1000}
                        className="w-35 h-35 rounded-full object-cover"
                    />
                    <div className="flex items-center gap-2 my-4">
                        <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                        <p className="text-white text-xl font-semibold">
                            {user?.name}
                        </p>
                    </div>
                    <div className="bg-border h-px w-full my-5"></div>
                    <p className="text-center text-md text-text-muted">
                        {user?.bio}
                    </p>
                </div>
                <LogoutButton />
            </div>

        </aside>
    )
}

export default RightSidebar
