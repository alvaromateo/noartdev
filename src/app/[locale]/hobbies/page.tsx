import { unstable_setRequestLocale } from 'next-intl/server'

export default function Hobbies({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-xl md:text-2xl'>No hobbies...</p>
        <p className='text-xl md:text-2xl'>YET!</p>
        <p className='text-2xl md:text-3xl'>&#128513;</p>
      </div>
    </div>
  )
}
