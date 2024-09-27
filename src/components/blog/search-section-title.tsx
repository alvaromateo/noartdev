import { spaceMono } from '@/src/global/fonts'

export default function SearchSectionTitle({
  title
} : {
  title: string
}) {
  return (
    <h2 className={`
      text-2xl text-title my-8
      ${spaceMono.className}
    `}>
      {title}
    </h2>
  )
}