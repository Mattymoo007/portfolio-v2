import { AnimatePresence } from "framer-motion"
import React, { useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import ContactForm from "./ContactForm"
import Modal from "./Modal"

const ContactBtn = () => {
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowContactModal(true)}
        className="fixed z-10 btn-primary border-t border-l bottom-[20px] right-[20px] md:bottom-[30px] md:right-[30px]"
      >
        Contact <FiArrowRight size="1.2em" className="ml-2 hidden md:inline" />
      </button>

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {showContactModal && (
          <Modal
            setIsVisible={(e: boolean) => setShowContactModal(e)}
            show={showContactModal}
          >
            <ContactForm />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactBtn
