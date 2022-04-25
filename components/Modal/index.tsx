import React, { FC, MouseEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"

const Modal: FC<{
  setIsVisible: Function
  className?: string
  modalClasses?: string
  show: boolean
  width?: string
  height?: string
  bgColor?: string
}> = ({ className = "", modalClasses, show, children, setIsVisible }) => {
  const handleBackdropClick = (e: MouseEvent) => {
    setIsVisible(false)
  }
  const fadeIn = {
    hidden: {
      y: "15%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { delay: 0.05 },
      },
    },
    exit: {
      y: "15%",
      opacity: 0,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={handleBackdropClick}
      className={`fixed h-full w-full z-50 bg-black/40 flex items-center justify-center overflow-hidden ${className}`}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
        className={
          !modalClasses
            ? "p-[20px] md:p-[30px] border border-black dark:border-white bg-light dark:bg-black w-[80%] md:w-[60%] lg:w-[40%]"
            : modalClasses
        }
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Modal
