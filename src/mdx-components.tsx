import type { MDXComponents } from 'mdx/types'
import { spaceMono } from './global/fonts'
import idFromTitle from './global/functions/id-from-title'
 
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) =>
      <h1 className={`${spaceMono.className} text-title text-4xl text-center mt-4 mb-8`}>
        {children}
      </h1>,
    h2: ({ children }) =>
      <h2 className={`${spaceMono.className} text-subtitle text-2xl my-8`}
        id={typeof children === 'string' ? idFromTitle(children) : ''}>
          {children}
      </h2>,
    h3: ({ children }) =>
      <h3 className={`${spaceMono.className} text-lavender text-lg font-bold my-8`}
        id={typeof children === 'string' ? idFromTitle(children) : ''}>
          {children}
      </h3>,
    h4: ({ children }) =>
      <h4 className={`${spaceMono.className} text-comment text-base font-bold my-8`}
        id={typeof children === 'string' ? idFromTitle(children) : ''}>
          {children}
      </h4>,
    p: ({ children }) =>
      <p className='mb-4'>
        {children}
      </p>,
    ...components,
  }
}