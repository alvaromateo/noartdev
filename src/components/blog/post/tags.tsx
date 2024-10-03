import { Suspense } from "react";
import Tag from "./tag";

export enum TagsType {
  Wrapped,
  Centered,
  Card,
}

export const wrappedTagLiClasses = `
  text-xs md:text-base px-2 md:px-4
  rounded-full bg-info text-crust hover:bg-hover-link mx-1 mb-2
`

export default function Tags({
  list,
  type = TagsType.Centered,
} : {
  list: string[],
  type?: TagsType
}) {
  let ulClasses = 'flex '
  let liClasses: string
  switch (type) {
    case TagsType.Centered:
      ulClasses = `${ulClasses} flex-col items-center justify-center
        text-xs mb-4
        md:flex-row md:text-base md:mb-8`
      liClasses = 'mb-2 md:mb-0 px-4 rounded-full bg-info text-crust hover:bg-hover-link mx-4'
      break
    case TagsType.Wrapped:
      ulClasses = `${ulClasses} flex-row flex-wrap`
      liClasses = wrappedTagLiClasses
      break
    case TagsType.Card:
      ulClasses = `${ulClasses} flex-row flex-wrap`
      liClasses = `pr-2 md:pr-4 text-link hover:text-hover-link text-[10px] md:text-sm`
      break
  }

  return (
    <ul className={ulClasses}>
      { 
        list.map((tagName) =>
          <li className={liClasses} key={tagName}>
            <Suspense fallback={<></>}>
              <Tag>
                {tagName}
              </Tag>
            </Suspense>
          </li>
        )
      }
    </ul>
  )
}