import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export default async function Hobbies({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('Hobbies')

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-xl md:text-2xl'>
          {t('comingSoon')}
        </p>
      </div>
    </div>
  )
}
