import { MessageType } from "@/types"
import Image from "next/image"
import { AiFillMessage } from "react-icons/ai"

const ChatWindow = ({ messages }: { messages: MessageType[] }) => {
    return (
        <div className="flex-1 overflow-y-auto p-2 space-y-4 mt-6">
            {
                messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-indigo-600">
                            <AiFillMessage size={50} />
                        </div>
                        <p className="text-3xl font-semibold text-gray-300">No messages yet. Start chatting!</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        return (
                            <div className="flex justify-end gap-2" key={message.id}>
                                <div className="max-w-xs text-right">
                                    <div className="bg-blue-500 px-4 py-2 text-white rounded-br-2xl rounded-lg">
                                        {message.text}
                                    </div>
                                </div >
                                <Image
                                    src={message.sender.avatar}
                                    alt={message.sender.name}
                                    width={1000}
                                    height={1000}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div >
                        )
                    })
                )
            }
        </div >
    )
}

export default ChatWindow
