
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ibmPlex, spaceMono, ubuntuMono } from '@/src/global/fonts'
import Prism from 'prismjs'

// languages
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'

// style
import './code-block-prism.css'
import { ComponentType } from 'react';

const languageMap = {
  'javascript': js,
  'typescript': ts,
  'css': css,
}

const isSupportedLanguage =
  (language: string): language is keyof typeof languageMap => language in languageMap

export default async function CodeBlock({
  language,
  inline = false,
  children
} : {
  language: string,
  inline?: boolean,
  children: string
}) {
  let wrappingClasses = `${ibmPlex.className} text-[10px] md:text-sm overflow-auto language-${language}`
  if (inline) {
    wrappingClasses = `${wrappingClasses} inline`
  } else {
    wrappingClasses = `${wrappingClasses} my-4 md:my-8 leading-4 md:leading-6 block`
  }

  let codeBlock: JSX.Element
  if (isSupportedLanguage(language)) {
    codeBlock = await getFormattedCode(language, children, wrappingClasses, inline)
  } else {
    throw Error('Unsupported language!')
  }

  return codeBlock
}

async function getFormattedCode(
  language: keyof typeof languageMap,
  children: string,
  className: string,
  inline: boolean,
) {
  if (inline) {
    await import(`prismjs/components/prism-${language}`)
    return (
      <code className={className} dangerouslySetInnerHTML={{
        __html: Prism.highlight(children, Prism.languages[language], language)
      }}/>
    )
  }

  SyntaxHighlighter.registerLanguage(language, languageMap[language])
  return (
    <div className='max-w-[84vw]'>
      <SyntaxHighlighter language={language}
        className={className} useInlineStyles={false}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
