import JavascriptCodeBlock from "./languages/javascript"

export default function CodeBlock({
  language,
  children
} : {
  language: string,
  children: React.ReactNode
}) {
  let codeBlock: JSX.Element
  switch (language) {
    case 'js':
      codeBlock = <JavascriptCodeBlock>{children}</JavascriptCodeBlock>
    default:
      codeBlock = <></>
  }
  return codeBlock
}