export default function Summary({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='text-comment text-center mb-8'>
      {children}
    </div>
  )
}