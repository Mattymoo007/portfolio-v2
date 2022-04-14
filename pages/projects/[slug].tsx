import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"
import { FiArrowLeft } from "react-icons/fi"
import ReactMarkdown from "react-markdown"
import DefaultLayout from "~/layouts/Default"
import { IProjectFields } from "~/types/contentful"
import { emailAddress, twitterHandle } from "~/utils/constants"
import { contentful } from "~/utils/contentful-api"

const Project: FC<{
  currentProject: IProjectFields
  nextProject: IProjectFields
  otherProjects: IProjectFields[]
}> = ({
  currentProject: { thumbnail, body, skillIcons },
  nextProject: { slug },
  otherProjects,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const topLeftBtn = () => (
    <Link href="/projects">
      <a className="fixed z-10 btn-primary border-b border-r top-[20px] left-[20px] md:top-[30px] md:left-[30px]">
        <FiArrowLeft className="mr-2" /> Go back
      </a>
    </Link>
  )

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setIsCopied(true)
  }

  return (
    <DefaultLayout
      showCountry={false}
      showWeather={false}
      topLeftBtn={topLeftBtn}
    >
      <section className="p-[20px] md:p-[30px] mt-[52px] grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div>
          <div className="relative w-full border border-black dark:border-white mb-auto">
            <div className="relative aspect-video m-[20px] border border-black dark:border-white">
              <Image
                src={"https:" + thumbnail?.fields.file.url ?? ""}
                layout="fill"
                objectFit="cover"
                alt={thumbnail?.fields.title}
                className="relative h-[280px] m-[18px] border border-black "
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <button
              onClick={copyEmail}
              className="font-lexend text-xs uppercase border border-black dark:border-white border-t-0 h-[35px]"
            >
              Copy mail {isCopied ? "✅" : "📋"}
            </button>
            <a
              href={twitterHandle}
              target="_blank"
              rel="noreferrer"
              className="font-lexend text-xs uppercase border border-black dark:border-white border-l-0 border-t-0 h-[35px] flex items-center justify-center"
            >
              Twitter 🐤
            </a>

            <div className="uppercase border border-black dark:border-white border-t-0 h-[35px] flex items-center justify-center col-span-2">
              {skillIcons &&
                skillIcons.map((icon, index) => (
                  <span
                    key={index}
                    className="relative w-6 h-6 mx-1 group flex justify-center"
                  >
                    <Image
                      src={"https:" + icon.fields.file.url}
                      alt={icon.fields.title}
                      layout="fill"
                      objectFit="contain"
                    />

                    <span className="pointer-events-none normal-case absolute dark:bg-white dark:text-black bg-black rounded text-white px-2 py-1 text-xs bottom-[-130%] opacity-0 group-hover:opacity-75 transition-opacity whitespace-nowrap flex justify-center">
                      <span className="top-[-3px] absolute dark:bg-white bg-black w-[10px] h-[10px] rotate-45"></span>
                      {icon.fields.title}
                    </span>
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div>
          <ReactMarkdown className="markdown">{body ? body : ""}</ReactMarkdown>
        </div>

        <ul className="mb-14">
          <li className="border-b border-black dark:border-white text-right py-3 ">
            <Link href={slug ?? ""}>
              <a>Next project ...</a>
            </Link>
          </li>
          {otherProjects.map(project => (
            <li
              key={project.slug}
              className="border-b border-black dark:border-white text-right py-3"
            >
              <Link href={project.slug ?? ""}>
                <a>{project.title ?? ""}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await contentful.entries<IProjectFields>({
    content_type: "project",
  })

  return {
    paths: projects.items.map(project => ({
      params: { slug: project.fields.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.slug

  const entries = await contentful.entries({
    content_type: "project",
  })
  const projectsLength = entries.items.length

  const projectIndex = entries.items.findIndex(project => {
    return project.fields.slug === slug
  })

  const nextProjectIndex =
    projectIndex + 1 >= projectsLength
      ? 0
      : projectIndex + 1 === projectsLength
      ? projectsLength - 1
      : projectIndex + 1

  const currentProject = entries.items[projectIndex]
  const nextProject = entries.items[nextProjectIndex]
  const otherProjects = entries.items
    .filter(
      project =>
        project.sys.id !== currentProject.sys.id &&
        project.sys.id !== nextProject.sys.id
    )
    .map(project => project.fields)

  return {
    props: {
      currentProject: currentProject.fields,
      nextProject: nextProject.fields,
      otherProjects: otherProjects,
    },
  }
}

export default Project
