import Image from 'next/image'
import GitHubIcon from '@mui/icons-material/GitHub'

import { Link } from '@/src/i18n/routing'

import portrait from '/public/images/watercolor_portrait.png'

export default function ProjectCard({
  project
} : {
  project: {
    link: string,
    title: string,
    summary: string,
    githubLink: string,
  }
}) {
  return (
    <div className='relative my-4 md:my-6'>
      <Link href={{ pathname: project.githubLink }} className='z-10'
          target='_blank' rel='noopener noreferrer'>
        <div className={`
          absolute top-0 right-0 
          text-xl md:text-3xl
          bg-gradient-to-tr from-green/0 from-50% via-surface-0 via-50% to-surface-0
          w-[56px] h-[56px]
          md:w-[72px] md:h-[72px]
        `}>
          <GitHubIcon fontSize='inherit'
            className='absolute top-[6px] right-[6px]'/>
        </div>
      </Link>
      <Link href={{ pathname: project.link}} scroll={false}>
        <div className={`
          bg-mantle flex flex-col justify-start hover:bg-crust
          overflow-hidden border-[1px] border-crust shadow-lg shadow-crust
          rounded-2xl w-[200px] h-[320px]
          md:w-[275px] md:h-[440px]
        `}>
          <div className='w-full'>
            <Image
              src={portrait}
              alt='Picture of the author'
              priority/>
          </div>
          <div className='p-4 overflow-y-auto'>
            <h2 className='text-subtitle mb-2 md:mb-4 md:text-xl'>
              {project.title}
            </h2>
            <p className='text-[10px] md:text-sm'>
              {project.summary}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}