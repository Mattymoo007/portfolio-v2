import Link from "next/link"
import { FC } from "react"
import { IProjectFields } from "~/types/contentful"
import Image from "next/image"

const ProjectCard: FC<IProjectFields> = ({ slug, thumbnail, tags, title }) => {
  const tagsString = tags?.map(tag => `#${tag}`).join("")

  return (
    <Link href={slug ? `/projects/${slug}` : ""}>
      <a className="relative w-full inline-block border border-black">
        <div className="relative h-[280px] m-[18px] border border-black">
          <Image
            src={"https:" + thumbnail?.fields.file.url ?? ""}
            layout="fill"
            objectFit="cover"
            alt={thumbnail?.fields.title}
          />
        </div>

        <span className="absolute uppercase font-poppins font-normal text-sm -left-[10px] -top-[10px] vertical-text">
          {title?.split(":")[0]}
        </span>

        <span className="absolute uppercase font-poppins font-normal text-black/30 text-sm right-[17px] -bottom-[2px]">
          {tagsString}
        </span>
      </a>
    </Link>
  )
}

export default ProjectCard
