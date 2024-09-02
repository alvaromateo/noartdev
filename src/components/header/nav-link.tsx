import Link from 'next/link'

export default function NavLink({
  pathName,
  children
} : {
  pathName: string,
  children: React.ReactNode
}) {
  return (
    <div className='inline-block px-4'>
      <Link href={{ pathname: pathName }}>
        {children}
      </Link>
    </div>
  )
}