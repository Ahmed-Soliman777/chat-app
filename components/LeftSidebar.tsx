"use client"

import { FaUsers } from "react-icons/fa6"
import FriendsList from "./FriendsList"
import { AiFillMessage } from "react-icons/ai"
import { useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher-client"
import { useChatStore } from "@/lib/store"
import { Members } from "pusher-js"

type PresenceMember = {
    id: string
}

const LeftSidebar = () => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)


    const { onlineIds } = useChatStore()


    useEffect(() => {
        const channel = pusherClient.subscribe('presence-online-users')

        // initial members list
        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            useChatStore.setState({
                onlineIds: Object.keys(members.members)
            })
        })

        // add logged in user as a member
        channel.bind('pusher:member_added', (member: PresenceMember) => {
            useChatStore.setState((state) => {
                if (state.onlineIds.includes(member.id)) return state
                return { onlineIds: [...state.onlineIds, member.id] }
            })
        })

        // remove users when they go offline
        channel.bind('pusher:member_removed', (member: PresenceMember) => {
            useChatStore.setState((state) => ({
                onlineIds: state.onlineIds.filter((id) => id !== member.id)
            }))
        })

        // when users close the application unsubsribe them
        return () => {
            pusherClient.unsubscribe('presence-online-users')
        }
    }, [])


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
            <div className={`min-h-screen bg-slate-950 md:translate-x-0 w-full fixed top-0 left-0 md:w-87.5 border-r border-border transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="relative p-4">
                    <div className="w-full h-15 absolute top-0 left-0 p-4 flex justify-between items-center border border-border">
                        <span className="text-2xl font-bold text-gray-400">Friends</span>
                        <div className="h-9 w-9 rounded-full bg-blue-500 text-white text-xl grid place-items-center">
                            <FaUsers />
                        </div>
                    </div>

                    <FriendsList
                        onlineIds={onlineIds}
                        setSidebarOpen={setSidebarOpen}
                    />

                </div>

            </div>

        </aside>
    )
}

export default LeftSidebar
