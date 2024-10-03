'use client'

import { useEffect } from 'react'
 
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='flex flex-col justify-center items-center'>
      <h2 className='text-error text-2xl md:text-4xl mb-16'>
        Something went wrong!
      </h2>
      <button onClick={() => reset()}
        className='rounded-full p-3 bg-link text-base text-mantle'>
        Try again
        </button>
    </main>
  )
}

// TODO: check recent links after visiting post

/*
TODO: set correct metadata
<meta property="og:title" content="Site Title" />
<meta property="og:type" content="website" />
<meta property="og:url" content="http://my.website.com" />
<meta property="og:image:url" content="http://my.website.com/images/thumb.png" />
<meta property="og:description" content="Site description" />
<title>
description

https://htmlhead.dev/#table-of-contents
*/