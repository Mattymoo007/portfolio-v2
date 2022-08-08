import { createContext, FC, useEffect, useState } from "react"
import { initTheme, setTheme } from "~/utils/color-scheme"
import { FiMoon, FiSun } from "react-icons/fi"
import Menu from "~/components/Menu"
import Weather from "~/components/Weather"
import QuoteBtn from "~/components/QuoteBtn"
import ContactBtn from "~/components/ContactBtn"

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
      <div className="z-20 fixed top-0 left-0 w-full h-[20px] md:h-[30px] bg-light border-black dark:border-light dark:bg-black border-b"></div>
      <div className="z-20 fixed bottom-0 left-0 w-full h-[20px] md:h-[30px] bg-light border-black dark:border-light dark:bg-black border-t"></div>
      <div className="z-20 fixed left-0 top-0 bottom-0 w-[20px] md:w-[30px] bg-light border-black dark:border-light dark:bg-black border-r"></div>
      <div className="z-20 fixed right-0 top-0 bottom-0 w-[20px] md:w-[30px] bg-light border-black dark:border-light dark:bg-black border-l"></div>
      <div className="z-20 fixed top-0 left-0 w-full h-[19px] md:h-[29px] bg-light dark:bg-black"></div>
      <div className="z-20 fixed bottom-0 left-0 w-full h-[19px] md:h-[29px] bg-light dark:bg-black"></div>

      {/* Weather display */}
      {showWeather && (
        <Weather className="fixed z-10 top-[30px] left-1/2 -translate-x-1/2" />
      )}
      {/* Quote btn */}
      {topLeftBtn ? topLeftBtn() : <QuoteBtn />}

      {/* Menu navigation */}
      <Menu className="fixed z-10 top-[20px] right-[20px] md:top-[30px] md:right-[30px]" />

      {/* Darkmode toggle */}
      <button
        className="fixed z-10 btn-primary border-t border-r bottom-[20px] left-[20px] md:bottom-[30px] md:left-[30px]"
        onClick={toggleTheme}
      >
        <span className="md:mr-2 text-sm">
          {!isDark ? <FiSun size="1.5em" /> : <FiMoon size="1.5em" />}
        </span>
        <span className="hidden md:inline">{!isDark ? "light" : "dark"}</span>
      </button>

      {/* Country display */}
      {showCountry && (
        <span className="fixed z-10 bottom-[30px] left-1/2 text-xs md:text-base -translate-x-1/2 font-lexend h-[52px] flex items-center uppercase">
          <span className="hidden md:block">Currently based in:</span>
          <div className="fflag fflag-BE ff-md ml-2 border border-black dark:border-grey"></div>
        </span>
      )}

      {/* Contact btn */}
      <ContactBtn />

      <main className="bg-light dark:bg-black min-h-screen p-[20px] md:p-[30px]">
        {children}
      </main>
    </ThemeContext.Provider>
  )
}

export default DefaultLayout
