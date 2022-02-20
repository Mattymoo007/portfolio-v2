import Link from "next/link"
import React from "react"
import { FiHome } from "react-icons/fi"
import { RiWalkFill } from "react-icons/ri"

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <Link href="/">
          <a className="text-white  uppercase text-center flex items-center mb-2 hover:underline ">
            <RiWalkFill />
            <FiHome />
          </a>
        </Link>
        <h1 className="font-lexend uppercase border px-2 py-1">404</h1>
      </div>
    </div>
  )
}

export default ErrorPage
