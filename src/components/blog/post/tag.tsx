'use client'

import CloseIcon from '@mui/icons-material/Close'
import { TagsType } from './tags'
import { usePathname, useRouter } from '@/src/i18n/routing'
import { AppSettings } from '@/src/global/app-config'
import { useSearchParams } from 'next/navigation'
import { SearchParamNames } from '@/src/global/property-names'
import { useCallback } from 'react'


export default function Tag({
  children,
  hasCloseButton = false,
  type = TagsType.Centered,
} : {
  children: string,
  hasCloseButton?: boolean,
  type?: TagsType
}) {
  let classes = 'px-4 rounded-full bg-info text-crust hover:bg-hover-link'
  switch (type) {
    case TagsType.Centered:
      classes = `${classes} mx-4`
      break
    case TagsType.Wrapped:
      classes = `${classes} mx-1 mb-2`
      break
    case TagsType.Card:
      classes = `px-2 text-link hover:text-hover-link text-sm`
  }

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const addURLSearchParam = useCallback(
    (search: URLSearchParams, name: string, value: string) => {
      const params = new URLSearchParams(search.toString())
      params.append(name, value)
      return params
    },
    []
  )

  const deleteURLSearchParam = useCallback(
    (search: URLSearchParams, name: string, value?: string) => {
      const params = new URLSearchParams(search.toString())
      params.delete(name, value)
      return params
    },
    []
  )

  const goToFilteredPosts = useCallback((searchParams: URLSearchParams) => {
    const newUrl = `${AppSettings.blogURL}?${searchParams}`
    if (pathname.endsWith(AppSettings.blogURL)) {
      router.replace(newUrl)
    } else {
      router.push(newUrl)
    }
  }, [pathname, router])

  return (
    <button className="ml-4" onClick={(event) => {
      event.preventDefault()
      event.stopPropagation()
      let newSearchParams: URLSearchParams

      if (hasCloseButton) {
        // remove the tag from the search
        newSearchParams = deleteURLSearchParam(
          searchParams, SearchParamNames.filter, children)
      } else {
        // add tag to the search of blog
        newSearchParams = addURLSearchParam(
          searchParams, SearchParamNames.filter, children)
      }
      goToFilteredPosts(newSearchParams)
    }}>
      <li className={classes}>
        <span>{children}</span>
        { hasCloseButton &&
          <CloseIcon fontSize='inherit' />
        }
      </li>
    </button>
  )
}