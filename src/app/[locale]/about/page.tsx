import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

import portrait from '/assets/photo-linkedin.jpg'
import Card from '@/src/components/about/card'
import SocialIcons from '@/src/components/utils/social-icons'
import { skills, langs } from '@/src/global/icons'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { spaceMono } from '@/src/global/fonts'
import { languageProficiencyLevels } from '@/src/global/app-config'

const imageDiameter = 300
const skillsLogoSize = 32
const langsLogoSize = 24

export default async function About({
  params
} : {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations('About')

  // TODO: add mobile and 'lg' (1024px) breakpoint
  /*
    Border left of skills by drawing a <div>
    <div className={`
      absolute left-0 ml-16 h-5/6 self-end w-1 bg-overlay-0
      rounded-lg shadow-md
    `}></div>
  */
  return (
    <main className='lg:max-w-[1024px] mx-auto pt-8 pb-16 content'>
      <div className={`
        grid gap-y-12 grid-cols-1 grid-rows-[auto_auto_auto]
        md:gap-x-16 md:gap-y-16 md:grid-cols-2 md:grid-rows-2
        md:justify-items-stretch md:items-center
      `}>
        <div className={`
          flex flex-col w-full justify-center
          col-start-1 row-start-1
          md:col-start-1 md:row-start-1
        `}>
          <figure>
            <Image
              src={portrait}
              width={imageDiameter}
              height={imageDiameter}
              alt='Picture of the author'
              className='rounded-full ring-2 ring-crust mx-auto shadow-md shadow-crust'/>
            <figcaption className='text-sm mt-4 md:mt-8 text-center w-4/5 mx-auto'>
              <h2 className={`
                text-2xl text-title mb-4
                ${spaceMono.className}
              `}>
                {t('fullName')}
              </h2>
              <p>{t('bioIntro')}</p>
              <p>{t('bioP1')} {t('bioP2')}</p>
            </figcaption>
          </figure>
        </div>
        <div className={`
          pl-[10%] md:pl-0 md:w-full
          col-start-1 row-start-1
          md:col-start-2 md:row-start-1
          md:justify-self-start md:self-start
        `}>
          <Card title={t('contact')} className=''>
            <div className='flex flex-row justify-between items-center'>
              <div>
                <p>alvaromateo9@gmail.com</p>
                <p>+41 79 846 08 61</p>
              </div>
              <div>
                <SocialIcons/>
              </div>
            </div>
          </Card>
          <div className='relative flex flex-row justify-end'>
            <Card title={t('skills.title')}
              className='bg-basic pl-16 border-l-4 border-solid box-content border-overlay-0'>
              { createIconsRow(Object.entries(skills.langs)) }
              { createIconsRow(Object.entries(skills.techs)) }
              { createIconsRow(Object.entries(skills.tools)) }
            </Card>
          </div>
          <Card title={t('langs.title')} className=''>
            <div className='flex flex-col'>
              { createLanguageEntries(t) }
            </div>
          </Card>
        </div>
        <div className={`
          pl-[10%] md:pl-0
          col-start-1 row-start-2
          md:col-span-2 md:row-start-2
          md:self-start
        `}>
          <h2 className={`
            text-2xl text-title mb-4
            ${spaceMono.className}
          `}>
            Experience
          </h2>
          <h2 className={`
            text-2xl text-title mb-4
            ${spaceMono.className}
          `}>
            Education
          </h2>
        </div>
      </div>
    </main>
  )
}

function createIconsRow(icons: [string, StaticImport][]) {
  return (
    <div className='flex flex-row flex-wrap items-center mb-4'>
      {
        icons.map(([key, value]) => {
          return <Image
            key={key}
            src={value}
            width={skillsLogoSize}
            height={skillsLogoSize}
            alt={key}
            style={{
              borderRadius: '0.5rem',
              marginRight: '0.5rem'
            }}
          />
        })
      }
    </div>
  )
}

function createLanguageEntries(t: (key: string) => string) {
  return (
    Object.entries(langs).map(([key, value]) => {
      return <div key={key} className='flex flex-row'>
          <Image
            src={value}
            width={langsLogoSize}
            height={langsLogoSize}
            alt={key}
            style={{
              borderRadius: '9999px',
              marginBottom: '0.5rem',
              marginRight: '0.5rem'
            }}
          />
          <p className='text-sm'>
            {t(`langs.${key}`)} - {t(`langs.${languageProficiencyLevels[key]}`)}
          </p>
        </div>
    })
  )
}