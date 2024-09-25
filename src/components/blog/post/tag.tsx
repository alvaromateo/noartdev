import { TagsType } from "./tags"

export default function Tag({
  children,
  type = TagsType.Centered,
} : {
  children: React.ReactNode,
  type?: TagsType
}) {
  let classes = 'px-4 rounded-full bg-info text-crust hover:bg-hover-link'
  switch (type) {
    case TagsType.Centered:
      classes = `${classes} mx-4`
      break
    case TagsType.Wrapped:
      classes = `${classes} mx-1 mb-2`
  }

  return (
    <li className={classes}>
      {children}
    </li>
  )
}