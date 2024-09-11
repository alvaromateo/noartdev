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

  const saveLinks = useCallback((links: string[]): void => {
    localStorage.setItem(LocalStorageProperties.recentLinksProperty, JSON.stringify(links))
    setRecentLinks(links)
  }, [])

  useEffect(() => {
    // add the current link to the top of the list
    // and load the recently visited links from local storage
    let links: string[] = []
    const data = localStorage.getItem(LocalStorageProperties.recentLinksProperty)
    if (data) {
      const previousLinks = JSON.parse(data)
      links = addNewLink(pathname, previousLinks)
    } else {
      links = [pathname]
    }
    saveLinks(links)
  }, [])

  useEffect(() => {
    // set the newly visited link every time pathname changes
    let links = addNewLink(pathname, recentLinks)
    saveLinks(links)
  }, [pathname])

  return (
    <RecentLinksContext.Provider value={recentLinks}>
      {children}
    </RecentLinksContext.Provider>
  )
}