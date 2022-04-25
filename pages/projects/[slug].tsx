import { Project } from "@prisma/client"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"
import { FiArrowLeft } from "react-icons/fi"
import ReactMarkdown from "react-markdown"
import DefaultLayout from "~/layouts/Default"
import { IProject, IProjectFields } from "~/types/contentful"
import { contentful } from "~/utils/contentful-api"
import { prisma } from "~/utils/prisma"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

const Project: FC<{
  currentProject: IProject
  nextProject: IProjectFields
  otherProjects: IProjectFields[]
  prismaProject: Project
}> = ({
  currentProject: {
    fields: { thumbnail, body, skillIcons, link },
  },
  nextProject: { slug },
  otherProjects,
  prismaProject,
}) => {
  const [claps, setClaps] = useState(prismaProject.claps)

  const topLeftBtn = () => (
    <Link href="/projects">
      <a className="fixed z-10 btn-primary border-b border-r top-[20px] left-[20px] md:top-[30px] md:left-[30px]">
        <FiArrowLeft className="mr-2" /> Go back
      </a>
    </Link>
  )

  const updateClaps = async () => {
    const data = await fetch("/api/update-claps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: prismaProject.id,
      }),
    }).then(res => res.json())
    setClaps(data.claps)

    claps % 10 === 9 && makeFireworks()
  }

  const makeFireworks = async () => {
    const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

    for (let i = 0; i < 3; i++) {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      })

      await timer(500)
    }
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
            <button className="font-lexend text-xs uppercase border border-black dark:border-white border-t-0 h-[35px]">
              View 👁️
            </button>
            <button
              onClick={updateClaps}
              className="font-lexend text-xs uppercase border border-black dark:border-white border-l-0 border-t-0 h-[35px] flex items-center justify-center relative"
            >
              {/* Clap progress bar */}
              <div
                className="absolute h-full bg-gray-300/90 left-0 transition-[width]"
                style={{ width: `${(claps % 10) * 10}%` }}
              />

              {/* Clap text */}
              <span className="z-10">Clap 👏</span>

              {/* Claps counter */}
              {claps > 0 && (
                <motion.span
                  key={claps}
                  animate={{
                    scale: [1, 1.3, 1],
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="rounded-full px-2 py-[1px] center ml-2 border border-black font-poppins z-10"
                >
                  {claps}
                </motion.span>
              )}
            </button>

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
            <Link href={`/projects/${slug}` ?? ""}>
              <a>Next project ...</a>
            </Link>
          </li>
          {otherProjects.map(project => (
            <li
              key={project.slug}
              className="border-b border-black dark:border-white text-right py-3"
            >
              <Link href={`/projects/${project.slug}` ?? ""}>
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

  // Get claps
  const prismaProject = await prisma.project.findFirst({
    where: {
      contentfulId: currentProject.sys.id,
    },
  })

  return {
    props: {
      currentProject: currentProject,
      nextProject: nextProject.fields,
      otherProjects: otherProjects,
      prismaProject,
    },
    revalidate: 60,
  }
}

export default Project
