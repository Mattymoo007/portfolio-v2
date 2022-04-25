import React, { useCallback, useEffect } from "react"
import Modal from "./Modal"
import Line from "~/assets/svg/decorative.svg"
import { AnimatePresence } from "framer-motion"

type Quote = {
  content: string
  authorSlug: string
  author: string
}

const QuoteBtn = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [quote, setQuote] = React.useState<Quote>()

  const fetchQuote = useCallback(async () => {
    const quoteEndpoint = "https://api.quotable.io/random"
    const response = await fetch(quoteEndpoint)
    const data = await response.json()
    setQuote(data)
  }, [])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  return (
    <>
      <button
        onClick={() => setModalVisible(true)}
        className="fixed z-10 btn-primary border-b border-r top-[20px] left-[20px] md:top-[30px] md:left-[30px] md:px-5 md:w-auto"
      >
        Quote&nbsp;<span className="hidden md:inline">of the day</span>
      </button>

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modalVisible && (
          <Modal
            setIsVisible={(e: boolean) => setModalVisible(e)}
            show={modalVisible}
          >
            {quote && (
              <div className="flex flex-col items-center">
                <p className="text-center">{quote.content}</p>
                <Line className="my-5 dark:text-white" />
                <p className="text-center opacity-70">{quote.author}</p>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuoteBtn
