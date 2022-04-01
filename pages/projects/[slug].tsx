import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
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
  currentProject: { thumbnail, body },
  nextProject: { slug },
  otherProjects,
}) => {
  const topLeftBtn = () => (
    <Link href="/projects">
      <a className="fixed z-10 btn-primary border-b border-l top-[20px] right-[20px] md:top-[30px] md:right-[30px]">
        <FiArrowLeft className="mr-2" /> Go back
      </a>
    </Link>
  )

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
              onClick={() => navigator.clipboard.writeText(emailAddress)}
              className="uppercase border border-black dark:border-white border-t-0 h-[35px]"
            >
              Copy mail 📋
            </button>
            <a
              href={twitterHandle}
              target="_blank"
              rel="noreferrer"
              className="uppercase border border-black dark:border-white border-l-0 border-t-0 h-[35px] flex items-center justify-center"
            >
              Twitter 🐤
            </a>
            <div className="uppercase border border-black dark:border-white border-t-0 h-[35px] flex items-center justify-center col-span-2">
              hello
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
