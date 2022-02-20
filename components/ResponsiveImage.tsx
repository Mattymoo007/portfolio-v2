import { Asset } from "contentful"
import { FC } from "react"
import Image from "next/image"

const ResponsiveImage: FC<{ image: Asset | undefined }> = ({
  image,
  ...props
}) => {
  const title = image?.fields.title
  const url = image?.fields.file.url
  const dimensions = image?.fields.file.details.image

  return (
    <Image
      src={`https:${url}`}
      layout="responsive"
      width={dimensions?.width}
      height={dimensions?.height}
      alt={title}
      priority={true}
      {...props}
    />
  )
}

export default ResponsiveImage
