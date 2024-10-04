import SocialIcons from '../utils/social-icons'

export default function Footer() {
    return (
      <footer className={`
        mt-4 md:mt-8 px-6 md:px-12
        footer bg-mantle border-t border-crust
        flex justify-between align-middle text-xs/4
      `}>
        <div className='my-auto mr-4 md:mr-8'>
          <div className='flex flex-col md:flex-row'>
            <p>© 2024 Alvaro Mateo.&nbsp;</p>
            <p>All rights reserved.</p>
          </div>
          <p>Licensed under <a href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank' rel='noopener noreferrer'
            className='text-link font-bold'>
              CC BY 4.0
            </a>.
          </p>
        </div>
        <SocialIcons/>
      </footer>
    )
  }
