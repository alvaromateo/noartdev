import { spaceMono } from '@/src/global/fonts'

export default function Subtitle({
  children,
} : {
  children: React.ReactNode,
}) {
  return <h2 className={`
    text-lg text-subtitle mb-4
    md:text-xl/[2rem] md:mb-8
    ${spaceMono.className}
  `}>
    {children}
  </h2>
}