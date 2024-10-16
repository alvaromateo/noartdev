'use client'

import { LocalStorageProperties } from '@/src/global/property-names'
import { useMessages, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import MessageParagraph from '@/src/components/utils/message-paragraph'

export default function CookieBanner() {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false)
  const [localStorageRead, setLocalStorageRead] = useState<boolean>(false)
  const t = useTranslations('Common')
  const messages = useMessages()

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageProperties.cookiesAcceptedProperty)
    if (data) {
      const storedCookiesValue = data === 'true'
      if (storedCookiesValue !== cookiesAccepted) {
        setCookiesAccepted(storedCookiesValue)
      }
    }
    if (cookiesAccepted) {
      localStorage.setItem(LocalStorageProperties.cookiesAcceptedProperty, 'true')
    }
    setLocalStorageRead(true)
  }, [cookiesAccepted])

  return localStorageRead && !cookiesAccepted && (
    <div className={`
      fixed bottom-6 md:bottom-14 mx-[10%] w-4/5 p-4 bg-overlay-0 shadow-xl
      rounded-lg md:rounded-2xl z-40
    `}>
      <h3 className='text-subtitle text-base md:text-xl mb-1 md:mb-2'>
        {t('cookieBanner.title')}
      </h3>
      <MessageParagraph
        messages={messages}
        messageKey='Common.cookieBanner.text'
        className='text-text text-xs md:text-sm mb-1 md:mb-2'/>
      <button onClick={() => setCookiesAccepted(true)}
        className={`
          text-link hover:text-hover-link float-right rounded-lg
          text-sm md:text-base mr-4 p-2 bg-surface-1
        `}>
        {t('cookieBanner.okay')}
      </button>
    </div>
  )
}