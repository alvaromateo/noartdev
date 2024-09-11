import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@/src/i18n/routing'

export default function SocialIcons() {
  return (
    <div className='flex flex-row justify-evenly my-auto'>
      <div className='px-1 text-2xl first:pl-0 last:pr-0'>
        <Link href={{ pathname: 'https://www.linkedin.com/in/alvaromateoalvarez/' }}
          target='_blank' rel='noopener noreferrer'>
          <LinkedInIcon fontSize='inherit'/>
        </Link>
      </div>
      <div className='px-1 text-2xl first:pl-0 last:pr-0'>
        <Link href={{ pathname: 'https://github.com/alvaromateo' }}
          target='_blank' rel='noopener noreferrer'>
          <GitHubIcon fontSize='inherit'/>
        </Link>
      </div>
    </div>
  )
}