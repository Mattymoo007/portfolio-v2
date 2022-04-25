import { NextPage } from "next"
import React from "react"
import DefaultLayout from "~/layouts/Default"

const CvPage: NextPage = () => {
  return (
    <DefaultLayout>
      <section className="p-[20px] md:p-[30px] mt-[52px] grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div>
          <h2 className="italic">Education</h2>
        </div>
        <div>
          <h2 className="italic">Work</h2>
        </div>
        <div>
          <h2 className="italic">Skills/ Personal</h2>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default CvPage
