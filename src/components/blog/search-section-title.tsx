import { spaceMono } from '@/src/global/fonts'

export default function SearchSectionTitle({
  title
} : {
  title: string
}) {
  return (
    <h2 className={`
      text-base md:text-2xl text-title my-4 md:my-8
      ${spaceMono.className}
    `}>
      {title}
    </h2>
  )
}