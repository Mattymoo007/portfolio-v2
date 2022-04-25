// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "~/utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body

  const response = await prisma.project
    .update({
      where: { id: id },
      data: {
        claps: { increment: 1 },
      },
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Error updating claps")
    })

  console.log(`${response && response.claps} claps for project ${id}`)
  res.status(200).json(response)
}
