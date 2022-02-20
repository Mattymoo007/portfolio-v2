export function initTypewriter(text: string = "hello") {
  const typeText = document.querySelector(".typewriter") as HTMLElement
  let index = 0
  let isAdding = true

  if (!typeText) return

  setTimeout(function () {
    typeText.innerText = text.slice(0, index)
    if (isAdding) {
      if (index > text.length) {
        isAdding = false
        setTimeout(function () {
          initTypewriter()
        }, 2000)
        return
      } else {
        index++
      }
    } else {
      if (index === 0) {
        isAdding = true
      } else {
        index--
      }
    }
    initTypewriter()
  }, 120)
}
