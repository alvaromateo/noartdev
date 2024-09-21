import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('js', javascript)

export default function JavascriptCodeBlock({
  children
} : {
  children: React.ReactNode
}) {
  const highlightedCode = hljs.highlight(`
    import hljs from 'highlight.js/lib/core'
    import javascript from 'highlight.js/lib/languages/javascript'
    hljs.registerLanguage('js', javascript)
    export default function JavascriptCodeBlock({
      children
    } : {
      children: React.ReactNode
    }) {
      const highlightedCode = hljs.highlight(
        const test = 0,
        { language: 'js' }
      ).value
      return highlightedCode
    }
    `,
    { language: 'js' }
  ).value
  return highlightedCode
}