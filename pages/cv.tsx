import { NextPage } from "next"
import React from "react"
import DefaultLayout from "~/layouts/Default"
import { MdEngineering, MdSchool, MdFavorite } from "react-icons/md"

const CvPage: NextPage = () => {
  return (
    <DefaultLayout showCountry={false} showWeather={false}>
      <section className="p-[20px] md:p-[30px] mt-[52px] grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="border border-black dark:border-gray-50 flex flex-col">
          <h2 className="ml-auto border-b border-l border-black dark:border-gray-50 inline-block py-3 px-5">
            Education
            <MdSchool className="inline-block ml-2 mb-[3px]" />
          </h2>
        </div>
        <div className="border border-black dark:border-gray-50 flex flex-col">
          <h2 className="ml-auto border-b border-l border-black dark:border-gray-50 inline-block py-3 px-5">
            Work <MdEngineering className="inline-block ml-2 mb-[3px]" />
          </h2>

          <div className="p-6 pt-1">
            <h3 className="underline">Industrial Product Designer</h3>
            <p className="mb-2 italic">
              AB3D , TechforTrade - Nairobi | 10 • 2016 – 7 • 2017
            </p>
            <ul className="list mb-10">
              <li>
                Worked together with the founders in building the company and
                achieving the long-term milestones. The company aimed to bring
                3D printing technologies to the African market.
              </li>
              <li>Was part of customer research and aquisition.</li>
              <li>
                Creating of company branding including brochures, website &
                social media campaigns.
              </li>
              <li>Production process optimisation & engineering.</li>
              <li>Creating tutorials and manuals for users.</li>
            </ul>

            <h3 className="underline">Industrial Product Designer</h3>
            <p className="mb-2 italic">
              AB3D , TechforTrade - Nairobi | 10 • 2016 – 7 • 2017
            </p>
            <ul className="list mb-10">
              <li>
                Worked together with the founders in building the company and
                achieving the long-term milestones. The company aimed to bring
                3D printing technologies to the African market.
              </li>
              <li>Was part of customer research and aquisition.</li>
              <li>
                Creating of company branding including brochures, website &
                social media campaigns.
              </li>
              <li>Production process optimisation & engineering.</li>
              <li>Creating tutorials and manuals for users.</li>
            </ul>
          </div>
        </div>
        <div className="border border-black dark:border-gray-50 flex flex-col">
          <h2 className="ml-auto border-b border-l border-black dark:border-gray-50 inline-block py-3 px-5">
            Skills / Personal
            <MdFavorite className="inline-block ml-2 mb-[3px]" />
          </h2>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default CvPage
