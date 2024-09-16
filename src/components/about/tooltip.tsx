export default function Tooltip({
  children,
  title,
  className = ''
} : {
  children: React.ReactNode,
  title: string,
  className?: string,
}) {
  return (
    <div className={`absolute z-10 p-4 rounded-xl ${className}`}>
      <p className='text-2xl text-subtext mb-4'>
        {children}
      </p>
    </div>
  )
}