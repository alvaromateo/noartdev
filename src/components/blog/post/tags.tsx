import Tag from "./tag";

export enum TagsType {
  Wrapped,
  Centered,
}

export default function Tags({
  list,
  type = TagsType.Centered,
} : {
  list: string[],
  type?: TagsType
}) {
  let classes = ''
  switch (type) {
    case TagsType.Centered:
      classes = 'flex flex-row justify-center mb-8'
      break
    case TagsType.Wrapped:
      classes = 'flex flex-row flex-wrap'
  }

  return (
    <ul className={classes}>
      { list.map((tagName) => <Tag type={type} key={tagName}>{tagName}</Tag>) }
    </ul>
  )
}