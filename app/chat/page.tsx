import ChatInput from "@/components/ChatInput"
import Image from "next/image"

const page = () => {
  return (
    <section className="flex flex-col h-screen flex-1 p-4">

      <header className="flex items-center gap-2">
        <Image
          src={'/profile.jpg'}
          alt={'profile image'}
          width={1000}
          height={1000}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-bold text-white">Mohamed Ali</p>
          <p className="text-gray-400 text-xs">offline</p>
        </div>
      </header>


      <div className="flex-1 overflow-y-auto p-2 space-y-4 mt-6">
        <div className="flex justify-end gap-2">
          <div className="max-w-xs text-right">
            <div className="bg-blue-500 px-4 py-2 text-white rounded-br-2xl rounded-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat.
            </div>
            <span className="text-xs text-gray-400 mr-2">10:30 AM</span>
          </div>
          <Image
            src={'/profile.jpg'}
            alt={'profile image'}
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>

      <ChatInput />

    </section>
  )
}

export default page
