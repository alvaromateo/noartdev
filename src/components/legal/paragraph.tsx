import MessageParagraph from '@/src/components/utils/message-paragraph'

import './legal.css'

export default function Paragraph({
  messages,
  messageKey,
} : {
  messages: IntlMessages,
  messageKey: string,
}) {
  return <MessageParagraph className={`
      text-sm text-text mb-4
      md:text-base md:mb-8`}
    messages={messages} messageKey={messageKey}/>
}