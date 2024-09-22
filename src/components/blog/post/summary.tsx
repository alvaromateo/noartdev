export default function Summary({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='text-comment text-center mb-16'>
      {children}
    </div>
  )
}