import sanitizeHtml from 'sanitize-html';

export function sanitizeRichText(html) {
  return sanitizeHtml(html || '', {
    allowedTags: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'pre', 'code',
      'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'img', 'span'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
      span: ['style'],
      p: ['style'],
      h1: ['style'],
      h2: ['style'],
      h3: ['style']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
    allowedStyles: {
      '*': {
        color: [/^.*$/],
        'background-color': [/^.*$/],
        'text-align': [/^left$/, /^center$/, /^right$/]
      }
    }
  });
}
