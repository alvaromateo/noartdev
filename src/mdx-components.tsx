import type { MDXComponents } from 'mdx/types'
import { spaceMono } from './global/fonts'
import idFromTitle from './global/functions/id-from-title'
 
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) =>
      <h1 className={`
        ${spaceMono.className} text-title text-center
        text-2xl mt-2 mb-4
        md:text-4xl md:mt-4 md:mb-8`
      }>
        {children}
      </h1>,
    h2: ({ children }) =>
      <h2 className={`${spaceMono.className} text-subtitle text-lg md:text-2xl my-4 md:my-8`}
        id={typeof children === 'string' ? idFromTitle(children) : ''}>
          {children}
      </h2>,
    h3: ({ children }) =>
      <h3 className={`${spaceMono.className} text-lavender text-base md:text-lg md:font-bold my-4 md:my-8`}
        id={typeof children === 'string' ? idFromTitle(children) : ''}>
          {children}
      </h3>,
    h4: ({ children }) =>
      <h4 className={`${spaceMono.className} text-comment text-sm md:text-base font-bold my-4 md:my-8`}
        id={typeof children === 'string' ? idFromTitle(children) : ''}>
          {children}
      </h4>,
    p: ({ children }) =>
      <p className='text-sm md:text-base mb-2 md:mb-4'>
        {children}
      </p>,
    strong: ({ children }) =>
      <strong className='text-sm md:text-base font-bold text-comment'>
        {children}
      </strong>,
    em: ({ children }) =>
      <em className='text-sm md:text-base italic text-comment'>
        {children}
      </em>,
    li: ({ children }) =>
      <li className='text-sm md:text-base list-disc list-inside'>
        {children}
      </li>,
    ul: ({ children }) =>
      <ul className='mb-2 md:mb-4'>
        {children}
      </ul>,
    ...components,
  }
}