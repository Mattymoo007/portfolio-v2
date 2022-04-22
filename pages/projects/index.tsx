import type { GetStaticProps, NextPage } from "next"
import CategoryNav from "~/components/CategoryNav"
import { contentful } from "~/utils/contentful-api"

import ProjectCard from "~/components/ProjectCard"
import { useState } from "react"
import { IProjectFields } from "~/types/contentful"
import DefaultLayout from "~/layouts/Default"
import SpaceInvader from "~/assets/svg/space-invader.svg"
import Link from "next/link"

const categories = [
  "all",
  "development",
  "product design",
  "graphic design",
  "writing",
]

const Projects: NextPage<{ projects: IProjectFields[] }> = ({ projects }) => {
  const [filteredProjects, setFilteredProjects] = useState([...projects])

  const filterProjects = (tag: string) => {
    if (tag === "all") return setFilteredProjects(projects)

    const newArr = projects.filter(project => {
      return project.tags?.some(_tag => _tag === tag)
    })

    setFilteredProjects(newArr)
  }

  return (
    <DefaultLayout showCountry={false} showWeather={false}>
      <section className="mb-[50px] md:mb-0 p-[20px] md:p-[30px] mt-[50px]">
        <Link href="/">
          <a>
            <SpaceInvader className="cursor-pointer mx-auto relative dark:text-white" />
          </a>
        </Link>

        <h1 className="uppercase text-2xl text-center mt-8 font-lexend">
          Projects
        </h1>

        <CategoryNav
          categories={categories}
          filterProjects={filterProjects}
          className="mt-8"
        />

        <div className="grid gap-7 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="text-center mt-[30px] text-sm font-lexend uppercase flex mx-auto justify-center">
          More coming soon ...
        </div>
      </section>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projectArrId = "1449rrFKe0Ev87UCAjAziH"
  const {
    fields: { items },
  } = await contentful.entry(projectArrId)

  const projects = items.map((item: any) => item.fields)

  return {
    props: { projects },
  }
}

export default Projects
