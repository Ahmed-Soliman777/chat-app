"use client"

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Home() {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    if (loading) return
    e.preventDefault()
    setLoading(true)
    try {

      await axios.post('/api/auth/register', {
        email,
        password
      })

      toast('Register successful', {
        style: {
          background: "#9810fa",
          color: "white"
        }
      })

      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (loginRes?.error) {
        router.replace("/")
      } else {
        router.replace('/auth/setup-profile')
      }

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error || 'something went wrong', {
          style: {
            background: "#9810fa",
            color: "white"
          }
        })
      } else {
        toast('Network error please try again', {
          style: {
            background: "#9810fa",
            color: "white"
          }
        })
      }
    }

    setLoading(false)
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
          Create new account
        </h2>
        <form
          onSubmit={handleSignup}
          className="py-10 px-6 rounded-lg shadow-md"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
            className="w-full px-4 py-3 placeholder-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
            className="w-full px-4 py-3 placeholder-gray-400 bg-input-bg rounded-lg outline-none text-gray-100 my-3"
          />
          <button
            className="w-full bg-blue-500 my-2 py-2 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
          >
            {loading ? "Loading..." : "Signup"}
          </button>
          <div className="my-3 text-center text-white">
            <span>Already have an account</span>
            <Link
              href={'/'}
              className="ml-2 text-blue-600">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
