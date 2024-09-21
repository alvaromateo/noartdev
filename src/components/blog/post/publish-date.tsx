'use client'

import { useEffect, useState } from "react"

export default function PublishDate({
  year,
  month,
  day
} : {
  year: number,
  month: number,
  day: number
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
  date.setFullYear(year, month, day)
  const formattedDate = formatter.format(date)

  return ( navigatorAPI &&
    <p className='text-comment text-center mb-4'>
      {formattedDate}
    </p>
  )
}