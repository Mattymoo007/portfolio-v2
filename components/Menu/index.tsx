import Link from "next/link"
import { FC, useEffect, useRef, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { MdHome } from "react-icons/md"
import style from "./menu.module.css"

const Menu: FC<{ className: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  return (
    <nav
      className={`${className} ${!isOpen && style.isClosed} ${style.nav}`}
      ref={wrapperRef}
    >
      <Link href="/">
        <a className="w-full btn-primary border-l">
          <MdHome size="1.5em" />
        </a>
      </Link>
      {/* <Link href="/cv">
        <a className="w-full btn-primary border-l border-t">CV</a>
      </Link> */}
      <Link href="/projects">
        <a className="w-full btn-primary border border-r-0">Projects</a>
      </Link>
      <button
        className="btn-primary border-l border-b ml-auto w-[52px] p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size="1.3em" /> : <FiMenu size="1.3em" />}
      </button>
    </nav>
  )
}

export default Menu
