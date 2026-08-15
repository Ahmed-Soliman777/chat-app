import { IoIosSend } from "react-icons/io"

const ChatInput = () => {
    return (
        <div className='p-4 border-t border-border flex items-center gap-2 bg-slate-950'>

            <input
                type="text"
                placeholder='Write a message...'
                className='px-4 py-2 flex-1 rounded-full bg-slate-800 text-white border border-slate-700 focus:outline-none'
            />

            <button
                className="w-10 h-10 bg-blue-500 text-white hover:bg-blue-700 transition shrink-0 rounded-full cursor-pointer grid place-items-center"
            >
                <IoIosSend size={20} />
            </button>
        </div>
    )
}

export default ChatInput
