"use client"

import { useGetUsers } from "@/custom-hook/useUser"
import { User } from "@/src/generated/client"
import Image from "next/image"

const FriendsList = (
  { onlineIds }: { onlineIds: string[] }
) => {

  const { users, isLoading, isError } = useGetUsers()

  if (isLoading) return <p className='text-xl text-gray-400 mt-15'>Loading...</p>

  if (isError) return <p className='text-xl text-gray-400 mt-15'>Internal server error</p>

  return (
    <section className="mt-15">

      {users.map((user: User) => {

        const isOnline = onlineIds.includes(user.id)

        return (
          <div
            key={user.id}
            className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-input-bg" >
            {
              user.avatar && (
                <Image
                  src={user.avatar}
                  alt={user.name || "Avatar"}
                  width={100}
                  height={100}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )
            }

            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <span className={`text-sm ${!isOnline ? 'text-gray-400' : 'text-green-400'}`}>{isOnline ? "online" : "offline"}</span>
            </div>

          </div>
        )
      })}

    </section >
  )
}

export default FriendsList
