import React, { useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import ContactForm from "./ContactForm/ContactForm"
import Modal from "./Modal/Modal"

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

      <Modal
        setIsVisible={(e: boolean) => setShowContactModal(e)}
        modalClasses="p-[20px] md:p-[30px] border border-black dark:border-white bg-light dark:bg-black w-[80%] md:w-[60%] lg:w-[40%]"
        show={showContactModal}
      >
        <ContactForm />
      </Modal>
    </>
  )
}

export default ContactBtn
