export default function Tag({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <li className='mx-4 px-4 rounded-full bg-info text-crust hover:bg-hover-link'>
      {children}
    </li>
  )
}