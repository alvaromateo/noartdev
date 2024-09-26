'use client'

import { useState, useEffect, createContext, useCallback } from 'react'
import { usePathname } from '@/src/i18n/routing'
import { LocalStorageProperties } from '@/src/global/property-names'
import { AppSettings as settings } from '@/src/global/app-config'

export const RecentLinksContext = createContext<string[]>([])

export default function RecentLinksProvider({
  children
} : {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [recentLinks, setRecentLinks] = useState<string[]>([])

  const addNewLink = useCallback((link: string, currentLinks: string[]): string[] => {
    let links: string[] = []
    if (currentLinks.includes(link)) {
      // move the already present link to the beginning of the array
      links = currentLinks.filter(l => l !== link)
      links = [link, ...links]
    } else {
      // add the link to the beginning of the array
      links = [link, ...currentLinks]
    }

    return links.slice(0, settings.recentLinksNum)
  }, [])

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageProperties.recentLinksProperty)
    let storedLinks: string[] = []
    if (data) {
      storedLinks = JSON.parse(data)
    }
    const updatedLinks = addNewLink(pathname, storedLinks)
    setRecentLinks(updatedLinks)
  }, [pathname, addNewLink])

  useEffect(() => {
    if (recentLinks.length > 0) {
      localStorage.setItem(
        LocalStorageProperties.recentLinksProperty,
        JSON.stringify(recentLinks)
      )
    }
  }, [recentLinks])

  return (
    <RecentLinksContext.Provider value={recentLinks}>
      {children}
    </RecentLinksContext.Provider>
  )
}