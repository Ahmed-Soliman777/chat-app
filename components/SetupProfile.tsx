"use client"

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiFillMessage } from 'react-icons/ai'
import { toast } from 'react-toastify'

const SetupProfile = () => {

    const [name, setName] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [imagePreview, setImagePreview] = useState<null | string>(null)
    const [image, setImage] = useState<null | File>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]

        if (file) {
            setImagePreview(URL.createObjectURL(file))
            setImage(file)
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (loading) return

        if (!name || !bio || !image) {
            toast("Invalid credentials", {
                style: {
                    background: "#9810fa",
                    color: "white"
                }
            })
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("bio", bio)
            formData.append("avatar", image as File)

            await axios.put('/api/auth/setup-profile', formData)

            toast("Profile updated successfully", {
                style: {
                    background: "#9810fa",
                    color: "white"
                }
            })

            router.replace('/chat')

        } catch (error) {
            console.error(error)
            toast("Something went wrong", {
                style: {
                    background: "#9810fa",
                    color: "white"
                }
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-87.5 w-[95%]">
                <div className="flex items-center justify-center text-indigo-600">
                    <AiFillMessage
                        size={50}
                    />
                </div>
                <h2 className="text-center font-bold my-6 text-gray-300">
                    Setup Profile
                </h2>
                <div className="flex justify-center">
                    {
                        imagePreview && (
                            <Image
                                src={imagePreview}
                                alt="uploaded-image"
                                height={1000}
                                width={1000}
                                className="h-35 w-35 rounded-full object-cover"
                            />
                        )
                    }
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="py-10 px-6 rounded-lg shadow-md"
                >
                    <input
                        type="text"
                        placeholder="user name"
                        className="w-full px-4 py-3 placeholder-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Bio"
                        className="w-full resize-none px-4 py-3 placeholder-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
                    />
                    <label className="text-gray-400">Profile Picture</label>
                    <input
                        onChange={handleImage}
                        type="file"
                        className="w-full px-4 py-3 placeholder-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
                    />
                    <button
                        className="w-full bg-blue-500 my-2 py-2 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
                    >
                        {loading ? "Loading..." : "Continue"}
                    </button>
                    <div className="my-3 text-center text-white">
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SetupProfile
