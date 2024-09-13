export default function Card({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <div className='bg-crust p-4 rounded-xl'>
      <h1 className='text-3xl mb-4'>Experience</h1>
      {children}
    </div>
  )
}