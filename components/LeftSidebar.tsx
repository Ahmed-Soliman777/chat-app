"use client"

import { FaUsers } from "react-icons/fa6"
import FriendsList from "./FriendsList"
import { AiFillMessage } from "react-icons/ai"
import { useState } from "react"

const LeftSidebar = () => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

    function toggleSidebar() {
        setSidebarOpen(prev => !prev)
    }

    return (
        <aside>

            <button
                onClick={toggleSidebar}
                className="fixed bottom-3 left-1 bg-blue-500 w-12 h-12 grid place-items-center text-white rounded-full z-50 cursor-pointer md:hidden"
            >
                <AiFillMessage />
            </button>
            <div className={`min-h-screen md:translate-x-0 w-full fixed top-0 left-0 md:w-87.5 border-r border-border transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="relative p-4">
                    <div className="w-full h-15 absolute top-0 left-0 p-4 flex justify-between items-center border border-border">
                        <span className="text-2xl font-bold text-gray-400">Friends</span>
                        <div className="h-9 w-9 rounded-full bg-blue-500 text-white text-xl grid place-items-center">
                            <FaUsers />
                        </div>
                    </div>

                    <FriendsList />

                </div>

            </div>

        </aside>
    )
}

export default LeftSidebar
