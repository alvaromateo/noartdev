'use client'

import { useState, useEffect, createContext, useCallback } from 'react'
import { usePathname } from '@/src/i18n/routing'
import { LocalStorageProperties } from '@/src/global/property-names'
import { AppSettings as settings } from '@/src/global/app-config'
import { RecentLink } from '@/src/global/types/custom'

export const RecentLinksContext = createContext<RecentLink[]>([])

export default function RecentLinksProvider({
  children
} : {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [recentLinks, setRecentLinks] = useState<RecentLink[]>([])
  const [pageTitle, setPageTitle] = useState('')

  const addNewLink = useCallback(
    (link: string, title: string, currentLinks: RecentLink[]): RecentLink[] => {
      let links: RecentLink[] = []
      const foundLink = currentLinks.find(value => value.link === link)

      if (foundLink) {
        // move the already present link to the beginning of the array
        links = currentLinks.filter(value => value.link !== link)
        links = [foundLink, ...links]
      } else {
        // add the link to the beginning of the array
        links = [{link: link, title: title}, ...currentLinks]
      }

      return links.slice(0, settings.recentLinksNum)
  }, [])

  useEffect(() => {
    // ignore /home link cause the recent-links is only present in the home page
    if (pathname !== '/home' && pathname !== '/') {
      const data = localStorage.getItem(LocalStorageProperties.recentLinksProperty)
      let storedLinks: RecentLink[] = []
      if (data) {
        storedLinks = JSON.parse(data)
      }
      const updatedLinks = addNewLink(pathname, document.title, storedLinks)
      setRecentLinks(updatedLinks)
    }
  }, [pathname, pageTitle, addNewLink])

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