
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { spaceMono } from '@/src/global/fonts';

// languages
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'

// style
import './code-block.css'

const languageMap = {
  'javascript': js,
  'typescript': ts,
}

const isSupportedLanguage =
  (language: string): language is keyof typeof languageMap => language in languageMap

export default function CodeBlock({
  language,
  children
} : {
  language: string,
  children: string
}) {
  let codeBlock: JSX.Element
  if (isSupportedLanguage(language)) {
    codeBlock = getFormattedCode(language, children)
  } else {
    codeBlock = (
      <pre>
        <code>
          {children}
        </code>
      </pre>
    )
  }

  return codeBlock
}

function getFormattedCode(language: keyof typeof languageMap, children: string) {
  SyntaxHighlighter.registerLanguage(language, languageMap[language])
  return (
    <div className={`${spaceMono.className} my-8`}>
      <SyntaxHighlighter language={language} wrapLines
        lineNumberContainerStyle={{
          'paddingRight': '1rem',
          'paddingLeft': '0.5rem',
        }}
        codeTagProps={{
          'className': 'hljs',
        }}>
          {children}
      </SyntaxHighlighter>
    </div>
  )
}