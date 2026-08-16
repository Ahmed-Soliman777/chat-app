"use client"
import { useSendMessage } from "@/custom-hook/useMessage"
import { useChatStore } from "@/lib/store"
import { useState } from "react"
import { IoIosSend } from "react-icons/io"

const ChatInput = () => {
    const [text, setText] = useState<string>("")
    const { activeChatUser } = useChatStore()
    const receiverId = activeChatUser?.id

    async function handleSend() {
        if (!text) return
        if (!receiverId) return

        await useSendMessage(text, receiverId)

        setText("")
    }

    return (
        <div className='p-4 border-t border-border flex items-center gap-2 bg-slate-950'>

            <input
                type="text"
                placeholder='Write a message...'
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='px-4 py-2 flex-1 rounded-full bg-slate-800 text-white border border-slate-700 focus:outline-none'
            />

            {
                text.trim().length > 0 && (
                    <button
                        onClick={handleSend}
                        className="w-10 h-10 bg-blue-500 text-white hover:bg-blue-700 transition shrink-0 rounded-full cursor-pointer grid place-items-center"
                    >
                        <IoIosSend size={20} />
                    </button>
                )
            }
        </div>
    )
}

export default ChatInput
