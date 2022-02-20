import Link from "next/link"
import { FC, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { twitterHandle } from "~/utils/constants"
import style from "./menu.module.css"

const Menu: FC<{ className: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`${className} ${!isOpen && style.isClosed} ${style.nav}`}>
      <button
        className="btn-primary border-l border-t ml-auto w-[52px] p-0"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX size="1.3em" /> : <FiMenu size="1.3em" />}
      </button>
      <Link href="/">
        <a className="w-full btn-primary border-l border-t">Home</a>
      </Link>
      <a
        href={twitterHandle}
        target="_blank"
        rel="noreferrer"
        className="w-full btn-primary border-l border-t"
      >
        Twitter
      </a>
      <Link href="/projects">
        <a className="w-full btn-primary border-l border-t">Projects</a>
      </Link>
    </nav>
  )
}

export default Menu
