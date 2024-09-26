'use client'

import { useEffect, useState } from "react"

export default function PublishDate({
  year,
  month,
  day,
  className,
} : {
  year: number,
  month: number,
  day: number,
  className?: string,
}) {
  const [navigatorAPI, setNavigatorAPI] = useState<Navigator>()
  useEffect(() => {
    setNavigatorAPI(navigator)
  }, [])

  let formatter: Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }
  if (navigatorAPI) {
    formatter = new Intl.DateTimeFormat(
      navigatorAPI.languages.map(lang => new Intl.Locale(lang)),
      options
    )
  } else {
    formatter = new Intl.DateTimeFormat(undefined, options)
  }

  const date = new Date()
  // month field is 0 based
  date.setFullYear(year, month - 1, day)
  const formattedDate = formatter.format(date)

  return ( navigatorAPI &&
    <p className={ className ? className : 'text-comment text-center mb-4' }>
      {formattedDate}
    </p>
  )
}