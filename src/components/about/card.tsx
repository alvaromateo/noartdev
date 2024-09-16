import { spaceMono } from '@/src/global/fonts'

export default function Card({
  children,
  title,
  className = ''
} : {
  children: React.ReactNode,
  title: string,
  className?: string,
}) {
  const defaultBackground = getDefaultValue(className, /bg-/g, 'bg-surface-0')
  const defaultPadding = getDefaultValue(className, /p[xytrbl]-/g, 'px-10 py-6')

  return (
    <div className={`
      mt-8 w-3/4 rounded-xl
      ${defaultBackground}
      ${defaultPadding}
      ${className}
    `}>
      <h2 className={`
        text-2xl text-title mb-4
        ${spaceMono.className}
      `}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function getDefaultValue(className: string, prefix: RegExp, defaultValue: string) {
  if (className !== null && className.match(prefix) === null) {
    return defaultValue
  }
  return ''
}