
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { spaceMono } from '@/src/global/fonts';

// languages
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css'

// style
import './code-block.css'

const languageMap = {
  'javascript': js,
  'typescript': ts,
  'css': css,
}

const isSupportedLanguage =
  (language: string): language is keyof typeof languageMap => language in languageMap

export default function CodeBlock({
  language,
  inline = false,
  children
} : {
  language: string,
  inline?: boolean,
  children: string
}) {
  let wrappingClasses = `${spaceMono.className} text-[10px] leading-4
      md:leading-6 md:text-base my-4 md:my-8`
  if (inline) {
    wrappingClasses = `${spaceMono.className} text-sm md:text-base
      my-4 md:my-8 inline`
  }
  let codeBlock: JSX.Element
  if (isSupportedLanguage(language)) {
    codeBlock = getFormattedCode(language, children, wrappingClasses)
  } else {
    codeBlock = (
      <pre className={wrappingClasses}>
        <code>
          {children}
        </code>
      </pre>
    )
  }

  return codeBlock
}

function getFormattedCode(
  language: keyof typeof languageMap,
  children: string,
  classes: string,
) {
  SyntaxHighlighter.registerLanguage(language, languageMap[language])
  return (
    <div className={classes}>
      <SyntaxHighlighter language={language} wrapLines wrapLongLines
        codeTagProps={{
          'className': 'hljs',
        }}>
          {children}
      </SyntaxHighlighter>
    </div>
  )
}
/*
showLineNumbers
        showInlineLineNumbers
        lineNumberContainerStyle={{
          'paddingRight': '1rem',
          'paddingLeft': '0.5rem',
        }}
          */