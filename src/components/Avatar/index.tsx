import './style.scss';

export function Avatar({
  src,
  alt,
  href,
  size = 80,
} : {
  src: string,
  alt: string,
  href?: string,
  size?: number,
}) {
  const Tag = href ? 'a' : 'div';

  return (
    <Tag
      href={href}
      className="avatar"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} />
    </Tag>
  )
}
