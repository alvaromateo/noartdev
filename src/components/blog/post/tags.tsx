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
  let ulClasses = 'flex flex-row '
  let liClasses: string
  switch (type) {
    case TagsType.Centered:
      ulClasses = `${ulClasses} justify-center mb-8`
      liClasses = 'px-4 rounded-full bg-info text-crust hover:bg-hover-link mx-4'
      break
    case TagsType.Wrapped:
      ulClasses = `${ulClasses} flex-wrap`
      liClasses = wrappedTagLiClasses
      break
    case TagsType.Card:
      ulClasses = `${ulClasses} flex-wrap`
      liClasses = `px-2 text-link hover:text-hover-link text-sm`
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