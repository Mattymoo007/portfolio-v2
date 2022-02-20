import { createContext, FC, useEffect, useState } from "react"
import { initTheme, setTheme } from "~/utils/color-scheme"
import { FiArrowRight, FiMoon, FiSun } from "react-icons/fi"
import Menu from "~/components/Menu/Menu"
import Weather from "~/components/Weather"
import Modal from "~/components/Modal/Modal"
import ContactForm from "~/components/ContactForm/ContactForm"
import Link from "next/link"

interface IThemeContext {
  isDark: boolean
  toggleTheme?: () => void
}

export const ThemeContext = createContext<IThemeContext>({ isDark: false })

const DefaultLayout: FC<{
  showCountry?: boolean
  showWeather?: boolean
  topLeftBtn?: Function
}> = ({
  children,
  showCountry = true,
  showWeather = true,
  topLeftBtn = null,
}) => {
  const [isDark, setIsDark] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    initTheme(setIsDark)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    setTheme(isDark ? "light" : "dark")
  }

  const themeAppContext: IThemeContext = {
    isDark,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={themeAppContext}>
      <Modal
        setIsVisible={(e: boolean) => setModalVisible(e)}
        modalClasses="p-[20px] md:p-[30px] border border-black dark:border-white bg-light dark:bg-black w-[80%] md:w-[30%]"
        show={modalVisible}
      >
        <ContactForm />
      </Modal>

      <div className="z-20 fixed top-0 left-0 w-full h-[20px] md:h-[30px] bg-light border-black dark:border-light dark:bg-black border-b"></div>
      <div className="z-20 fixed bottom-0 left-0 w-full h-[20px] md:h-[30px] bg-light border-black dark:border-light dark:bg-black border-t"></div>
      <div className="z-20 fixed left-0 top-0 bottom-0 w-[20px] md:w-[30px] bg-light border-black dark:border-light dark:bg-black border-r"></div>
      <div className="z-20 fixed right-0 top-0 bottom-0 w-[20px] md:w-[30px] bg-light border-black dark:border-light dark:bg-black border-l"></div>
      <div className="z-20 fixed top-0 left-0 w-full h-[20px] md:h-[29px] bg-light dark:bg-black"></div>
      <div className="z-20 fixed bottom-0 left-0 w-full h-[20px] md:h-[29px] bg-light dark:bg-black"></div>

      {showWeather && (
        <Weather className="fixed z-10 top-[30px] left-1/2 -translate-x-1/2" />
      )}

      <button
        className="fixed z-10 btn-primary border-b border-r top-[30px] left-[30px] w-[52px] px-0 md:px-5 md:w-auto"
        onClick={toggleTheme}
      >
        <span className="md:mr-2 text-sm">
          {!isDark ? <FiSun size="1.5em" /> : <FiMoon size="1.5em" />}
        </span>
        <span className="hidden md:inline">{!isDark ? "light" : "dark"}</span>
      </button>

      <button className="fixed z-10 btn-primary border-b border-l top-[30px] right-[30px]">
        {topLeftBtn ? (
          topLeftBtn()
        ) : (
          <span>
            Quote&nbsp;<span className="hidden md:inline">of the day</span>
          </span>
        )}
      </button>

      <button
        onClick={() => setModalVisible(true)}
        className="fixed z-10 btn-primary border-t border-r bottom-[30px] left-[30px]"
      >
        Contact <FiArrowRight size="1.2em" className="ml-2 hidden md:inline" />
      </button>

      {showCountry && (
        <span className="fixed z-10 bottom-[30px] left-1/2 text-xs md:text-base -translate-x-1/2 font-lexend h-[52px] flex items-center uppercase">
          <span className="hidden md:block">Currently based in:</span>
          <div className="fflag fflag-BE ff-md ml-2 border"></div>
        </span>
      )}

      <Menu className="fixed z-10 bottom-[30px] right-[30px]" />

      <main className="bg-light dark:bg-black min-h-screen p-[20px] md:p-[30px]">
        {children}
      </main>
    </ThemeContext.Provider>
  )
}

export default DefaultLayout
