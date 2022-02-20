import { Asset } from "contentful"
import type { GetStaticProps, NextPage } from "next"
import ReactMarkdown from "react-markdown"
import { contentful } from "~/utils/contentful-api"
import SpaceInvader from "~/assets/svg/space-invader.svg"
import DefaultLayout from "~/layouts/Default"

const Home: NextPage<{ text: string; image: Asset }> = ({ text }) => {
  return (
    <DefaultLayout>
      <div className="absolute grid place-content-center top-1/2 -translate-y-1/2">
        <SpaceInvader className="cursor-pointer mx-auto relative dark:text-white z-20" />
        <ReactMarkdown
          className="mt-6 uppercase w-[75%] md:w-[60%] text-center mx-auto leading-6 md:leading-8 text-sm md:text-xl tracking-wide"
          components={{
            p: ({ children }) => <p className="mb-7 last:mb-0">{children}</p>,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const text = await contentful.entry("gTkM7dEpLggFscYNaoDeY")

  return {
    props: {
      text: text.fields.text,
    },
  }
}
export default Home
