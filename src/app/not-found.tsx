'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='content flex justify-center px-[10%]'>
      <main className='flex flex-col justify-center items-center'>
        <h2 className='text-error text-2xl md:text-4xl mb-8'>
          Not found
        </h2>
        <p>This is not the page you were looking for...</p>
        <Link href='/' className='mt-8 rounded-xl px-4 py-2 bg-link text-base text-mantle'>
          Home
        </Link>
      </main>
    </div>
  )
}
