export function getTheme() {
  return localStorage.getItem("theme")
}

export function setTheme(theme: string) {
  theme === "dark"
    ? document.querySelector("html")?.classList.add("dark")
    : document.querySelector("html")?.classList.remove("dark")

  localStorage.setItem("theme", theme)
}

export function initTheme(setIsDark: Function) {
  const theme = getTheme()
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (!theme) {
    setTheme(prefersDark ? "dark" : "light")
    setIsDark(prefersDark)
  } else {
    setTheme(theme)
    setIsDark(theme === "dark")
  }
}
