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
} : {
  children: string,
  hasCloseButton?: boolean,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const addURLSearchParam = useCallback(
    (search: URLSearchParams, name: string, value: string) => {
      const params = new URLSearchParams(search.toString())
      if (!params.has(name, value)) {
        params.append(name, value)
      }
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
    <button onClick={(event) => {
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
      <span>{children}</span>
      { hasCloseButton &&
        <CloseIcon fontSize='inherit' className='ml-4' />
      }
    </button>
  )
}