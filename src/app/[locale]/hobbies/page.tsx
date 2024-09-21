import { unstable_setRequestLocale } from 'next-intl/server'

export default function Hobbies({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-xl md:text-2xl'>Coming soon...</p>
      </div>
    </div>
  )
}
