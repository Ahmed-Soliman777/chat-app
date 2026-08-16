"use client"

import ChatInput from "@/components/ChatInput"
import ChatWindow from "@/components/ChatWindow"
import { useGetMessage } from "@/custom-hook/useMessage"
import { useChatStore } from "@/lib/store"
import Image from "next/image"
import { FaUser } from "react-icons/fa6"

const page = () => {

  const { activeChatUser, onlineIds } = useChatStore()

  const receiverId = activeChatUser?.id

  const { messages, isLoading, isError } = useGetMessage(receiverId)

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-400">Failed to fetch messages</p>
      </div>
    )
  }

  if (!activeChatUser) {
    return (
      <section className="flex flex-col h-screen flex-1 p-4 justify-center">
        <div className="text-center space-y-2">
          <div className="text-indigo-600 flex justify-center">
            <FaUser size={30} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-300">
            Select a user to start chatting
          </h2>
          <p className="text-gray-500">Your conversations will appear here.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col h-screen flex-1 p-4">

      <header className="flex items-center gap-2">
        {
          activeChatUser.avatar && (
            <Image
              src={activeChatUser.avatar}
              alt={activeChatUser.name}
              width={1000}
              height={1000}
              className="w-10 h-10 rounded-full object-cover"
            />
          )
        }
        <div>
          <p className="font-semibold text-bold text-white">{activeChatUser.name}</p>
          {onlineIds.includes(activeChatUser.id) ? (
            <p className="text-green-400 text-xs">online</p>
          ) : (
            <p className="text-gray-400 text-xs">offline</p>
          )}
        </div>
      </header>


      <ChatWindow
        messages={messages}
      />

      <ChatInput />

    </section >
  )
}

export default page
