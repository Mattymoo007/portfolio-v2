import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { emailAddress, twitterHandle } from "~/utils/constants"

type FormData = {
  name: string
  email: string
  message: string
}

const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactForm: FC<{ className?: string }> = ({ className }) => {
  const [isSent, setIsSent] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...data,
      }),
    }).catch(error => alert(error))

    setIsSent(true)
  })

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setIsCopied(true)
  }

  const labelWrapperClasses = `block mb-3`
  const labelClasses = `text-xs tracking-widest`
  const inputClasses = `w-full h-[35px] border border-black focus:outline-none p-2 bg-light dark:bg-black dark:border-white text-sm`

  return (
    <form
      onSubmit={onSubmit}
      className={`${className} uppercase`}
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />

      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <h2 className="text-center text-2xl md:text-4xl font-bold mb-4 dark:text-white uppercase tracking-[.2em] w-full">
        Hola @ me!
      </h2>

      <label className={labelWrapperClasses}>
        <p className={labelClasses}>First Name</p>
        <input {...register("name")} type="text" className={inputClasses} />
      </label>

      <label className={labelWrapperClasses}>
        <p className={labelClasses}>Email</p>
        <input {...register("email")} type="email" className={inputClasses} />
      </label>

      <label className={labelWrapperClasses}>
        <p className={labelClasses}>Message</p>
        <textarea
          {...register("message")}
          rows={4}
          className={`${inputClasses} h-auto`}
        />
      </label>

      <div className="grid grid-cols-2 font-lexend text-xs md:text-sm">
        <input
          type="submit"
          value="Send 🔥"
          className="uppercase border border-black dark:border-white w-full h-[35px] col-span-2 cursor-pointer"
        />
        <button
          className="uppercase border border-black dark:border-white border-t-0 h-[35px]"
          onClick={copyEmail}
        >
          Copy mail {isCopied ? "✅" : "📋"}
        </button>
        <a
          href={twitterHandle}
          target="_blank"
          rel="noreferrer"
          className="uppercase border border-black dark:border-white border-l-0 border-t-0 h-[35px] flex items-center justify-center"
        >
          Twitter 🐤
        </a>
      </div>
    </form>
  )
}

export default ContactForm
