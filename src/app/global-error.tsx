'use client'

import { Link, useRouter } from '@/src/i18n/routing'
import Logo from '@/src/components/header/logo';
import Footer from '@/src/components/footer/footer';
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  let errorDescription : React.ReactNode;
  if (!!error.digest) {
    errorDescription = (
      <p>{ error.digest }</p>
    );
  }
  const router = useRouter()

  return (
    <html>
      <body className='bg-basic h-screen'>
        <div className='header-and-content'>
          <header className='header flex items-center px-6 md:px-16'>
            <nav className='w-full flex flex-row justify-between items-center'>
              <Link href={{ pathname: `/home` }}>
                <Logo></Logo>
              </Link>
            </nav>
          </header>
          <div className='content flex justify-center'>
            <main className='flex flex-col justify-center items-center'>
              <h2 className='text-error text-2xl md:text-4xl mb-16'>
                Something went wrong!
              </h2>
              <p className='text-sm md:text-xl mb-16 text-text'>
                { !!error.digest && errorDescription }
              </p>
              <button onClick={() => router.refresh()}
                className='rounded-full p-3 bg-link text-base text-mantle'>
                Try again
                </button>
            </main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}