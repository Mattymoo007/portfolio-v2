import React, { FC, MouseEvent } from "react"

const Modal: FC<{
  setIsVisible: Function
  className?: string
  modalClasses: string
  show: boolean
  width?: string
  height?: string
  bgColor?: string
}> = ({ className = "", modalClasses, show, children, setIsVisible }) => {
  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) setIsVisible(false)
  }

  return show ? (
    <div
      onClick={handleBackdropClick}
      className={`fixed h-full w-full z-50 bg-black/40 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className={`${modalClasses}`}>{children}</div>
    </div>
  ) : null
}

export default Modal
