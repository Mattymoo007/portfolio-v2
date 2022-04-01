import { FC, useState } from "react"

const CategoryNav: FC<{
  categories: string[]
  filterProjects: Function
  className: string
}> = ({ categories, filterProjects, className }) => {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <nav className={className}>
      <ul className="flex flex-wrap justify-center">
        {categories.map(category => {
          return (
            <li
              key={category}
              className={`md:mx-3 mx-2 mt-2 text-sm md:text-base border uppercase transition-colors hover:bg-black/5 px-[5px] dark:text-white cursor-pointer font-poppins font-light ${
                activeCategory === category
                  ? "border-black dark:border-white"
                  : "border-transparent"
              }`}
              onClick={() => {
                filterProjects(category)
                setActiveCategory(category)
              }}
            >
              {category}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategoryNav
