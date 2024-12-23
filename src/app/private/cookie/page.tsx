'use client'

import Image from 'next/image'

import cookie from '@/public/images/cookie.svg'
import { useContext, useState } from 'react'
import { MobileContext } from '@/src/providers/mobile'
import { spaceMono } from '@/src/global/fonts'

export default function CookieGift() {
  const isMobile = useContext(MobileContext)
  const [discovered, setDiscovered] = useState(false);

  return (
    <main className={`
      px-[8%] lg:w-[1024px] lg:px-12 lg:mx-auto
      py-4 md:py-8 content
    `}>
      <div className={`
        grid grid-cols-1 grid-rows-[auto_auto_auto]
        gap-y-4 md:gap-x-16 md:gap-y-0
        md:grid-cols-2 md:grid-rows-[auto_auto]
        md:justify-items-stretch md:items-center
      `}>
        <div className={`
          flex flex-col w-full justify-center
          col-start-1 row-start-3
          md:col-start-1 md:row-span-2
        `}>
          <figure>
            <Image
              src={cookie}
              width={isMobile ? 200 : 500}
              height={isMobile ? 200 : 500}
              alt='Cookie image'
              priority
              className='mx-auto'/>
            <figcaption className='text-xs mt-4 md:mt-8 text-center'>
              <h3 className='text-sm text-title'>For my cookie</h3>
            </figcaption>
          </figure>
        </div>
        <div className={`
          pl-[10%] md:pl-0
          col-start-1 row-start-1
          md:col-start-2 md:row-start-1
          md:self-end
        `}>
          <h1 className={`${spaceMono.className} mb-8`}>
            <span className='text-title text-3xl md:text-5xl'>Merry Xmas!</span>
          </h1>
        </div>
        <div className={`
          pl-[10%] md:pl-0
          col-start-1 row-start-2
          md:col-start-2 md:row-start-2
          md:self-start
        `}>
          { discovered ?
            <>
              <p className='mb-4 md:mb-8 text-subtitle text-base md:text-lg'>
                You have 1 minute to get as many things as you want at Sephora!
              </p>
              <button onClick={() => setDiscovered(!discovered)} className={`
                text-xs md:text-base px-4 md:px-8 py-1 md:py-2
                rounded-full bg-info text-crust hover:bg-hover-link
                mb-4 md:mb-8 
              `}>
                Back
              </button>
            </>
            :
            <>
              <p className='mb-4 md:mb-8 text-base md:text-lg text-subtext'>
                Some time ago you saw a video on TikTok and you wanted to do the same...
              </p>
              <button onClick={() => setDiscovered(!discovered)} className={`
                text-xs md:text-base px-4 md:px-8 py-1 md:py-2
                rounded-full bg-info text-crust hover:bg-hover-link
                mb-4 md:mb-8 
              `}>
                Discover your gift
              </button>
            </>
          }
        </div>
      </div>
    </main>
  )
}

/*
<main className={`
      px-[8%] lg:w-[1024px] lg:px-12 lg:mx-auto
      py-4 md:py-8 content
    `}>
      <div className={`text-title text-lg md:text-4xl px-auto`}>
        <h2>Merry Xmas!</h2>
      </div>
      <div className={`flex flex-col md:flex-row justify-center`}>
        <div className={`m-auto`}>
          <Image
            
          />
        </div>
        <div className={`text-lg`}>

        </div>
      </div>
    </main>
    */