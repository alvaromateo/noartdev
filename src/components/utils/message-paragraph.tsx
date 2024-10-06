import assert from 'assert'
import { AbstractIntlMessages } from 'next-intl'

export default function MessageParagraph({
  messages,
  messageKey,
  className,
} : {
  messages: IntlMessages | AbstractIntlMessages,
  messageKey: string,
  className?: string
}) {
  return (
    <p className={className || ''} dangerouslySetInnerHTML={{
        __html: transformArrayInString(
          transformLinks(
            getMessageLines(messageKey, messages)
          )
        )
      }
    }/>
  )
}

const linkRegex = /\[(.*)\]\((.*)\)/

const transformArrayInString = (content: string[]) : string => {
  return content
    .reduce((accumulator, current) => `${accumulator}${current}`)
}

const transformLinks = (content: string[]) : string[] => {
  let lines: string[] = []
  for (let line of content) {
    const link = line.match(linkRegex)
    let newLine = line
    if (link) {
      const linkHtml = `<a href='${link[2]}'>${link[1]}</a>`
      newLine = line.replace(linkRegex, linkHtml)
    }
    lines.push(newLine)
  }
  return lines
}

const getMessageLines = (key: string, messages: IntlMessages | AbstractIntlMessages) : string[] => {
  const nestedKeys = key.split('.')
  let obj: any = messages
  for (let nestedKey of nestedKeys) {
    assert(nestedKey in obj)
    obj = obj[nestedKey]
  }
  if (obj instanceof Array) {
    assert(obj.length > 0)
    for (const item of obj) {
      assert(typeof item === 'string')
    }
    return Object.values(obj as string[])
  }
  assert(typeof obj === 'string')
  return [obj]
}