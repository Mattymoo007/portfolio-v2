import React, { useCallback, useEffect } from "react"
import Modal from "./Modal/Modal"
import Line from "~/assets/svg/decorative.svg"

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

  const showQuote = () => {
    setModalVisible(true)
  }

  return (
    <>
      <button
        onClick={showQuote}
        className="fixed z-10 btn-primary border-b border-l top-[20px] right-[20px] md:top-[30px] md:right-[30px]"
      >
        Quote&nbsp;<span className="hidden md:inline">of the day</span>
      </button>

      <Modal
        setIsVisible={(e: boolean) => setModalVisible(e)}
        modalClasses="p-[20px] md:p-[30px] border border-black dark:border-white bg-light dark:bg-black w-[80%] md:w-[30%]"
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
    </>
  )
}

export default QuoteBtn
