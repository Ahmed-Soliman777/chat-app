import Image from "next/image"

const FriendsList = () => {
  return (
    <section className="mt-15">

      <div className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-input-bg">

        <Image
          src={'/profile.jpg'}
          alt='profile-pic'
          width={100}
          height={100}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-white">Johnny</p>
          <span className="text-sm text-gray-400">offline</span>
        </div>

      </div>

      <div className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-input-bg">

        <Image
          src={'/profile2.jpg'}
          alt='profile-pic'
          width={100}
          height={100}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-white">John</p>
          <span className="text-sm text-green-400">online</span>
        </div>

      </div>

    </section>
  )
}

export default FriendsList
