"use client"

import { pusherClient } from "@/lib/pusher-client"
import { ChatStore } from "@/lib/store"
import { MessageType } from "@/types"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AiFillMessage } from "react-icons/ai"

const ChatWindow = ({ messages }: { messages: MessageType[] }) => {


    const [chatMessages, setChatMessages] = useState<MessageType[]>(messages)

    const bottomRef = useRef<HTMLDivElement>(null)

    const { activeChatUser } = ChatStore()

    const receiverId = activeChatUser?.id

    const { data: session } = useSession()

    const currentUserId = session?.user.id


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages])

    useEffect(() => {
        if (!currentUserId || !receiverId) {
            return
        }

        const ids = [currentUserId, receiverId].sort()

        const channelName = `chat-${ids[0]}-${ids[1]}`;

        const channel = pusherClient.subscribe(channelName)

        function handleNewMessage(message: MessageType) {
            setChatMessages((prev) => {
                if (prev.some((m) => m.id === message.id)) return prev
                return [...prev, message]
            })
        }

        channel.bind('new-message', handleNewMessage)

        return () => {
            channel.unbind('new-message', handleNewMessage)
            pusherClient.unsubscribe(channelName)
        }
    }, [currentUserId, receiverId])

    return (
        <div className="flex-1 overflow-y-auto p-2 space-y-4 mt-6">
            {
                chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-indigo-600">
                            <AiFillMessage size={50} />
                        </div>
                        <p className="text-3xl font-semibold text-gray-300">No messages yet. Start chatting!</p>
                    </div>
                ) : (
                    chatMessages.map((message) => {
                        const isOwnMessage = message.senderId === currentUserId
                        return (
                            <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} gap-2`} key={message.id}>
                                {
                                    !isOwnMessage && message.sender.avatar && (
                                        <Image
                                            src={message.sender.avatar}
                                            alt={message.sender.name || ""}
                                            width={1000}
                                            height={1000}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    )
                                }
                                <div className="max-w-xs text-right">
                                    <div className={`${isOwnMessage ? "bg-blue-500" : "bg-slate-800 rounded-bl-2xl"} px-4 py-2 text-white rounded-br-2xl rounded-lg`}>
                                        {message.text}
                                    </div>
                                </div >
                                {
                                    isOwnMessage && message.sender.avatar && (
                                        <Image
                                            src={message.sender.avatar}
                                            alt={message.sender.name || ""}
                                            width={1000}
                                            height={1000}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    )
                                }
                            </div >
                        )
                    })
                )
            }
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatWindow
