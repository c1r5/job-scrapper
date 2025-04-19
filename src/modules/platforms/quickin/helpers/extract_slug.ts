
export function extract_slugs(link?: string) {
  const capture = /https:\/\/jobs\.quickin\.io\/([^\/]+)\/jobs/g
  
  if (!link) throw new Error('invalid_link')
  if (!link.match(capture)) throw new Error('invalid_link')

  const uri = new URL(link)
  const slug = uri.pathname.split('//')[0].split('/').slice(1, -1)[0]

  return slug
}