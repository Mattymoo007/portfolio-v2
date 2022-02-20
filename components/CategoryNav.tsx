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
              className={`mx-3 text-xs md:text-base uppercase transition-colors hover:bg-black/5 px-[5px] rounded dark:text-white cursor-pointer font-poppins font-light ${
                activeCategory === category && "bg-black/10"
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
