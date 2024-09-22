import Tag from "./tag";

export default function Tags({ list } : { list: string[] }) {
  return (
    <ul className='flex flex-row justify-center mb-8'>
      { list.map((tagName) => <Tag key={tagName}>{tagName}</Tag>) }
    </ul>
  )
}