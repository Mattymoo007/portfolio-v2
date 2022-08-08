import { Asset } from "contentful"
import type { GetStaticProps, NextPage } from "next"
import ReactMarkdown from "react-markdown"
import { contentful } from "~/utils/contentful-api"
import SpaceInvader from "~/assets/svg/space-invader.svg"
import DefaultLayout from "~/layouts/Default"
import Link from "next/link"

const Home: NextPage<{ text: string; image: Asset }> = ({ text }) => {
  return (
    <DefaultLayout>
      <div className="mt-32 mb-28">
        <Link href="/">
          <a>
            <SpaceInvader className="cursor-pointer mx-auto relative dark:text-white z-20" />
          </a>
        </Link>

        <div className="select-none paragraph mt-6 w-[85%] md:w-[60%] text-center mx-auto leading-6 md:leading-8  md:text-xl tracking-wide">
          <p>
            Greetings fellow traveller!{" "}
            <span className="hover-vibrate">👋</span>
          </p>
          <p>
            My name is Matthew. Im a product designer gone web developer that
            loves to create functional stellar-looking interfaces{" "}
            <span className="hover-shake">📱</span>. I am extremly curious,
            constantly challenging myself to grow my skills and discover new,
            interesting ideas. <span className="hover-spin">🧱</span>
          </p>
          <p>
            With an eye for design <span className="hover-wobble">💅</span> and
            a mind made for logic <span className="hover-jello">🧠</span>, I
            combine my skills to make my ideas come to life.
          </p>
          <p>
            Welcome to my playground. Enjoy!{" "}
            <span className="hover-pulse">💖</span>
          </p>
        </div>
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
