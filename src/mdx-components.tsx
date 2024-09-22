import type { MDXComponents } from 'mdx/types'
import { spaceMono } from './global/fonts'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) =>
      <h1 className={`${spaceMono.className} text-title text-4xl text-center mt-4 mb-8`}>
        {children}
      </h1>,
    h2: ({ children, id }) =>
      <h2 className={`${spaceMono.className} text-subtitle text-2xl my-8`}
        id={id}>
          {children}
      </h2>,
    h3: ({ children, id }) =>
      <h3 className={`${spaceMono.className} text-lavender text-lg font-bold my-8`}
        id={id}>
          {children}
      </h3>,
    p: ({ children }) =>
      <p className='mb-4'>
        {children}
      </p>,
    ...components,
  }
}