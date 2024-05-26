import Link from 'next/link'

interface IconLinkProps {
  url: string
  icon: string
}

export function IconLink({ url, icon }: IconLinkProps) {
  if (!url) return null
  return (
    <Link href={url} target="_blank">
      <span className="material-symbols-outlined">{icon}</span>
    </Link>
  )
}

export default IconLink
