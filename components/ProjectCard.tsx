import Link from "next/link"
import { FC } from "react"
import { IProjectFields } from "~/types/contentful"
import Image from "next/image"

const ProjectCard: FC<IProjectFields> = ({ slug, thumbnail, tags, title }) => {
  const tagsString = tags?.map(tag => `#${tag}`).join("")

  return (
    <Link href={slug ? `/projects/${slug}` : ""}>
      <a className="relative w-full inline-block border border-black dark:border-white">
        <div className="relative aspect-video m-[14px] md:m-[18px] border border-black dark:border-white">
          <Image
            src={"https:" + thumbnail?.fields.file.url ?? ""}
            layout="fill"
            objectFit="cover"
            alt={thumbnail?.fields.title}
          />
        </div>

        <span className="hidden md:inline-block absolute uppercase font-poppins font-normal text-xs md:text-sm -left-[10px] -top-[10px] vertical-text">
          {title?.split(":")[0]}
        </span>

        <span className="md:hidden absolute uppercase font-poppins font-normal text-xs md:text-sm -top-[15px]">
          {title?.split(":")[0]}
        </span>

        <span
          className="absolute uppercase font-poppins font-normal text-black/30 dark:text-white/40 text-xs md:text-sm max-w-[90
        %] text-ellipsis overflow-hidden right-[14px] md:right-[17px] -bottom-[2px] whitespace-nowrap"
        >
          {tagsString}
        </span>
      </a>
    </Link>
  )
}

export default ProjectCard
