import parse, { HTMLReactParserOptions, Element } from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'

export const processHtml = (html: string) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        // Replace specific tags with custom components
      }
    },
  }
  const resultHtml = parse(DOMPurify.sanitize(html), options)
  return resultHtml
}
